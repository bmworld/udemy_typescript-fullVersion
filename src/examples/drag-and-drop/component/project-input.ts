import { Component } from "./base-component.js";
import {Validatable, validateInputs} from "../util/validation.js";
import {AutoBind} from '../decorator/autobind.js'
import {projectState} from "../state/project-state.js";

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

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
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

  @AutoBind
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
