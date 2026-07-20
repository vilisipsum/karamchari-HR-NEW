import { createClient } from '@/lib/server'

export type DashboardStats = {
  totalEmployees: number
  presentCount: number
  onLeaveCount: number
  upcomingHoliday: { name: string; date: string } | null
}

async function getOrgEmployeeIds(supabase: any, orgId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('id')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .eq('status', 'active')
    if (error) {
      const alt = await supabase.from('employees').select('id').eq('org_id', orgId)
      return alt.data?.map((e: any) => e.id) || []
    }
    return data?.map((e: any) => e.id) || []
  } catch (err) {
    return []
  }
}

export async function getDashboardStats(orgId: string): Promise<DashboardStats> {
  try {
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]
    const employeeIds = await getOrgEmployeeIds(supabase, orgId)

    if (employeeIds.length === 0) {
      const { data: holidays } = await supabase
        .from('holidays')
        .select('name, date')
        .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
        .gte('date', today)
        .order('date')
        .limit(1)

      return {
        totalEmployees: 0,
        presentCount: 0,
        onLeaveCount: 0,
        upcomingHoliday: holidays?.[0] ?? null,
      }
    }

    const [present, onLeave, holidays] = await Promise.all([
      supabase.from('attendance').select('id', { count: 'exact', head: true }).eq('date', today).neq('status', 'absent').in('employee_id', employeeIds),
      supabase.from('leave_requests').select('id', { count: 'exact', head: true }).eq('status', 'approved').gte('end_date', today).lte('start_date', today).in('employee_id', employeeIds),
      supabase.from('holidays').select('name, date').or(`organization_id.eq.${orgId},org_id.eq.${orgId}`).gte('date', today).order('date').limit(1),
    ])

    return {
      totalEmployees: employeeIds.length,
      presentCount: present.count ?? 0,
      onLeaveCount: onLeave.count ?? 0,
      upcomingHoliday: holidays.data?.[0] ?? null,
    }
  } catch (err) {
    console.warn('getDashboardStats exception fallback:', err)
    return { totalEmployees: 0, presentCount: 0, onLeaveCount: 0, upcomingHoliday: null }
  }
}

export async function getEmployees(orgId: string, options?: { search?: string; page?: number; limit?: number }) {
  try {
    const supabase = await createClient()
    const { search, page = 1, limit = 20 } = options ?? {}
    const safePage = Math.max(1, page)
    const from = (safePage - 1) * limit
    const to = from + limit - 1

    let query = supabase
      .from('employees')
      .select('*, profiles(full_name, email), departments(name, code), designations(title)', { count: 'exact' })
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,employee_code.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, error, count } = await query
    if (error) {
      // Fallback simple query
      const alt = await supabase.from('employees').select('*', { count: 'exact' }).eq('org_id', orgId).range(from, to)
      return { data: alt.data ?? [], total: alt.count ?? 0, page: safePage, limit }
    }
    return { data: data ?? [], total: count ?? 0, page: safePage, limit }
  } catch (err) {
    console.warn('getEmployees exception fallback:', err)
    return { data: [], total: 0, page: 1, limit: 20 }
  }
}

export async function getEmployee(supabase: any, id: string) {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*, profiles(full_name, email), departments(name, code), designations(title, level)')
      .eq('id', id)
      .single()
    if (error) {
      const alt = await supabase.from('employees').select('*').eq('id', id).single()
      return alt.data
    }
    return data
  } catch (err) {
    return null
  }
}

