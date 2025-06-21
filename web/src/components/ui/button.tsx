import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer disabled:cursor-default disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-base hover:not-disabled:bg-blue-dark text-white text-base min-h-12 rounded-lg w-full px-5',
        secondary:
          'w-fit text-gray-500 bg-gray-200 text-sm-sb rounded-sm min-h-8 px-2 border border-gray-200 hover:not-disabled:border-blue-base [&_svg]:text-gray-600 [&_svg]:size-4',
        icon: 'w-fit size-8 rounded-sm bg-gray-200 border border-gray-200 hover:not-disabled:border-blue-base [&_svg]:text-gray-600 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
