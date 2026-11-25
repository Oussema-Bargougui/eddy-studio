import { createContext } from 'react'
import type { DataSource } from './source'

export const DataSourceContext = createContext<DataSource | null>(null)
