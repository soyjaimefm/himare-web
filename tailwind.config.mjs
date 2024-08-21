/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        himareDarkGray: '#888e92',
        himareDarkBlue: '#43525d',
        himareSoftBlue: '#80929f',
        himareSoftGray: '#c5cdd1',
        himareWhite: '#ffffff',
        backgroundHimare: {
          '50': '#f1faf9',
          '100': '#dbf1f2',
          '200': '#b4e2e4', /** this */
          '300': '#8bd1d5',
          '400': '#55b4bb',
          '500': '#3998a1',
          '600': '#327c88',
          '700': '#2e6670',
          '800': '#2d555d',
          '900': '#294750',
          '950': '#172f35',
        },
        accent: {
          '50': '#f9f6f3',
          '100': '#f0ece4',
          '200': '#e0d6c8',
          '300': '#cbb9a2', /** this */
          '400': '#b79c80',
          '500': '#a98566',
          '600': '#9b745b',
          '700': '#815f4d',
          '800': '#6a4e42',
          '900': '#564138',
          '950': '#2e211c',
        },
      },
      fontFamily: {
        theSeasons: 'TheSeasons',
      }

    },
  },
  plugins: [],
}
