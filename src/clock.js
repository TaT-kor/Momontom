const clockContainer = document.querySelector(".clock"),
    clockTitle = clockContainer.querySelector(".clockTitle"),
    clockSeconds = clockContainer.querySelector(".clockSeconds"),
    clockDate = clockContainer.querySelector(".clockDate");

function getTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = date.getDate();
    const day = date.getDay();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let weeks = ["일", "월", "화", "수", "목", "금", "토"];
    let  week = weeks[day];

    clockTitle.innerText = `${hour < 10 ? `0${hour}` : hour} : ${minutes < 10 ? `0${minutes}` : minutes}`;
    clockSeconds.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
    clockDate.innerText = `${year}년 ${month < 10 ? `0${month}` : month}월 ${today < 10 ? `0${today}` : today}일 ${week}요일`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();