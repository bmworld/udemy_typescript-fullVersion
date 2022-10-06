// ! 강사님 Tip) 코드는 의도를 명확히 하고, 깔끔하게 작성하는 것이 좋다
//  => WHY ? 몇 주 동안 작업을 쉴 경우, 인간은 까먹기 쉽상이기 떄문이다.

class Department {
  // private readonly id: string;
  // ! private 속성은 오직 클래스 내부에서만 (클래스 메소드 내부에서) 접근할 수 있다.
  // ! readonly 키워드: typescript ONLY 기능 / 초기화 중에, 단 한 번만 사용할 수 있음.
  // name: string = 'initial name value'; // 이렇게 초기값을 설정할 수 있다.
  // name: string; // 초기값을 할당하지 않은 경우.
  // public 키워드는 기본으로 할당됨 (public name:string)
  // 외부에서 접근가능.
  private employees: string[] = [];
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
  constructor(id: string, admins: string[]){
    // id를 Deaprtment 생성자에 전달한다.
    // super키워드는 다른 클래스로부터 상속받는 클래스에 고유 생성자를 추가할 때마다 상속하는 클래스로
    // super를 추가하고 함수처럼 실행해야한다.
    super(id, '상속받은녀석이 전달하는 name'); // super 키워드로 부모에게 전달.
    this.admins = admins;
  }

}


class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]){
    super(id, 'AccountingName'); // super 키워드로 부모에게 전달.
  }
  addReport (text: string) {
    this.reports.push(text);
  }
  
  printReports () {
    console.log(this.reports)
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

const it = new ITDepartment("d1", ['Max']); // 클래스를 상속받는 경우
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



const acnt = new AccountingDepartment('d2',[]);

acnt.addReport('Something went wrong...');

acnt.printReports();