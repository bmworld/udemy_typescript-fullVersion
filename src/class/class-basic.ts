// ! 강사님 Tip) 코드는 의도를 명확히 하고, 깔끔하게 작성하는 것이 좋다
//  => WHY ? 몇 주 동안 작업을 쉴 경우, 인간은 까먹기 쉽상이기 떄문이다.


// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
abstract class Department {
  // # static Property (정적 속성)
  static fiscalYear = 2022;
  // ----------------------------------------------------------------
  // name: string = 'initial name value'; // 이렇게 초기값을 설정할 수 있다.
  // name: string; // 초기값을 할당하지 않은 경우.
  // ! public 속성은 기본으로 할당된다 (public name:string)
  // ! private 속성은 오직 클래스 내부에서만 (클래스 메소드 내부에서) 접근가능 && 하위 클래스에서도 접근 불가.
  // ! readonly 키워드: typescript ONLY 기능 / 초기화 중에, 단 한 번만 사용할 수 있음.
  // ! protected: 외부 접근불가, 클래스를 확장하는 모든 클래스에서 사용가능.
  protected employees: string[] = [];
  // private 키워드는 외부에서 접근할 수 없도록 함. ! typescripte ONLY && runtime(JS로 compile이후) 작동하지 않음.
  // 내부에서만 값을 변경할 수 있음.

  // ----------------------------------------------------------------
  constructor(protected readonly id: string, public name: string) {
    // class 초기화 코드없이 , 매개변수에서 바로 초기화까지 축약하는 방법
    // this.id = id;
    // this.name = name;
    // console.log(this); // - Class 내부의 this는 class자체를 가리킨다.
    /*
    # this
     _ class를 기반으로 생성된 ****Instnace를 참조***한다
     _ 따라서 static으로 생성된 정적 속성 및 정적 메소드를 참조할 수 없다
     _ examples
     console.log(this.fiscalYear)  <--에러발생
     console.log(Department.fiscalYear)  <--참조가능
    */
    
  }
  
  /* # static Method (정적 매서드)
      1. 인스턴스없이, 클래스에서 접근할 수 있는 정적메소드로 만듦
      2. 객체를 반환해야함.
  */
  static createEmployee (name: string) {
    return {
      name: name
    }
  }

  // Department.prototype.describe = fuction (){...} // Method는 compile이후, 생성자 함수의 .prototype에 추가된다.
  /*
  this를 매개변수로 할당할 경우, 명시적으로 class가 this임을 전달하므로, 명시적으로 this를 전달할 수 있다
  new keyword없이 객체에 할당하는 경우(아래의 accountingCopy)에도
  this가 class객체로 할당될 수 있도록 할 수 있게 한다.
  즉 this는 Department 클래스에 기반한 Instance를 참조하도록한다.
*/
  // describe(this: Department) {
  //   console.log("DeaprtMent > descibe Method > this: ", this);
  // }
  /*
   # abstract: 추상클래스
     _ 원본 클래스에서는 해당 method의 형태만 제공한다
     _ 더불어서, class 선언앞에 abstract를 추가해줘야한다. // abstract class MyClassName () {...}
     _ 보유(반환)해야하는 타입을 명시한다. (아래 샘플에서는 :void)
     _ 모든 Instance에서는 absctract Method를 무조건 써야한다.
     _ 용도: 추상 클래스는 일부 상위 클래스를 기반으로 하는 "모든 클래스가", 일부 공통 메소드 또는 속성을 공유하도록 하는 경우...
         구체적인 값, 구체적인 구현 및 기본 클래스를 제공하지 않는 상황이고, 상속하는 클래스가 이를 각각 수행시키려고 할때 사용한다 .
     
  * */
  abstract describe(this: Department): void
  

  addEmployee(employee: string) {
    // this.id = this.employees.length+1; // readonly 속성으로 인하여, 초기화를 제외하고 변경할 수 없다.
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log("employees: ", this.employees);
  }
}


// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
class ITDepartment extends Department {
  admins: string[];

  // - 하위클래스 내에서 constructor 관련 코드 => '하위' 클래스 내에서 기본 클래스의 생성자를 호출하는 과정이다.
  constructor(id: string, admins: string[]) {
    // id를 Deaprtment 생성자에 전달한다.
    // super키워드는 다른 클래스로부터 상속받는 클래스에 고유 생성자를 추가할 때마다 상속하는 클래스로
    // super를 추가하고 함수처럼 실행해야한다.
    super(id, "상속받은녀석이 전달하는 name"); // super 키워드로 부모에게 전달.
    this.admins = admins;
  }
  
