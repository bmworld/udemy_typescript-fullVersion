console.log('------- advancedType.ts --------');


// InterSection Type은 Interface상속과 밀접한 관련이 있다.
// interface Admin { // <-- type 대신 interface를 사용해도 된다.
type Admin = {
  name: string;
  privilages: string[];
  
}

// interface Employee { // <-- type 대신 interface를 사용해도 된다.
type Employee = {
  name: string;
  startDate: Date; // JS에 내장된 Date 객체 기반의 TS가 지원하는 Type
}


// interface ElevatedEmployee extends Employee, Admin {} // <-- type 대신 interface를 사용해도 된다.
type ElevatedEmployee = Admin & Employee; // 두 타입이 결합된 새 객체타

const e1: ElevatedEmployee = {
  name: 'BM',
  privilages: ['create-server'],
  startDate: new Date(),
}



type CombinableType = string | number ; // union type
type NumericType = number | boolean;

type Universal = CombinableType & NumericType; // intersection type 적용 => 이 경우, 두 유니언 타입의 교집합인 유니언타입이 된다 (여기서는 number Type)

// const test: Universal = true; // RESULT => ERROR
// const test: Universal = 1; // RESULT => PASSED

//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
console.log('-------------------------------------------------------')
/*
  # Type Guard 타입 가드
   _ 정의: Runtime 중, 특정 타입으로 작업 수행 전, 해당 타입을 검사하는 "코드패턴"
   _ 용도: Runtime 시, 타입오류 방지
   _ 장점: 유니온타입이 지닌 유연성을 활용할 수 있게 해주며, Runtime에서 코드가 정확하게 작동하게 해준다.
   _ 꿀팁: 두 세 가지 다른 타입과 작동하 함수를 사용하는 경우가 많으므로 이런 경우 유니언타입이 적합하다.
*/

function addFuncWithTypeguard (a:CombinableType, b: CombinableType) {
  if(typeof a === 'string' || typeof b === 'string'){ // <--이부분이 # 타입가드
    return a.toString() + b.toString();
  }
  return a + b;
}


type UnknownEmployee = Employee | Admin;

function printEmployyInfo (emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);
  // console.log(emp)
  if('privilages' in emp){ // # 타입가드 ex.  => 객체속에 해당 key가존재하는지 확인한다.
    console.log(`Privilage: ${emp.privilages}`);
  }
  
  if('startDate' in emp){  // # 타입가드 ex.  => 객체속에 해당 key가존재하는지 확인한다.
    console.log(`StartDate: ${emp.startDate}`);
  }
  
}


// printEmployyInfo(e1);
printEmployyInfo({name:'Matthew', startDate: new Date()});



//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
console.log('-------------------------------------------------------')
// # Class의 타입가드 사용
class Car {
  drive () {
    console.log('Driving!')
  }
}

class Truck {
  drive () {
    console.log('Driving a truck !');
  }
  
  loadCargo (amount: number) {
    console.log('Loading cargo....' + amount)
    
  }
}

type Vehicle = Car | Truck; // Class로 Union Type만들기

const v1 = new Car ();
const v2 = new Truck ();


function useVehicle (vehicle: Vehicle) {
  vehicle.drive();
  // if('loadCargo' in vehicle){ // # 타입가드
  if(vehicle instanceof Truck){ // # instanceof 타입가드 => 오타의 위험을 줄여주는 방법
    // ! 해설: 여기서 JS는 Truck 타입을 모르지만, 생성자 함수는 알고 있으므로, Class Truc은 결국 생성자 함수로 변환된다.
    vehicle.loadCargo(2000);
    /*
     # instanceof
      _ Vanilla JS에 내장된 비교 연산자
      _ true/false 값을 return한다.
      _ interface는 JS로 compile되지 않으므로, 적용불가 (interface는 Typescript에서만 작동하므로)
      _ Class에 적용가능함 (빌드 후, 생성자로 변환되므로 JS에서 사용가능)
    */
  }
}

useVehicle(v1);
useVehicle(v2);



