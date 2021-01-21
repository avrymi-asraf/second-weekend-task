class tasks {
  constructor(
    topic,
    taskGiven,
    taskFinished,
    finishedAt = 1,
    startedAt = Date.now()
  ) {
    // this.nameTask = nameTask;
    this.topic = topic;
    this.taskGiven = taskGiven;
    this.taskFinished = taskFinished;
    this.startedAt = new Date(startedAt);
    this.finishedAt = new Date(this.startedAt.getTime() + 3.6e6 * finishedAt);
  }
  totalTimeSpend() {
    this.spendTime = (this.finishedAt - this.startedAt) / 60000 + " minut";
  }
  tasksFinishedPrecent() {
    this.finishedPrecent = this.taskFinished * (100 / this.taskGiven) + "%";
  }
}

let finishLerning = new tasks("HTML", 10, 7);
finishLerning.totalTimeSpend();
finishLerning.tasksFinishedPrecent();
console.log(finishLerning);
