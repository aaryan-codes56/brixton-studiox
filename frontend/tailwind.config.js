/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: 'var(--bg-void)',
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        card: 'var(--bg-card)',
        'card-hover': 'var(--bg-card-hover)',
        
        border: {
          subtle: 'var(--border-subtle)',
          medium: 'var(--border-medium)',
          strong: 'var(--border-strong)',
        },
        
        accent: {
          violet: 'var(--accent-violet)',
          'violet-light': 'var(--accent-violet-light)',
          gold: 'var(--accent-gold)',
          'gold-light': 'var(--accent-gold-light)',
          ice: 'var(--accent-ice)',
          rose: 'var(--accent-rose)',
        },
        
        text: {
          white: 'var(--text-white)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': ['10px', { lineHeight: '1.25rem' }],
        'sm': ['12px', { lineHeight: '1.25rem' }],
        'base': ['14px', { lineHeight: '1.5rem' }],
        'lg': ['16px', { lineHeight: '1.5rem' }],
        'xl': ['18px', { lineHeight: '1.75rem' }],
        '2xl': ['20px', { lineHeight: '1.75rem' }],
        '3xl': ['24px', { lineHeight: '2rem' }],
        '4xl': ['28px', { lineHeight: '2.25rem' }],
        '5xl': ['36px', { lineHeight: '1' }],
        '6xl': ['48px', { lineHeight: '1' }],
        '7xl': ['56px', { lineHeight: '1' }],
        '8xl': ['72px', { lineHeight: '1' }],
        '9xl': ['90px', { lineHeight: '1' }],
      },
      animation: {
        'orb-flow': 'orb-flow 6s ease-in-out infinite alternate',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'orb-flow': {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-20px) scale(1.05)' }
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.5)', opacity: 0 },
          '100%': { transform: 'scale(1.5)', opacity: 0 }
        }
      }
    },
  },
  plugins: [],
}