export async function getLeaveBalances(supabase: any, employeeId: string) {
  try {
    const { data, error } = await supabase
      .from('leave_balances')
      .select('*, leave_types(name, code, color)')
      .eq('employee_id', employeeId)
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getLeaveRequests(orgId: string, options?: { status?: string; page?: number; limit?: number }) {
  try {
    const supabase = await createClient()
    const { status, page = 1, limit = 20 } = options ?? {}
    const safePage = Math.max(1, page)
    const from = (safePage - 1) * limit
    const to = from + limit - 1

    let query = supabase
      .from('leave_requests')
      .select('*, employees(id, employee_code, profiles(full_name, email)), leave_types(name, code)', { count: 'exact' })
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (status) query = query.eq('status', status)

    const { data, error, count } = await query
    if (error) {
      const employeeIds = await getOrgEmployeeIds(supabase, orgId)
      if (employeeIds.length === 0) return { data: [], total: 0 }
      let altQuery = supabase.from('leave_requests').select('*, employees(id, employee_code)', { count: 'exact' }).in('employee_id', employeeIds).range(from, to)
      if (status) altQuery = altQuery.eq('status', status)
      const alt = await altQuery
      return { data: alt.data ?? [], total: alt.count ?? 0 }
    }
    return { data: data ?? [], total: count ?? 0 }
  } catch (err) {
    return { data: [], total: 0 }
  }
}

export async function getLeaveTypes(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('leave_types')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .eq('is_active', true)
      .order('name')
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getHolidays(orgId: string, year?: number) {
  try {
    const supabase = await createClient()
    let query = supabase.from('holidays').select('*').or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
    if (year) query = query.eq('year', year)
    const { data, error } = await query.order('date')
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getPayrollRuns(orgId: string, limit = 12) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('payroll_runs')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('year', { ascending: false })
      .order('month', { ascending: false })
      .limit(limit)
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getPayrollRunDetails(supabase: any, runId: string) {
  try {
    const { data, error } = await supabase
      .from('payroll_items')
      .select('*, employees(id, employee_code, profiles(full_name))')
      .eq('payroll_run_id', runId)
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getTodayAttendance(orgId: string) {
  try {
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('attendance')
      .select('*, employees(id, employee_code, profiles(full_name))')
      .eq('date', today)
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('clock_in')
    if (error) {
      const employeeIds = await getOrgEmployeeIds(supabase, orgId)
      if (employeeIds.length === 0) return []
      const alt = await supabase.from('attendance').select('*').eq('date', today).in('employee_id', employeeIds)
      return alt.data ?? []
    }
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getShifts(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('shifts')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('name')
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getAssets(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('assets')
      .select('*, employees(id, employee_code, profiles(full_name))')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getTrainings(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('start_date', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getOrgChart(orgId: string) {
  try {
    const supabase = await createClient()
    const { data: employees, error } = await supabase
      .from('employees')
      .select('id, first_name, last_name, employee_code, manager_id, profiles(full_name), designations(title), departments(name)')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .eq('status', 'active')
    if (error) throw error

    interface OrgNode {
      id: string
      first_name: string | null
      last_name: string | null
      employee_code: string
      role: { title: string } | null
      manager_id: string | null
      department: { name: string } | null
      initials: string
      children: OrgNode[]
    }

    const buildTree = (managerId: string | null = null): OrgNode[] => {
      const filtered = (employees ?? []).filter(e => e.manager_id === managerId)
      return filtered.map(e => ({
        ...e,
        role: e.designations?.[0] ?? null,
        department: e.departments?.[0] ?? null,
        initials: ((Array.isArray(e.profiles) ? e.profiles[0]?.full_name : (e.profiles as any)?.full_name) ? (Array.isArray(e.profiles) ? e.profiles[0]?.full_name : (e.profiles as any)?.full_name).substring(0, 2) : `${e.first_name?.[0] || 'E'}${e.last_name?.[0] || 'M'}`).toUpperCase(),
        children: buildTree(e.id),
      }))
    }

    return buildTree()
  } catch (err) {
    return []
  }
}

export async function getDepartments(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getDesignations(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('designations')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getPerformanceCycles(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('appraisal_cycles')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('start_date', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getPerformanceReviews(cycleId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('performance_reviews')
      .select('*, employees(id, employee_code, profiles(full_name))')
      .eq('appraisal_cycle_id', cycleId)
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getJobOpenings(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getCandidates(jobId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getOrganization(supabase: any, orgId: string) {
  try {
    const { data, error } = await supabase.from('organizations').select('*').eq('id', orgId).single()
    if (error) throw error
    return data
  } catch (err) {
    return null
  }
}

export async function getProfile(supabase: any, userId: string) {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (error) throw error
    return data
  } catch (err) {
    return null
  }
}

export async function getExpenseClaims(orgId: string, options?: { status?: string; page?: number; limit?: number }) {
  try {
    const supabase = await createClient()
    const { status, page = 1, limit = 20 } = options ?? {}
    const safePage = Math.max(1, page)
    const from = (safePage - 1) * limit
    const to = from + limit - 1

    let query = supabase
      .from('expense_claims')
      .select('*, employees(id, employee_code, profiles(full_name)), expense_categories(name)', { count: 'exact' })
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (status) query = query.eq('status', status)

    const { data, error, count } = await query
    if (error) throw error
    return { data: data ?? [], total: count ?? 0 }
  } catch (err) {
    return { data: [], total: 0 }
  }
}

export async function getExpenseCategories(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('expense_categories')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .eq('is_active', true)
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getSalaryStructures(orgId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('salary_structures')
      .select('*')
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
      .eq('is_active', true)
    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getEmployeeSalary(employeeId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('employee_salaries')
      .select('*, salary_structures(*)')
      .eq('employee_id', employeeId)
      .eq('is_active', true)
      .single()
    if (error) throw error
    return data
  } catch (err) {
    return null
  }
}

export async function getAttendanceStats(orgId: string, days = 30) {
  try {
    const supabase = await createClient()
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - days * 86400000).toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('attendance')
      .select('date, status, employee_id')
      .gte('date', startDate)
      .lte('date', endDate)
      .or(`organization_id.eq.${orgId},org_id.eq.${orgId}`)
    if (error) throw error

    const stats = data?.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1
      return acc
    }, {} as Record<string, number>) || {}

    return { stats, total: data?.length ?? 0 }
  } catch (err) {
    return { stats: {}, total: 0 }
  }
}

export async function getUserLeaveBalances(orgId: string, userId: string) {
  try {
    const supabase = await createClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('employee_id')
      .eq('id', userId)
      .single()

    if (!profile?.employee_id) return []

    return getLeaveBalances(supabase, profile.employee_id)
  } catch (err) {
    return []
  }
}