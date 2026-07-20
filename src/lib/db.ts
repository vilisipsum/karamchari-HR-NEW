import { createClient } from '@/lib/server'
import type { createClient as createBrowserClient } from '@/lib/client'

type SupabaseClient = Awaited<ReturnType<typeof createClient>>
type BrowserClient = ReturnType<typeof createBrowserClient>

// Helper to support both org_id and organization_id fields cleanly
function getOrgFilter(query: any, orgId: string) {
  return query.eq('organization_id', orgId)
}

// ─── Dashboard ───
export async function getDashboardStats(supabase: SupabaseClient | BrowserClient, orgId: string) {
  const today = new Date().toISOString().split('T')[0]

  try {
    const [employees, present, onLeave, holidays] = await Promise.all([
      supabase.from('employees').select('id', { count: 'exact', head: true }).eq('organization_id', orgId).eq('status', 'active'),
      supabase.from('attendance').select('id', { count: 'exact', head: true }).eq('date', today).neq('status', 'absent'),
      supabase.from('leave_requests').select('id', { count: 'exact', head: true }).eq('status', 'approved').gte('end_date', today).lte('start_date', today),
      supabase.from('holidays').select('*').eq('organization_id', orgId).gte('date', today).order('date').limit(1),
    ])

    return {
      totalEmployees: employees.count ?? 0,
      presentCount: present.count ?? 0,
      onLeaveCount: onLeave.count ?? 0,
      upcomingHoliday: holidays.data?.[0] ?? null,
    }
  } catch (err) {
    console.warn('getDashboardStats fallback triggered:', err)
    return { totalEmployees: 0, presentCount: 0, onLeaveCount: 0, upcomingHoliday: null }
  }
}

// ─── Employees ───
export async function getEmployees(supabase: SupabaseClient | BrowserClient, orgId: string) {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*, profiles(full_name, email), departments(name), designations(title)')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false })

    if (error) {
      // Fallback try with org_id if column alias differs
      const alt = await supabase
        .from('employees')
        .select('*')
        .eq('org_id', orgId)
        .order('created_at', { ascending: false })
      return alt.data ?? []
    }
    return data ?? []
  } catch (err) {
    console.warn('getEmployees fallback triggered:', err)
    return []
  }
}

export async function getEmployee(supabase: SupabaseClient | BrowserClient, id: string) {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*, profiles(full_name, email), departments(name), designations(title)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (err) {
    console.warn('getEmployee fallback triggered for id:', id)
    return null
  }
}

// ─── Leaves ───
export async function getLeaveBalances(supabase: SupabaseClient | BrowserClient, employeeId: string) {
  try {
    const { data, error } = await supabase
      .from('leave_balances')
      .select('*, leave_types(name, code)')
      .eq('employee_id', employeeId)

    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

export async function getLeaveRequests(supabase: SupabaseClient | BrowserClient, orgId: string) {
  try {
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*, employees(id, employee_code, profiles(full_name, email)), leave_types(name)')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      // Fallback if organization_id isn't directly on leave_requests table
      const { data: empData } = await supabase.from('employees').select('id').eq('organization_id', orgId)
      const empIds = (empData || []).map((e: any) => e.id)
      if (empIds.length === 0) return []
      const alt = await supabase
        .from('leave_requests')
        .select('*, employees(id, employee_code), leave_types(name)')
        .in('employee_id', empIds)
        .order('created_at', { ascending: false })
        .limit(20)
      return alt.data ?? []
    }
    return data ?? []
  } catch (err) {
    console.warn('getLeaveRequests fallback triggered:', err)
    return []
  }
}

// ─── Payroll ───
export async function getPayrollRuns(supabase: SupabaseClient | BrowserClient, orgId: string) {
  try {
    const { data, error } = await supabase
      .from('payroll_runs')
      .select('*')
      .eq('organization_id', orgId)
      .order('year', { ascending: false })
      .order('month', { ascending: false })
      .limit(12)

    if (error) throw error
    return data ?? []
  } catch (err) {
    return []
  }
}

// ─── Attendance ───
export async function getTodayAttendance(supabase: SupabaseClient | BrowserClient, orgId: string) {
  const today = new Date().toISOString().split('T')[0]
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('*, employees(id, employee_code, profiles(full_name))')
      .eq('date', today)
      .eq('organization_id', orgId)

    if (error) {
      const { data: empData } = await supabase.from('employees').select('id').eq('organization_id', orgId)
      const empIds = (empData || []).map((e: any) => e.id)
      if (empIds.length === 0) return []
      const alt = await supabase
        .from('attendance')
        .select('*, employees(id, employee_code)')
        .eq('date', today)
        .in('employee_id', empIds)
      return alt.data ?? []
    }
    return data ?? []
  } catch (err) {
    console.warn('getTodayAttendance fallback triggered:', err)
    return []
  }
}
