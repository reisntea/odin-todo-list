import { format, parse } from "date-fns";


console.log("Works!");

class task {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description
        // Assume that the date given is formatted mm/dd/yyyy, ex "02/21/1999".
        this.dueDate = parse(`${dueDate}`, 'MM/dd/yyyy', new Date());
        this.priority = priority;
    }
}

const test = new task("awaw", "awjdwd", "1/23/2026", 1);

console.log(format(test.dueDate, "MM/dd/yyyy"));