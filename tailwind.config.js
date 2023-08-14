/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,jsx,js,ts}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1.5rem',
        lg: '3rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      white: '#fff',
      light: '#f6f6f9',
      primary: { DEFAULT: '#1976d2', hovered:"#166cc1", light: '#CFE8FF' },
      grey: { DEFAULT: '#eee', dark: '#AAAAAA', transparent:'rgba(0,0,0,0.5)' },
      dark: '#363949',
      danger: { DEFAULT: '#D32F2F', light: '#FECDD3' },
      warning: { DEFAULT: '#FBC02D', light: '#FFF2C6' },
      success: { DEFAULT: '#388E3C', light: '#BBF7D0' },
      red:'red',
      transparent: 'transparent',
    },
    extend: {
      boxShadow: {
        primary: '0px 4px 40px rgba(0,0,0,0.02)',
      },
    },
  },
  plugins: [],
};
