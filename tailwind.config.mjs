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
        pinknivut: "#EB9096",
        bluenivut: "#183F86",
        yellownivut: "#EFD08D",
        greennivut: "#67AB88",
      },
      fontFamily: {
        cmu: ["CMU", "serif"],
        sov: ["SOV", "serif"],
        pk: ["PK", "serif"],
      },
      backgroundImage: {
        "main-bg": "url('/images/bg-nivut.png')",
      },
      textShadow: {
        default: "2px 2px 4px rgba(0, 0, 0, 0.9)", // Customize the shadow here
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)", // Customize the shadow here
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
