/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        blue01: "#0D1B2F",
        blue02: "#002747",
        yellow01: "#F3CC72",
        yellow02: "#FFE6AB",
      },
      textShadow: {
        glow: "0 0 2px #F3CC72, 0 0 2px #F3CC72, 0 0 2px #F3CC72, 0 0 2px #F3CC72",
      },
      fontFamily: {
        cmu: ["CMU", "serif"],
      },
      backgroundImage: {
        "main-bg": "url('/images/bg.PNG')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-glow": {
          textShadow:
            "0 0 2px #F3CC72, 0 0 4px #F3CC72, 0 0 4px #F3CC72, 0 0 2px #F3CC72",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
