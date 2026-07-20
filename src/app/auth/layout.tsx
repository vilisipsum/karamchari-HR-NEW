import { LogoHorizontal } from '@/components/brand/LogoHorizontal'
import { CinematicBackground } from '@/components/ui/CinematicBackground'
import { CustomCursor } from '@/components/ui/CustomCursor'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#050505] text-white selection:bg-[#00C6FF]/30 selection:text-white overflow-hidden">
      <CustomCursor />
      <CinematicBackground />

      <div className="relative z-10 glass-panel p-8 md:p-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#0A0A0B]/80 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
        <div className="text-center mb-8 flex justify-center">
          <LogoHorizontal size="md" showTagline={false} />
        </div>
        {children}
      </div>
    </div>
  )
}
