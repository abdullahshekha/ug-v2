import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        // Wine-maroon brand scale. brand-700 is the true UG mark colour (#982021);
        // brand-800 is the deepened accent used for CTAs and eyebrows.
        brand: {
          50: "#fbf1f1",
          100: "#f6dede",
          200: "#eec0c0",
          300: "#e19898",
          400: "#d06a6b",
          500: "#b94445",
          600: "#a12f30",
          700: "#982021",
          800: "#7c1d1f",
          900: "#661a1c",
          950: "#3a0f10",
        },
        // Warm plaster / chalk neutrals.
        plaster: {
          50: "#faf7f3",
          100: "#f4ede4",
          200: "#ece2d4",
          300: "#ddcdb8",
          400: "#b9a99c",
          500: "#8a7d70",
          600: "#5c534c",
          700: "#413933",
          800: "#2b2622",
          900: "#241f1c",
          950: "#1c1815",
        },
      },
      borderColor: {
        warm: "rgba(43,38,34,0.10)",
      },
      boxShadow: {
        plaster: "0 10px 26px rgba(43,38,34,0.08)",
        "plaster-lg": "0 22px 48px rgba(43,38,34,0.14)",
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      maxWidth: {
        prose: "68ch",
      },
      animation: {
        marquee: "marquee 34s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
