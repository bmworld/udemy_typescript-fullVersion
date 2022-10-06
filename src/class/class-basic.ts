// ! 강사님 Tip) 코드는 의도를 명확히 하고, 깔끔하게 작성하는 것이 좋다
//  => WHY ? 몇 주 동안 작업을 쉴 경우, 인간은 까먹기 쉽상이기 떄문이다.

class Department {
  // name: string = 'initial name value'; // 이렇게 초기값을 설정할 수 있다.
  // name: string; // 초기값을 할당하지 않은 경우.
  // ! public 속성은 기본으로 할당됨 (public name:string)
  // ! private 속성은 오직 클래스 내부에서만 (클래스 메소드 내부에서) 접근가능 && 하위 클래스에서도 접근 불가.
  // ! readonly 키워드: typescript ONLY 기능 / 초기화 중에, 단 한 번만 사용할 수 있음.
  // ! protected: 외부 접근불가, 클래스를 확장하는 모든 클래스에서 사용가능.
  protected employees: string[] = [];
  // private 키워드는 외부에서 접근할 수 없도록 함. ! typescripte ONLY && runtime(JS로 compile이후) 작동하지 않음.
  // 내부에서만 값을 변경할 수 있음.

  constructor(private readonly id: string, public name: string) {
    // class 초기화 코드없이 , 매개변수에서 바로 초기화까지 축약하는 방법
    // console.log(this); // - Class 내부의 this는 class자체를 가리킨다.
    // this.id = id;
    // th₩is.name = name;
  }

  // Department.prototype.describe = fuction (){...} // Method는 compile이후, 생성자 함수의 프로톼입에 추가된다.
  describe(this: Department) {
    /*
      this를 매개변수로 할당할 경우, 명시적으로 class가 this임을 전달하므로, 명시적으로 this를 전달할 수 있다
      new keyword없이 객체에 할당하는 경우(아래의 accountingCopy)에도
      this가 class객체로 할당될 수 있도록 할 수 있게 한다.
      즉 this는 Department 클래스에 기반한 Instance를 참조하도록한다.
    */
    console.log("DeaprtMent > descibe Method > this: ", this);
  }

  addEmployee(employee: string) {
    // this.id = this.employees.length+1; // readonly 속성으로 인하여, 초기화를 제외하고 변경할 수 없다.
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log("employees: ", this.employees);
  }
}

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
}

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
  # set
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
acnt.mostRecentReport = 'Report: 등호를 사용하여, setter Method가 실행된다.'; // ! get, set은 메소드로 실행하는게 아니라, '값'처럼 접근해야한다.
acnt.addReport("Report: Something went wrong...");
console.log(acnt.mostRecentReport);
acnt.addEmployee("Max");
acnt.addEmployee("Beom");

acnt.printReports();
acnt.printEmployeeInfo();


// ------------------------------------------------------------------------------------------------
// 클래스를 instnace화하지 않고, 접근하도록 만들기