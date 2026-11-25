import NumberFlow from '@number-flow/react'
import { useEffect, useState } from 'react'

interface Props {
  value: number
  digits?: number
  /** Milliseconds before counting starts, to stagger a row of figures. */
  delay?: number
  locale?: string
  className?: string
}

/**
 * Counts from 0 to the real value once mounted, then rolls only the digits that
 * change when the value updates. NumberFlow honours "reduce motion".
 */
export function AnimatedNumber({ value, digits = 0, delay = 0, locale = 'fr-FR', className }: Props) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setShown(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <NumberFlow
      className={className}
      value={shown}
      locales={locale}
      format={{ minimumFractionDigits: digits, maximumFractionDigits: digits }}
      transformTiming={{ duration: 1400, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
      spinTiming={{ duration: 1400, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
      aria-label={value.toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits })}
    />
  )
}
