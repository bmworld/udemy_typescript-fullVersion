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