    /** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#6b21a8',       // Purple
          secondary: '#4c1d95',     // Deep purple
          accent: '#8b5cf6',        // Light purple
          neutral: '#1e1b4b',       // Dark indigo
          'base-100': '#10002b',    // Very dark purple
          'base-200': '#240046',    // Slightly lighter dark purple
          'base-300': '#3c096c',    // Medium dark purple
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          mono: ['Fira Code', 'monospace'],
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'space': "url('/src/assets/space-bg.jpg')",
        }
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          mytheme: {
            "primary": "#6b21a8",
            "secondary": "#4c1d95",
            "accent": "#8b5cf6",
            "neutral": "#1e1b4b",
            "base-100": "#10002b",
            "base-200": "#240046",
            "base-300": "#3c096c",
          },
        },
      ],
    },
  }