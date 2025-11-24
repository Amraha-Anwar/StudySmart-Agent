import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-dark': '#0A0A0F',
        'neon-cyan': '#00F5FF',
        'neon-purple': '#A966FF',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;