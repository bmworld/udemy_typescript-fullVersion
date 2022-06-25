// import {getEmployee} from  './objs-arrays-enum'
// const result = getEmployee('2', 'bmworld','dev');
// console.log('result: ', result);
// - 참고 // import 기능을 쓰려면, webpack bundler사용해야한다. 그러니... 일단은 typescript 공부에 집중할 수 있게, 나중에 하자.

// - UNION TYPE : 복수의 타입 할당
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: "as-number" | "as-text" // Literal Type:  아무 문자열이 아닌 , "특정 문자열만" 허용하는 타입정의. // 여기는 union 타입에 literal 타입 2가지를 할당한 것이다.
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2; // +기호 : string으로 변환함
  } else {
    result = input1.toString() + input2.toString();
  }

  // if(resultConversion === 'as-number'){
  //   console.log(result)
  //   console.log(+result)
  //   return +result
  // } else {
  //   return result.toString();
  // }
  return result;
}

const combinedAges = combine(23, 25, "as-number");
// console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
// console.log(combinedStringAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
