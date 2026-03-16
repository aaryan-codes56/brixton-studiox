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
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
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
