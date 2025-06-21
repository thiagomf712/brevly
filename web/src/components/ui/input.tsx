import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full rounded-lg min-h-12 px-4 bg-transparent outline-none disabled:opacity-50',
        'text-base font-normal text-gray-600 placeholder:text-base placeholder:font-normal placeholder:text-gray-400',
        'border border-gray-300 focus-visible:ring focus-visible:ring-blue-base focus-visible:border-blue-base aria-invalid:not-focus-visible:border-danger aria-invalid:not-focus-visible:ring aria-invalid:not-focus-visible:ring-danger',
        className
      )}
      {...props}
    />
  )
}

export { Input }
