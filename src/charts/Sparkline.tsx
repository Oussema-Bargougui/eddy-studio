import { scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'

interface Props {
  values: number[]
  color?: string
  width?: number
  height?: number
  domain?: [number, number]
}

/** A tiny curve that fills its box; the label next to it carries the meaning. */
export function Sparkline({ values, color = 'var(--color-bad)', width = 160, height = 40, domain }: Props) {
  const lo = domain?.[0] ?? Math.min(...values)
  const hi = domain?.[1] ?? Math.max(...values)
  const x = scaleLinear().domain([0, Math.max(1, values.length - 1)]).range([4, width - 4])
  const y = scaleLinear().domain([lo, hi === lo ? lo + 1 : hi]).range([height - 4, 4])
  const d = line<number>().x((_, i) => x(i)).y((v) => y(v))(values) ?? ''
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block h-10 w-full" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