  describe(){
    console.log('IT Department-ID:', this.id);
  }
}

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
class AccountingDepartment extends Department {
  private lastReport: string;

  /*
   # getter & setter :
    1.로직을 캡슐화
    2.속성을 읽거나 설정할 때 사용.
    3. 객체 생성 시, 실행되어야하는 추가적인 로직을 추가하는데 유용.
    
   # getter
    - 메소드와 같아서, 괄호 및 중괄호 쌍을 입력해야함.
    - 반드시, 코드 블록 내에 return을 통해 반환해야함.
    - getter 사용 시, 메소드로서 실행하는게 아닌, 일반 속성처럼 접근한다
     => 괄호쌍"()"을 사용하는게 아니다.
      const acnt = new AccountingDepartment(...);
     ex. acnt.mostRecentReport
  */
  get mostRecentReport() {
    // 보통 더 복잡한 로직을 사용할 때, getter를 사용한다.
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  /*
  # setter
   - 사용자가 전달할 값인 인수를 취하도록 한다.
  * */
  set mostRecentReport(value: string) {
    // class내의 addReport와 같은 역할이므로, 이를 대체할 수 있다.
    if(!value){
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "AccountingName"); // super 키워드로 부모에게 전달.
    this.lastReport = reports[0];
  }
  
  describe() {
    console.log('Accounting Department-ID:', this.id)
  }

  addEmployee(name: string) {
    if (name === "Max") {
      console.log("Max는 Employee로 등록할 수 없습니다.");
      return; // 아래에서 Max를 admin으로 설정한 것과 관련하여, validation추가한 거다.
    }
    this.employees.push(name);
    // private 속성인 employees는 정의된 클래스 내에서만 접근가능하며
    // 해당 클래스로부터 상속받는 클래스에서는 접근 불가능하다.
    // 이때 외부에서는 접근불가능 하지만, 상속받은 클래스에서는 변경가능하도록 하려면,
    // protected 키워드로 변경해준다.
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

// ------------------------------------------------------------------------------------------------

// const accounting = new Department("1", "Accounting!!"); // 기본 클래스 사용

/*
  const accountingCopy = {
    //이 객체 내부에서, class가 실행될 때의 this는 accountingCopy를 가리킨다.
    name: "DUMMY Name",
    describe: accounting.describe,
  };
  accountingCopy.describe(); // 여기에 에러가나는 이유는 accountingCopy의 describe호출 시, Deaprtment의 인스턴스를 호출한 것이 아니기 때문이다.

*/


const employee1 = Department.createEmployee('Max1');
console.log('[static 키워드, 정적 메소드 사용하기] employee1: ',employee1)
console.log('[static 키워드로, 정적 속성 사용하기] fiscalyear: ', Department.fiscalYear)
const it = new ITDepartment("d1", ["Max"]); // 클래스를 상속받는 경우
it.addEmployee("Max");
it.addEmployee("Anna");
// accounting.name = "ExternalEditedName";
// accounting.id = "213"; // private키워드를 사용한 필드는 외부에서 편집할 수 없다.
/*
 ! // accounting.employees[4] = 'bmworld'; // 외부에서 instance의 내부 필드를 직접 접근해서 변경하려는 경우
 - 외부에서 class 내부 field를 직접 변경하는 것을 막기 위해 private keyword를 추가하여, Private Field로 변환한다.
 - private Field는 생성된 객체 내부에서만 접근할 수 있는 속성이 되었다는 의미.
*/
it.describe();
it.printEmployeeInfo();

const acnt = new AccountingDepartment("d2", []);
// console.log(acnt.mostRecentReport)
acnt.mostRecentReport = 'Report: 등호를 사용하여, setter Method가 실행된다.';
// ! get, set은 메소드로 실행하는게 아니라, '값'처럼 접근해야한다.
acnt.addReport("Report: Something went wrong...");
console.log(acnt.mostRecentReport);
acnt.addEmployee("Max");
acnt.addEmployee("Beom");

// acnt.printReports();
// acnt.printEmployeeInfo();
acnt.describe();



// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------


/* # 싱글턴 패턴
    _ 객체지향프로그래밍의 설계패턴 중 하나
    _ 특정 클래스의 인스턴스를 딱 하나만 갖도록 함
    _ 이 패턴은 정적 메소드나 속성을 사용할 수 없거나 사용하지 않고자 하는 동시에
      클래스를 기반으로 여러 객체를 만들 수는 없지만
      항상 클래스 기반으로 정확히 하나의 객체만 가질 수 있도록 하는 경우 유용함.
    _ 해당 클래스의 인스턴스에서 constructor에 private 키워들르 붙여서 private 생성자로 변경할 수 있다.
*/