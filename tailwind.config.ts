import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kanbanPurpule: "#635FC7",
        kanbanPurpuleHover: "#A8A4FF",
        kanbanBlack: "#000112",
        kanbanDarkGreyBG: "#20212C",
        kanbanDarkGrey: "#2B2C37",
        kanbanGrey: "#3E3F4E",
        kanbanLightGrey: "#828FA3",
        kanbanLightGreyBG: "#F4F7FD", //bg
        kanbanVeryLightGrey: "#E4EBFA",
        kanbanRed: "#EA5555",
        kanbanRedHover: "#FF9898",
        kanbanHover: "#ebf0fb",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
