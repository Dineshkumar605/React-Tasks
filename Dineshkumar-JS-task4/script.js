const userInput = document.getElementById("user-input");
const errorMessage = document.getElementById("error-message");

function submitBtnHandler(){
    const userValue = userInput.value.trim();
    const specialChars = /[^A-Za-z 0-9]/g ;
    
    if(userValue === ""){
        errorMessage.innerHTML = "Please enter a sentence";
        errorMessage.style.color = "Red";
    }else if(specialChars.test(userValue)){
        errorMessage.innerHTML = "Special Character(s) not allowed";
        errorMessage.style.color = "Red";
    }else if(userValue.length === 1){
        errorMessage.innerHTML = "Please enter more than one charcter";
        errorMessage.style.color = "Red";
    }else{
        let newString ="";
        for(let i = userValue.length-1 ; i >= 0 ;i--){
            newString = newString + userValue.charAt(i);
        }
        errorMessage.innerHTML = "Reverse String : "+newString;
        errorMessage.style.color = "green";
    }
}

function resetBtnHandler(){
    userInput.value = "";
    errorMessage.innerHTML = "";
}
