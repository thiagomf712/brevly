import { useParams } from 'react-router'
import LogoIcon from '@/assets/icon.svg'
import { NotFoundCard } from '@/components/NotFountCard'

type RedirectParams = {
  code: string
}

export function RedirectPage() {
  const { code } = useParams<RedirectParams>()

  return (
    <div className="flex h-dvh items-center justify-center">
      {code == null ? (
        <NotFoundCard />
      ) : (
        <div className="flex w-full max-w-[580px] flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 px-5 py-12 md:px-12 md:py-16">
          <img src={LogoIcon} alt="brev.ly" className="h-[72px]" />

          <h1 className="text-gray-600 text-xl">Redirecionando...</h1>

          <div className="space-y-1">
            <p className="text-center text-base text-gray-500">
              O link será aberto automaticamente em alguns instantes.
            </p>

            <p className="text-center text-base text-gray-500">
              Não foi redirecionado?{' '}
              <a href={code} className="text-blue-base underline">
                Acesse aqui
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
