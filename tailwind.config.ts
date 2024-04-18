import type { Config } from "tailwindcss";

const config = {
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
      colors: {
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
          DEFAULT: "hsl(var(--secondary))",
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

        based1: "#FFC800",
        based: "#FFC800",
        second: "#FDFDFD",
        third: "#F6F1E9",
        dope:"#08080D",
        // darker: "#2F4858",
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to right bottom, rgba(255, 255, 255, 0.8), rgba(255, 197, 0, 0.8))",
        "second-color":
          "linear-gradient(to left bottom, #FBFADA, rgba(255, 197, 0, 0.8))",
        // "gradient-primary": `linear-gradient(to right, ${theme("colors.pink")}, ${theme("colors.orange")})`,
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        produk: "url('/icon/app.png')",
        produk2: "url('/icon/app1.png')",

        myimage: "url('/image/bg.png')",
        myimage2: "url('/image/bg2.png')",
        product1: "url('/image/product.png')",
        product2: "url('/image/product2.png')",
        myimage3: "url('/image/image4.jpg')",
        myimage5: "url('/image/4.jpg')",
        myimage6: "url('/image/3.jpg')",
        myimage4: "url('/image/bgbg.png')",
        about3: "url('/image/photo.jpg')",
        about4:
          " linear-gradient(to top, #000000, rgba(255, 197, 0, 0.0)), url('/image/app.jpg')",
        darker: "linear-gradient(to bottom, #000000, rgba(255, 197, 0, 0.0))",
        about2: "url('/image/bgabout3.jpg')",

        about:
          " linear-gradient(to top, #000000, rgba(255, 197, 0, 0.0)), url('/image/bgabout.jpg')",
        aboutpro:
          " linear-gradient(to top, #000000, rgba(255, 197, 0, 0.0)), url('/image/aboutPro.jpg')",
        product:
          "linear-gradient(to top, #000000, rgba(255, 197, 0, 0.0)), url('/image/ProductPro.jpg')",
        news: "linear-gradient(to top, #000000, rgba(255, 197, 0, 0.0)), url('/image/news.jpg')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
