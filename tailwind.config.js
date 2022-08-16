module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aura-purple': '#593774',
        'aura-light-green': '#D6F8DB',
        'aura-pink': '#FCD1E0',
        'aura-green': '#72CA95'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#593774', //purple
          secondary: '#d6f8db', //light-green
          accent: '#d6f8db',//light-green
          neutral: '#fcd1e0',//pink
          "base-100": '#ffffff',//bg: white
          "base-200": '#d6f8db',//table headers: light-green
          "base-300": '#d6f8db',//row hover color: light-green
          "base-content": '#F8C3B8'//light-green
        },
      },
    ],
  }
}
