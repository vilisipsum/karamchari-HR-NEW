'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePermissions } from '@/hooks/usePermissions'
import { RoleGate } from '@/components/ui/PermissionGate'
import { LogoHorizontal } from '@/components/brand/LogoHorizontal'
import type { Permission } from '@/lib/permissions'
import {
  LayoutDashboard,
  Users,
  Fingerprint,
  RefreshCw,
  Calendar,
  Wallet,
  Receipt,
  Network,
  Laptop,
  GraduationCap,
  Briefcase,
  FileText,
  TrendingUp,
  Sparkles,
  PieChart,
  Settings,
  Shield,
  LogOut
} from 'lucide-react'
import { signout } from '@/app/auth/actions'

const navItems: Array<{ label: string; href: string; permission?: Permission }> = [
  { label: 'Dashboard', href: '/' },
  { label: 'Attendance', href: '/attendance', permission: 'attendance.view' },
  { label: 'Shifts', href: '/attendance/shifts', permission: 'attendance.view' },
  { label: 'Leave', href: '/leaves', permission: 'leaves.view' },
  { label: 'Expenses', href: '/expenses' },
  { label: 'Payroll', href: '/payroll', permission: 'payroll.view' },
  { label: 'Employees', href: '/employees', permission: 'employees.view' },
  { label: 'Org Chart', href: '/org-chart' },
  { label: 'Assets', href: '/assets' },
  { label: 'Training', href: '/training' },
  { label: 'Recruitment', href: '/recruitment', permission: 'recruitment.view' },
  { label: 'Resume AI', href: '/recruitment/screening' },
  { label: 'Performance', href: '/performance', permission: 'performance.view' },
  { label: 'AI Copilot', href: '/copilot' },
  { label: 'Settings', href: '/settings', permission: 'settings.view' },
]

const iconConfig: Record<string, { component: any; colorClass: string; bgClass: string }> = {
  'Dashboard': { component: LayoutDashboard, colorClass: 'text-[#00C6FF]', bgClass: 'bg-[#00C6FF]/10 border-[#00C6FF]/30 shadow-[0_0_12px_rgba(0,198,255,0.25)]' },
  'Employees': { component: Users, colorClass: 'text-cyan-400', bgClass: 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.25)]' },
  'Attendance': { component: Fingerprint, colorClass: 'text-emerald-400', bgClass: 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]' },
  'Shifts': { component: RefreshCw, colorClass: 'text-emerald-400', bgClass: 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]' },
  'Leave': { component: Calendar, colorClass: 'text-indigo-400', bgClass: 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.25)]' },
  'Expenses': { component: Receipt, colorClass: 'text-rose-400', bgClass: 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.25)]' },
  'Payroll': { component: Wallet, colorClass: 'text-rose-400', bgClass: 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.25)]' },
  'Org Chart': { component: Network, colorClass: 'text-cyan-400', bgClass: 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.25)]' },
  'Assets': { component: Laptop, colorClass: 'text-cyan-400', bgClass: 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.25)]' },
  'Training': { component: GraduationCap, colorClass: 'text-blue-400', bgClass: 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.25)]' },
  'Recruitment': { component: Briefcase, colorClass: 'text-amber-400', bgClass: 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.25)]' },
  'Resume AI': { component: FileText, colorClass: 'text-blue-400', bgClass: 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.25)]' },
  'Performance': { component: TrendingUp, colorClass: 'text-emerald-400', bgClass: 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]' },
  'AI Copilot': { component: Sparkles, colorClass: 'text-purple-400', bgClass: 'bg-purple-500/10 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.25)]' },
  'Settings': { component: Settings, colorClass: 'text-blue-400', bgClass: 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.25)]' },
  'Team & Roles': { component: Shield, colorClass: 'text-indigo-400', bgClass: 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.25)]' }
}

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const path = usePathname()
  const { can } = usePermissions()

  return (
    <aside className="glass-panel p-5 flex flex-col gap-2 h-full min-w-[210px] rounded-3xl border border-white/10 bg-[#0A0A0B]/80 backdrop-blur-2xl shadow-2xl">
      <div className="mb-6 px-1">
        <LogoHorizontal size="sm" showTagline={false} />
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto pr-1">
        {navItems.map((item) => {
          if (item.permission && !can(item.permission)) return null
          const active = path === item.href
          const config = iconConfig[item.label] || { component: Settings, colorClass: 'text-zinc-400', bgClass: 'bg-zinc-500/10 border-zinc-500/20' }
          const IconComponent = config.component

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? 'bg-gradient-to-r from-[#00C6FF]/20 to-[#0072FF]/20 text-white border border-[#00C6FF]/40 shadow-[0_0_20px_rgba(0,198,255,0.2)]'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${config.bgClass}`}>
                <IconComponent className={`w-4 h-4 ${config.colorClass}`} />
              </div>
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-2">
        <RoleGate role="org_admin">
          {(() => {
            const active = path === '/settings/roles'
            const config = iconConfig['Team & Roles']
            const IconComponent = config.component
            return (
              <Link
                href="/settings/roles"
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#00C6FF]/20 to-[#0072FF]/20 text-white border border-[#00C6FF]/40 shadow-[0_0_20px_rgba(0,198,255,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${config.bgClass}`}>
                  <IconComponent className={`w-4 h-4 ${config.colorClass}`} />
                </div>
                Team & Roles
              </Link>
            )
          })()}
        </RoleGate>

        <button
          onClick={async () => {
            await signout()
            if (onClose) onClose()
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-white/60 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent cursor-pointer text-left w-full"
        >
          <div className="w-8 h-8 rounded-lg border border-rose-500/30 bg-rose-500/10 flex items-center justify-center transition-all shadow-[0_0_12px_rgba(244,63,94,0.2)]">
            <LogOut className="w-4 h-4 text-rose-400" />
          </div>
          Log Out
        </button>
      </div>
    </aside>
  )
}
