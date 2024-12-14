import colors from "tailwindcss/colors";

import { dynamicTwClasses } from "@horus.dev/tw-dynamic-themes/tailwind";
import tailwindcssReactAriaComponents from "tailwindcss-react-aria-components";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", ".theme-dark"],
  theme: {
    extend: {
      colors: {
        accent: dynamicTwClasses("accent", 175),
        danger: colors.red,
        success: colors.green,
        warning: colors.yellow,
      },
      spacing: {
        "safe-left": "var(--safe-area-inset-left)",
        "safe-right": "var(--safe-area-inset-right)",
        "safe-top": "var(--safe-area-inset-top)",
        "safe-bottom": "var(--safe-area-inset-bottom)",
      },
    },
  },
  plugins: [tailwindcssReactAriaComponents, tailwindcssAnimate],
};
