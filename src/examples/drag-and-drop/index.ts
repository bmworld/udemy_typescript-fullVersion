console.log("--------Example:  Drag and Dop ---------");
// ! 이번 실습의 핵심: Typescriptd의 "객체지향(OOP)"방식을 이용하여, HTML RENDERING
// ! 해결할 문제
//  1. 사용자 입력을 취한한 클래스, submitHandler안에서 addProject를 어떻게 호출할 것인가?
//  2. 프로젝트가 바뀔 때마다, 해당 업데이트된 프로젝트 목록을 어떻게 가져올 것인가?

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------

// # Project Type

// - 타입정의 시, 식별자만 필요한 경우, 사용하기 딱 좋다.
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------

// # Project state management
//  => 전역에서 상태를 관리하는 클래스 => 단 1개만 존재해야 하므로, "싱글톤 클래스"로 구성.
//  => 싱글톤 클래스는 "new"로 생성하지 않고, Method를 생성 후, 호출하여 구성
//    ㄴ 따라서, 특정 시점에 반드시 단 하나의 클래스 인스턴스가 존재한다.

type Listener<T> = (items: T[]) => void; // Listener의 타입을 설정하고, 반환되는 타입은 신경쓰지 않는다.

class State<T> {
  // ! protected : 상속되는 클래스에서는 접근가능하도록 함 (private은 상속클래스에서 접근 불가능)
  protected listeners: Listener<T>[] = []; // ! Listener의 역할: "무언가 변경될 때마다" 함수 목록이 호출되도록 한다. 해당 listener를 우리에게 전달하는자들이 리스너가
  addListener(listenerFn: Listener<T>): void {
    this.listeners.push(listenerFn);
  }
  
}

class ProjectState extends State<Project>{
  private projects: Project[] = [];
  private static instance: ProjectState; // ! instance는 클래스 그 자체와 동일하도록 타입설정해준다.

  private constructor() {
    super();
  }

  static getInstance() {
    /* # static Method (정적 매서드)
        1. 인스턴스없이, 클래스에서 접근할 수 있는 정적메소드로 만듦
        2. 객체를 반환해야함.
    */
    return this.instance ? this.instance : new ProjectState();
  }

  addProject(title: string, description: string, numOfPeople: number) {
    // # BEFORE using class Ver.
    // const newProject =  {
    //   id: Math.random().toString(),
    //   title: title,
    //   description: description,
    //   people: numOfPeople,
    // };

    // # AFTER using class Ver.
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);

    for (const listenerFn of this.listeners) {
      // # 해당 함수가 호출되었을 때, this.projects 프로젝트목록 배열을 전달받게 만든다.
      listenerFn(this.projects.slice());
      /*
       ! slice를 호출해서 this.projecets프로젝트 목록의 "원본 배열"이 아닌,
        "복사 배열"을 반환해서, listnerFn에다가 전달한다
        Why ? listener함수의 "출처가 변경되지 않도록"
      */
    }
  }
}

const projectState = ProjectState.getInstance();

