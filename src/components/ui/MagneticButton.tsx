'use client'

import { useRef, useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'glass'
}

export function MagneticButton({ children, className, variant = 'primary', ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    if (!buttonRef.current) return
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const variants = {
    primary: 'bg-white text-black hover:bg-neutral-200',
    secondary: 'bg-transparent border border-white/20 text-white hover:bg-white/10',
    glass: 'glass-panel text-white hover:glass-panel-hover'
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        'relative px-8 py-4 rounded-full font-medium transition-colors duration-300 overflow-hidden group',
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#00C6FF] to-[#0072FF] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      )}
    </motion.button>
  )
}
