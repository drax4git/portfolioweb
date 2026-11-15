/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        retro: {
          white: '#FFFFFF',
          black: '#111111',
          cream: '#F5F2EB',
          lime: '#C5FF4A',
          pink: '#FF789B',
          purple: '#8050F5',
          yellow: '#F5E82D',
          blue: '#1455F5',
          cyan: '#4DEEEA',
          orange: '#FF9F43',
          gray: '#E9E7E0',
          darkgray: '#222222',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['"Archivo Black"', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        plex: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        neo: '4px 4px 0px 0px #111111',
        'neo-sm': '2px 2px 0px 0px #111111',
        'neo-lg': '6px 6px 0px 0px #111111',
        'neo-xl': '8px 8px 0px 0px #111111',
        'neo-hover': '1px 1px 0px 0px #111111',
        'neo-lime': '4px 4px 0px 0px #C5FF4A',
        'neo-pink': '4px 4px 0px 0px #FF789B',
        'neo-purple': '4px 4px 0px 0px #8050F5',
        'neo-yellow': '4px 4px 0px 0px #F5E82D',
      },
      borderWidth: {
        '3': '3px',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(#111111 1px, transparent 1px)",
        'notebook-grid': "linear-gradient(to right, rgba(17,17,17,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.07) 1px, transparent 1px)",
        'pixel-dots': "radial-gradient(#8050F5 1.5px, transparent 1.5px)",
      },
    },
  },
  plugins: [],
};
