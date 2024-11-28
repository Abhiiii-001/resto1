import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: '#cccccc',
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-gray': 'rgba(207, 210, 198, 1)',
      },
      backgroundImage: {
        'my_bg_image' : "url('../public/Full-background.png')",
      },
      fontFamily: {
        'clash': ['Clash Display', 'sans-serif'],
      },
    },
  },
  plugins: [
      require("tailwindcss-animate"),
      
],

} satisfies Config;
