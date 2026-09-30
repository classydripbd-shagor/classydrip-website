/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
        'soft': '0 8px 30px rgba(0,0,0,0.06)',
        'luxury': '0 20px 40px -15px rgba(0,0,0,0.14)',
        'glow': '0 0 25px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
