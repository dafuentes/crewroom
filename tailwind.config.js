module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors:{
            mc: "#F9CC46",
        },
    },
},
  variants: {
    extend: {},
  },
  plugins: [],
}
