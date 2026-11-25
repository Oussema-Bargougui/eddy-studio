import type { ReactNode } from 'react'
import { DataSourceContext } from './dataSourceContext'
import type { DataSource } from './source'

/** Puts the data source (demo or EduCap) in reach of every screen. */
export function DataSourceProvider({ source, children }: { source: DataSource; children: ReactNode }) {
  return <DataSourceContext value={source}>{children}</DataSourceContext>
}
