import { clsx, type ClassValue } from 'clsx'

/** Joins class names; falsy values are skipped. */
export function cn(...values: ClassValue[]): string {
  return clsx(values)
}
