/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				modak: ["Modak", "cursive"],
				moonrocks: ["Rubik Moonrocks", "cursive"],
				monoton: ["Monoton", "cursive"],
				poppins: ["Poppins", "sans-serif"],
			},
			screens: {
				'lg': '960px',
			},
		},
	},
	plugins: [],
};
