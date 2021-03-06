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
//*--------------------------------------variebels

const listTasks = [];
addToList([eat, dance, coding, run]);
addToList(cook)
//*-------------------------------------functions

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
//

function taskToRowHtml(task) {
  let rowHtml = "<tr>";
  for (let prop in task) {
    switch (prop) {
      case "topic":
      case "taskFinished":
      case "taskGiven":
        rowHtml += `<td> ${task[prop]} </td>`;
        break;
      case "spendTime":
        rowHtml += `<td class="spendTime"> ${task[prop]} </td>`;
        break;
      case "startedAt":
        rowHtml += `<td> ${task.startAtHour} </td>`;
        rowHtml += `<td> ${task.finishAtHour} </td>`;
        break;
      case "finishedPercent":
        rowHtml += `<td class="finishPres"> ${task.finishedPercent} </td>`;
        break;
    }
  }
  rowHtml += "</tr>";
  return rowHtml;
}
//
//
//
//
function listTasksToPage(listTasks) {
  //push row of table to page
  //
  let rowHtmls = "";
  for (let task of listTasks) {
    rowHtmls += taskToRowHtml(task);
  }
  document.getElementById("table-body").innerHTML = rowHtmls;
}

function colorFinishPercent() {
  //color the column how finished in percent
  //
  let finishPrec = document.getElementsByClassName("finishPres");
  console.log(finishPrec)
  for (let prec of finishPrec) {
    console.log(prec)
    prec.style.background = percentToColor(prec.textContent);
  }
}

function percentToColor(percent) {
  //convert the present as string
  //to color
  const percentNum = parseFloat(percent);
  console.log(percent)
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

function colorSpentTime() {
  const spendTimeColum = document.getElementsByClassName("spendTime");
  for (let time of spendTimeColum) {
    time.style.background = spendTimeToColor(time.textContent);
  }
}

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


function updateProgressBar() {
  let avregFinishedTasks = 0;   
  for (let tas of  listTasks) {
    avregFinishedTasks += parseFloat(tas.finishedPrecent)
  }
  avregFinishedTasks = avregFinishedTasks / listTasks.length
  document.getElementById("progress-bar").value=avregFinishedTasks
}


//*--------------------------------------------call the functions


window.onload = function what() {
  listTasksToPage(listTasks);
  colorFinishPercent();
  colorSpentTime();
};
