import { motion } from 'motion/react'

interface Props {
  d: string
  delay?: number
  duration?: number
  color?: string
  width?: number
}

/** An SVG stroke that draws itself, like a pen: arrows, underlines, circles. */
export function InkPath({ d, delay = 1.7, duration = 1.1, color = 'var(--color-clay)', width = 2.2 }: Props) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay, duration, ease: 'easeOut' }}
    />
  )
}
