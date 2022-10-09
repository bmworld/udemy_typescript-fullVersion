console.log("---------------------- decorator-basic.ts ----------------");

/* # Decorator
    _ 정의: 클래스 프로퍼티나 메소드 혹은 클래스 자체를 수정하는 데 사용되는 자바스크립트 함수이다. (순수 함수로 작성되는 것이 좋다.)
    _ 함수 이름은 대소문자 구분없음 ( 보통 대문자로 시작함.)
    _ @(골뱅이) 사용 (의미: 코딩에서 읽히거나 찾게 되는 특별한 식별자의 상징)
    _ *** 데코레이터는 실체화되기 전, Class가 정의만 되어도 실행된다!
      ㄴ Class의 constructor함수가 Class를 실체화 하기 전 상태말이다.
    _ 인수(arguments)가 1개 이상 필요
*/

// # Decorator : 즉시 실행 VER.
function Logger(constructor: Function) {
  console.log("Logger....");
}

@Logger
class DecoratorPerson {
  name = "Max";
  constructor() {
    console.log("created Person Obj");
  }
}



// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
console.log("--------------------------------------");

// # Decorator : Decorator 반환하는 함수 VER.
function LoggerFunc(logString: string) {
  console.log('--- LOGGER FACTORY');
  return function (constructor: Function) {
    console.log('--- Rendering Log:',logString,'\nconstructor:',constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('*** TEMPLATE FACTORY');
  return function (constructor: any) {
    console.log('*** Rendering template');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector(".name")!.textContent = p.name;
      hookEl.querySelector(".job")!.textContent = p.job;
    }
  };
}


const template_for_decorator = `
    <h1>Decorator_person by Deocorator!</h1>
    <div>
      Name: <span class="name"></span>
    </div>
    <div>
      Job: <span class="job"></span>
    </div>
  `;



// # 복수의 Decorator
// ! "실제 Decorator"의 실행순서는 "아래에서 위로" (console.log를 잘 보시라.)
//  "Decorator FACTORY"는 "위에서 아래로"
@LoggerFunc('LOGGING-PERSON')
@WithTemplate(template_for_decorator, "app")
class Decorator_Person {
  name = "Bmworld";
  job = "Dev";
  constructor() {
    console.log("created Decorator_Person Obj");
  }
}
