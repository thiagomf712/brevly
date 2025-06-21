import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type InputProps = ComponentProps<'input'> & {
  prefix?: string
}

function Input({ className, type, prefix, ...props }: InputProps) {
  return (
    <div
      className={cn(
        'group flex min-h-12 w-full items-center rounded-lg border border-gray-300 bg-transparent px-4 transition-all',
        'focus-within:border-blue-base focus-within:ring focus-within:ring-blue-base',
        'data-[invalid=true]:not-focus-within:border-danger data-[invalid=true]:not-focus-within:ring data-[invalid=true]:not-focus-within:ring-danger',
        className
      )}
      data-invalid={props['aria-invalid']}
    >
      {prefix && (
        <span className="pointer-events-none select-none font-normal text-base text-gray-400">
          {prefix}
        </span>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          'h-full w-full bg-transparent p-0 font-normal text-base text-gray-600 outline-none disabled:opacity-50',
          'placeholder:font-normal placeholder:text-base placeholder:text-gray-400',
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
