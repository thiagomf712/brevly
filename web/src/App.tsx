import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/sonner'
import { AppRoutes } from './routes'

export function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      <Toaster />
    </>
  )
}
