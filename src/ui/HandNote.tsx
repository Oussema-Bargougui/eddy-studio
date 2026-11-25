import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface Props {
  children: ReactNode
  /** Tilt in degrees; handwritten notes are never perfectly straight. */
  rotate?: number
  delay?: number
  tone?: 'clay' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 'text-[21px]', md: 'text-[26px]', lg: 'text-[30px]' }
const tones = { clay: 'text-clay', gold: 'text-gold' }

/** Eddy's voice in the margin: a short handwritten note, computed from the data. */
export function HandNote({ children, rotate = -3, delay = 1.5, tone = 'clay', size = 'md', className }: Props) {
  return (
    <motion.span
      className={cn('inline-block font-hand font-bold leading-none', sizes[size], tones[tone], className)}
      style={{ rotate }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.span>
  )
}
