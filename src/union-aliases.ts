console.log('-------------------------- union-aliases.ts --------------------------');

function add(n1: number, n2: number): number {
  return n1 + n2;
}

// - return 값이 없을 때, void가 자동할당됨 / 실제로 void를 할당할 필요는 없
function printResult(num: number): void {
  console.log("printResult: ", num);
}

printResult(add(5, 9));



// - Function TYPE & Callback
function addAndHandle (n1: number, n2: number, cb: (num: number)=>void) {
  // cb의 reutnr 타입을 void 로 지정함으로서, return value가 어떤 type의 값을 return하던 관계없이 에러를 밟생시키지 않는다.
  const result = n1 + n2;
  cb(result);
}

// - 함수가 undefined value를 return할 때
function returnUndefined():undefined {
  return;
}


// - Function TYPE: 변수에 함수를 할당 && param과 return value에 타입할당
let combineValues : (a:number, b: number)=> number;
// let combineValues : Function;

combineValues = add;
// combineValues = printResult; // ERROR CASE:return value가 undefinded이므로 , 위 combineValues의 타입정의와 다르다.
// combineValues = 4;
console.log(combineValues(7,6));


addAndHandle(10,30, (result)=>{
  console.log('addAndHandle RESULT: ',result);
  return 'string'; // cb의 reutnr 타입을 void 로 지정함으로서, return value가 어떤 type의 값을 return하던 관계없이 에러를 밟생시키지 않는다.
});

