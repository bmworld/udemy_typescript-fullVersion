console.log("--------- generic-basic.ts ---------");

/* # Generics 제네릭 타입
     _ 제네릭 타입은 '다른 타입과 연결되는 종류'이며
      다른 타입이 어떤 타입이어야 하는지에 대해서는 모르는 상태에서, 동적 TYPE을 할당할 수 있다.
       ㄴ저장하는 요소가 문자열 목록, 숫자형 목록, 객체 목록 혼합된 데이터의 목록이든 상관하지 않는다.
     _ 함수일 경우, 함수를 호출하는 순간의 매개변수의 타입을 동적으로 인식하여, 반환되는 값을 타입추론하는 기능을 제공한다 (꿀이다)
     _ Typescript ONLY
     _ 홑화살괄호 내에 배열에 전달되어야 하는 데이터의 타입을 지정.
       ㄴ 보통 제네릭 타입을 하나만 사용한다면 'T' (T, U, V, W ,X .... 이렇게 알파벳 순으로 보통 할당.)
*/
const names: Array<string> = []; // 동일 =>  const names:string[] = [];

// # Ex. Generic Type을 설정함으로써, Promise가  string 타입을 반환할 것이란 정보를 준다
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  });
});

promise.then((data) => {
  const splitedData = data.split(" ");
  // ! 위 타입정의 시, Promise<string> 제네릭타입으로 문자열을 반환한다는 것을 알기에,
  //  split을 사용할 수 있다.
  console.log(splitedData);
});


// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
console.log('# EX. 두 객체를  병합하고 새 객체를 반환하는 함수 만들기');
// # EX. 두 객체를  병합하고 새 객체를 반환하는 함수 만들기
// _ function merge<T, U>(objA: T, objB: U): T & U { // 이렇게 반환되는 타입을 지정할 필요없다.
// _ WhY? TS는 병합된 객체에 저장된 요소가 매개변수의 인터섹션임을 안다.

// # Generic Type에 "제약을 주고자하는 경우", extends 사용
function merge<T extends object, U extends object | number>(objA: T, objB: U) {
// function merge<T, U>(objA: T, objB: U) { // 제약없는 Ver.
  return Object.assign(objA, objB);
}

// # 형변환 Ver.
// const mergedObj = merge({name:'BM'}, {age:33}) as {name: string, age: number};

// # Generic Ver.
const mergedObj = merge({ name: "BM", hobbies:['study', 'reading Books', 'bike cycling'] }, {age: 33});


console.log(mergedObj); // ! merge 함수에 generic타입 지정을 해주었기 때문에, age객체에 접근할 때, Error가 발생하지 않게 된다.


// # return 객체 타입을 "명시적으로 입력" Ver. ==> Generic Type이 얼마나 편리한지 보시라
const mergedObj2 = merge<{name: string, hobbies: string[]}, {age: number}>({ name: "Max", hobbies:['dev', 'create Application'] }, { age: 29 });




// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
console.log('# Generic > 일반함수');

interface Lengthy {
  length: number;
}


// # Tuple(튜플) : '배열'의 각 항목의 타입을 미리 지정하는 형식.
//  ex. [string, number, boolean , ...] ==> ['hello', 153, true]

// # Example:  일반 함수에 parameter에 length가 있는지만 확인하는 방식으로 Type정의를 구현
function countAndPrint<T extends Lengthy>(elem: T): [T, string] {
  
  let descriptionText =  'Got no value';
  const elemLength = elem.length || 0;
  /* interface에 length 속성을 통하여 Type을 지정해야, length에 대한 type Error가 나지 않는다.
  */
  
  if(elemLength  === 1) {
    descriptionText = 'Got 1 element.'
  } else if (elemLength > 1) {
    descriptionText = `Got ${elemLength} elements.`
  }
  return [elem, descriptionText]
}

console.log(countAndPrint(('Hi Everyone!')))
console.log(countAndPrint(['sports','gaming']))



// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
console.log('# Generic > keyof 제약조건');

// # "keyof" 키워드를 가진 Generic TYPE
//  Ex. 첫 번째의 매개변수: 모든 유형의 객체 && 두 번째 매개변수: "해당 객체(첫 번째 매개변수)"의 Key임을 명시
// ! 용도: 조재하지 않는 Object 속성에 접근하는 실수를 막아줌
function extractAndConvert<T extends object, U extends keyof T> (obj: T, key: U) {
  return 'Value: ' + obj[key];
}

console.log(extractAndConvert({name: 'bmworld'}, 'name'));




// ! 검색해보자 ==> 굽네몰 (가격 비싼데 쪼금 맛있단다 ) // 랭킹닷컴: 싸단다
// ! 검색해보자 ==> 굽네몰 (가격 비싼데 쪼금 맛있단다 ) // 랭킹닷컴: 싸단다
