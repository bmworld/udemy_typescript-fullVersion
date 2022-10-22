console.log('----- DEVELOPMENT MODE by webpack.config.js ------');
// webpack.config.js

// # webpack의 가장 큰 효과
//  : 수 많은 파일을 bundling => HTTP요청을 줄임을 통해, Application 속도를 향상시킨다.

// # 해당 파일은 webpack이 자동으로 인식해서,  project를 어떻게 동작할지 전달해주는 역할을 한다.
/* # node.js의 export구문을 사용한다.
    사용목적: webpack이 채택할 구성오브(configureation object)가 될 "JS Object"를 "export"
*/

/* # webpack process
    1. 어떤 파일에서 시작하는가. entry poiunt 찾음
    2. entry point 파일의 import를 파악한다.
    2-2. project의 모든 파일을 파악할 때까지 진행한다.
    3. "모든" 파일 내용(contents)을 파악
    4. ts-loader 패키지의 도움을 받아서 그것들을 compile한다.
      ㄴ ! webpack의 기본기능은 bundling이므로,
          ts로 compile하기 위한 정보를 반드시 명시해야 ts compile기능이 작동한다.
    
  
    
    - 참고) webpack을 정확하게 동작시키기위해서, 모든 import에서 모든 ".js확장자를 삭제"
      why? webpack에서는 자동적으로 .js 및 기타 확장자 파일을 찾는다.
       만약 .js확장자를 명시했다면 => webpack이 2중으로 확장자를 검색한다. => 불필요한 로직이 발생하는 것이다.
*/

// # "webpack의 경로설정"을 위해,
//    node.js모듈을 사용하여 절대경로를 지정해준다.

// # __dirname: path 모듈의 특수상수
const path = require('path');


module.exports = {
  mode: 'development',
  /* # 'development' mode => webpack에게 개발중임을 전달함으로써 webpack-dev-server가 아래와 같이 재구성됨
      1. 최적화를 덜 진행
      2. debugging을 더 쉽게함
      3. 의미있는 Erorr Message 제공
     # 'production' mode
      1. 코드 경량화
      2. publicPath 삭제하기 (webpack-dev-server에게 필요한 내용이기 때문)
  */
  entry: './src/webpackApp.ts', // # 현재 project의 entry파일이다.
  output: { // # 현재 project의 출력물이 write될 정보
    // filename: 'myBundle.[contenthash].js', // 동적인 파르르 추가할 수도 있다.
    filename: 'projectBundle.js', // 동적인 파르르 추가할 수도 있다.
    // # ex. [contenthash]: 모든 빌드에 대한 고유(unique) 캐시를 자동생성 => 브라우저 내에서 caching을 지원한다.
    path: path.resolve(__dirname, 'distByWebpack'),
    // # 두번째 param에 지정된 dist폴더로의 절대경로를 설정하고, webpack은 이를 이용하여 output(bundling결과물)을 write한다.
    // ouput출력물이 빌드될 경로
    // ! Error방지를 위해 "tsconfig.json" 인접 파일 내의 경로와 매칭시킨다.
    // publicPath: "/distByWebpack", // #  "webpack-dev-server"가 패키지를 구동할 때, memory상에 번들링된 파일(ex. projectBundling.js)이 출력된 것이 어디에 쓰여지고, html파일과 비교했을 때 실제로 어디에 있는지 webpack에게 정보를 전달하는 과정
  },
  devtool: 'inline-source-map',
  // # webpack이 생성한 bundling을 추출하고, 정확하게 접속해야하는 '생성된 source-map'이 이미 존재한다는 것을 webpack에게 전달함 (tsconfig.json의 sourceMap: true가 그 증거다)
  // # webpack bundling후, 브라우저의 개발자모드 > webpack폴더 > src폴더에서 ts파일들을 찾을 수 있다.
  //  ㄴ 여기서 break point설정 등의 "debug" 가능 => 이게 source map의 기능이다.
  module:{ // Typescript compile 정보를 전달하기 위해서 module property를 사용한다.
    rules:[ // 여기 모든 파일에 적용될 여러 개의 규칙들을 설정할 수 있다.
      // # loader는 webpack에게 특정 '파일'을 어떻게 다룰지를 전달해주는 package.
      {
        // # webapck에게 이 rule을 적용시킬 파일을 점검하기 위한  "파일 선택조건(test)"을 명시한다.
        test:/\.ts$/, // # test step 1. webpack에게 .ts로 끝나는 파일을 점검하도록한다.
        use: 'ts-loader', // # test step 2. webpack에게 test조건에 부합하는 파일이 ts-loader로 처리하도록 명시함.
        // ! => ts-loader는 자동적으로 tsconfig.json파일을 고려한다.
        //  ㄴ 그래서, 추가적인 명시를 하지 않아도 되는거다.
        exclude: /node_modules/, // webpack에게 node_modules을 찾지 않도록 함.
      }
    ]
  },
  resolve: { // # webpack이 찾아낸 import에 추가할 파일 확장자를 webpack에게 전달한다.
    extensions: ['.ts', '.js'],
    // # extensions step 1. webpack이 .ts 및 .js 확장자 파일을 "찾도록" 명시.
    // # extensions step 2. import하는 이 확장자를 갖는 모든 파일들을 "bundling"
  }


}