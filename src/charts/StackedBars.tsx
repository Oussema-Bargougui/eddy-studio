import { scaleBand, scaleLinear } from 'd3-scale'
import { motion } from 'motion/react'
import { useWidth } from './useWidth'

export interface Stack {
  label: string
  /** Bottom segment. */
  base: number
  /** Top segment, the one that matters. */
  top: number
}

interface Props {
  stacks: Stack[]
  height?: number
  ariaLabel: string
  baseColor?: string
  topColor?: string
}

const PAD = { top: 12, bottom: 26, side: 24 }

/** Two-part bars: e.g. justified (sand) under unjustified (clay). */
export function StackedBars({ stacks, height = 190, ariaLabel, baseColor = 'var(--color-line-strong)', topColor = 'var(--color-clay)' }: Props) {
  const [ref, width] = useWidth<HTMLDivElement>(360)
  const xs = scaleBand<string>()
    .domain(stacks.map((s) => s.label))
    .range([PAD.side, width - PAD.side])
    .padding(0.45)
  const max = Math.max(...stacks.map((s) => s.base + s.top)) * 1.05
  const ys = scaleLinear().domain([0, max]).range([height - PAD.bottom, PAD.top])
  const floor = height - PAD.bottom

  return (
    <div ref={ref} className="w-full">
      <svg width={width} height={height} role="img" aria-label={ariaLabel} className="block font-sans">
        {stacks.map((s, i) => {
          const x = xs(s.label) ?? 0
          const baseTop = ys(s.base)
          const stackTop = ys(s.base + s.top)
          const delay = 0.2 + i * 0.08
          return (
            <g key={s.label}>
              <motion.rect
                x={x}
                width={xs.bandwidth()}
                fill={baseColor}
                initial={{ y: floor, height: 0 }}
                animate={{ y: baseTop, height: floor - baseTop }}
                transition={{ duration: 0.6, delay }}
              />
              <motion.rect
                x={x}
                width={xs.bandwidth()}
                fill={topColor}
                initial={{ y: baseTop, height: 0 }}
                animate={{ y: stackTop, height: baseTop - stackTop }}
                transition={{ duration: 0.5, delay: delay + 0.5 }}
              />
              <text x={x + xs.bandwidth() / 2} y={height - 6} textAnchor="middle" fontSize={11} fill="var(--color-ink-soft)">
                {s.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
