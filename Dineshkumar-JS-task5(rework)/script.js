const userInput = document.getElementById("user-input");
const resultMessage = document.getElementById("result-message");

function handleUserInput() {
    const userValue = userInput.value.replaceAll(/\s/g, "").replaceAll(/[.]+/g, ".").replaceAll(/[,]+/g, ",").replaceAll(/[,]+/g, " ").trim().split(" ");
    onHandleLargeNum(userValue[0], userValue[1], userValue);
}

function onHandleLargeNum(firstNum, secondNum, userValue) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;
    const letters = /[A-z]/g;

    if (userValue[0] === "" && userValue.length === 1)  {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Please enter a number";
    } else if (firstNum.charAt(0) === "." || (userValue[1] && userValue[1].charAt(userValue[1].length - 1) === ".")) {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Not allowed dot(.) at start and end";
    } else if (specialChars.test(userValue)) {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Special Character(s) not allowed";
    } else if (letters.test(userValue)) {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Letter(s) not allowed";
    } else if ((userValue[0] === "" || userValue[1] === "") || userValue.length === 1) {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Please enter the minimum two values";
    } else if (userValue.length > 2) {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Only two numbers are allowed";
    } else if (firstNum === secondNum) {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Both numbers are same";
    } else {
        if (Number(firstNum) > Number(secondNum)) {
            resultMessage.style.color = "green";
            resultMessage.innerHTML = "Largest Number is : " + firstNum;
        } else {
            resultMessage.style.color = "green";
            resultMessage.innerHTML = "Largest Number is : " + secondNum;
        }
    }
}

function onHandleReset() {
    userInput.value = "";
    resultMessage.innerHTML = "";
}