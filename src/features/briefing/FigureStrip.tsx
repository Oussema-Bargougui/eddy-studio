import type { Figure, Tone } from '@/api/types'
import { cn } from '@/lib/cn'
import { AnimatedNumber } from '@/ui/AnimatedNumber'
import { HandNote } from '@/ui/HandNote'

const toneClass: Record<Tone, string> = {
  ok: 'text-ok',
  bad: 'text-bad',
  warn: 'text-warn',
  neutral: 'text-ink-soft',
}

/** The morning figures: editorial numbers separated by hairlines, no boxes. */
export function FigureStrip({ figures }: { figures: Figure[] }) {
  return (
    <section
      aria-label="Chiffres du jour"
      className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-y border-line-strong"
    >
      {figures.map((f, i) => (
        <div key={f.id} className="@container relative flex flex-col gap-1.5 border-r border-line py-[22px] pr-[22px] last:border-r-0">
          <span className="text-xs font-semibold tracking-[0.08em] text-ink-soft uppercase">{f.label}</span>
          <span className="font-display text-[52px] leading-none tracking-[-0.02em] tabular">
            <AnimatedNumber value={f.value} digits={f.digits} delay={120 + i * 140} />
            {f.unit && <span className="text-[26px] text-ink-soft">{f.unit === '%' ? ' %' : f.unit}</span>}
          </span>
          <span className={cn('text-[13px] font-semibold', toneClass[f.tone])}>{f.sub}</span>
          {f.note && (
            // In the corner when the column is wide; under the figure when it is narrow,
            // so it never covers the label.
            <HandNote
              size="sm"
              rotate={4}
              delay={1.6 + i * 0.1}
              className="self-start @min-[250px]:absolute @min-[250px]:top-3.5 @min-[250px]:right-[18px]"
            >
              {f.note}
            </HandNote>
          )}
        </div>
      ))}
    </section>
  )
}
