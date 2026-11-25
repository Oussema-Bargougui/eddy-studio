import { cn } from '@/lib/cn'

export type ButtonVariant = 'ink' | 'brand' | 'outline' | 'soft' | 'night-outline' | 'cream'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  ink: 'bg-ink text-cream hover:bg-[#2a3358]',
  brand: 'bg-brand text-white hover:bg-brand-deep',
  outline: 'border border-line-strong text-ink hover:border-ink hover:bg-paper',
  soft: 'border border-line-strong bg-cream text-ink hover:border-brand hover:bg-brand-soft hover:text-brand',
  'night-outline': 'border border-night-line text-on-night hover:bg-night-soft',
  cream: 'bg-cream text-ink hover:bg-white',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-[13px] rounded-xl',
  md: 'px-4 py-2.5 text-sm rounded-[14px]',
  lg: 'px-6 py-3 text-[15px] rounded-[14px]',
}

/** Class names shared by <button>, router <Link> and <a>, so they look identical. */
export function buttonClass(variant: ButtonVariant = 'ink', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 font-semibold no-underline transition-colors duration-150 disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )
}
