/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-libre-baskerville)", "Georgia", "serif"],
      },
      colors: {
        lmhy: {
          sand: "#E8DCC4",
          coral: "#E85D4C",
          sage: "#5C7A6B",
          charcoal: "#1A2332",
          gold: "#C4A962",
          cream: "#FAF7F2",
          "coral-dark": "#C94A3A",
          "charcoal-light": "#2A3548",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      backgroundImage: {
        "desert-gradient":
          "linear-gradient(135deg, #1A2332 0%, #2A3548 40%, #5C7A6B 100%)",
        "sunset-glow":
          "radial-gradient(ellipse at 70% 20%, rgba(232, 93, 76, 0.25) 0%, transparent 55%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
