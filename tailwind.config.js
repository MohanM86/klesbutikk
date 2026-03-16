/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#ffffff',
        charcoal: '#111111',
        slate: '#444444',
        muted: '#7a7a7a',
        border: '#e8e8e8',
        'border-dark': '#d0d0d0',
        accent: '#FF6900',
        'accent-hover': '#e55f00',
        'accent-light': '#FFF6F0',
        'accent-glow': '#FFF0E0',
        surface: '#F7F7F5',
      },
      fontSize: {
        'hero': ['3.25rem', { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '400' }],
        'hero-sm': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
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
