const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function getTime(){
    const date = new Date();
    const hour = date.getHours();
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    getTime();
    setInterval(getTime, 1000); //시간대 다를 떄 변수화해보기
    if (setInterval(getTime, 1000) <= 6){
        greeting.innerText = `Good evening, ${text}`;
    } else if(setInterval(getTime, 1000)  >=19){
        greeting.innerText = `Good evening, ${text}`;
    }
    else if(setInterval(getTime, 1000)  >= 12) {
        greeting.innerText = `Good afternoon, ${text}`;
    } else if(setInterval(getTime, 1000)  < 19){
        greeting.innerText = `Good afternoon, ${text}`;
    } else {
        greeting.innerText = `Good morning, ${text}`;
    }
    console.log(getTime);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();