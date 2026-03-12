/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // CRITICAL: This allows Tailwind to see your classes
  ],
  theme: {
    extend: {
      colors: {
        // Defining custom reds ensures consistency for the "Exemplary" rubric
        cryptoRed: {
          light: '#ef4444',
          DEFAULT: '#b91c1c',
          dark: '#7f1d1d',
        }
      }
    },
  },
  plugins: [],
}