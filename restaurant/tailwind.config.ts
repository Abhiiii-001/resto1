import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(#fdfdfd)",
        foreground: "var(#fdfdfd)",
        richWhite: {
          100: "#fefefe",
          200: "#fdfdfd",
          300: "#fbfbfb",
          400: "#fafafa",
          500: "#f9f9f9",
          600: "#c7c7c7",
          700: "#959595",
          800: "#646464",
          900: "#323232",
        },
        richYellow: {
          100: "#fff4d9",
          200: "#ffeab3",
          300: "#ffdf8c",
          400: "#ffd566",
          500: "#ffca40",
          600: "#cca233",
          700: "#997926",
          800: "#66511a",
          900: "#33280d",
        },
        richRed: {
          100: "#f4d0d2",
          200: "#e9a2a5",
          300: "#de7377",
          400: "#d3454a",
          500: "#c8161d",
          600: "#a01217",
          700: "#780d11",
          800: "#50090c",
          900: "#280406",
        },
        rGray: "#F8F8F7",
        rRed: "#C8161D",
        rYellow: "#FFCA40",
        rGreen: "#2B7B3B"
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
