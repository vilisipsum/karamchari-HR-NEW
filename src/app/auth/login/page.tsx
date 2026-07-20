'use client'

import { useActionState, useState } from 'react'
import { login } from '../actions'
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 font-medium">
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="font-mono text-[11px] uppercase tracking-wider text-white/60 font-medium">Email Address</label>
        <div className="relative">
          <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
          <input 
            name="email" 
            type="email" 
            placeholder="ananya@company.com" 
            required
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/40 outline-none focus:border-[#00C6FF] focus:ring-1 focus:ring-[#00C6FF] text-sm backdrop-blur-xl transition-all" 
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center mb-1">
          <label className="font-mono text-[11px] uppercase tracking-wider text-white/60 font-medium">Password</label>
          <a href="/auth/forgot-password" className="text-[11px] text-[#00C6FF] hover:underline font-medium">Forgot Password?</a>
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
          <input 
            name="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            required
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/40 outline-none focus:border-[#00C6FF] focus:ring-1 focus:ring-[#00C6FF] text-sm backdrop-blur-xl transition-all" 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-white/40 hover:text-white cursor-pointer transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={pending} 
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00C6FF] to-[#0072FF] hover:opacity-95 shadow-[0_0_20px_rgba(0,198,255,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {pending ? 'Signing in…' : <>Sign in <ArrowRight className="w-4 h-4" /></>}
      </button>

      <p className="text-center text-xs text-white/50 pt-2">
        Don&apos;t have an account? <a href="/auth/register" className="text-[#00C6FF] font-semibold hover:underline">Register</a>
      </p>
    </form>
  )
}
