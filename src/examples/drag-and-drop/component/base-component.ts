// # Refactoring => Component Base Class :공통적으로 사용되는 요소를 해당 Class를 바탕으로 상속되도록 한다.
// ! abstract 추상 클래스로 만들어서, 직접 인스턴스화가 이뤄지지 않게 한다.
//  why ? 언제나 '상속'하는 역할만 하게 만들기 위함.

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
