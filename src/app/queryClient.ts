import { QueryClient } from '@tanstack/react-query'

/** Data read from EduCap stays fresh one minute; no refetch just for focusing the window. */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false } },
  })
}
