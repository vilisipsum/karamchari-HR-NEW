'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/client'
import type { Role, Permission } from '@/lib/permissions'

const roleHierarchy: Record<Role, number> = {
  super_admin: 100,
  org_admin: 80,
  hr_manager: 60,
  manager: 40,
  employee: 20,
}

const rolePermissions: Record<Role, Permission[]> = {
  super_admin: [
    'employees.view', 'employees.create', 'employees.edit', 'employees.delete',
    'payroll.view', 'payroll.process', 'payroll.approve',
    'leaves.view', 'leaves.approve',
    'attendance.view', 'attendance.edit',
    'recruitment.view', 'recruitment.create',
    'performance.view', 'performance.review',
    'settings.view', 'settings.edit',
    'reports.view',
    'users.manage', 'roles.manage',
  ],
  org_admin: [
    'employees.view', 'employees.create', 'employees.edit', 'employees.delete',
    'payroll.view', 'payroll.process', 'payroll.approve',
    'leaves.view', 'leaves.approve',
    'attendance.view', 'attendance.edit',
    'recruitment.view', 'recruitment.create',
    'performance.view', 'performance.review',
    'settings.view', 'settings.edit',
    'reports.view',
    'users.manage',
  ],
  hr_manager: [
    'employees.view', 'employees.create', 'employees.edit',
    'payroll.view', 'payroll.process',
    'leaves.view', 'leaves.approve',
    'attendance.view', 'attendance.edit',
    'recruitment.view', 'recruitment.create',
    'performance.view',
    'settings.view',
    'reports.view',
  ],
  manager: [
    'employees.view',
    'leaves.view', 'leaves.approve',
    'attendance.view',
    'performance.view', 'performance.review',
    'reports.view',
  ],
  employee: [
    'employees.view',
    'leaves.view',
    'attendance.view',
    'performance.view',
  ],
}

export function hasPermission(role: Role | null, permission: Permission): boolean {
  if (!role) return false
  return rolePermissions[role]?.includes(permission) ?? false
}

export function hasRole(userRole: Role | null, minimumRole: Role): boolean {
  if (!userRole) return false
  return roleHierarchy[userRole] >= roleHierarchy[minimumRole]
}

export function canManageRole(actorRole: Role | null, targetRole: Role): boolean {
  if (!actorRole) return false
  return roleHierarchy[actorRole] > roleHierarchy[targetRole]
}

export function usePermissions() {
  const [role, setRole] = useState<Role | null>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('user_role') as Role) || null;
    }
    return null;
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const supabase = createClient()

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        if (mounted) setLoading(false)
        return
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (error) throw error

        if (mounted && profile?.role) {
          const freshRole = profile.role as Role
          setRole(freshRole)
          localStorage.setItem('user_role', freshRole)
        }
      } catch (err) {
        console.error("Error loading user role permissions:", err)
        // Fallback to employee role if no profile row exists yet
        if (mounted && !role) {
          setRole('employee')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    })
  }, [])

  return {
    role,
    loading,
    can: (permission: Permission) => {
      // During initial loading, if role is cached, use it to prevent flashing
      if (role) return hasPermission(role, permission)
      // Default to true for basic dashboard access during transient state
      return false
    },
    isAtLeast: (minimumRole: Role) => hasRole(role, minimumRole),
    canManage: (targetRole: Role) => canManageRole(role, targetRole),
  }
}