//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
console.log('-------------------------------------------------------')
/*
  # 구별된 Union
   interface에 타입을 구별할수있는 property를 입력하고, switch문을 통하여 구별하는 방법
*/
interface Bird {
  type: 'bird'; // type 구별을 위해서 임의로 입력한다 // type또한 property이므로 type이 아닌 다른 문자라도 상관없다.
  flyingSpeed: number;
}

interface Horser {
  type: 'horse';
  runningSpeed: number;
}


type Animal = Bird | Horser;

function moveAnimal (animal: Animal) {
  // if('flyingSpeed' in animal) {
  // // if(animal instnaceof Animal) {
  //   console.log(`Moving with speed: ${animal.flyingSpeed}`);
  // }
  let speed;
  switch (animal.type) {
    case  'bird':
      speed = animal.flyingSpeed;
      break;
    case  'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log(`Moving at spped:  ${speed}`);
}

moveAnimal({type: 'bird', flyingSpeed:20000});
// moveAnimal({type: 'bird', runningSpeed:20000}); // ! 타입스크립트는 bird타입에 runningSpeed가 없다는 것을 알고있기 떄문에, ERROR를 띄운다.



//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
console.log('-------------------------------------------------------')
/* # TypeCasting (형 변환)
    형태: as TYPENAME (as를사용한다)
    설명: TS가 직접 감지하지 못하는 특정 타입의 값을 TS에게 알려줌
* */

// ! TS는 HTML파일을 분석할 수 없다.
// # 형변환 방법1 => TS는 JSX의 홑화살과 완벽하게 분리하도록 코드를 작성했다. 참조하시라.
const userInputElem_case1 = <HTMLInputElement>document.querySelector('.user-input');
if(userInputElem_case1) userInputElem_case1.value ='Hello CASE 1';

// HTMLInputElement는 전역에서 사용가능한 TS TYPE이다.
// # 형변환 방법2-1
const userInputElem_case2 = document.querySelector('.user-input')! as HTMLInputElement;
/*
  - 느낌표(!): 앞의 표현식을 null로 반환(yield)하지 않겠다고 TS에게 인식시킬 수 있음.
    ㄴ DOM요소에서 null을 반환할 수 있는 element이지만, 개발자가 해당 DOM 요소가 null이 아님을 확신할 경우에 사용.~
  - as : 형변환이다.
  
*/
if(userInputElem_case2) userInputElem_case2.value ='Hello CASE 2';

// # 형변환 방법2-2 => 느낌표의 대안
const userInputElem_case3 = document.querySelector('.user-input');
if(userInputElem_case3){
  (userInputElem_case3 as HTMLInputElement).value = 'Hello CASE 3'
}



//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//

/*
  # INDEX 속성
   표현: [] (대괄호 쌍)
   용도: 유연하게 포함되는 객체를 사용할 수 있음 =>  여러 식별자가 있는 객체를 만들 때 활용
   장점: 필요한 속성의 개수를 미리 알 필요 없음
   단점: index에 할당한 type에 한정하여서만 사용할 수 있음
*/

interface ErrorContainer {
  // 다양한 input 필드에 대하여 여러 값과 식별자에 대응할 수 있도록 유연하게 만들거다.
  // 문자열이나, 몇 개의 속성 및 속성이름을 가질지 미리 알 수 없는 상황에 대응.
  [prop: string]: string; // ! index TYPE => [] 대괄호쌍 내의 속성이름은 string, number, symbol 타입을 사용할 수 있다.
  // ! 미리 정의된 속성을 추가할 수 있다.
  // id: string; // ! PASS => index 타입과 매칭됨
  // id: number; // ! ERROR =>   index 타입([prop:string])에 설정된 타입만 사용할 수 있다.
}

const errorBag: ErrorContainer = {
  id: '1',
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
}




//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
/* # 함수 overload
    _ 동일한 함수에 대해 여러 함수 시그니처를 정의할 수 있는 기능
    _ 다양한 매객변수를 지닌 함수를 호출하는 여러 가지 방법을 사용하여, 함수 내에서 작업을 수행할 수 있게 해준다.
    _ 컴파일 과정 중에 타입스크립트가 제거한다.
    _ 형태: 사용할 함수 위에 동일한 이름을 지닌 함수의 매개변수 및 반환타입을 명시 / 중괄호는 사용하지 않는다.
    ex. function add(a:number, b:number): number;
    function (a: Combinable, b: Combinable){ ... }
* */

function addFuncWithOverload (a:number, b: number):number; // ! ex. resultFromOverload_num
function addFuncWithOverload (a:string, b: string):string; // ! ex. resultFromOverload
function addFuncWithOverload (a:number, b: string):string;
function addFuncWithOverload (a:string, b: number):string;
function addFuncWithOverload (a:CombinableType, b: CombinableType) {
  if(typeof a === 'string' || typeof b === 'string'){ // <--이부분이 # 타입가드
    return a.toString() + b.toString();
  }
  return a + b;
}

const resultFromOverload_str = addFuncWithOverload('white','black'); // ! 여기서 TS는 result의 타입이 숫자인지 문자인지 알지 못한다.
resultFromOverload_str.split(' '); // ! 여기서 TS는 result의 타입이 string인지 알지 못하기 때문에, split을 사용할 수 없게 ERROR가 뜬다. =>  함수 overload를 통하여, 반환타입을 명시해준다.
console.log('resultFromOverload_str: ',resultFromOverload_str);

const resultFromOverload_num = addFuncWithOverload(1,12);
Math.floor(resultFromOverload_num);
// ! 여기서 TS는 result의 타입이 number 인지 알지 못한다 => 함수 overload를 통하여, 반환타입을 명시해준다.
console.log('resultFromOverload_num: ',resultFromOverload_num);

const resultFromOverload_str2 = addFuncWithOverload(1,' 백만불짜리 사나이');
console.log('resultFromOverload_str2: ',resultFromOverload_str2);





//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
console.log('-------------------------------------------------------')

/* # Optional Chaining (선택적 체이닝 연산자)
    _ 연산자: ? (물음표)
    _ 효과: 객체 데이터의 중첩된 속성과 객체에 안전하게 접근할 수 있게 해준다. (특히 HTTP 통신)
    _ 사용법: 정의되어 있는지 여부가 확실치 않은 요소 다음에 >물음표(?)를 추가하여, 선택적으로 체이닝
    _ 해당 요소가 정의되어있지 않은 경우, 그 이후의 체이닝(점)에 접근하지 않음으로써, 에러를 피한다.

* */

const fetchedUserData = {
  id:'u1',
  name: 'Max',
  job: {title: 'CEO', description: 'My own company'}
}
console.log('HTTP 등에서 해당 데이터 부재 시, undefined 반환 ==> ',fetchedUserData?.job?.title) ;


//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
//--------------------------------------------------------------//
console.log('-------------------------------------------------------')
/* # Null 병합 연산자
    _ 연산자: ?? (물음표 2개)
    _ 정의: 해당 값이 null 이거나 undefined이 아니라면, fallback을 사용해야한다.
      ㄴ false 또는 ''(빈문자)열 등의 값일 경우 => 그 값을 사용
    _ 용도: null 이나 undefined값을 더 디테일하게 처리할 필요가 있을 때 사용
    

* */

const userInputForMerginNullType = '';
// const storedDataForMerginNullType = userInputForMerginNullType ?? 'DEFAULT'; // ! 결과값 => '' (빈문자열)
const storedDataForMerginNullType = userInputForMerginNullType || 'DEFAULT'; // ! 결과값 => DEFAULT
console.log(storedDataForMerginNullType)


// (function RemainingTimeUnitilDeparture(){
//   const curTime:Date = new Date();
//   const enteredTime:number = new Date('2022-10-07 16:39:45').getTime();
//   const timeUnitOfHour:number = 60*60*1000;
//   const paidTime:number = 2 * timeUnitOfHour; // H * M * S * mS
//   const expiredTime:Date = new Date( enteredTime + paidTime ); //2 H
//   const restTime = (expiredTime.getTime() - curTime.getTime());
//   setTimeout(()=>{
//     console.log(`현재시간: ${new Date().toLocaleTimeString()}`)
//     console.log(`***** 퇴실까지 남은시간(분): ${Math.floor(restTime/timeUnitOfHour*60)}분 *****`);
//   },1000);
// }());
//
