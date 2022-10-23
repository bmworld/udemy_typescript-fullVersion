// webpack.config.prod.js
console.log('----- webpack.config.google.js ------');

const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: './src/googleMapApp.ts',
  output: {
    filename: 'googleMapBundle.js',
    path: path.resolve(__dirname, 'distByWebpack'),
    // publicPath: "/distByWebpack",
  },
  devtool: 'none', // sourcemap 미생성 => production에서는 debugging 안 함
  module:{
    rules:[
      {
        test:/\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins:[
    new CleanPlugin.CleanWebpackPlugin(),
  ]
}