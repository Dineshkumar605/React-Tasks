const firstCheckBox = document.getElementById("first-check-box");
const secondCheckBox = document.getElementById("second-check-box");
const thirdCheckBox = document.getElementById("third-check-box");
const fourthCheckBox = document.getElementById("fourth-check-box");
const fifthCheckBox = document.getElementById("fifth-check-box");

const allCheckBoxs = [firstCheckBox,secondCheckBox,thirdCheckBox,fourthCheckBox,fifthCheckBox];


function onHandleCheckAll(){
    for (let i = 0;i <  allCheckBoxs.length;i++) {
        allCheckBoxs[i].checked = true;
    };
}

function onHandleUnCheckAll(){
    for (let i = 0;i <  allCheckBoxs.length;i++) {
        allCheckBoxs[i].checked = false;
    };
}

function onHandleOppositeCheck(){
    for (let i = 0;i <  allCheckBoxs.length;i++) {
        if (allCheckBoxs[i].checked) {
            allCheckBoxs[i].checked = false;
        } else{
            allCheckBoxs[i].checked = true;
        }
    }
}

function onHandleReset(){
    onHandleUnCheckAll();
}