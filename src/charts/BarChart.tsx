import { scaleBand, scaleLinear } from 'd3-scale'
import { motion } from 'motion/react'
import { useWidth } from './useWidth'

export interface Bar {
  label: string
  value: number
  highlight?: boolean
}

interface Props {
  bars: Bar[]
  height?: number
  ariaLabel: string
  /** Shown above the highlighted bar ("7,9 %"). */
  formatHighlight?: (v: number) => string
}

const PAD = { top: 26, bottom: 26, side: 12 }

/** Plain bars in sand, the one that matters in brand purple. */
export function BarChart({ bars, height = 190, ariaLabel, formatHighlight }: Props) {
  const [ref, width] = useWidth<HTMLDivElement>(360)
  const xs = scaleBand<string>()
    .domain(bars.map((b) => b.label))
    .range([PAD.side, width - PAD.side])
    .padding(0.32)
  const max = Math.max(...bars.map((b) => b.value)) * 1.08
  const ys = scaleLinear().domain([0, max]).range([height - PAD.bottom, PAD.top])
  const base = height - PAD.bottom

  return (
    <div ref={ref} className="w-full">
      <svg width={width} height={height} role="img" aria-label={ariaLabel} className="block font-sans">
        {bars.map((b, i) => {
          const x = xs(b.label) ?? 0
          const top = ys(b.value)
          return (
            <g key={b.label}>
              <motion.rect
                x={x}
                width={xs.bandwidth()}
                rx={6}
                fill={b.highlight ? 'var(--color-brand)' : 'var(--color-line-strong)'}
                initial={{ y: base, height: 0 }}
                animate={{ y: top, height: base - top }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              />
              {b.highlight && formatHighlight && (
                <text x={x + xs.bandwidth() / 2} y={top - 8} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--color-brand)">
                  {formatHighlight(b.value)}
                </text>
              )}
              <text x={x + xs.bandwidth() / 2} y={height - 6} textAnchor="middle" fontSize={11} fill="var(--color-ink-soft)">
                {b.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
