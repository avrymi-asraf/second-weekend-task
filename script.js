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
    this.taskFinished = taskFinished;
    this.taskGiven = taskGiven;
    this.startedAt = new Date(startedAt);
    this.finishedAt = new Date(this.startedAt.getTime() + 3.6e6 * finishedAt);
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
function taskToRowHtml(task) {
  let rowHtml = "<tr>";
  for (let prop in task) {
    rowHtml += `<td> ${task[prop]} <td>`;
  }
  rowHtml += "</tr>";
  // console.log(rowHtml);
  return rowHtml;
}
//
//
function listTasksToPage(listTasks) {
  let rowHtmls = "";
  for (let task of listTasks) {
    rowHtmls += taskToRowHtml(task);
  }
  document.getElementById("table").innerHTML = rowHtmls;
}

//*--------------------------------------------call the functions
//  console.log(taskToRowHtml(run))

window.onload = function what() {
  listTasksToPage(listTasks);
};
