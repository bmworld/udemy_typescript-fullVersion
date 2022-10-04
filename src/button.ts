console.log("-------------------------- button.ts --------------------------");
const button = document.querySelector("button")!;
// js가 실행되는 페이지의 dom node에 포인터를 반환하지 못하면 null을 반환한다.
// - 느낌표는, 잠재적인 null객체에 접근하는 것에 대하여, javscript에게 해당 버튼이 반드시 존재한다는 의미를 전달.

button.addEventListener(
  "click",
  clickHandler.bind(null, "a1", "a2", "a3")
);
// clickHandler에 인수를 제공하기 위해서 bind Method를 사용한다.
// bind에 null을 binding할 경우, null Error를 반환한다. 이것을 비활성화하기위하여,
// tsconfig에서 stricBindCallAppy옵션을 false로 설정한다.
/* *Function.bind(thisArg, [arg1, arg2, ...])
- thisArg: this가 가리킬 객체를 지정
- [arg1, arg2,....]: 함수의 인자로 전달할 값

*/

function clickHandler(arg1: string, arg2: string, arg3: string) {
  console.log("clicked! & arg1 :", arg1);
  console.log("clicked! & arg2: ", arg2);
  console.log("clicked! & arg3 :", arg3);
}

/* tsconfig 옵션 중,
  "strictNullChecks": false일 경우,
   null체크 옵션이 비활성화 되므로, 느낌표가 없어도 에러를 발생시키지 않는다.
* */

/* 또는 느낌표 없이, if문을 사용하여 처리할 수 있다.
const button = document.querySelector('button')
if(button) { // null check를 피해가는 방법 // null이 아닌 실제 값이 존재할 경우에 eventListener가 실행되도록 함
  button.addEventListener('click', () => {
    console.log('button click ~!!!');
  });
}
* */




function testHandler (n1: number, n2: number): number {
  if ((n1 + n2) > 0) {
    return n1 + n2;
  } else {
    return n1-n2;
  }
}

console.log(testHandler(1,-199))