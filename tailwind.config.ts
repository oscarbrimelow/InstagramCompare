import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        card: "0 20px 45px -20px rgba(15, 23, 42, 0.4)"
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #f97316 0%, #ec4899 50%, #6366f1 100%)"
      }
    }
  },
  plugins: []
} satisfies Config;

