/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0B0A14",
        "bg-surface": "#141428",
        "bg-card": "#1E1B35",
        surface: "#26233F",
        "border-color": "#3B365D",
        primary: "#8B5CF6",
        "primary-hover": "#7C3AED",
        secondary: "#C026D3",
        accent: "#FBBF24",
        success: "#10B981",
        "text-primary": "#F8FAFC",
        "text-secondary": "#9CA3AF",
        "text-muted": "#9CA3AF",
        error: "#EF4444",
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        "glow-slow": "glow 4s ease-in-out infinite alternate",
        blob: "blob 7s infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "gradient": "gradient 8s ease infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.1), 0 0 40px rgba(192, 38, 211, 0.05)" },
          "100%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(192, 38, 211, 0.15)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "0% 50%",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "100% 50%",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      transitionProperty: {
        colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
      },
    },
  },
  plugins: [],
};
