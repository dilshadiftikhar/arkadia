import { cn } from '@/lib/utils'

type LogoVariant = 'full' | 'compact' | 'icon'

interface LogoProps {
  variant?: LogoVariant
  className?: string
}

export function Logo({ variant = 'full', className }: LogoProps) {
  if (variant === 'icon') {
    return (
      <span
        className={cn('font-cinzel font-bold text-2xl leading-none', className)}
        style={{
          background: 'linear-gradient(135deg, #e0a478 0%, #a2573a 40%, #743928 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        aria-label="Arkadia"
      >
        A
      </span>
    )
  }

  return (
    <div className={cn('flex flex-col items-start leading-none', className)}>
      {/* Nom principal */}
      <span
        className="font-cinzel font-bold tracking-widest"
        style={{
          fontSize: variant === 'compact' ? '20px' : '24px',
          background: 'linear-gradient(135deg, #e0a478 0%, #a2573a 40%, #743928 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '0.12em',
        }}
      >
        ARKADIA
      </span>

      {/* Tagline — masquée en mode compact */}
      {variant === 'full' && (
        <span
          className="font-cinzel uppercase mt-0.5"
          style={{
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: '#a2573a',
          }}
        >
          Jouer&nbsp;•&nbsp;Trinquer&nbsp;•&nbsp;Revenir
        </span>
      )}
    </div>
  )
}
