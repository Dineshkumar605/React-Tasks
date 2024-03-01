const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-message");

function clickHandler() {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const splitValue = userInput.value.split(" ");
    const value = splitValue.filter((val) => val.trim() != "");
    let allEqual;

    for (let i = 0; i < value.length - 1; i++) {
        allEqual = value[i].length === value[i+1].length;
    }
    
    if (userInput === "" || !value?.length) {
        errorMessage.innerHTML = "Please enter a sentence";
    } else if (specialChars.test(userInput.value)) {
        errorMessage.innerHTML = "Special Character(s) not allowed";
    } else if (value.length === 1) {
        errorMessage.innerHTML = "Please enter a sentence which has more than one word";
    } else if (allEqual) {
        errorMessage.innerHTML = "All words are equal in length";
    }
    else {
        let min = value[0];
        let max = value[0];
        for (let i = 0; i < value.length; i++) {
            if (value[i].length < min.length) {
                min = value[i];
            };
            if (value[i].length > max.length) {
                max = value[i];
            };
        }
        errorMessage.innerHTML = "";
        alert("Smallest string : " + min + "      largest string : " + max)
    }
}