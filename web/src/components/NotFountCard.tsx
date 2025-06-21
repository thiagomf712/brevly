import { Link } from 'react-router'
import Icon404 from '@/assets/404.svg'
import { env } from '@/env'

export function NotFoundCard() {
  return (
    <div className="flex w-full max-w-[580px] flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 px-5 py-12 md:px-12 md:py-16">
      <img src={Icon404} alt="404" className="h-[72px]" />

      <h1 className="text-gray-600 text-xl">Link não encontrado</h1>

      <p className="text-center text-base text-gray-500">
        O link que você está tentando acessar não existe, foi removido ou é uma
        URL inválida. Saiba mais em{' '}
        <Link to={env.VITE_FRONTEND_URL} className="text-blue-base underline">
          brev.ly
        </Link>
        .
      </p>
    </div>
  )
}
