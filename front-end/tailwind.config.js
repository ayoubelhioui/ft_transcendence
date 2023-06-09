/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      backgroundColor: {
        'custom-blue': 'rgba(9, 9, 121, 0.3)',
        'custom-bg-icon': 'rgba(217, 217, 217, 0.1)',
        'back-bg': 'rgba(215, 215, 215, 0.1)',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(179.94deg, rgba(8, 8, 91, 0.1) -1.39%, rgba(62, 255, 197, 0) 101.2%)',
        'image-bg': "url('src/assets/4312098.jpg')",
        'profile-bg': "url('src/assets/background-2.jpg')",
        'secondary-gradient': 'linear-gradient(179.94deg, rgba(62, 255, 197, 0.1) -1.39%, rgba(8, 8, 91, 0.28) 101.2%)',
      },
      boxShadow: {
        'custom-shadow': '0px 2px 5px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
}

