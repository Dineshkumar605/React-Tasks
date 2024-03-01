const userInput = document.getElementById("user-input");
const outputValue = document.getElementById("output-value");
const errorMessage = document.getElementById("error-message");

function onHandleEmptyErrorMsg() {
    outputValue.value = "";
    errorMessage.innerHTML = "";
}

function onHandleArithmeticOperation(add) {
    const userValue = userInput.value.replaceAll(/\s/g, "").replaceAll(/[.]+/g, ".").replace(/[.]$/, "").replaceAll(/[,]+/g, " ").trim().split(" ");
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;
    const letters = /[A-z]/g;

    onHandleEmptyErrorMsg();

    if (userValue[0] === "") {
        errorMessage.innerHTML = "Please enter a number";
    } else if (specialChars.test(userValue)) {
        errorMessage.innerHTML = "Special Character(s) not allowed";
    } else if (letters.test(userValue)) {
        errorMessage.innerHTML = "Letter(s) not allowed";
    } else if (userValue.length === 1) {
        errorMessage.innerHTML = "Please enter minimum two numbers";
    } else {
        if (add === 'Add') {
            var addValues = 0;
            for (let i = 0; i < userValue.length; i++) {
                addValues += Number(userValue[i]);
            }
            outputValue.value = addValues;
        } else {
            var mutiplevalues = 1;
            for (let i = 0; i < userValue.length; i++) {
                mutiplevalues *= Number(userValue[i]);
            }
            outputValue.value = mutiplevalues;
        }
    }
}

function onHandleReset() {
    onHandleEmptyErrorMsg();
    userInput.value = "";
}


