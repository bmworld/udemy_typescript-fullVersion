/*
  # namespace (파일을 분리하는데 사용 / TYPESCRIPT ONLY)
   _ namespace내부의 요소들은 namespace에서만 이용가능하다.
   _ 모든 키워드를 사용할 수 있다 (class, 상수(const), interface 등..)
*/
/*
    #  Drag & Drop Interface
     interface는 일부 객체의 구조를 단순히 정의하기 위함이 아닌,
     어떤 클래스들이 이 클래스들로 하여금, 특정 메소드를 실행하도록 하는,
     일종의 계약(contract)를 맺게 해준다.
     => 효과 : 더큰 App을 만들 때, 더 깔끔하고, 이해하기 쉬운 코드를 쓰기 위함. (특히, '팀'단위로 일할 때.)
     ! But, interface는 오직 해당 namespace내부에서만 이용가능하다.
  */
export interface Draggable {
  // ! Drag Event를 활성화하려면, HTML태그에 draggable='true' 속성을 추가해야한다.
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragType {
  // 드레깅 가능한 요소를 Rendering할 때 쓰임=> 여기서는 projectItem Class가 될거다.
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
