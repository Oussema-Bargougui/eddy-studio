import { createFileRoute } from '@tanstack/react-router'
import { ScenarioRoute } from '@/features/scenarios/ScenarioRoute'

export const Route = createFileRoute('/scenario/$scenarioId')({
  component: ScenarioRoute,
})
