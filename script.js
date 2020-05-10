//Obtain elements from DOM to manipulate
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show error message
function showError(input, message) {
	let formControl = input.parentElement;
	formControl.className = "form-control error";
	let small = formControl.querySelector("small");
	small.innerText = message;
}

//Show success messages
function showSuccess(input) {
	let formControl = input.parentElement;
	formControl.className = "form-control success";
}

//Check if required fields have input
function checkRequired(inputArr) {
	inputArr.forEach((input) => {
		if (input.value.trim() === "") {
			console.log("Error");
			showError(input, `${getFieldName(input)} is required`);
		} else {
			console.log("Success");
			showSuccess(input);
		}
	});
}

//Check if field meets minimum and maximum length requirements
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} needs to be at least ${min} characters.`
		);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} needs to be no more than ${max} characters.`
		);
	} else {
		showSuccess(input);
	}
}

//Validate email format
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(String(email.value).toLowerCase())) {
		showError(email, "Email format is not valid.");
	} else {
		showSuccess(email);
	}
}

//Validate that two input fields have the same value
function checkMatch(input1, input2) {
	if (input1.value != input2.value) {
		showError(input2, "Passwords do not match.");
	} else {
		showSuccess(input2);
	}
}

//Obtain and correctly format field name for UI display
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listener on submit
form.addEventListener("submit", function (e) {
	e.preventDefault();

	checkRequired([username, email, password, password2]);
	checkLength(username, 5, 10);
	checkLength(password, 3, 10);
	validateEmail(email);
	checkMatch(password, password2);
});
