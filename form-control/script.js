var form = document.getElementById("form");
var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var passwordConfirmation = document.getElementById("passwordConfirmation");
function showSuccess(input) {
    var formControl = input.parentElement;
    formControl.className = "form-control success";
}
function showError(input, message) {
    var formControl = input.parentElement;
    formControl.className = "form-control error";
    var small = formControl.querySelector("small");
    small.innerText = message;
}
function requiredField(input) {
    if (input.value.length < 1)
        showError(input, "field is required");
}
// Check that the required fields exist
function checkRequired(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value.trim() === "")
            showError(input, getFieldName(input) + " is required");
        else
            showSuccess(input);
    });
}
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, getFieldName(input) + " must be at least " + min + " characters");
    }
    else if (input.value.length > max) {
        showError(input, getFieldName(input) + " must be less than " + max + " characters");
    }
    else {
        showSuccess(input);
    }
}
function checkEmail(input) {
    var res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (res.test(input.value.trim()))
        showSuccess(input);
    else
        showError(input, "Email is not valid");
}
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value)
        showError(input2, "passwords do not match");
}
// Get the field name
function getFieldName(input) {
    if (input === passwordConfirmation)
        input.id = "password Confirmation"; // add a space
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkRequired([username, email, password, passwordConfirmation]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, passwordConfirmation);
    console.log("username = " +
        username.value +
        "\n" +
        "email = " +
        email.value +
        "\n" +
        "password = " +
        password.value);
});
