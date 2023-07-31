/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      screens: {
        'custom-md':'970px',
        'm-custom-md':'1300px',
        'custom-lg': '2200px',
      },
      gridTemplateColumns: {
        'column-layout': 'repeat(auto-fit, minmax(320px, 1fr))',
        'column-layout-min': 'repeat(3, 200px)',
      },
      gridTemplateRows: {

        // Complex site-specific row configuration
        'layout': '650px minmax(650px, 1fr)',
      },
      backgroundColor: {
        'custom-blue': 'rgba(9, 9, 121, 0.3)',
        'custom-bg-icon': 'rgba(217, 217, 217, 0.1)',
        'back-bg': 'rgba(215, 215, 215, 0.1)',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(179.94deg, rgba(8, 8, 91, 0.1) -1.39%, rgba(62, 255, 197, 0) 101.2%)',
        'image-bg': "url('/src/assets/second.jpg')",
        // 'neon-img': "url('src/assets/second.jpg')",
        'profile-bg': "url('/src/assets/background-2.jpg')",
      },
      boxShadow: {
        'custom-shadow': '0px 2px 5px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
}

