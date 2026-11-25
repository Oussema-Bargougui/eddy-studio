import { getRouteApi } from '@tanstack/react-router'
import { ScenarioPage } from './ScenarioPage'

const route = getRouteApi('/scenario/$scenarioId')

export function ScenarioRoute() {
  const { scenarioId } = route.useParams()
  return <ScenarioPage key={scenarioId} scenarioId={scenarioId} />
}
