import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

type Props = ComponentProps<'article'> & { tone?: 'paper' | 'night' }

/** The paper card of the board: soft radius, hairline shadow, no border. */
export function Card({ tone = 'paper', className, ...rest }: Props) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-[var(--radius-card)]',
        tone === 'paper' ? 'bg-paper shadow-[var(--shadow-card)]' : 'bg-night text-on-night',
        className,
      )}
      {...rest}
    />
  )
}

/** Small grey card title ("Présence de l'école, semaine par semaine"). */
export function CardTitle({ className, children, ...rest }: ComponentProps<'h2'>) {
  return (
    <h2 className={cn('m-0 text-[15px] font-semibold text-ink-soft', className)} {...rest}>
      {children}
    </h2>
  )
}

/** The serif sentence that says what the chart shows. */
export function CardHeadline({ className, ...rest }: ComponentProps<'p'>) {
  return <p className={cn('m-0 font-display text-[26px] leading-tight tracking-[-0.01em]', className)} {...rest} />
}

/** Uppercase eyebrow label. */
export function Eyebrow({ className, ...rest }: ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft', className)}
      {...rest}
    />
  )
}
