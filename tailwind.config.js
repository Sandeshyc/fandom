/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./modules/**/*.{js,ts,jsx,tsx}",
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
			colors:{
				primary: '#2D49F3',
				primaryLight: '#2A5CF9',
				secondary: '#FFD700',
				tertiary: '#FF6347',
				quaternary: '#FF4500',
				quinary: '#FF8C00',
				black: '#000000',
				contentColor: '#FFFFFF',			
			},
		},
	},
	plugins: [],
};