// #   VALIDATION
interface Validatable {
  value: string | number;
  required?: boolean; // ! value외에는 propertyName 뒤에 물음표를 붙여 "선택사항"이 되도록 한다.
  minLength?: number; // 용도: 문자열의 길이를 확인
  maxLength?: number; // 용도: 문자열의 길이를 확인
  min?: number; // 용도: 수치 값이 최소값 이상인지 확인
  max?: number; // 용도: 수치 값이 최대값 이하인지 확인
}
function validateInputs(validatableInput: Validatable): boolean {
  console.log("validatableInput", validatableInput);
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

  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
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

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------

// # Refactoring => Component Base Class :공통적으로 사용되는 요소를 해당 Class를 바탕으로 상속되도록 한다.

// ! abstract 추상 클래스로 만들어서, 직접 인스턴스화가 이뤄지지 않게 한다.
//  why ? 언제나 '상속'하는 역할만 하게 만들기 위함.

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string, // ! 주의 : 필수 매개변수는 , 선택적 매개변수(물음표가 붙은 변수) 다음에 올 수 없다
    hostElementId: string, // ! 주의 : 필수 매개변수는 , 선택적 매개변수(물음표가 붙은 변수) 다음에 올 수 없다
    insertAtStart: boolean, // ! 주의 : 필수 매개변수는 , 선택적 매개변수(물음표가 붙은 변수) 다음에 올 수 없다
    newElementId?: string
  ) {
    // ! HTMLTemplateElement의 TYPE을 찾을 수 없는 ERROR 해결
    //   ㄴ TS에게 해당 값이 null이 아닌, 지정된 TYPE이 될 것이랑 것을 보장시킨다.
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;
  
    
    // ! .content: template 태그 사이에 조재하는 HTML코드를 참조
    // ! importedNode: 두 번째 param(필수 param)이 true => Deep Clone을 이용하여 가져오기를 할것인지 말것인지를 결정
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); // TS가 DocumentFragment로서 타입추론했다
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }
  
  // ! Udemy 강사님:  선택사항과 랜더링 로직을 분리하기 위하여,  Class Method를 설정함
  private attach(insertAtBeginning: boolean) {
    // ! insertAdjacentElement()
    //  첫 번째 param: 삽입될 위치지정 (ex. afterbegin: 여는 태그가 바로 시작되는 곳)
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  //  # absctract method => 실제로는 구현되지 않으며, "상속되는 class"에서 구현해야 함.
  //  ㄴ ! abstract method는 private키워드를 지원하지 않는다 => 비공개 추상메서드 미.지.원
  abstract renderContent(): void;
  abstract configure?(): void; // ! 물음표(?)를 더해서, optional method (선택적으로 사용하는 매서드)로 변환함.
}

// Projecet List Lcass
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    // ! super(): 생성자의 Base Class를 불러온다
    super("project-list", "app", false, `${type}-projects`);
  
    // ! *** 아래 두 method 왜 상속받도록 구현하지 않았는가?
    //  => 해당 method가 "상속받는 class의 생성자(constructor)에 영향을 받기 때문에" 상속받는 class에서 해당 method를 불러오는 것이 더 안전.
    this.configure();
    this.renderContent();
  }
  private renderProjects() {
    // 이미 랜더링된 DOM에 의존하므로, 해당 DOM의  target ID를 맞춰준다.
    const listId = `${this.type}-project-list`;
    const UlistEl = document.getElementById(listId)! as HTMLUListElement;
    UlistEl.innerHTML = ""; // ! 중복추가를 피하기 위해서, 새로운 prj이 추가될 때마다, 초기화를 시킨다. // 여기 app 로직에서는 통한다.
    for (const prjItem of this.assignedProjects) {
      console.log(prjItem);
      const listItem = document.createElement("li");
      listItem.classList.add("project-inner-list");
      listItem.textContent = prjItem.title;
      UlistEl.appendChild(listItem);
    }
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      const relevantProject = projects.filter((prj) => {
        console.log(ProjectStatus);
        return this.type === "active"
          ? prj.status === ProjectStatus.Active
          : prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProject;
      this.renderProjects();
    });
  }

  // ! Base class에서 정의된 추상메서드이므로 반드시 상속받는 클래스에서는 사용해야한다.
  //  추상 메서드는 private 키워드를 지원하지 않으므로, 제거한다.
  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()}-PROJECTS`;
  }
}

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// # project Input Class
class ProjectInput extends Component <HTMLDivElement, HTMLFormElement> {
  /* #  HTMLInputElement는 Global에서 사용가능하다.
      why ? tsconfig.json에서 lib에 'dom'을 추가했고,
      이것이 dom TYPE, 즉 html Element TYPE을 Typescript의 타입으로서 사용할 수 있게 해준다.
  */
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    
    super('project-input','app',  true, 'user-form'     );
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
  
  renderContent(){};

  
  
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

  @AutoBindDecorator
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

const prj = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
console.log(projectState);
// # 싱글톤으로 프로젝트 상태관리하기
