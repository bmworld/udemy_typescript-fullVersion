console.log("---------------------- decorator-validations.ts ----------------");

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive'] ...
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required!']
  }; // _생성자 함수의 이름은 생성자(constructor)에 기본적으로 포함돼 있다.
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive!']
  }
}

function validate(obj: any) {
  // 등록된 모든 validator를 조사한 후, 찾아낸 validator를 바탕으로 다양한 로직을 실행
  const objValidatorConfig = registeredValidators[obj.constructor.name]; // 등록된 validators(클래명의 이름으로 구분된 객체)에 들어있는 객체에 접근한다.
  console.log('objValidatorConfig',objValidatorConfig);
  if (!objValidatorConfig){
    return true;
  }
  let isValid = true;
  for(const prop in objValidatorConfig){
    for(const validator of objValidatorConfig[prop]){
      switch(validator){
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid &&  obj[prop] > 0;
          break;
      }
    }
  }
  
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleEl = courseForm.querySelector("#title") as HTMLInputElement;
  const priceEl = courseForm.querySelector("#price") as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value;
  // ! TIP
  //  +(더하기) 연산자: 피연산자 앞에 위치하며, 피연산자를 평가
  //  피연산자가 숫자가 아니라면, "숫자로 변환"을 시도함

  const createdCourse = new Course(title, price); // => title & price의 value가 포함된 object
  const validationResult = validate(createdCourse);
  const resultEl = courseForm.querySelector("#result")! as HTMLInputElement;
  resultEl.innerText = validationResult ? 'Success' : 'Failed';
  if(!validationResult){
    throw new Error("Invalid input, please try again!");
  }
  
});
