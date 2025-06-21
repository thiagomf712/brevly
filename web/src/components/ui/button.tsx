import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap transition-all disabled:cursor-default disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'min-h-12 w-full rounded-lg bg-blue-base px-5 text-base text-white hover:not-disabled:bg-blue-dark',
        secondary:
          'min-h-8 w-fit rounded-sm border border-gray-200 bg-gray-200 px-2 text-gray-500 text-sm-sb hover:not-disabled:border-blue-base [&_svg]:size-4 [&_svg]:text-gray-600',
        icon: 'size-8 rounded-sm border border-gray-200 bg-gray-200 hover:not-disabled:border-blue-base [&_svg]:size-4 [&_svg]:text-gray-600',
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
