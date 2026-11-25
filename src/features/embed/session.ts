import { useSyncExternalStore } from 'react'
import type { EduCapSession } from './protocol'

/**
 * Whether Eddy Studio runs inside EduCap, and the session EduCap handed over.
 * The token lives in memory only: never in storage, never in the address.
 */
interface EmbedState {
  embedded: boolean
  session: EduCapSession | null
  /** The EduCap origin the session came from; navigation is reported there. */
  hostOrigin: string | null
}

function detectEmbedded(): boolean {
  if (typeof window === 'undefined') return false
  const flagged = new URLSearchParams(window.location.search).get('embedded') === '1'
  let framed = false
  try {
    framed = window.self !== window.top
  } catch {
    framed = true // cross-origin parent: we are framed
  }
  return flagged || framed
}

let state: EmbedState = { embedded: detectEmbedded(), session: null, hostOrigin: null }
const listeners = new Set<() => void>()

export const embed = {
  get: () => state,
  setSession(session: EduCapSession, hostOrigin: string) {
    state = { ...state, session, hostOrigin }
    listeners.forEach((l) => l())
  },
  /** For tests. */
  reset(embedded = false) {
    state = { embedded, session: null, hostOrigin: null }
    listeners.forEach((l) => l())
  },
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useEmbed<T>(select: (s: EmbedState) => T): T {
  return useSyncExternalStore(subscribe, () => select(state), () => select(state))
}
