import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { DataSourceProvider } from '@/api/context'
import { createDemoSource } from '@/api/demo'
import type { DataSource } from '@/api/source'

interface Props {
  children: ReactNode
  queryClient: QueryClient
  source?: DataSource
}

/** Data, cache and motion settings for the whole app. "Reduce motion" is honoured everywhere. */
export function Providers({ children, queryClient, source = createDemoSource() }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataSourceProvider source={source}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </DataSourceProvider>
    </QueryClientProvider>
  )
}
