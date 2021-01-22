"use strict";

class tasks {
  constructor(
    topic,
    taskFinished,
    taskGiven,
    finishedAt = 1,
    startedAt = Date.now()
  ) {
    // this.nameTask = nameTask;
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
  tasksFinishedPrecent() {
    this.finishedPrecent =
      Math.floor(this.taskFinished * (100 / this.taskGiven)) + "%";
  }
  spendAndPrecent() {
    this.tasksFinishedPrecent();
    this.totalTimeSpend();
  }
  add() {
    this.taskFinished += 1;
  }
}
//
//
const finishLerning = new tasks("HTML", 10, 7);
finishLerning.spendAndPrecent();
const eat = new tasks("eat", 7, 19, 3);
eat.spendAndPrecent();
const dance = new tasks("dance", 5, 19, 1);
dance.spendAndPrecent();
const coding = new tasks("coding", 5, 14, 2.5);
coding.spendAndPrecent();
const run = new tasks("run", 3, 5, 0.5);
run.spendAndPrecent();

//*--------------------------------------variebels

const listTasks = [];
addToList([eat, dance, coding, run]);
//*-------------------------------------functions

function addToList(objTask) {
  if (Array.isArray(objTask)) {
    for (let i in objTask) {
      listTasks.push(objTask[i]);
    }
  }
  listTasks.push(objTask);
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
      case "finishedPrecent":
        rowHtml += `<td class="finishPres"> ${task.finishedPrecent} </td>`;
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
  let rowHtmls = "";
  for (let task of listTasks) {
    rowHtmls += taskToRowHtml(task);
  }
  document.getElementById("table-body").innerHTML = rowHtmls;
}

function colorFinishPrecent() {
  let finishPres = document.getElementsByClassName("finishPres");
  for (let prec of finishPres) {
    console.log(prec);
    prec.style.background = percentToColor(prec.textContent);
  }
}

function percentToColor(present) {
  //convert the present as string
  //to color
  const presentNum = parseFloat(present);
  switch (true) {
    case presentNum > 80:
      return "#43AA8B";
      break;
    case presentNum >= 60:
      return "#90BE6D";
      break;
    case presentNum > 40:
      return "#F9C74F";
      break;
    case presentNum > 20:
      return "#F3722C";
      break;
    case presentNum > 0:
      return "#F94144";
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
  //convert the present as string
  //to color
  const presentNum = parseFloat(present);
  switch (true) {
    case presentNum > 80:
      return "#43AA8B";
      break;
    case presentNum >= 60:
      return "#90BE6D";
      break;
    case presentNum > 40:
      return "#F9C74F";
      break;
    case presentNum > 20:
      return "#F3722C";
      break;
    case presentNum > 0:
      return "#F94144";
      break;
  }
}


//*--------------------------------------------call the functions
//  console.log(taskToRowHtml(run))

window.onload = function what() {
  listTasksToPage(listTasks);
  colorFinishPrecent();
  colorSpentTime();
};
