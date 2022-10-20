import { Component } from "./base-component";

// # import 기본 VER. : 해당 파일에서 실제 export한 항목의 이름을 그대로 가져옴
// import {Validatable, validate} from "../util/validation.js";

// # import 그룹화 VER.: "*" 로 모든항목을 가져오고 "as" 키워드를 사용하여 임의의 이름을 할당 => 세부 export항목은 할당한 이름내부의 객체처럼 접근할 수 있다.
import * as Validation from "../util/validation";


// # aliased Name: "as" 키워드를 사용하여, import하는 파일에서 별명(aliased Name)을 할당하여 불러오는 기능
//  ㄴ 왜 쓰는가? 이름충돌 방지.
import {AutoBind as autobind} from "../decorator/autobind";
import {projectState} from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  /* #  HTMLInputElement는 Global에서 사용가능하다.
        why ? tsconfig.json에서 lib에 'dom'을 추가했고,
        이것이 dom TYPE, 즉 html Element TYPE을 Typescript의 타입으로서 사용할 수 있게 해준다.
    */
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-form");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure(); //
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  // # 튜플타입: JS에서 배열타입이 뒤죽박죽이 되지 않도록, 타입을 지정해주는 방식.
  private gatherUserInput(): [string, string, number] | undefined {
    // 튜플타입 지정
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value; // ! 숫자타입이 되도록 변환

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validation.Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
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

  // @AutoBind // original name
  @autobind // trasformed name by using as keyword
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log("SUBMITTED : ", title, desc, people);
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
