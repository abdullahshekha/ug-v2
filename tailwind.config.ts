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
        // Fixed 4-colour brand system. Exactly these four hex values are used
        // anywhere in the UI: red (accents/CTAs), grey (text/dark UI), white
        // (backgrounds/text-on-dark) and mist (page/alt-section background).
        // No tint scales, no other shades.
        red: "#90192c",
        grey: "#414141",
        mist: "#faf7f3",
      },
      borderColor: {
        // The one sanctioned exception to the flat-4-colour rule: hairline
        // borders/dividers use grey at 10% opacity.
        warm: "rgba(65,65,65,0.10)",
      },
      boxShadow: {
        plaster: "0 10px 26px rgba(65,65,65,0.08)",
        "plaster-lg": "0 22px 48px rgba(65,65,65,0.14)",
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
