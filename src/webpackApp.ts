import _ from "lodash";
import { Product } from "./3rdPartyLibs/product.model";
// @ts-ignore
// import "reflect-metadata"; // ! 해당 패키지는 ERROR발생함
// import { plainToClass } from "class-transformer"; // ! 해당 패키지는 ERROR발생함
// CLASS의 model변환을 더 쉽게 해주는 3rd party library
// import {isNotEmpty} from "class-validator"; // ! 해당 패키지는 ERROR발생함

console.log(
  "-------------------------- appWithWebpack.ts --------------------------"
);
console.log(
  "webpack-dev-server에서, bundling된 js파일은, 컴퓨터의 MEMEORY에서만 생성된다."
);

/*
 # 3rd Party Library
  TS에서 라이브러리를 사용할 때는 @types의 도움을 받는다.
  항상 @types/[packageNAme] 패키지 이름이 오는 방식인 이 패키지들은
  라이브러리 이름가 types의 이름을 입력해서 검색할 수 있다.
  ex. jqeury => 검색어 "jqeury types"
*/
console.log("--- library > lodash : ", _.shuffle([1, 2, 34, 5]));

//----------------------------------------------------------------
//----------------------------------------------------------------

/* # "외부 변수" 사용법 => TS는 모르지만, 개발자는 그 존재를 아는 패키지 or 전역변수
    : declare 명령어
    1. 특정한 문자열 또는 그 외의 어떤 것이든 선언할 수 있다.
    2. TS에게 declare로 선언된 변수는 존재할 것이라는 의미를 전달해주는 거다.
    
* */

declare const GLOBAL: string;
console.log("declare 명령어로 선언된 변수 GLOBAL: ", GLOBAL);

// ----------------------------------------------------------------

console.log("--- library >  reflect-metadata --- ");
const DUMMY_product = [
  { title: "A Carpet", price: 20.99 },
  { title: "A Book", price: 11.99 },
];

// # No Library Ver.
const loadedProducts = DUMMY_product.map((prod)=>{
  return new Product(prod.title, prod.price);
})

// # Use Library Ver.
// @see  https://www.npmjs.com/package/class-transformer
// const loadedProducts = plainToClass(Product, DUMMY_product);
// ㄴ plainToClass(클래스, 데이터)

for (const prod of loadedProducts) {
  console.log('=> ',prod.getInformation());
}


// console.log(isNotEmpty())