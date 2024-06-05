/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./app/**/*.{js,ts,jsx,tsx}",
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	  "./modules/**/*.{js,ts,jsx,tsx}",
	  "!./modules/components/BitMovinPlayer.tsx",
	],
	theme: {
	  extend: {
		fontFamily: {
		  modak: ["Modak", "cursive"],
		  moonrocks: ["Rubik Moonrocks", "cursive"],
		  monoton: ["Monoton", "cursive"],
		  roboto: ["Roboto", "sans-serif"],
		  inter: ["Inter", "sans-serif"],
		  corsiva: ["Corsiva", "sans-serif"],
		},
		screens: {
		  xs: "400px",
		  lg: "960px",
		},
		colors: {
		  primary: "#2D49F3",
		  primaryLight: "#2A5CF9",
		  contentColor: "#FFFFFF",
		},
		animation: {
		  "fade-out": "fadeOut 0.3s ease-in-out",
		  "fade-in": "fadeIn 0.3s ease-in-out",
		  "player-fade-in": "playerFadeIn 1.4s ease-in-out",
		},
		keyframes: {
		  fadeOut: {
			"0%": { opacity: "1" },
			"100%": { opacity: "0" },
		  },
		  fadeIn: {
			"0%": { opacity: "0" },
			"100%": { opacity: "1" },
		  },
		  playerFadeIn: {
			"0%": { opacity: "0" },
			"80%": { opacity: "0" },
			"100%": { opacity: "1" },
		  },
		},
	  },
	},
	plugins: [],
  };
  