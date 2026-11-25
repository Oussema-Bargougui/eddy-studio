import { use } from 'react'
import { DataSourceContext } from './dataSourceContext'
import type { DataSource } from './source'

export function useDataSource(): DataSource {
  const source = use(DataSourceContext)
  if (!source) throw new Error('useDataSource must be used inside <DataSourceProvider>')
  return source
}
