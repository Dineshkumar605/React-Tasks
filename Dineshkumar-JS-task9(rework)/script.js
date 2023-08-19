const userInput = document.getElementById("input-value");
const positionInput = document.getElementById("position-value");
const errorMessage = document.getElementById("error-message");
const addValueInput = document.getElementById("add-value");

function onHandleErrorMsgColor() {
    errorMessage.style.color = "Red";
}

function onHandleSubmit() {
    const userValue = userInput.value.replaceAll(/[" "]+/g, "").replaceAll(/[,]+/g, ",").replaceAll(/[.]+/g, ".").split(",");
    const positionValue = positionInput.value.replaceAll(/[" "]+/g, "").trim();
    const addValue = addValueInput.value.replaceAll(/[" "]+/g, "").replaceAll(/[,]+/g," ");
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;
    const lettersAndSpecialChars = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]*$/
    var userValueInvaildNumber = [];
    var addValueInvaildNumber = [];

    for (let i = 0; i < userValue.length; i++) {
        var UserValueDotCount = userValue[i]?.split('.').length - 1;

        if (userValue[i] === "." || userValue[i] === "") {
            userValue.splice(userValue.indexOf(userValue[i]), 1);
        }
        if (userValue[i]?.endsWith(".") || userValue[i]?.startsWith(".")) {
            userValue[i] = userValue[i].replace(".", "");
        }
        if (UserValueDotCount > 1) {
            userValueInvaildNumber.push(UserValueDotCount);
        }
    }

    for (let i = 0; i < addValue.length; i++) {
        var addValueDotCount = addValue[i]?.split('.').length - 1;

        if (addValueDotCount === 1) {
            addValueInvaildNumber.push(addValueDotCount);
        }
    }
   
    onHandleErrorMsgColor();

    if (userValue.length === 0 || positionValue.length === 0 || addValue === "") {
        errorMessage.innerHTML = "Please fill the all fields";
    } else if (specialChars.test(userValue) || specialChars.test(addValue)) {
        errorMessage.innerHTML = "Special Character(s) not allowed";
    } else if (userValueInvaildNumber.length || addValueInvaildNumber.length > 1 || addValue === " ") {
        errorMessage.innerHTML = "Invaild number ";
    } else if (positionValue <= 0) {
        errorMessage.innerHTML = "Position must start with 1";
    } else if (lettersAndSpecialChars.test(positionValue)) {
        errorMessage.innerHTML = "Only numbers are allowed in the position field";
    } else if (isNaN(positionValue)) {
        errorMessage.innerHTML = "Only one number is allowed in the position field";
    } else if (userValue.length === 1) {
        errorMessage.innerHTML = "Please enter more than one words,characters or numbers in the input field";
    } else if (userValue.length < Math.floor(positionValue)) {
        errorMessage.innerHTML = "Enter position between 1 to " + userValue.length;
    } else {
        userValue.splice(Math.floor(positionValue - 1), 1, addValue);
        errorMessage.innerHTML = userValue;
        errorMessage.style.color = "Green";
    }
}

function onhandleReset() {
    userInput.value = "";
    positionInput.value = "";
    addValueInput.value = "";
    errorMessage.innerHTML = "";
}

