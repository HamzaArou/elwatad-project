
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'ibm-arabic': ['"IBM Plex Sans Arabic"', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
      },
      keyframes: {
        "collapsible-down": {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.3s ease-in-out",
        "collapsible-up": "collapsible-up 0.3s ease-in-out",
      },
      colors: {
        gold: "#B69665",
        darkBlue: "#B69665",
        deepBlue: "#2F4447", // Updated to new secondary color
        warmBeige: "#F7E4C8",
        offWhite: "#F5F5F5",
        newsGreen: "#B69665",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#2F4447", // Updated to new secondary color
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'geometric-pattern': "url('/patterns/geometric.svg')",
        'vertical-lines': "url('/patterns/vertical-lines.svg')",
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(182, 150, 101, 0.39)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      addUtilities({
        '.rtl': {
          'direction': 'rtl',
        },
      });
    },
  ],
} satisfies Config;
