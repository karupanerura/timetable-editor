const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/index'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
//        options: { appendTsSuffixTo: [/\.vue$/] }
      },
    ]
 
  },
  resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        '~': path.join('./src'),
        '~~': path.join('./src'),
        '@': path.join('./src'),
        '@@': path.join('./src')
      }
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: './public'
  }
};