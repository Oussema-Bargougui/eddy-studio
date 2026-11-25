import { createFileRoute } from '@tanstack/react-router'
import { BriefingPage } from '@/features/briefing/BriefingPage'

export const Route = createFileRoute('/_app/')({
  component: BriefingPage,
})
