export const colors = {
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
  text: {
    primary:   '#f5f0e8',
    secondary: '#c8bfb0',
    muted:     '#8c8c8d',
    copper:    '#e0a478',
  },
} as const

export const fonts = {
  display: 'Cinzel, serif',
  body:    'Inter, sans-serif',
  accent:  'Crimson Text, serif',
} as const

export const copperGradient =
  'linear-gradient(135deg, #e0a478 0%, #a2573a 40%, #743928 100%)'
