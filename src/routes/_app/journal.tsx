import { createFileRoute } from '@tanstack/react-router'
import { JournalPage } from '@/features/journal/JournalPage'

export const Route = createFileRoute('/_app/journal')({
  component: JournalPage,
})
