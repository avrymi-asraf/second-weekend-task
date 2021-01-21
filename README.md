
## TODO
* design the table
* fix the unnecessary row in table
* change the time format
* change color on row
* tasks progrres 
* input tasks
* logo change
* 




# Second Weekend Task

## General Requirements

Create array with 10 objects, each object has the properties:

- startedAt (Date)

- finishedAt (Date)

- tasksGiven (number)

- tasksFinished (number)

- topic (string)

example:

    {

    startedAt: new Date("2021-01-20:13:00")

    finishedAt: new Date("2021-01-20:19:00")

    tasksGiven: 10

    tasksFinished: 7

    topic: JavaScript

    }

Calculate and add 2 more properties to each object:

- totalTime: number (Difference between finished time to started time)

- tasksFinishedPrecent:number (Precent of tasks finished,floored- 83.45% => 83%)

After appending:

    {

    startedAt: new Date("2021-01-20:13:00")

    finishedAt: new Date("2021-01-20:19:00")

    totalTime: 6

    tasksGiven: 10

    tasksFinished: 7

    tasksFinishedPrecent: 70

    topic: JavaScript

    }

Then, create an HTML table with the data from the array.

In the table you should:

- Color in 3 different colors the `totalTime` and `tasksFinishedPrecent`. Choose 3 ranges and color each one.

For `totalTime` for example:

    x <= 2 - green

    2 < x <= 5 - orange

    5 < x - red

For `tasksFinishedPrecent` for example:

    x <= 50%        - light blue

    50% < x <= 75% - blue

    75% < x         - deep blue
   
   
## Example for Final Outcome

![example-outcome](./outcome-example.png)   




