/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        128: "32rem",
        130: "42rem",
      },
      colors: {
        "-white": "#ffffff",
        "-purple100": "#ede9f2",
        "-purple200": "#ded0f2",
        "-purple300": "#d2bbf2",
        "-purple400": "#ae8fd9",
        "-purple500": "#8e6bbf",
        "-purple600": "#4a1259",
        "-purple700": "#350c40",
        "-purple800": "#200726",
      },
      fontSize: {
        "3.5xl": "2rem",
      },
    },
  },
  plugins: [],
};
