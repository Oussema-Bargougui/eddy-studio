import { useLayoutEffect, useRef, useState } from 'react'

/** Width of a container, kept up to date; charts redraw at the real size. */
export function useWidth<T extends HTMLElement>(fallback = 800) {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(fallback)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setWidth(el.getBoundingClientRect().width || fallback)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [fallback])

  return [ref, width] as const
}
