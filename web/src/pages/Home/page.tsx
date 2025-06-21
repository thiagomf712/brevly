import { CreateNewLinkForm } from './_components/create-form'
import { LinksList } from './_components/links-list'
import { LogoContainer } from './_components/logo'

export function HomePage() {
  return (
    <div className="mx-auto mt-8 grid max-w-[980px] gap-3 pb-8 md:mt-22 md:grid-cols-[380px_1fr]">
      <LogoContainer />

      <CreateNewLinkForm />

      <LinksList />
    </div>
  )
}
