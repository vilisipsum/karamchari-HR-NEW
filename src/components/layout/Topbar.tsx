'use client'

import { LogoHorizontal } from '@/components/brand/LogoHorizontal'
import { NLSearchBar } from '@/components/ai/NLSearchBar'
import { Menu, Sparkles } from 'lucide-react'

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="glass-panel flex items-center justify-between px-6 py-3.5 rounded-2xl border border-white/10 bg-[#0A0A0B]/80 backdrop-blur-2xl shadow-2xl">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-white/10 rounded-xl text-white border border-white/10 cursor-pointer flex items-center justify-center transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5 text-white/80" />
        </button>
        <LogoHorizontal size="sm" showTagline={false} />
      </div>

      <div className="flex-1 max-w-xl mx-4">
        <NLSearchBar />
      </div>

      <div className="flex items-center gap-3">
        <div className="glass-panel px-4 py-1.5 rounded-full border border-[#00C6FF]/30 bg-[#00C6FF]/10 flex items-center gap-2 shadow-[0_0_15px_rgba(0,198,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#00C6FF] animate-pulse" />
          <span className="font-mono text-xs text-white/90 font-medium tracking-wide">AI Enterprise</span>
        </div>
      </div>
    </header>
  )
}
