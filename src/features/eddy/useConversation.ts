import { useCallback, useState } from 'react'
import { useDataSource } from '@/api/useDataSource'
import type { EddyAnswer } from '@/api/types'

export interface Turn {
  id: number
  question: string
  status: 'thinking' | 'done' | 'failed'
  answer?: EddyAnswer
}

/** The open conversation with Eddy: questions in order, answers as they arrive. */
export function useConversation() {
  const source = useDataSource()
  const [turns, setTurns] = useState<Turn[]>([])

  const ask = useCallback(
    async (question: string) => {
      const text = question.trim()
      if (!text) return
      const id = Date.now()
      setTurns((all) => [...all, { id, question: text, status: 'thinking' }])
      try {
        const answer = await source.askEddy(text)
        setTurns((all) => all.map((t) => (t.id === id ? { ...t, status: 'done', answer } : t)))
      } catch {
        setTurns((all) => all.map((t) => (t.id === id ? { ...t, status: 'failed' } : t)))
      }
    },
    [source],
  )

  const busy = turns.some((t) => t.status === 'thinking')
  return { turns, ask, busy, reset: () => setTurns([]) }
}
