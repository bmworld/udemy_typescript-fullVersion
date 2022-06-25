
// const person = {
//   name: 'BM WORLD',
//   age: 33,
//   hobby: ['Sports', 'Cooking'],
//   role: [2, 'author']
// }
//


// - Tuple Type: Added by Typescript: Fided-legnth Array (TS에서 제공하는 타입이며, 배열의 길이가 고정된 타입이다)
//
// const person: {
//   name: string;
//   age: number;
//   hobby: string[];
//   role: [number, string]; // - typescript에서만 적용되는 TUPLE Type이다.
// } = {
//   name: 'BM WORLD',
//   age: 33,
//   hobby: ['Sports', 'Cooking'],
//   role: [2, 'author']
// }


// person.role.push('admin'); // ! push는 가능하다.
// person.role[3] = 10; // ! ERROR: 듀플타입에서, 타입정의가 끝난 뒤, 순서로 배열을 변화시키려할 때는 에러가 발생한다.
// console.log(person);
// person.role = [1,'zz',  123]; // ! push가 아닌 경우에는 , 새로 할당하는 것 type정의에 명시단 배열을 따른다.


///// -----


// const ADMIN = 0;
// const READ_ONLY = '1';
// const AUTHOR = 2;


//- enum타입은 아무것도 지정하지 않은 경우에는 0부터 숫자를 매긴다.
enum Role {
  ADMIN, READ_ONLY, AHUTOR,
};

export const person = {
  name: 'BM WORLD',
  age: 33,
  hobby: ['Sports', 'Cooking'],
  // role: ADMIN
  role: Role.ADMIN
}


let favoriteActivities : any []; //- any 타입지정은 typescript의 효과를 희석시킨다.
favoriteActivities = ['sports', 'z', 1];


for (const hobby of person.hobby) {
  // console.log(hobby.toUpperCase());
  // console.log(Number(hobby));
// console.log(hobby.map(()=>{})) // ! ERROR: string은 순회할 수 없음
}


if(person.role === Role.ADMIN){
  console.log('is author')
}

console.log(person)



export function getEmployee(id:string, name:string, salary:string) {
  return {
    id,
    name,
    salary,
  };
}
