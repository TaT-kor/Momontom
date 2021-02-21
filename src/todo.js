const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finList = document.querySelector(".js-finList");

const TODOS_LS = 'toDos',
    FINS_LS = "finishedList";
let toDos, fins;

function btnStyle(btn){
    btn.style.border = "1px slid lightgray";
    btn.style.borderRadius = "20%";
    btn.style.backgroundColor = "white";
}

function getTaskObject(text){
    return {
        id: String(Date.now()),
        text
    };
}

function saveToDos(task){
    toDos.push(task);
}

function findInFin(taskId){
    return fins.find(function(task){
        return task.id === taskId;
    });
}

function findInToDos(taskId){
    return toDos.find(function(task){
        return task.id === taskId;
    });
}

function removeFromToDo(taskId){
    toDos = toDos.filter(function(task){
        return task.id !== taskId;
    });
}

function removeFromFin(taskId){
    fins = fins.filter(function(task){
        return task.id !== taskId;
    });
}

function addToFin(task){
    fins.push(task);
}

function addToTodo(task){
    toDos.push(task);
}

function deleteBtn(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromFin(li.id);
    removeFromToDo(li.id);
    saveState();
}

function handleCompleteClick(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInToDos(li.id);
    removeFromToDo(li.id);
    addToFin(task);
    paintFin(task);
    saveState();
}

function handleBackClick(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInFin(li.id);
    removeFromFin(li.id);
    addToTodo(task);
    paintToDo(task);
    saveState();
}

function buildGenericLi(task){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    
    span.innerText = task.text;
    delBtn.innerText = "❌";
    btnStyle(delBtn);
    delBtn.addEventListener("click", deleteBtn);
    
    li.append(span, delBtn);
    li.id = task.id;
    return li;
}

function paintToDo(task){
    const genericLi = buildGenericLi(task);
    const completebtn = document.createElement("button");
    completebtn.innerText = "✔️";
    btnStyle(completebtn);
    completebtn.addEventListener("click", handleCompleteClick);
    genericLi.append(completebtn);
    toDoList.append(genericLi);
}

function paintFin(task){
    const genericLi = buildGenericLi(task);
    const backBtn = document.createElement("button");
    genericLi.style.textDecoration = "line-through";
    backBtn.innerText = "🔙";
    btnStyle(backBtn);
    backBtn.addEventListener("click", handleBackClick);
    genericLi.append(backBtn);
    finList.append(genericLi);
}

function loadState(){
    toDos = JSON.parse(localStorage.getItem(TODOS_LS)) || [];
    fins = JSON.parse(localStorage.getItem(FINS_LS)) || [];
}

function restoreState(){
    toDos.forEach(function(task){
        paintToDo(task);
    });
    fins.forEach(function(task) {
        paintFin(task);
    });
}

function saveState() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
    localStorage.setItem(FINS_LS, JSON.stringify(fins));
}

function handleFormSubmit(e) {
    e.preventDefault();
    const taskOjb = getTaskObject(toDoInput.value);
    toDoInput.value = "";
    paintToDo(taskOjb);
    saveToDos(taskOjb);
    saveState();
}

function init() {
    toDoForm.addEventListener("submit", handleFormSubmit);
    loadState();
    restoreState();
}

init();