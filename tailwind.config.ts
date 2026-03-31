import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // shadcn CSS variables (kept for component compatibility)
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        // ── Arkadia brand tokens ──────────────────────────────
        copper: {
          base:  '#a2573a',
          light: '#e0a478',
          dark:  '#743928',
          deep:  '#763b29',
          muted: '#7c513b',
        },
        forest: {
          base:  '#004225',
          light: '#3e5543',
          deep:  '#062018',
          moss:  '#302f1d',
        },
        ink: {
          950: '#090a0a',
          900: '#111209',
          800: '#1a1209',
          700: '#242118',
          600: '#303031',
          500: '#3f3f3f',
          400: '#8c8c8d',
        },
        parchment: {
          DEFAULT: '#f5f0e8',
          dim:     '#c8bfb0',
          muted:   '#8c8c8d',
        },
      },
      fontFamily: {
        cinzel:  ['var(--font-cinzel)', 'serif'],
        crimson: ['var(--font-crimson)', 'serif'],
        sans:    ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'copper-gradient': 'linear-gradient(135deg, #e0a478 0%, #a2573a 40%, #743928 100%)',
        'hero-vignette':   'radial-gradient(ellipse at center, transparent 40%, #090a0a 100%)',
        'card-shimmer':    'linear-gradient(90deg, transparent 0%, rgba(162,87,58,0.05) 50%, transparent 100%)',
      },
      boxShadow: {
        'copper-glow': '0 0 20px rgba(162, 87, 58, 0.25)',
        'copper-sm':   '0 0 8px rgba(162, 87, 58, 0.15)',
        'card-hover':  '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(162, 87, 58, 0.3)',
        'inset-top':   'inset 0 1px 0 rgba(224, 164, 120, 0.1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        shimmer:           'shimmer 2s infinite',
        'fade-in':         'fadeIn 0.3s ease-out',
        'slide-up':        'slideUp 0.4s ease-out',
        'accordion-down':  'accordion-down 0.2s ease-out',
        'accordion-up':    'accordion-up 0.2s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
