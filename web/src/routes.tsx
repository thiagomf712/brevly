import { Route, Routes } from 'react-router'
import { NotFoundPage } from './pages/404/page'
import { HomePage } from './pages/Home/page'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
