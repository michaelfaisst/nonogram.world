const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ["class", '[data-theme="dark"]'],
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-montserrat)", ...fontFamily.sans]
            }
        }
    },
    // @ts-ignore
    plugins: [require("tailwindcss-animate")]
};

module.exports = config;
