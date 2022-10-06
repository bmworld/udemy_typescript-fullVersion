console.log("------- javascript-basic.ts ----------------");

// - 화살표 함수
const addNumber = (a: number, b: number=100) => (a + b) * b;

// const printOutput = output => console.log(output);
// => JS와 달리, 타입배정을 하지 않으면 TS는 타입오류를 낸다.

// 상수에 저장될 정보를 미리 지정한다면, 화살표함수의 변수에타입 지정을 하지 않더라도 가능하다.
const printOutput: (a: number | string) => void = (output) => console.log('printOutput:', output);
console.log(printOutput)

const button2 = document.querySelector('.button2');
if(button2){
  button2.addEventListener('click', (event)=>{
    console.log('button2 Event: ',event);
    console.log('addNumber value: ', addNumber(3));
    console.log('2022새롭게 추가된 기능: 인간을 위하여 즉, 가독성을 위해 숫자 사이에 언더바"_"를 넣을 수 있으며, JS는 이것을 실제 계산에서는 무시한다.\n',1_00, 1_000_00_000)
  })
}


/// ----------------------------------------------------------------
const hobbies = ['biking','hiking', 'gameking'];

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
// 따옴표에서 추출한 값은 새로운 상수나 변수로 복사되는 것이다.

console.log(hobby1, hobby2, remainingHobbies);