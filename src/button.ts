
const button = document.querySelector('button')!;
// - 느낌표는, javscript에게 해당 버튼이 반드시 존재한다는 의미를 코드상으로 전달하는 것이다.

button.addEventListener('click', () => {
  console.log('button click!');
});