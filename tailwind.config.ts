import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#010714",
          surface: "#080f1e",
          elevated: "#0f1a2e",
          card: "#0d1524",
        },
        accent: {
          DEFAULT: "#3b7cf4",
          dark: "#2563eb",
          glow: "rgba(59,124,244,0.25)",
        },
        gold: {
          DEFAULT: "#e4a628",
          dim: "rgba(228,166,40,0.15)",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          bright: "rgba(255,255,255,0.15)",
        },
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(59,124,244,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,124,244,0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,124,244,0.25), transparent)",
      },
      backgroundSize: {
        "grid-sm": "40px 40px",
        "grid-md": "60px 60px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "gradient": "gradientShift 8s ease infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
        "border-glow": "borderGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        borderGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(59,124,244,0.3), inset 0 0 15px rgba(59,124,244,0.05)" },
          "50%": { boxShadow: "0 0 30px rgba(59,124,244,0.5), inset 0 0 20px rgba(59,124,244,0.1)" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(59,124,244,0.2)",
        "glow-md": "0 0 40px rgba(59,124,244,0.25)",
        "glow-lg": "0 0 80px rgba(59,124,244,0.3)",
        "gold-glow": "0 0 30px rgba(228,166,40,0.2)",
        "card": "0 4px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
