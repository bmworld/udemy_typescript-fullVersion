// #   VALIDATION
export interface Validatable {
  value: string | number;
  required?: boolean; // ! value외에는 propertyName 뒤에 물음표를 붙여 "선택사항"이 되도록 한다.
  minLength?: number; // 용도: 문자열의 길이를 확인
  maxLength?: number; // 용도: 문자열의 길이를 확인
  min?: number; // 용도: 수치 값이 최소값 이상인지 확인
  max?: number; // 용도: 수치 값이 최대값 이하인지 확인
}

export function validate(validatableInput: Validatable): boolean {
  // console.log("validatableInput", validatableInput);
  let isValid = true;
  if (validatableInput.required) {
    // 해당 값이 '필수'값이라면, 문자열의 길이를 확인한다.
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    // ! validatableInput.minLength != null ===> 최소길이가 0 으로 설정되는 것까지 포함하여서 현재 if문 내의 validation 실행되도록 함.
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }

  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}
