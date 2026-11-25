import { scaleLinear, scalePoint } from 'd3-scale'
import { line } from 'd3-shape'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useWidth } from './useWidth'

export interface LineSeries {
  id: string
  name: string
  values: number[]
  color: string
  dashed?: boolean
  area?: boolean
  /** Text drawn after the last point ("7ème B 89,0"). */
  endLabel?: string
  endLabelColor?: string
}

interface Props {
  labels: string[]
  series: LineSeries[]
  domain: [number, number]
  ticks: number[]
  height?: number
  ariaLabel: string
  /** Shaded "normal" band. */
  band?: { from: number; to: number; label: string }
  /** Area under a threshold, tinted red. */
  danger?: { below: number; label: string }
  /** Ring on the last point of the first series. */
  markLast?: boolean
  /** Extra layer drawn in chart coordinates (handwritten notes). */
  overlay?: (geo: { x: (i: number) => number; y: (v: number) => number; width: number }) => ReactNode
}

const PAD = { top: 16, right: 16, bottom: 30, left: 40 }

export function LineChart({ labels, series, domain, ticks, height = 270, ariaLabel, band, danger, markLast, overlay }: Props) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const endRoom = series.some((s) => s.endLabel) ? 96 : 0
  const xs = scalePoint<number>()
    .domain(labels.map((_, i) => i))
    .range([PAD.left, width - PAD.right - endRoom])
  const ys = scaleLinear().domain(domain).range([height - PAD.bottom, PAD.top])
  const x = (i: number) => xs(i) ?? PAD.left
  const y = (v: number) => ys(v)
  const path = line<number>().x((_, i) => x(i)).y((v) => y(v))
  const left = PAD.left
  const right = width - PAD.right - endRoom
  const bottom = height - PAD.bottom

  return (
    <div ref={ref} className="w-full">
      <svg width={width} height={height} role="img" aria-label={ariaLabel} className="block overflow-visible font-sans">
        {band && (
          <g>
            <rect x={left} width={right - left} y={y(band.to)} height={y(band.from) - y(band.to)} fill="var(--color-sand)" />
            <text x={right - 4} y={y(band.to) + 15} textAnchor="end" fontSize={11} fill="var(--color-ink-soft)">
              {band.label}
            </text>
          </g>
        )}
        {danger && (
          <g>
            <rect x={left} width={right - left} y={y(danger.below)} height={bottom - y(danger.below)} fill="var(--color-bad-soft)" />
            <text x={left + 8} y={bottom - 8} fontSize={11} fontWeight={600} fill="var(--color-bad-deep)">
              {danger.label}
            </text>
          </g>
        )}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke="var(--color-line)" />
            <text x={left - 10} y={y(t) + 4} textAnchor="end" fontSize={11} fill="var(--color-ink-soft)">
              {t}
            </text>
          </g>
        ))}
        {labels.map((l, i) =>
          i % Math.ceil(labels.length / 6) === 0 || i === labels.length - 1 ? (
            <text key={l} x={x(i)} y={height - 8} textAnchor="middle" fontSize={11} fill="var(--color-ink-soft)">
              {l}
            </text>
          ) : null,
        )}
        {series.map((s) => {
          const d = path(s.values) ?? ''
          const lastY = y(s.values[s.values.length - 1] ?? domain[0])
          return (
            <g key={s.id}>
              {s.area && <path d={`${d}L${right},${bottom}L${left},${bottom}Z`} fill={s.color} fillOpacity={0.07} />}
              {s.dashed ? (
                <path d={d} fill="none" stroke={s.color} strokeWidth={2} strokeDasharray="6 6" />
              ) : (
                <motion.path
                  d={d}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={3}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
                />
              )}
              {s.endLabel && (
                <text x={right + 10} y={lastY + 4} fontSize={13} fontWeight={700} fill={s.endLabelColor ?? s.color}>
                  {s.endLabel}
                </text>
              )}
            </g>
          )
        })}
        {markLast && series[0] && (
          <circle
            cx={x(series[0].values.length - 1)}
            cy={y(series[0].values[series[0].values.length - 1] ?? domain[0])}
            r={7}
            fill="var(--color-paper)"
            stroke={series[0].color}
            strokeWidth={3}
          />
        )}
        {overlay?.({ x, y, width })}
      </svg>
    </div>
  )
}
