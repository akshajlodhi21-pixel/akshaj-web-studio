import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#030306",
          900: "#08080E",
          850: "#0E0E18",
          800: "#131422",
          750: "#181A2C",
          700: "#1E2036",
          600: "#2B2E4A",
        },
        gold: {
          50: "#FFFEEB",
          100: "#FFF9C4",
          200: "#FFF28F",
          300: "#FFE659",
          400: "#F5CE26",
          500: "#D4AF37", // Primary luxury gold
          600: "#B88E1F",
          700: "#916A14",
          800: "#6B4B0D",
          900: "#493108",
          accent: "#E6C658",
          light: "#FBF2C0",
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFE659 0%, #D4AF37 50%, #916A14 100%)",
        "gold-gradient-soft": "linear-gradient(135deg, #FEF9C3 0%, #D4AF37 100%)",
        "dark-radial": "radial-gradient(circle at center, #151628 0%, #050508 100%)",
        "glow-card": "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.15), transparent 70%)",
      },
      boxShadow: {
        "gold-sm": "0 2px 10px -2px rgba(212, 175, 55, 0.2)",
        "gold-md": "0 4px 20px -2px rgba(212, 175, 55, 0.3)",
        "gold-lg": "0 10px 30px -4px rgba(212, 175, 55, 0.4)",
        "gold-glow": "0 0 25px rgba(212, 175, 55, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
