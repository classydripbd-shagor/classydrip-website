/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '380px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        brand: {
          black: '#000000',
          dark: '#0a0a0a',
          charcoal: '#171717',
          grayDark: '#262626',
          muted: '#737373',
          border: '#e5e5e5',
          light: '#f5f5f5',
          white: '#ffffff',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'soft':    '0 8px 30px rgba(0,0,0,0.06)',
        'luxury':  '0 20px 40px -15px rgba(0,0,0,0.14)',
        'glow':    '0 0 25px rgba(0, 0, 0, 0.25)',
        'bottom':  '0 -4px 24px rgba(0,0,0,0.08)',
      },
      transitionDuration: {
        '400': '400ms',
        '800': '800ms',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom, 8px)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': { display: 'none' },
        '.no-scrollbar': { '-ms-overflow-style': 'none', 'scrollbar-width': 'none' },
        '.pb-safe': { paddingBottom: 'max(8px, env(safe-area-inset-bottom))' },
        '.touch-pan-y': { 'touch-action': 'pan-y' },
      });
    }
  ],
}

