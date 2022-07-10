module.exports = {
  content: [
    "../public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "moderate-blue" : 'hsl(238, 40%, 52%)',
        "dark-blue": "hsl(212, 24%, 26%)",
        "greyish-blue": "hsl(211, 10%, 45%)",
        "light-grayish-blue": "hsl(239, 57%, 85%)",

        "soft-red": "hsl(358, 79%, 66%)",
        "pale-red": "hsl(357, 100%, 86%)",

        "light-gray": "hsl(223, 19%, 93%)",
        "very-light-gray": "hsl(228, 33%, 97%)"
      },
    },
  },
  plugins: [],
}
