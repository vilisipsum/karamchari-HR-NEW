'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { StatusChip } from '@/components/ui/StatusChip'
import { Search, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react'

interface EmployeesContentProps {
  employees: Array<{
    id: string
    employee_code: string
    first_name: string
    last_name: string
    email: string
    phone: string | null
    date_of_joining: string
    status: string
    departments: { name: string; code: string } | null
    designations: { title: string; level: number } | null
    leave_balances: Array<{ leave_types: { name: string; code: string }; balance: number; entitled: number; taken: number }>
  }>
  total: number
  page: number
  limit: number
  search: string
  departments: Array<{ id: string; name: string; code: string }>
  designations: Array<{ id: string; title: string; level: number }>
}

export function EmployeesContent({ employees, total, page, limit, search, departments, designations }: EmployeesContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [localSearch, setLocalSearch] = useState(search)

  const totalPages = Math.ceil(total / limit)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (localSearch) params.set('search', localSearch)
    else params.delete('search')
    params.set('page', '1')
    router.push(`/employees?${params.toString()}`)
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/employees?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Employee Directory</h1>
          <p className="text-sm text-white/50">Manage organization workforce, roles, and status</p>
        </div>
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, team, ID…"
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/40 outline-none focus:border-[#00C6FF] focus:ring-1 focus:ring-[#00C6FF] text-sm backdrop-blur-xl transition-all"
          />
        </form>
      </div>

      {employees.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-white/10 bg-white/[0.02]">
          <UserCheck className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <div className="text-white/60 font-medium text-lg">No employees found</div>
          <p className="text-white/40 text-sm mt-1">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {employees.map((emp, i) => (
            <div 
              key={emp.id} 
              onClick={() => router.push(`/employees/${emp.id}`)}
              className="glass-panel p-5 rounded-3xl border border-white/10 bg-[#0A0A0B]/80 backdrop-blur-xl flex flex-col items-center gap-3 text-center hover:border-[#00C6FF]/50 hover:bg-white/[0.04] shadow-xl hover:shadow-[0_0_25px_rgba(0,198,255,0.15)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-[#00C6FF] font-mono">View →</span>
              </div>
              <Avatar initials={`${emp.first_name?.[0]}${emp.last_name?.[0]}`.toUpperCase()} index={i} size="lg" />
              <div className="w-full">
                <div className="font-display font-semibold text-base text-white group-hover:text-[#00C6FF] transition-colors truncate">{emp.first_name} {emp.last_name}</div>
                <div className="text-xs text-white/50 truncate mt-0.5">{emp.designations?.title || emp.departments?.name || 'Team Member'}</div>
              </div>
              <StatusChip type={emp.status === 'active' ? 'present' : emp.status === 'on_leave' ? 'leave' : 'absent'} label={emp.status} />
              <div className="text-[11px] text-white/40 font-mono bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">{emp.employee_code}</div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white/80 disabled:opacity-30 disabled:cursor-not-allowed text-sm flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="text-sm font-mono text-white/60 px-3 py-1 rounded-lg bg-white/[0.02] border border-white/5">
            Page {page} of {totalPages} ({total} total)
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white/80 disabled:opacity-30 disabled:cursor-not-allowed text-sm flex items-center gap-1.5 transition-all"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}