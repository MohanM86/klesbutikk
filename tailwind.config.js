/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Zalando Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        body: ['"Zalando Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        cream: '#FFFFFF',
        charcoal: '#1A1A1A',
        slate: '#6D6D6D',
        muted: '#8A8A8A',
        border: '#E0E0E0',
        'border-dark': '#BEBEBE',
        accent: '#FF6900',
        'accent-hover': '#E55D00',
        'accent-light': '#FFF3EB',
        'accent-glow': 'rgba(255,105,0,0.06)',
        surface: '#FFFFFF',
        'surface-alt': '#F5F5F5',
        'warm-100': '#FAFAFA',
        'warm-200': '#F0F0F0',
      },
      fontSize: {
        'hero': ['3.25rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'hero-sm': ['2.25rem', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display': ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['1.375rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: { '18': '4.5rem', '22': '5.5rem' },
      maxWidth: { '8xl': '80rem' },
      borderRadius: {
        DEFAULT: '4px',
        'sm': '3px',
        'md': '4px',
        'lg': '8px',
        'xl': '8px',
        '2xl': '8px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};
