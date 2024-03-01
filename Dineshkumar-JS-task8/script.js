const dateOutput = document.getElementById("date");
const stringTimeAndDate = document.getElementById("string-date -time");
const stringDate = document.getElementById("string-date");
const stringTime = document.getElementById("string-time");
const currentYear = document.getElementById("current-year");
const currentMonth = document.getElementById("current-month");
const currentDate = document.getElementById("current-date");
const currentHour = document.getElementById("current-hour");
const currentMinutes = document.getElementById("current-minutes");
const currentSeconds = document.getElementById("current-seconds");
const currentMilliSeconds = document.getElementById("current-milli-seconds");

function onHandleDateAndTime() {
    const date = new Date();

    dateOutput.innerHTML = date ;
    dateOutput.innerHTML = date.getFullYear();
    dateOutput.innerHTML = date.getFullYear();
    stringTimeAndDate.innerHTML = date.toDateString() + "-" + date.toLocaleTimeString();
    stringDate.innerHTML += date.toDateString();
    stringTime.innerHTML += date.toLocaleTimeString();
    currentYear.innerHTML += "CurrentYear :" + date.getFullYear();
    currentMonth.innerHTML = "currentMonth :" + (date.getMonth()+1);
    currentDate.innerHTML = "currentDate :" + date.getDate();
    currentHour.innerHTML = "currentHour :" + date.getHours();
    currentMinutes.innerHTML = "currentMinutes :" + date.getMinutes();
    currentSeconds.innerHTML = "currentSeconds :" + date.getSeconds();
    currentMilliSeconds.innerHTML = "currentMilliSeconds :" + date.getMilliseconds();

}

function onHandleReset() {
    dateOutput.innerHTML = "";
    stringTimeAndDate.innerHTML = "";
    stringDate.innerHTML = "";
    stringTime.innerHTML = "";
    currentYear.innerHTML = "";
    currentMonth.innerHTML = "";
    currentDate.innerHTML = "";
    currentHour.innerHTML = "";
    currentMinutes.innerHTML = "";
    currentSeconds.innerHTML = "";
    currentMilliSeconds.innerHTML = "";
}