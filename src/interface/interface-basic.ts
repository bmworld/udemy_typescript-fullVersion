console.log(
  "--------- interface-basic.ts ---------"
);

/* # interface
    _ ** "객체의 구조를 설명"하기 위해서만 사용함.
      ㄴ type 과의 가장 큰 차이
    _ 초기값 및 구체적인 값을 할당 불가
    _ 메소드 할당 가능
      ㄴ 실제 메소드를 추가하는 게 아니라, "객체가 가질 메소드"의 구조를 정의하는 것
    _ interface는 사용자 정의타입으로만 사용할 뿐 , class처럼 객체의 청사진으로 사용하지 않는다.
* */

interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}

/*
type Person { // <--type으로 해도 동일하게 작동한다.
  name: string;
  age: number;
  greet(phrase: string):void;
}
*/

//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//

let user1: Person;

// ! interface Person에 정의된 구조대로 할당하지 않을 경우, 에러가 발생함.
user1 = {
  name: "Bm",
  age: 33,
  greet(phrase: string):void {
    const message = `${phrase} 저는 ${this.name} 입니다.`;
    console.log(message);
  }
};
user1.greet("안녕하세요!");

//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//

/* # Interface와 Class를 함께 사용하기
    _ implements를 사용하여, 여러 클래스 간에 공유하여 사용하는 것이 핵심이다.
    _ 해당 interface를 준수하는 모든 Class는 interface의 구조를 따라야 한다.
    _ Class는 인터페이스가 설정한 조건을 충족한 이후에, 추가적인 필드나 메소드를 입력 가능.
*/


interface Named {
  outputName?: string;
  // ! 속성이름 다음에 물음표 "?": 속성을 선택사항으로 지정함. (있어도 돼고, 없어도 되도록 함.)
  readonly name?: string;
  /* ! readonly 제어자를 추가할 경우, interface를 기반으로 구축하는 모든 객체의 속성이 한 번만 설정되어야 하며, 이후에는 읽기 전용으로 설정하,
  객체가 초기화된 이후에는 변경할 수 없도록 한다.
  * */
  // ! private, public 제어자는 추가 불가
}


interface Aged {
  age?: number;
  printAge?(): void; // method에 물음표(?)을 추가하여, 선택사항으로 명시할 수 있다.
}


// type Greetable = {  // interface대신 type을 사용할 수 있다.
interface Greetable extends Named, Aged{
  greet(phrase: string): void;
}




class PersonClass implements Greetable {
  name?: string;
  age?: number;
  outputName: string;
  constructor(n?: string, age?: number) {
    this.name = n || '코린이';
    this.age = age || 0;
    this.outputName = '이 사람의 이름은' + this.name;
  }
  
  greet (phrase: string) {
    if(this.name && this.age){
      console.log(phrase, this.name,'.', '\nage:', this.age);
    } else {
      console.log('Hello! unknown user!', 'are you', this.name,'?');
    }
    
  }
}

let user2: Greetable;
//
// user2 = {
//   name: "Max",
//   greet(phrase: string): void {
//     console.log(phrase, "", this.name);
//   },
// };

user2 = new PersonClass('BM', 33);
user2.greet('Hi there! I am');
// user2.name = 'tryToEditReadonlyName'; // ! interface의 readonly 속성으로 인하여, 초기화 이후에 변경이 불가능하게 되었다.

let user3:Greetable = new PersonClass();
user3.greet('Hello~~');



//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//


// # 함수타입으로서의 INTERFACE
// # TYPE VER.
// type AddFn = (a:number, b: number)=> number;

// # INTERFACE VER.
interface AddFn {
  (a:number, b:number): number;
}
let addNumbers: AddFn;

addNumbers = (n1: number, n2: number)=>{
  return n1 + n2;
}