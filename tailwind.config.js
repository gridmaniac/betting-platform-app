module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        luxury: {
          ...require("daisyui/src/colors/themes")["[data-theme=luxury]"],
          "neutral-content": "#f8cb48",
          "base-content": "#f8cb48",
          warning: "#f8cb48",
        },
      },
    ],
  },
};
