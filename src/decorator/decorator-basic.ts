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
//  ㄴ 고급기능: Decorator는 새로운 Class 또는 constructor()함수 반환가능 (옛것을 대체)
function LoggerFunc(logString: string) {
  console.log('--- LOGGER FACTORY');
  return function (constructor: Function) {
    console.log('--- Rendering Log:',logString,'\nconstructor:',constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('*** TEMPLATE FACTORY');
  // ! Generic Type을 할당하여, new 새로운 클래스(객체)의 타입을 할당해준다.
  // ! new 생성자함수의 매개변수(args)는 어떤게 올지 모르니, any타입의 배열로 할당해준다. => 이건 새로 반환되는 class의 constructor에 해당한다.
  // ! new로 생성된 함수는 object{}를 반환한다는 것을 명시해준다.
  //  ㄴ 이때 반환되는 값은, 아무 객체에나 적용하는 것이 아닌 Decorator_Person에만 적용할 것이므로
  //  ㄴ 특정한 객체(name과 job을 포함하는 객체)를 반환한다는 것을 명시해줘야..TS가 this.name 및 this.job을 찾을 수 없다는 ERROR를 발생시키지 않는다.
  //  ㄴ 위와 같은 "기준을 충족하지 않는 Class"에 WithTemplate Decorator를 추가하면 ERROR발생시킨다..
  
  return function<T extends {new (...args: any[]): {name: string, job: string}}> (originalContructor: T) {
    // # Decorator를 사용하여, 새로운 Class를 반환할 수 있다
    return class extends originalContructor {
      constructor (..._: any[]) {
        // ! ..._(아래하이픈): 매개변수가 존재하지만 사용하지 않을 것이며, 미사용 매개변수 ERROR를 무시함
        //  Ex. (...args: any[]) 사용 => 에러가 발생함.
        //  Ex. (..._: any[]) 사용 => 미사용 매개변수 무시
        
        super(); // ! super()를 사용하여, original constructor를 참조한다.
        /*
        # super의 기술적 의미
          => 상속된(자식) class에 요소 추가 시 새로 추가되는 parameter를 정의하려면 기존(부모)-class constructor를 다시 정의해 주어야 한다.
          => 이 과정에서 생기는 중복되는 코드가 발생해, error발생 확률 증가, 메모리 낭비 등 매우 비효율적인 낭비가 생긴다.
          => 이러한 부분을 super로 해결할 수 있다.
        */
        // 만약 클래스 내에 constructor 함수를 추가하면, 클래스가 '확장'되는 것이기 때문에, 여기서는  super를 사용한다.
        console.log('*** Rendering template');
        const hookEl = document.getElementById(hookId);
        // const p = new originalContructor();
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector(".name")!.textContent = this.name;
          hookEl.querySelector(".job")!.textContent = this.job;
        }
      }
      
      // ! 여기서는 기존 constructor에 기반한 class를 반환하는 것이므로,
      //  결국 기존 constructor를 변환시키는 문법적 설탕이다.
      //
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


const personForDecorator = new Decorator_Person();
console.log('personForDecorator: ',personForDecorator);


// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
console.log("--------------------------------------");


/* # 접근자 & 매개변수 데코레이터
    _ Class객체의 "속성 / 접근자 / 매서드 / 매개변수"에 데코레이터를 추가할 수 있다.
    ! 데코레이터의 실행순서: '클래스를 정의'와 동시에 실행됨
     ㄴ 메소드를 불러내거나, 프로퍼티를 사용할 때 실행되는 것이 아니다.
*/


// # 클래스의 Property에 Decorator를 추가하여, 해당 값에 접근할 수 있다. (! 특정 내용/값 return반환 불가 => return반환값이 지원되지 않거나, 사용할수 없음)
function Log_product_property (target: any, propertyName: string | Symbol) { // 첫번째 매개변수는 객체(Class)의 PROTOTYPE이다. 즉, constructor함수 (고정된 메서드) // 객체(class)가 어떤 것이 될지 모르기때문에, target의 타입은 any로 지정한다.
  console.log('Property decorator!\n','- target:',target, '\n- propertyName:', propertyName);
  // console.log('tt',test);

}

// # 클래스의 Accessor(getter /setter)에 대한 Decorator ( * 특정 내용/값 return반환 가능)
function Log_product_accessor (target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!\n','- target:',target,'\n- name:', name, '\n- descriptor:', descriptor );
  
  // function Log_product_accessor (target: any, name: string, descriptor: PropertyDescriptor):PropertyDescriptor{
  // ...
  // return {
  //   configurable: true,
  //   // enumerable: true, // vailla JS에 기본 내장된 기능으로, 새로운 PropertyDescriptor를 반환하는 동시에 , 설정을 변겨할 수 있다.
  //   get() {
  //     console.log('변경된 getter')
  //   },
  //   set (val: string) {
  //     console.log('value: ', val);
  //   }
  // };
  // }
}

// # 클래스의 method에 대한 Decorator ( * 특정 내용/값 return반환 & TS에서 사용 가능)
function Log_product_method (target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator!\n','- target:',target,'\n- name:', name, '\n- descriptor:', descriptor );
  
}

// # 클래스의 매서드의 매개변수에 대한 Decorator (! 특정 내용/값 return반환 불가 => return반환값이 지원되지 않거나, 사용할수 없음)
function Log_product_parameter (target: any, name: string | Symbol, position: number) {
  // ! 첫 번째 param: 객체정보 (constructor 및 get, set, method등의 모든 정보포함)
  // ! 두 번째 param: 매개 변수를 사용하는 "매서드 이름"(매개 변수의 이름 X)
  // ! 세 번째 param: 인수의 'Index' (ex. 첫번째 param일 경우 0)
  console.log('Parameter decorator!\n',target,'\n- name:', name, '\n- position:', position );
}


class Product {
  @Log_product_property
  title: string;
  category: string[];
  private _price: number;
  
  @Log_product_accessor
  set price (val: number) {
    if(val > 0){
      this._price = val;
    } else {
      throw new Error ('Invalid price - should be positive!');
    }
  }
  
  constructor (t: string, p : number,c:string[]) {
    this.title = t;
    this._price = p;
    this.category = c;
  }
  
  @Log_product_method
  getPriceWithTax ( tax: number, @Log_product_parameter option: object) {
    return this._price * (1 + tax) + (option ? 200 : 0);
  }
}


// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
console.log("-----------------AutoBind Decorator---------------------");

// # AutoBind Decorator 만들기 => this를 class에 자동으로 binding 해줌
function Autobind (target: any, methodName: string | Symbol, descriptor: PropertyDescriptor) {
  console.log(target, methodName, descriptor);
  // ! 첫번째 매개변수: target은 Prototype객체가 되거나, 정적(static) 메서드에 추가할 경우,생성자 함수도 될 수 있음.
  const originalMethod = descriptor.value; // Class에 자동으로 this바인딩할 Method (Ex. 아래 Printer_Example의 showMessage)
  // # 설정이 변경된 Descriptor를 만들어준다.
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false, // false일 겨우, for in Loop를 표시하지 않도록 함.
    get() {
      // getter: 사용자들이 이 property(discriptor.value)에 접근을 시도할 때, 몇 가지 추가적인 로직을 실행하여 해당 property의 값이나 함수를 직접 식ㄹ행하지 않게 할 수 있다.
      // getter는 긱본적으로 get값이 반환되기 전에 실행되는 추가적인 로직이 있는 "value" property를 지닌다.
      console.log('--> 여기 새로운 config에 get() 전체를 주석처리 해보시라, 그럼 @AutoBind의 효과를 확인할 수 있다.')
      const boundFn = originalMethod.bind(this);
      // ! 여기서 this는 getter Method를 trigger하는 대상을 참조
      return boundFn;
    }
  }
  
  return adjDescriptor;
  // ! 새로운 descriptor 객체를 반환하여, 이전의 descriptor객체를 덮어씌운다.

}

class PrinterWithAutoBind {
  message = 'Printer_Example works!';
  
  @Autobind
  showMessage () {
    console.log('this:',this,'\nthis Message:', this.message);
  }
}

const printClass = new PrinterWithAutoBind();

// # No Bind  && @AutoBind Decorator Ver.
const button_forDecorator = document.querySelector('button.decorator')!;
if(button_forDecorator) {
  button_forDecorator.addEventListener('click', printClass.showMessage );
}


// ! addEventListner에서 함수를 바로 실행했을 때 this : button
//  this가 printClass를 지칭하도록 바인딩 작업을 해줘야한다.
//  ******** BUT, @AutoBind Decorator를 사용할 경우, this가 Class객체를 지칭함
// # Bind Ver.
// button_forDecorator.addEventListener('click', (printClass.showMessage.bind(printClass)));

