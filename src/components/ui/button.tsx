'use client'

import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none active:not-aria-[haspopup]:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        // Arkadia primary — fond cuivre
        default:
          'bg-copper-base text-parchment border border-copper-base hover:bg-copper-dark hover:border-copper-dark hover:shadow-copper-sm',
        // Arkadia outline — contour cuivré
        outline:
          'bg-transparent text-copper-light border border-copper-muted hover:border-copper-base hover:bg-copper-base/10',
        // Arkadia ghost — transparent
        ghost:
          'bg-transparent text-parchment-dim hover:text-parchment hover:bg-ink-700 border border-transparent',
        // Secondaire (shadcn compat)
        secondary:
          'bg-ink-800 text-parchment-dim border border-ink-600 hover:bg-ink-700 hover:text-parchment',
        // Destructif — rouge sombre pour annulations
        destructive:
          'bg-[#7f1d1d]/20 text-[#fca5a5] border border-[#7f1d1d]/40 hover:bg-[#7f1d1d]/30',
        // Link
        link: 'text-copper-light underline-offset-4 hover:underline border-transparent',
      },
      size: {
        default: 'h-10 px-6 py-3',
        xs:      'h-6 px-2 text-xs rounded',
        sm:      'h-8 px-4 text-xs',
        lg:      'h-12 px-8 text-base',
        icon:    'size-10',
        'icon-xs': 'size-6 rounded',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
