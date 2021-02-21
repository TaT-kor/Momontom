const body = document.querySelector("body");
const nameInput = document.querySelector(".name");

const IMG_Number = 5;

function paintImage(imgNumber){
    const image = new Image();
    image.src=`images/${imgNumber + 1}.jpg`
    image.classList.add("bgImage");
    body.appendChild(image);

    if(imgNumber > 0 && imgNumber <4) {
        nameInput.classList.add("placeholderWhite");
    } else {
        nameInput.classList.remove("placeholderWhite");
    }
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_Number);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();