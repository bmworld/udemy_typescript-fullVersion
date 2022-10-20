import {Project, ProjectStatus} from "../models/project-model";


// # Project state management
//  => 전역에서 상태를 관리하는 클래스 => 단 1개만 존재해야 하므로, "싱글톤 클래스"로 구성.
//  => 싱글톤 클래스는 "new"로 생성하지 않고, Method를 생성 후, 호출하여 구성
//    ㄴ 따라서, 특정 시점에 반드시 단 하나의 클래스 인스턴스가 존재한다.

// type Listener와  class State는
// 현재 project-state.ts파일 내부에서만 사용하므로, export를 하지 않는다.
type Listener<T> = (items: T[]) => void; // Listener의 타입을 설정하고, 반환되는 타입은 신경쓰지 않는다.

class State<T> {
  // ! protected : 상속되는 클래스에서는 접근가능하도록 함 (private은 상속클래스에서 접근 불가능)
  protected listeners: Listener<T>[] = []; // ! Listener의 역할: "무언가 변경될 때마다" 함수 목록이 호출되도록 한다. 해당 listener를 우리에게 전달하는자들이 리스너가
  addListener(listenerFn: Listener<T>): void {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
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
      Math.floor(Math.random() * 1000).toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);

    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    // drag & drop이 되는 순간, projectItem의 id를 event.dataTransfer의 setData , getData를 통해서 옮기도록 설정해두었다. 그걸 활용.
    const thisProject = this.projects.find((prj) => prj.id === projectId);
    console.log("moveProject > thisProject: ", thisProject);
    if (thisProject && thisProject.status !== newStatus) {
      thisProject.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
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

export const projectState = ProjectState.getInstance();

console.log('Module에서 여러번 import되는 파일은 몇번 실행될까?\n porject-state.ts의 projectState는 2개 이상의 파일에서 import한다!!!! 몇번 실행될까??')
