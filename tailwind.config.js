/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Montserratlight: ["Montserrat-light", "sans-serif"],
        Montserratregular: ["Montserrat-regular", "sans-serif"],
        Montserratmedium: ["Montserrat-medium", "sans-serif"],
        Montserratbold: ["Montserrat-bold", "sans-serif"],
        Montserratblack: ["Montserrat-black", "sans-serif"],
      },
      colors: {
        primary: "#2BD17E",
        error: "#EB5757",
        background: "#093545",
        input: "#224957",
        card: "#092C39",
        white: "#FFFFFF",
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
    },
    container: {
      center: true,
    },
  },
  variants: {
    aspectRatio: ['responsive', 'hover']
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};


