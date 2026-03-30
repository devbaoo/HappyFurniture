/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1320px",
      },
      fontFamily: {
        sans: ["'Be Vietnam Pro'", "'Avenir Next'", "'Montserrat'", "sans-serif"],
        heading: ["'Playfair Display'", "'Cormorant Garamond'", "serif"],
        catalog: ["'Be Vietnam Pro'", "'Avenir Next'", "'Montserrat'", "sans-serif"],
      },
      colors: {
        primary: "#1a1a1a",
        secondary: "#4a4a4a",
        muted: "#8a8a8a",
        border: "#d4d4d4",
        surface: "#f5f5f5",
        white: "#ffffff",
        dark: "#111111",
        accent: "#2c2c2c",
        forest: "#2f3e2f",
      },
      spacing: {
        // 8pt scale
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
        5: "40px",
        6: "48px",
        7: "56px",
        8: "64px",
        9: "72px",
        10: "80px",
        11: "88px",
        12: "96px",
      },
      fontSize: {
        xs: ["11px", { lineHeight: "16px", letterSpacing: "0.05em" }],
        sm: ["13px", { lineHeight: "20px", letterSpacing: "0.02em" }],
        base: ["15px", { lineHeight: "24px" }],
        md: ["17px", { lineHeight: "26px" }],
        lg: ["20px", { lineHeight: "28px", letterSpacing: "-0.01em" }],
        xl: ["24px", { lineHeight: "32px", letterSpacing: "-0.02em" }],
        "2xl": ["30px", { lineHeight: "38px", letterSpacing: "-0.02em" }],
        "3xl": ["36px", { lineHeight: "44px", letterSpacing: "-0.03em" }],
        "4xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.04em" }],
        "5xl": ["64px", { lineHeight: "72px", letterSpacing: "-0.05em" }],
      },
      letterSpacing: {
        widest: "0.2em",
        wider: "0.1em",
        wide: "0.05em",
      },
      gridTemplateColumns: {
        12: "repeat(12, minmax(0, 1fr))",
      },
      keyframes: {
        fadeInMenu: {
          "0%": { opacity: "0", transform: "translateX(6px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        fadeInMenu: "fadeInMenu 0.25s ease-out forwards",
      },
      transitionDuration: {
        DEFAULT: "200ms",
        slow: "400ms",
      },
    },
  },
  plugins: [],
};
