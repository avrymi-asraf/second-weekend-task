"use strict";

class tasks {
  constructor(
    topic,
    taskFinished,
    taskGiven,
    finishedAt = 1,
    startedAt = Date.now()
  ) {
    this.topic = topic;
    this.startedAt = new Date(startedAt);
    this.finishedAt = new Date(this.startedAt.getTime() + 3.6e6 * finishedAt);
    this.taskFinished = taskFinished;
    this.taskGiven = taskGiven;
  }
  get startAtHour() {
    return this.startedAt.toLocaleTimeString("en-US");
  }
  get finishAtHour() {
    return this.finishedAt.toLocaleTimeString("en-Us");
  }
  totalTimeSpend() {
    this.spendTime = (this.finishedAt - this.startedAt) / 60000 + " minut";
  }
  tasksFinishedPercent() {
    this.finishedPercent =
      Math.floor(this.taskFinished * (100 / this.taskGiven)) + "%";
  }
  spendAndPercent() {
    this.tasksFinishedPercent();
    this.totalTimeSpend();
  }
  add() {
    this.taskFinished += 1;
  }
}
const taskName = document.querySelector("#taskName");
const timeTask = document.querySelector("#timeTask");
const subTask = document.querySelector("#subTask");
const subTaskDon = document.querySelector("#subTaskDon");




//
//
const finishLerning = new tasks("HTML", 10, 7);
finishLerning.spendAndPercent();
const eat = new tasks("eat", 7, 19, 3);
eat.spendAndPercent();
const dance = new tasks("dance", 5, 19, 1);
dance.spendAndPercent();
const coding = new tasks("coding", 5, 14, 2.5);
coding.spendAndPercent();
const run = new tasks("run", 3, 5, 0.5);
run.spendAndPercent();
const cook = new tasks("cook", 6, 28, 1);
cook.spendAndPercent();
//*--------------------------------------variables

const listTasks = [];
addToList([eat, dance, coding, run]);
addToList(cook);

//*-------------------------------------functions

function addTask() {
  const nameOfTaskObj = taskName.value;
  const timeTaskOfTaskObj = timeTask.value;
  const subTaskOfTaskObj = subTask.value;
  const subTaskDonOfTaskObj = subTaskDon.value;
  taskName.value = "";
  timeTask.value = "";
  subTask.value = "";
  subTaskDon.value = "";
  const nowTask = new tasks(
    nameOfTaskObj,
    subTaskDonOfTaskObj,
    subTaskOfTaskObj,
    timeTaskOfTaskObj
  );
  nowTask.spendAndPercent();
  listTasks.push(nowTask);
  listTasksToPage(nowTask);
  colorFinishPercent();
  colorSpentTime();
  updateProgressBar();
}
//
//
function addToList(objTask) {
  if (Array.isArray(objTask)) {
    for (let i in objTask) {
      listTasks.push(objTask[i]);
    }
  } else {
    listTasks.push(objTask);
  }
}
//
//
function listTasksToPage(listTasks) {
  //push row of table to page
  //
  let rowHtmls;
  if (Array.isArray(listTasks)) {
    for (let task of listTasks) {
      rowHtmls = taskToRowHtml(task);
      document.getElementById("table-body").appendChild(rowHtmls);
    }
  } else {
    rowHtmls = taskToRowHtml(listTasks);
    document.getElementById("table-body").appendChild(rowHtmls);
  }
}
//
//
function taskToRowHtml(task) {
  //creat row element from task object
  //

  const rowTable = document.createElement("tr");
  for (let prop in task) {
    const dataTable = document.createElement("td");
    const cellText = document.createTextNode("");
    switch (prop) {
      case "topic":
      case "taskFinished":
      case "taskGiven":
        cellText.textContent = `${task[prop]}`;
        dataTable.appendChild(cellText.cloneNode(true));
        rowTable.appendChild(dataTable);
        break;

      case "spendTime":
        cellText.textContent = `${task[prop]}`;
        dataTable.appendChild(cellText.cloneNode(true));
        dataTable.className += " spendTime";
        rowTable.appendChild(dataTable);
        console.log(rowTable.textContent);
        break;

      case "startedAt":
        cellText.textContent = `${task.startAtHour}`;
        dataTable.appendChild(cellText.cloneNode(true));
        rowTable.appendChild(dataTable);
        break;

      case "finishedAt":
        cellText.textContent = `${task.finishAtHour}`;
        dataTable.appendChild(cellText.cloneNode(true));
        rowTable.appendChild(dataTable);
        break;

      case "finishedPercent":
        cellText.textContent = `${task[prop]}`;
        // dataTable.cloneNode(cellText);
        dataTable.appendChild(cellText.cloneNode(true));
        dataTable.className += " finishPres";
        rowTable.appendChild(dataTable);
        break;
    }
  }
  return rowTable;
}
//
//
function colorFinishPercent() {
  //color the column how finished in percent
  //
  let finishPrec = document.querySelectorAll(".finishPres");
  for (let prec of finishPrec) {
    prec.style.background = percentToColor(prec.textContent);
  }
}
//
//
function percentToColor(percent) {
  //convert the present as string
  //to color
  const percentNum = parseFloat(percent);
  switch (true) {
    case percentNum > 80:
      return "#43AA8B50";
      break;
    case percentNum > 60:
      return "#90BE6D50";
      break;
    case percentNum > 40:
      return "#F9C74F50";
      break;
    case percentNum > 20:
      return "#F3722C50";
      break;
    case percentNum > 0:
      return "#F9414450";
      break;
  }
}
//
//
function colorSpentTime() {
  const spendTimeColum = document.querySelectorAll(".spendTime");
  for (let time of spendTimeColum) {
    time.style.background = spendTimeToColor(time.textContent);
  }
}
//
//
function spendTimeToColor(present) {
  //convert the minute as string
  //to color
  const presentNum = parseFloat(present);
  switch (true) {
    case presentNum > 240:
      return "#073B4C85";
      break;
    case presentNum >= 180:
      return "#118AB285";
      break;
    case presentNum > 120:
      return "#06D6A085";
      break;
    case presentNum > 60:
      return "#FFD16685";
      break;
    case presentNum > 0:
      return "#EF476F85";
      break;
  }
}
//
//
function updateProgressBar() {
  //update the progressBar depending percent subtask done
  //
  let avregFinishedTasks = 0;
  for (let tas of listTasks) {
    avregFinishedTasks += parseFloat(tas.finishedPercent);
  }
  avregFinishedTasks = avregFinishedTasks / listTasks.length;
  console.log(listTasks.length)
  document.getElementById("progress-bar").value = avregFinishedTasks;
}
//
//

//*--------------------------------------------call the functions

window.onload = function load() {
  listTasksToPage(listTasks);
  colorFinishPercent();
  colorSpentTime();
  updateProgressBar();
};

