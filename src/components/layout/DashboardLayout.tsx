'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { CopilotChat } from '@/components/ai/CopilotChat'
import { CinematicBackground } from '@/components/ui/CinematicBackground'
import { CustomCursor } from '@/components/ui/CustomCursor'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#00C6FF]/30 selection:text-white overflow-x-hidden">
      <CustomCursor />
      <CinematicBackground />

      <div className="relative z-10 flex flex-col gap-4 p-4 md:p-6 max-w-[1600px] mx-auto">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex gap-6 relative" style={{ minHeight: 'calc(100vh - 120px)' }}>
          {/* Desktop Sidebar */}
          <div className="hidden lg:block min-w-[210px]">
            <Sidebar />
          </div>

          {/* Mobile Drawer Sidebar Overlay */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
                onClick={() => setIsSidebarOpen(false)}
              />
              {/* Drawer Content */}
              <div className="relative z-10 w-[260px] h-full bg-[#0A0A0B] border-r border-white/10 p-4 flex flex-col shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display font-semibold text-lg text-white">Navigation</span>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white cursor-pointer flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 space-y-6 overflow-x-hidden p-1">
            {children}
          </main>
        </div>
      </div>
      <CopilotChat />
    </div>
  )
}
