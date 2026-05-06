/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        'primary-dark': '#F4F7FA',
        'primary-light': '#FAFBFD',
        secondary: '#3d6a8c',
        'secondary-dark': '#2e5470',
        'secondary-light': '#5d8aae',
        /** Acentos suaves: azul hielo y gris azulado (mejor para fotos de arte) */
        accent: '#c8dfea',
        'accent-light': '#e8f2f7',
        /** `wine` se mantiene como alias de la marca primaria (ahora azul acero) */
        wine: '#3d6a8c',
        'wine-dark': '#2e5470',
        'wine-light': '#5d8aae',
        dark: '#1a1a1a',
        'dark-light': '#2d2d2d',
        white: '#FFFFFF',
        'off-white': '#F4F7FA',
        parchment: '#eef2f6',
        'museum-parchment': '#eef2f6',
        muse: {
          fg: '#1e293b',
          muted: '#64748b',
          canvas: '#f4f7fa',
          line: '#cbd5e1',
        },
        customBlue: '#1E3A8A',
        customPink: '#F472B6',
        customGray: '#1E293B',
        customYellow: '#FACC15',
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.06)',
        'custom-dark': '0 10px 20px rgba(0, 0, 0, 0.12)',
        'glow-primary': '0 0 20px rgba(61, 106, 140, 0.25)',
        'glow-wine': '0 0 20px rgba(61, 106, 140, 0.3)',
        'glow-gold': '0 0 20px rgba(200, 223, 234, 0.5)',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
      },
      spacing: {
        128: '32rem',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        gradient: 'gradient 3s ease infinite',
        'fade-up': 'fadeUp 0.65s ease forwards',
        'drift-slow': 'drift 22s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-2%, 1%) scale(1.02)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
