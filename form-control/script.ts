const form = document.getElementById("form") as HTMLFormElement;
const username = document.getElementById("username") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const passwordConfirmation = document.getElementById(
  "passwordConfirmation"
) as HTMLInputElement;

function showSuccess(input: HTMLInputElement) {
  const formControl = input.parentElement as HTMLElement;
  formControl.className = "form-control success";
}

function showError(input: HTMLInputElement, message: string) {
  const formControl = input.parentElement as HTMLElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small") as HTMLElement;
  small.innerText = message;
}

function requiredField(input: HTMLInputElement) {
  if (input.value.length < 1) showError(input, "field is required");
}

// Check that the required fields exist
function checkRequired(inputArray: HTMLInputElement[]) {
  inputArray.forEach((input: HTMLInputElement) => {
    if (input.value.trim() === "")
      showError(input, `${getFieldName(input)} is required`);
    else showSuccess(input);
  });
}

function checkLength(input: HTMLInputElement, min: number, max: number) {
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

function checkEmail(input: HTMLInputElement) {
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (res.test(input.value.trim())) showSuccess(input);
  else showError(input, "Email is not valid");
}

function checkPasswordsMatch(
  input1: HTMLInputElement,
  input2: HTMLInputElement
) {
  if (input1.value !== input2.value)
    showError(input2, "passwords do not match");
}

// Get the field name
function getFieldName(input: HTMLInputElement) {
  if (input === passwordConfirmation) input.id = "password Confirmation"; // add a space
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  checkRequired([username, email, password, passwordConfirmation]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, passwordConfirmation);

  console.log(
    "username = " +
      username.value +
      "\n" +
      "email = " +
      email.value +
      "\n" +
      "password = " +
      password.value
  );
});
