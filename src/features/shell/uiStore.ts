import { useSyncExternalStore } from 'react'

/** The two global layers: Eddy and the command bar. Tiny on purpose. */
interface UiState {
  eddyOpen: boolean
  /** Question to ask as soon as Eddy opens ("Pourquoi ?" buttons). */
  eddyQuestion: string | null
  commandOpen: boolean
}

let state: UiState = { eddyOpen: false, eddyQuestion: null, commandOpen: false }
const listeners = new Set<() => void>()

function set(patch: Partial<UiState>) {
  state = { ...state, ...patch }
  listeners.forEach((l) => l())
}

export const ui = {
  openEddy: (question?: string) => set({ eddyOpen: true, eddyQuestion: question ?? null, commandOpen: false }),
  closeEddy: () => set({ eddyOpen: false, eddyQuestion: null }),
  consumeQuestion: () => set({ eddyQuestion: null }),
  setCommandOpen: (commandOpen: boolean) => set({ commandOpen }),
  toggleCommand: () => set({ commandOpen: !state.commandOpen }),
  reset: () => set({ eddyOpen: false, eddyQuestion: null, commandOpen: false }),
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useUi<T>(select: (s: UiState) => T): T {
  return useSyncExternalStore(subscribe, () => select(state), () => select(state))
}
