/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'task-pop-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '40%': { transform: 'scale(1.1)', opacity: '0.8' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'task-pop-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '40%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(0)', opacity: '0' }
        }
      },
      animation: {
        'task-pop-in': 'task-pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'task-pop-out': 'task-pop-out 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
      }
    },
  },
  plugins: [],
}
