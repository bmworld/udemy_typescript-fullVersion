import { Component } from "./base-component.js";
import { DragType } from "../models/drag-and-drop.js"; // 확장
import {Project, ProjectStatus} from "../models/project-model.js";
import { AutoBind } from "../decorator/autobind.js";
import { ProjectItem } from "./project-item.js";
import {projectState} from "../state/project-state.js";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragType
{
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
      // console.log(prjItem);
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    // Drag후, Drop 가능한 장소임을 형상화하기위한 Method로 사용
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      // console.log('dragOverHandler',event);
      event.preventDefault();
      // ! "Drop을 가능하게 하려면" JS의 "dragover" event에서 preventDefault()를 실행해줘야함. // 다른 event에서는 소용없음.
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @AutoBind
  dragLeaveHandler(event: DragEvent) {
    // console.log('dragLeaveHandler',event);
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProject = projects.filter((prj) => {
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
