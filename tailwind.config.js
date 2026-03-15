/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#000000',
        charcoal: '#000000',
        slate: '#333333',
        muted: '#666666',
        border: 'rgba(255,255,255,0.06)',
        'border-dark': 'rgba(255,255,255,0.1)',
        accent: '#ffffff',
        surface: '#0a0a0a',
      },
      fontSize: {
        'hero': ['5.5rem', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'hero-sm': ['3.2rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display': ['2.8rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-sm': ['1.8rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        DEFAULT: '0',
        'none': '0',
        'sm': '0',
        'md': '0',
        'lg': '0',
        'xl': '0',
        'full': '0',
      },
    },
  },
  plugins: [],
};
