import Logo from '@/assets/logo.svg'

export function LogoContainer() {
  return (
    <div className="flex items-center justify-center pb-3 md:col-span-2 md:justify-start md:pb-5">
      <img src={Logo} alt="brev.ly" className="w-[96px]" />
    </div>
  )
}
