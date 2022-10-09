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
    resolve("Promise > setTimeout: This is done!");
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
console.log("# EX. 두 객체를  병합하고 새 객체를 반환하는 함수 만들기");
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
const mergedObj = merge(
  { name: "BM", hobbies: ["study", "reading Books", "bike cycling"] },
  { age: 33 }
);

console.log(mergedObj); // ! merge 함수에 generic타입 지정을 해주었기 때문에, age객체에 접근할 때, Error가 발생하지 않게 된다.

// # return 객체 타입을 "명시적으로 입력" Ver. ==> Generic Type이 얼마나 편리한지 보시라
const mergedObj2 = merge<{ name: string; hobbies: string[] }, { age: number }>(
  { name: "Max", hobbies: ["dev", "create Application"] },
  { age: 29 }
);

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
console.log("# Generic > 일반함수");

interface Lengthy {
  length: number;
}

// # Tuple(튜플) : '배열'의 각 항목의 타입을 미리 지정하는 형식.
//  ex. [string, number, boolean , ...] ==> ['hello', 153, true]

// # Example:  일반 함수에 parameter에 length가 있는지만 확인하는 방식으로 Type정의를 구현
function countAndPrint<T extends Lengthy>(elem: T): [T, string] {
  let descriptionText = "Got no value";
  const elemLength = elem.length || 0;
  /* interface에 length 속성을 통하여 Type을 지정해야, length에 대한 type Error가 나지 않는다.
   */

  if (elemLength === 1) {
    descriptionText = "Got 1 element.";
  } else if (elemLength > 1) {
    descriptionText = `Got ${elemLength} elements.`;
  }
  return [elem, descriptionText];
}

console.log(countAndPrint("Hi Everyone!"));
console.log(countAndPrint(["sports", "gaming"]));

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
console.log("# Generic > keyof 제약조건");

// # "keyof" 키워드를 가진 Generic TYPE
//  Ex. 첫 번째의 매개변수: 모든 유형의 객체 && 두 번째 매개변수: "해당 객체(첫 번째 매개변수)"의 Key임을 명시
// ! 용도: 조재하지 않는 Object 속성에 접근하는 실수를 막아줌
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  // _ 첫 번째(obj) 및 두 번째 매개변수(key)에 대한 타입 정의를
  // 함수명 옆 화살괄호 내에 GENERIC TYPE으로써 명시한다.
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "bmworld" }, "name"));

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
console.log("# Generic > Class");

// # Generic class 만들기
class DataStorage<T extends string | number | boolean> {
  // ! T타입의 배열을 입력함으로써, Generic Type의 데이터가 저장되도록 한다.
  // ! 원시값에 대해서만 data CRUD가 가능하도록 extends 원시값 설정을 한다.
  //  ㄴ 객체 및 배열은 원시값이 아니다.
  //  ㄴ 원시값: number, string, boolean, null, undefined, Symbol
  
  // # Generic TYPE VER.
  private data: T[] = [];
  // # Union TYPE VER.
  //  => See how many lines of code you can save by using Generic types
  //  => 정확도에서 떨어짐: 배열일 경우, 유니온타입이라 string, number, boolean이 "혼합"된 원치않은 결과를 얻을 수 있단 거다.
  // private data: (number | string | boolean)[] = [];
  // constructor() {} // _ constructor 없어도 됨

  // addItem(item: (number | string | boolean)[]) { ( ## See how many lines of code you can save by using Generic types.)
  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      // ! 객체로 데이터 조회 시,
      //  addItem에 입력한 객체와 removeItem에 입력한 객체가 형태는 동일하지만,
      //  JS에서는 해당 객체에 대하여 완전히 새로운 객체로 인식하므로, 동일한 데이터삭제가 불가하다.
      //  따라서, 찾을 수 없는 이유로 인하여, removeItem에서는 마지막 객체가 삭제된다.
      return; // validation : Obj  및 Arr에 대하여
    }
    this.data.splice(this.data.indexOf(item), 1); // splice(배열이 변경을 시작할 Indx, 배열에서 제거할 요소의 수, 배열에 추가할 요소);
  }
  getItem() {
    return [...this.data]; // Generic Type의 배열이 반환하는 것으로 TS에 의해서 타입추론을 한다.
  }
}

const txtSTRG = new DataStorage<string>(); // GENERIC TYPE을 명시적으로 설정 가능.
txtSTRG.addItem("BM");
txtSTRG.addItem("Dave");
txtSTRG.addItem("Dawn");
txtSTRG.removeItem("BM");
console.log(txtSTRG.getItem());

// ! EXAMPLE: 원시값이 아닌, 객체인 경우, 데이터 처리에 ERROR사항이 있다.
// const objSTRG = new DataStorage<object>();
// const maxObjForRemovingTheExactlySameData = {name: 'sam'};
// ! 완전히 동일한 데이터 삭제를 remove하기 위해서는 완전히 동일한 데이터여야 한다.
//  그것으로 인해서, 변수에 저장하는 방식으로 진행해줘야하낟 (JS 특성으로 인함)
//  이러한 데이터처리에 에로사항이 있으므로, object, array등의 데이터는 사용하지 않는 것이 좋다.
// objSTRG.addItem(maxObjForRemovingTheExactlySameData);
// objSTRG.addItem({name:'teddy'});
// //...
// objSTRG.removeItem(maxObjForRemovingTheExactlySameData);
// console.log(objSTRG.getItem());

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
console.log("# Generic > Utility Type");

/* # 유틸리티 타입 (TYPESCRIPT ONLY)
     1. Partial TYPE
    _ Generic TYPE중 하나
    _ 특정 타입의 "부분 집합"을 만족하는 타입을 정의할 수 있습니다.
*/



interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // return { title: title, description: description, completeUntil: date };
  let courseGoal:Partial<CourseGoal> = {};
  // ! Partial TYPE은 TS에게 중괄호 쌍이 courseGoal이 되는 객체임을 알려준다.
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  
  return courseGoal as CourseGoal;
  // ! Partial타입은 CourseGoal 의 "부분 집합"이기 때문에, 추가적인 return값에 대한 처리를 해줘야한다.
  //  WHY? courseGoal은 Partial TYPE이지, CourseGoal TYPE이 아님.
  //  1. 형변환(as)
  //  2. return type에도 동일하게 partial<... TYPE> 적용
}


/* # 유틸리티 타입 (TYPESCRIPT ONLY)
    2. Readonly TYPE
    _ 형식: Readonly / Readonly<string[]>
    _ 새로운 값을 추가하거나 변경할 수 없도록함
*/

const namesForGenericUtilityType:Readonly<string[]> = ['BM','Max'];
// Readonly 타입으로 배열을 잠궈서, 더이상 출가할 수 없게 만듦.
// namesForGenericUtilityType.push('Manu'); // ! ERROR: Readonly 타입이므로, 읽기만 가능하다.

