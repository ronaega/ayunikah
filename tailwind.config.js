/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fef7f6',
          100: '#fdedeb',
          200: '#fad6d0', // Blush Pink
          300: '#f4aba0',
          400: '#ea7868',
          500: '#dc4e3c',
          600: '#c53828',
          700: '#a52c1e',
          DEFAULT: '#F7D6D0',
        },
        cream: {
          50: '#fffbf7',
          100: '#fff8f1', // Warm Cream
          200: '#ffeedc',
          300: '#ffdcb7',
          400: '#ffc186',
          500: '#ffa156',
          DEFAULT: '#FFF8F1',
        },
        lavender: {
          50: '#f6f3fa',
          100: '#eee7fa',
          200: '#dccfed', // Soft Lavender
          300: '#c3adfa',
          400: '#ab8cfa',
          DEFAULT: '#DCCFED',
        },
        rosegold: {
          50: '#faf5f3',
          200: '#e5d1c9',
          400: '#c79b8b', // Rose Gold
          DEFAULT: '#C79B8B',
        },
        peach: {
          200: '#f6c7b6', // Soft Peach
          DEFAULT: '#F6C7B6',
        },
        elegant: {
          800: '#4b3b39', // Elegant Dark
          900: '#332726',
          DEFAULT: '#4B3B39',
        }
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 5px rgba(247, 214, 208, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(247, 214, 208, 0.8))' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
