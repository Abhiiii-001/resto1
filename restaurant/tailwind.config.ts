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
        background: "#f8f9fa",
        foreground: "#1c1c1c",
        primary: {
          DEFAULT: "#fc8019",
          hover: "#e57317"
        },
        success: {
          DEFAULT: "#60b246",
          hover: "#539c3d"
        },
        danger: {
          DEFAULT: "#e23744"
        },
        // Legacy mapping to prevent immediate breaking in untouched files
        rGray: "#f8f9fa",
        rRed: "#fc8019", 
        rYellow: "#FFCA40",
        rGreen: "#60b246"
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.08)',
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
