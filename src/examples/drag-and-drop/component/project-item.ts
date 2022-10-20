import { Component } from "./base-component";
import { Draggable } from "../models/drag-and-drop"; // 확장
import { Project } from "../models/project-model";
import { AutoBind } from "../decorator/autobind";

// Projecet Item class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private projectItem: Project;

  get persons() {
    // getter와 setter Property는 보통 기본변수설정란 아래에서 선언한다.
    if (this.projectItem.people === 1) {
    } else {
      return `${this.projectItem.people} persons`;
    }
  }

  constructor(hostId: string, projectItem: Project) {
    super("single-project", hostId, false, projectItem.id);
    this.projectItem = projectItem;
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    console.log("dragStart!", event);
    /*
        # dataTransfer 내의 data가 null일 가능성이 있는 경우가 있다.
         1. 어떤 Listener가 그것을 밟생시키는지
         2. 당신이 어떤 이벤트를 처리하는지에 따라 데이터전송이 불가능한 경우도있다.
         3. 모든 Drag이벤트가 dataTransfer 매서드를 갖고 있는 것은 아니다.
      */

    // # setData()=> param 첫 번째: 데이터 포맷의 식별자
    event.dataTransfer!.setData("text/plain", this.projectItem.id);
    // ! ㄴ 일부의 data(id값)만 전달해서, 데이터를 옮긴다 (+  메모리를 절약)
    event.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(event: DragEvent) {
    console.log("dragEnd!", event);
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent() {
    console.log(this.persons);
    // ! 여기서 this.element는 Component의 Generic Type으로 설정된 것 중, HTMLLIElement.
    this.element.querySelector("h2")!.textContent = this.projectItem.title;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned`;
    this.element.querySelector("p")!.textContent = this.projectItem.description;
  }
}
