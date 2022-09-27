console.log('-------------------------- unknown-type.ts --------------------------');

/* - unknown TYPE: "any" TYPE과 다름 // 타입스크립트에서 처음사용된 타입 => 사용자가 어떤 타입을 입력할지 모를 때 사용
    - 특징: Error없이 어떠한 TYPE도 할당할 수 있다.
    - 특징: any타입은 모든 타입checking을 disabled / but unknown type은 do type checking
    - => 결론: any TYPE보다 unknown TYPE이 낫다 (why? type checking을 실시해주므로 any보다 제한적으로 타입을 할당하여, 코드의 명확성을 높여준다)
*/



let userInput: unknown;
let userName: string;

userInput= 5;  // unknown타입=> 어떤 타입이든 할당할 수 있다.
userInput= 'bmworld'; // unknown타입=> 어떤 타입이든 할당할 수 있다.

// ERROR CASE: unknown 타입은 type checking을 실시함
// => ERROR발생: Type 'unknown' is not assignable to type 'string'
// userName = userInput;

// 해결방법: unknown TYPE의 TYPE CHECKING후에, unknwon TYPE을 할당하도록 함
if (typeof userInput === 'string'){
  userName = userInput;
}

// never TYPE: 함수의 return타입을 정의 / 항상 오류를 출력하거나, 리턴 값을 절대로 내보내지 않음을 의미한다.
// never TYPE을 지정한 변수에 nerver가 아닌 TYPE은 할당할 수 없다.
function gernerateError (message: string, code: number): never { // return value가 없다
  throw {
    message: message, errorCode: code
  }

}

console.log('before Error')
try { // ! throw 다음 코드가 실행되도록 하기 위해서 임의로 try catch를 삽입한 것임
  // insert async & await code
  const result = gernerateError('An error occurred!', 500);
  console.log('RESULT from no return value functions: ',result);
  
  
} catch (err) {
    console.error(err)

}

console.log('after Error')

