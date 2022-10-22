// webpack.config.prod.js
console.log('----- PRODUCTION MODE by webpack.config.prod.js ------');
/*
# 'production' mode
  1. 코드 경량화
  2. publicPath 삭제하기 (webpack-dev-server에게 필요한 내용이기 때문)
  3. 'webpack script'를 실행
   ㄴ 생성한 출력을 지역적으로(locally) 실행되는 서버에 임시제공이 X
   ㄴ dis에 작성
  4. devool => none
   ㄴ sourcemap 미생성 (production에서는 debugging 안함)
  5. plugins 추가
*/


// # package.json => "build": "webpack --config webpack.config.prod.js"
//  ㄴ webpack에게 기본적으로 찾는 webpack.config.js 파일 대신에, --config 이하에 명시한 파일을 사용하도록 지시한다.

const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
// # clean-webpack-plugin: webpack에게 프로젝트를 다시 빌드할 때마다,
//  dist폴더를 비우고 다시 빌드함.


module.exports = {
  mode: 'production',
  entry: './src/webpackApp.ts',
  output: {
    filename: 'projectBundle.js',
    path: path.resolve(__dirname, 'distByWebpack'),
    // publicPath: "/distByWebpack",
  },
  devtool: 'none', // sourcemap 미생성 => production에서는 debugging 안 함
  module:{
    rules:[
      {
        test:/\.ts$/,
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