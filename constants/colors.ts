export const colors = {
  background: '#0e0e0e',
  surface: '#0e0e0e',
  surfaceLowest: '#000000',
  surfaceLow: '#131313',
  surfaceContainer: '#1a1a1a',
  surfaceHigh: '#20201f',
  surfaceHighest: '#262626',
  surfaceBright: '#2c2c2c',
  primary: '#f4ffc6',
  primaryContainer: '#d1fc00',
  primaryDim: '#c7ef00',
  onPrimary: '#546600',
  secondary: '#00e3fd',
  secondaryContainer: '#006875',
  error: '#ff7351',
  onSurface: '#ffffff',
  onSurfaceVariant: '#adaaaa',
  outline: '#767575',
  outlineVariant: '#484847',
} as const;

export type ColorToken = keyof typeof colors;
