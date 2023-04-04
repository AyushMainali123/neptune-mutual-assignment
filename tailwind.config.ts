import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
        manrope: ['var(--font-manrope)', ...fontFamily.sans],
      },
      colors: {
        blue: {
          brand: '#444CE7',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
} satisfies Config;
