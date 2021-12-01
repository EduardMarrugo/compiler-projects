module.exports = {
  publicPath :  process.env.NODE_ENV === 'production'
  ? '/compiler-projects/': '/',
  transpileDependencies: [
    'vuetify'
  ],
}