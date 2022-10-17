// # 이번 실습의 핵심: Typescriptd의 "객체지향(OOP)"방식을 이용하여, HTML RENDERING

/* # NAMESPACE VER. */
/*
! namespace내부의 interface는 "동일한 namespace"내부에서만 사용가능하다
! Triple-Slash Directives 슬래시3개(///): 파일간 의존성 선언으로 사용됨 / 트래플 슬레시 참조는 컴파일 process에 추가적인 파일을 포함하도록 compiler에게 지시함. (TYPESCRIPT ONLY 특수코맨트.)

! step 1. namespace export후, reference 경로가 맞지만, tsconfig에 추가적인 작업을 해줘야한다.
 ㄴ why? TS에서는 에러가 안나지만(TS에 어디서 해당 type을 찾아야하는지 알려준것),
 ㄴ Javascript에서 에러발생함. (JS에서 reference 연결이 무너지기 때문)
! step 2. tsconfig.js => 추가 설정필여
 ㄴ a. "outFile": "./dist/bundle.js"
 ㄴ b. "module": "amd"
 => 그 결과.... 모든 파일이 bundle.js파일하나로 합.쳐.진다.
 => index.html에서도.... 경로로 사용하던 js가 아닌... outFile이름인 bundle.js를 import해야한다.
 
/// <reference path="./models/drag-and-drop.ts"/>
/// <reference path="./models/project-model.ts"/>
/// <reference path="./state/project-state.ts"/>
/// <reference path="./util/validation.ts"/>
/// <reference path="./decorator/autobind.ts"/>
/// <reference path="./component/base-component.ts"/>
/// <reference path="./component/project-item.ts"/>
/// <reference path="./component/project-input.ts"/>
/// <reference path="./component/project-list.ts"/>
* */

//----------------------------------------------------------------
/* # IMPORT VER. */
/*
! tsconfig.js => 추가 설정필여
 ㄴ a. "target": "es6" 보다 높아야함.
 ㄴ b. //"outFile": "./dist/bundle.js" => 주석처리
 ㄴ b. "module": "es2015"
 
 ! 주의: import from에서 확장자 .js <---꼭 사용해야함
  ㄴ webpack 등을 사용하지  않으면, browser에서는 확장자없는 js파일을 찾을 수 없어서 404 error
*/

import { ProjectInput } from "./component/project-input.js";
import { ProjectList } from "./component/project-list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
// # 싱글톤으로 프로젝트 상태관리하기
