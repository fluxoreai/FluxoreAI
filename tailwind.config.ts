import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', ...defaultTheme.fontFamily.mono],
        outfit: ['var(--font-outfit)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          black: '#0A0A0A',
          yellow: '#FACC15',
        },
        surface: {
          gray: '#1A1A1A',
        },
        accent: {
          gold: '#A1820A',
        },
        text: {
          white: '#FAFAFA',
        },
      },
      backgroundImage: {
        'gradient-mesh': `
          radial-gradient(circle at 100% 0%, rgba(250, 204, 21, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 0% 100%, rgba(250, 204, 21, 0.08) 0%, transparent 50%)
        `,
      },
    },
  },
  plugins: [],
}

export default config
