/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0e0e0e',
        surface: '#0e0e0e',
        'surface-lowest': '#000000',
        'surface-low': '#131313',
        'surface-container': '#1a1a1a',
        'surface-high': '#20201f',
        'surface-highest': '#262626',
        'surface-bright': '#2c2c2c',
        primary: '#f4ffc6',
        'primary-container': '#d1fc00',
        'primary-dim': '#c7ef00',
        'on-primary': '#546600',
        secondary: '#00e3fd',
        'secondary-container': '#006875',
        error: '#ff7351',
        'on-surface': '#ffffff',
        'on-surface-variant': '#adaaaa',
        outline: '#767575',
        'outline-variant': '#484847',
      },
      borderRadius: {
        xl: '24px',
      },
      fontFamily: {
        'space-grotesk': ['SpaceGrotesk_700Bold'],
        'space-grotesk-semibold': ['SpaceGrotesk_600SemiBold'],
        'space-grotesk-medium': ['SpaceGrotesk_500Medium'],
        inter: ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
      },
    },
  },
  plugins: [],
};
