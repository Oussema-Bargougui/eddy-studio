import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { ExploreRoute } from '@/features/explore/ExploreRoute'
import { isThemeId } from '@/features/explore/themes'

export const Route = createFileRoute('/_app/explorer/$theme')({
  validateSearch: z.object({ classe: z.string().optional() }),
  beforeLoad: ({ params }) => {
    if (!isThemeId(params.theme)) throw redirect({ to: '/explorer/$theme', params: { theme: 'presence' } })
  },
  component: ExploreRoute,
})
