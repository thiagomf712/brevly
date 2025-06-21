import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/query-client'
import { AppRoutes } from './routes'

export function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </BrowserRouter>

      <Toaster />
    </>
  )
}
