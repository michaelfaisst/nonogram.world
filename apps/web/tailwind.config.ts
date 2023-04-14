import baseConfig from "@nw/tailwind-config";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    presents: [baseConfig],
    darkMode: ["class", '[data-theme="dark"]'],
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-montserrat)", ...fontFamily.sans]
            }
        }
    },
    plugins: [require("tailwindcss-animate")]
} satisfies Config;
