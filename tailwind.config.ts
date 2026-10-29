import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { blood: "#d20f2f", ink: "#080808", panel: "#141414" }, fontFamily: { display: ["Impact", "Arial Narrow", "sans-serif"] } } },
  plugins: []
};
export default config;
