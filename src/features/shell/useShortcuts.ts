import { useEffect } from 'react'
import { ui } from './uiStore'

/** Ctrl/⌘+K opens the command bar, Ctrl/⌘+J opens Eddy. */
export function useShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return
      const key = e.key.toLowerCase()
      if (key === 'k') {
        e.preventDefault()
        ui.toggleCommand()
      } else if (key === 'j') {
        e.preventDefault()
        ui.openEddy()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
