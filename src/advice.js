const URL = "https://api.adviceslip.com/advice"
const advice = document.querySelector(".advice");

function init(){
    fetch(
        "https://api.adviceslip.com/advice"
    ).then(function(response){
        return response.json();
    }).then(function(data){
        advice.innerText = data.slip.advice;
    }).catch(function(error){
        console.log("Advice Error");
    })
}

init();