// Here, we are using type assertion with HTMLFormElement & HTMLInputElement
// This is telling the compiler, which is either deciding between one of the two above or null.
// This says we know better what the actual type is.
// instead of <HTMLFormElement>, we could also do 'as HTMLFormElement' at the end.
const form = <HTMLFormElement>document.getElementById("form");
const username = <HTMLInputElement>document.getElementById("username");
const email = <HTMLInputElement>document.getElementById("email");
const password = <HTMLInputElement>document.getElementById("password");
const passwordConfirmation = <HTMLInputElement>(
  document.getElementById("passwordConfirmation")
);

function showError(input: HTMLElement, message: string) {
  const formControl = <HTMLElement>input.parentElement;
  formControl.className = "form-control error";
  const small = <HTMLElement>formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input: HTMLElement) {
  const formControl = <HTMLElement>input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input: HTMLInputElement) {
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (res.test(input.value.trim())) showSuccess(input);
  else showError(input, "Email is not valid");
}

function checkRequired(inputArray: HTMLFormElement[] | HTMLInputElement[]) {
  inputArray.forEach((input: any) => {
    if (input.value.trim() === "")
      showError(input, `${getFieldName(input)} is required`);
    else showSuccess(input);
  });
}

function checkLength(
  input: HTMLFormElement | HTMLInputElement,
  min: number,
  max: number
) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(
  input1: HTMLInputElement,
  input2: HTMLInputElement
) {
  if (input1.value !== input2.value)
    showError(input2, "passwords do not match");
}

function getFieldName(input: HTMLElement) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  checkRequired([username, email, password, passwordConfirmation]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, passwordConfirmation);
});
