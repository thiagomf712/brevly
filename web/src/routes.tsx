import { Route, Routes } from 'react-router'
import { NotFoundPage } from './pages/404/page'
import { HomePage } from './pages/Home/page'
import { RedirectPage } from './pages/Redirect/page'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route path=":code" element={<RedirectPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
