import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        // Arkadia card base — fond brun très sombre, bordure anthracite
        'group/card relative flex flex-col gap-4 overflow-hidden rounded-lg',
        'bg-ink-800 border border-ink-600',
        'transition-all duration-300',
        'hover:border-copper-base hover:shadow-card-hover hover:-translate-y-0.5',
        // Liseré cuivré en haut au hover (pseudo via before — géré en CSS global)
        'before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5',
        'before:bg-copper-gradient before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100',
        'py-4 text-sm text-parchment',
        'data-[size=sm]:gap-3 data-[size=sm]:py-3',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min items-start gap-1 rounded-t-lg px-4',
        'group-data-[size=sm]/card:px-3',
        'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        'has-data-[slot=card-description]:grid-rows-[auto_auto]',
        '[.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-cinzel text-base font-semibold leading-snug text-parchment',
        'group-data-[size=sm]/card:text-sm',
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-parchment-dim', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-4 group-data-[size=sm]/card:px-3', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center rounded-b-lg border-t border-ink-600 bg-ink-900/50 p-4',
        'group-data-[size=sm]/card:p-3',
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
