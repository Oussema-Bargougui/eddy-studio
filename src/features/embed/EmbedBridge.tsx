import { useQueryClient } from '@tanstack/react-query'
import { useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { allowedOrigins, MESSAGE, readSession, reportablePath, studioLanguage } from './protocol'
import { embed, useEmbed } from './session'

/**
 * Talks to EduCap when Eddy Studio is embedded: says it is ready, takes the
 * session from an allowed origin only, and reports every page change so the
 * EduCap address (refresh, back, shared links) follows.
 */
export function EmbedBridge() {
  const embedded = useEmbed((s) => s.embedded)
  const hostOrigin = useEmbed((s) => s.hostOrigin)
  const queryClient = useQueryClient()
  const { i18n } = useTranslation()
  const location = useRouterState({ select: (s) => s.location })

  useEffect(() => {
    if (!embedded || window.parent === window) return
    const origins = allowedOrigins()
    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent || !origins.includes(event.origin)) return
      const session = readSession(event.data)
      if (!session) return
      const previous = embed.get().session?.token
      embed.setSession(session, event.origin)
      void i18n.changeLanguage(studioLanguage(session.locale))
      // A new token (school or year switched): everything is read again.
      if (previous && previous !== session.token) void queryClient.invalidateQueries()
    }
    window.addEventListener('message', onMessage)
    // "Ready" carries nothing secret; only the right EduCap origin will receive it.
    origins.forEach((origin) => window.parent.postMessage({ type: MESSAGE.ready }, origin))
    return () => window.removeEventListener('message', onMessage)
  }, [embedded, i18n, queryClient])

  useEffect(() => {
    if (!embedded || !hostOrigin) return
    const path = reportablePath(location.pathname, location.searchStr)
    window.parent.postMessage({ type: MESSAGE.navigate, path }, hostOrigin)
  }, [embedded, hostOrigin, location.pathname, location.searchStr])

  return null
}
