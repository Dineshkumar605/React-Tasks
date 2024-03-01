const userInput = document.getElementById("user-input");
const errorMessage = document.getElementById("error-message");

function vowelCheck() {
    const userValue = userInput.value.trim().split(" ");
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const vowelCheck = /[aeiouAEIOU]/.test(userValue);

    if (userValue[0] === "") {
        errorMessage.style.color = "red";
        errorMessage.innerHTML = "Please enter a sentence";
    } else if (userValue.length > 1) {
        errorMessage.style.color = "red";
        errorMessage.innerHTML = "Please enter only one word";
    } else if (specialChars.test(userValue)) {
        errorMessage.style.color = "red";
        errorMessage.innerHTML = "Special Character(s) not allowed";
    } else if (/\d/.test(userValue)) {
        errorMessage.style.color = "red";
        errorMessage.innerHTML = "Number(s) not allowed";
    } else if (userInput.value.trim().length === 1) {
        if (vowelCheck) {
            errorMessage.style.color = "Green";
            errorMessage.innerHTML = "This character is a Vowel";
        } else {
            errorMessage.style.color = "Green";
            errorMessage.innerHTML = "This character is not a Vowel";
        }
    } else if (vowelCheck) {
        errorMessage.style.color = "Green";
        errorMessage.innerHTML = "This word is contain a Vowel";
    } else {
        errorMessage.style.color = "Green";
        errorMessage.innerHTML = "This word doesn't contain a vowel";
    }
}

function formReset() {
    userInput.value = "";
    errorMessage.innerHTML = "";
}
