import { createFileRoute } from '@tanstack/react-router'
import { CataloguePage } from '@/features/scenarios/catalogue/CataloguePage'

export const Route = createFileRoute('/_app/scenarios/')({
  component: CataloguePage,
})
