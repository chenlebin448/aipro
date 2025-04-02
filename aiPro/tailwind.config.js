/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 }
        },
        'bounce-1': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'bounce-2': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'bounce-1': 'bounce-1 2s ease-in-out infinite',
        'bounce-2': 'bounce-2 2s ease-in-out infinite 0.3s'
      }
    },
  },
  plugins: [],
}