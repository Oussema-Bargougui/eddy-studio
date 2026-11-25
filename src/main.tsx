import '@fontsource-variable/fraunces'
import '@fontsource-variable/inter'
import '@fontsource/caveat/500.css'
import '@fontsource/caveat/700.css'
import './styles/index.css'
import './i18n'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from './app/providers'
import { createQueryClient } from './app/queryClient'
import { createAppRouter } from './app/router'

const queryClient = createQueryClient()
const router = createAppRouter(queryClient)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers queryClient={queryClient}>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
)
