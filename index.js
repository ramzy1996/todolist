// variables
const addBtn = document.getElementById("addBtn");
let inputBox = document.getElementById("inputBox");
const taskcontainer = document.getElementById("taskContainer");
const taskArr = [];
let qry = document.querySelector(".inputContainer");

//focus input box
inputBox.focus();

// functions
function handleTaskeClick() {
  this.classList.toggle("completed");
  const taskId = this.id.toString();

  for (let i = 0; i < taskArr.length; i++) {
    const obj = taskArr[i];

    if (obj.id.toString() === taskId) {
      obj.isCompleted = !obj.isCompleted;
    }
  }
  setTask();
}

function validate() {
  const userInput = inputBox.value;

  if (userInput.length === 0) {
    document.getElementById("inputBox").style.borderColor = "red";
    document.getElementById("error").innerText = "Cannot keep empty value";
  } else {
    document.getElementById("inputBox").style.borderColor = "rgb(3, 255, 3)";
    document.getElementById("error").innerText = "";
  }

  // ! reject method..... -> easy impliment

  if (userInput.replace(/[\s+]/g, "").length === 0) {
    document.getElementById("inputBox").style.borderColor = "red";
    document.getElementById("error").innerText = "Cannot keep empty value";
  }
}

function enterBtn(e) {
  if (e.keyCode === 13) {
    addTask();
  }
}
function handleRemove() {
  const taskId = this.id.toString();

  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].id.toString() === taskId) {
      taskArr.splice(i, 1);
    }
  }
  setTask();
  this.remove();
}

function setTask() {
  localStorage.setItem("tasks", JSON.stringify(taskArr));
}
function getTask() {
  let tasks = localStorage.getItem("tasks");
  if (!tasks) {
    return;
  }

  tasks = JSON.parse(tasks);
  for (index in tasks) {
    const taskObj = tasks[index];
    createTask(taskObj.value, taskObj.isCompleted, taskObj.id);
    taskArr.push(taskObj);
  }
}
getTask();

function createTask(userInput, isCompleted, taskId) {
  const newElemnt = document.createElement("div");
  newElemnt.innerText = userInput;

  newElemnt.setAttribute("id", taskId);

  if (isCompleted) {
    newElemnt.setAttribute("class", "task completed");
  } else {
    newElemnt.setAttribute("class", "task");
  }

  newElemnt.addEventListener("click", handleTaskeClick);
  newElemnt.addEventListener("dblclick", handleRemove);

  taskcontainer.append(newElemnt);
}

function addTask() {
  //taking user input
  const userInput = inputBox.value;

  if (userInput.length === 0) {
    document.getElementById("inputBox").style.borderColor = "red";
    document.getElementById("error").innerText = "Cannot keep empty value";
    return;
  }

  // ! reject method..... -> easy impliment

  if (userInput.replace(/[\s+]/g, "").length === 0) {
    document.getElementById("inputBox").style.borderColor = "red";
    document.getElementById("error").innerText = "Cannot keep empty value";
    return;
  }

  //stup id with date

  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth().toString();
  const date = new Date().getDate().toString();
  const hour = new Date().getHours().toString();
  const minute = new Date().getMinutes().toString();
  const second = new Date().getSeconds().toString();
  const milSecond = new Date().getMilliseconds().toString();

  const timeStamp = year + month + date + hour + minute + second + milSecond;
  let taskId = Math.random() + timeStamp;

  let taskObj = {};
  taskObj.value = userInput;
  taskObj.isCompleted = false;
  taskObj.id = taskId;
  taskArr.push(taskObj);
  setTask();
  createTask(userInput, false, taskId);

  inputBox.value = "";
  inputBox.focus();
}

addBtn.addEventListener("click", addTask);
inputBox.addEventListener("keyup", enterBtn);
qry.addEventListener("input", validate);

