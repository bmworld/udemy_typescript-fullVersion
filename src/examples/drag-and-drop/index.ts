console.log("--------Example:  Drag and Dop ---------");

// # STEP 1. Typescriptd의 "객체지향(OOP)"방식을 이용하여, HTML RENDERING

// # STEP2.  VALIDATION
interface Validatable {
  value: string | number;
  required?: boolean; // ! value외에는 propertyName 뒤에 물음표를 붙여 "선택사항"이 되도록 한다.
  minLength?: number; // 용도: 문자열의 길이를 확인
  maxLength?: number; // 용도: 문자열의 길이를 확인
  min?: number; // 용도: 수치 값이 최소값 이상인지 확인
  max?: number; // 용도: 수치 값이 최대값 이하인지 확인
}
function validateInputs(validatableInput: Validatable): boolean {
  console.log('validatableInput',validatableInput)
  let isValid = true;
  if (validatableInput.required) {
    // 해당 값이 '필수'값이라면, 문자열의 길이를 확인한다.
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    // ! validatableInput.minLength != null ===> 최소길이가 0 으로 설정되는 것까지 포함하여서 현재 if문 내의 validation 실행되도록 함.
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }
  
  if(validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  
  if(validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

// Autobind decirator
function AutoBindDecorator(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  /* #  HTMLInputElement는 Global에서 사용가능하다.
      why ? tsconfig.json에서 lib에 'dom'을 추가했고,
      이것이 dom TYPE, 즉 html Element TYPE을 Typescript의 타입으로서 사용할 수 있게 해준다.
  */
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement; // 덜 구체적인 타입으로서 "HTMLElement"도 가능하다.
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // ! HTMLTemplateElement의 TYPE을 찾을 수 없는 ERROR 해결
    //   ㄴ TS에게 해당 값이 null이 아닌, 지정된 TYPE이 될 것이랑 것을 보장시킨다.
    // # TYPE 형변환 VER. (데이터 타입을 '명시'하며, 실제 TYPE에는 영향을 주지 않는다.)
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;
    // # TYPE CASTING VER. (실제 TYPE을 변화시킴)
    this.hostElement = <HTMLDivElement>document.getElementById("app")!;

    // ! .content: template 태그 사이에 조재하는 HTML코드를 참조
    // ! importedNode: 두 번째 param(필수 param)이 true => Deep Clone을 이용하여 가져오기를 할것인지 말것인지를 결정
    const templateContent = this.templateElement.content;
    const importedNode = document.importNode(templateContent, true); // TS가 DocumentFragment로서 타입추론했다
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-form";

    this.titleInputElement = this.formElement.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector(
      "#people"
    ) as HTMLInputElement;

    // EXUCUTE METHODS;
    this.attach(); // ! TS의 Class를 실행하여 template 태그 내부에 존재하는 form tag를 활성화 시킨다.
    this.configure();
  }

  // # 튜플타입: JS에서 배열타입이 뒤죽박죽이 되지 않도록, 타입을 지정해주는 방식.
  private gatherUserInput(): [string, string, number] | undefined {
    // 튜플타입 지정
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value; // ! 숫자타입이 되도록 변환
    
    const titleValidatable : Validatable = {
      value: enteredTitle,
      required: true
    }
  
    const descriptionValidatable : Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
      
    }
  
    const peopleValidatable : Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    }
    if (
      !validateInputs(titleValidatable) ||
      !validateInputs(descriptionValidatable) ||
      !validateInputs(peopleValidatable)
    ) {
      // if(!enteredTitle.trim() || !enteredDescription.trim() || !enteredPeople.trim()){
      alert("Invalid input, please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBindDecorator
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log("SUBMITTED : ", title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler);
  }

  // ! Udemy 강사님:  선택사항과 랜더링 로직을 분리하기 위하여,  Class Method를 설정함
  private attach() {
    // ! insertAdjacentElement(): HTMLElement를 삽입하기 위해서 JS가 Broser에게 제공하는 기본 Method.
    //  ㄴ 첫번째 param: 삽입될 위치지정 (ex. afterbegin: 여는 태그가 바로 시작되는 곳)

    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const prj = new ProjectInput();
