/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Colores principales: Blanco, Vino, Amarillo tenue
        primary: '#FFFFFF',      // Blanco principal
        'primary-dark': '#F5F5F5',
        'primary-light': '#FAFAFA',
        secondary: '#722F37',    // Vino secundario
        'secondary-dark': '#5A2328',
        'secondary-light': '#8B3E46',
        accent: '#F5E6D3',       // Amarillo tenue/beige claro (mínimo)
        'accent-light': '#FAF5ED',
        wine: '#722F37',         // Vino (alias para compatibilidad)
        'wine-dark': '#5A2328',
        'wine-light': '#8B3E46',
        dark: '#1a1a1a',         // Fondo oscuro
        'dark-light': '#2d2d2d',
        white: '#FFFFFF',
        'off-white': '#FAFAFA',
        // Colores personalizados originales (mantener compatibilidad)
        customBlue: '#1E3A8A',
        customPink: '#F472B6',
        customGray: '#1E293B',
        customYellow: '#FACC15',
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 10px 20px rgba(0, 0, 0, 0.25)',
        'glow-primary': '0 0 20px rgba(114, 47, 55, 0.4)',
        'glow-wine': '0 0 20px rgba(114, 47, 55, 0.5)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 3s ease infinite',
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
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};