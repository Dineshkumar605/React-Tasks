const userInput = document.getElementById("user-input");
const errorMessage = document.getElementById("vaildation-message");


function onHandleSubmit() {

    const userValue = userInput.value.toLowerCase().trim().replaceAll(/\s/g, "");
    errorMessage.style.color = "red";
    errorMessage.style.fontWeight = "bold";
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (userValue === "") {
        errorMessage.style.textAlign = "center";
        errorMessage.innerHTML = "Please enter a sentence";
    } else if (specialChars.test(userValue)) {
        errorMessage.style.textAlign = "center";
        errorMessage.innerHTML = "Special Character(s) not allowed";
    } else if (/\d/.test(userValue)) {
        errorMessage.style.textAlign = "center";
        errorMessage.innerHTML = "Number(s) not allowed";
    } else if (userValue.length === 1) {
        errorMessage.style.textAlign = "center";
        errorMessage.innerHTML = "Please enter more than one charcter";
    } else {
        
        if (userValue.charAt(0) === userValue.charAt(userValue.length - 1)) {
            alert("First and last charcters are same");
            errorMessage.innerHTML = "";
        } else {
            errorMessage.style.textAlign = "center";
            errorMessage.innerHTML = "First and last charcters are not same";
        }
        
    }
}

function onHandleReset() {
    errorMessage.innerHTML = "";
    userInput.value = "";
}

