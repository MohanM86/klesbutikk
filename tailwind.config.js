/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#ffffff',
        charcoal: '#1a1a1a',
        slate: '#555555',
        muted: '#8a8a8a',
        border: '#eeeeee',
        'border-dark': '#dddddd',
        accent: '#FF6900',
        'accent-hover': '#e55f00',
        'accent-light': '#FFF4ED',
        surface: '#f9f9f9',
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'hero-sm': ['2.25rem', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: { '18': '4.5rem', '22': '5.5rem' },
      maxWidth: { '8xl': '88rem' },
      borderRadius: {
        DEFAULT: '8px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};
