import "./styles.css";
import { format, parse } from "date-fns";

class Task {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description
        // Assume that the date given is formatted mm/dd/yyyy, ex "02/21/1999".
        this.dueDate = parse(`${dueDate}`, 'MM/dd/yyyy', new Date());
        // Priority goes from 1 to 5, with 1 being most prioritized and 5 being least prioritized.
        this.priority = priority;
    }

    formatTask () {
        return `Title: ${this.title}, Due date: ${format(this.dueDate, "MM/dd/yyyy")}, Priority: ${this.priority} \nDescription: ${this.description}`;
    }

    printTask () {
        console.log(this.formatTask());
    }

    getTitleToString () {
        return `${this.title}`;
    }

}

class Project {
    constructor (name) {
        this.name = name;
        this.tasks = [];
    }

    addTask (title, description, dueDate, priority) {
        this.tasks.push(new Task(title, description, dueDate, priority));
    }

    getTaskAtIndex (index) {
        return this.tasks[index];
    }

    // Sends an array containing all the tasks in the project formatted
    formatAllTasks () {
        return this.tasks.map((task) => task.formatTask());
    }

    // Runs the printTask method on all tasks in project
    printAllTasks () {
        this.tasks.forEach((task) => task.printTask())
    }
}

// Controls all the projects using the projects array
// Has methods to edit the projects in each array.
function ProjectController () {
    const projects = [];

    const addProject = (name) => {
        projects.push(new Project(`${name}`));
    };

    const getProjectByIndex = (index) => projects[index];

    const getTask = (projectIndex, tasksIndex) => projects[projectIndex].getTaskAtIndex(tasksIndex);

    const formatAllTasksByIndex = (index) => getProjectByIndex(index).formatAllTasks();

    const getAllProjectNames = () => projects.map((project) => project.name);

    // Runs the addTask method to the project at the given index
    const addTaskToProject = (index, title, description, dueDate, priority) => {
        getProjectByIndex(index).addTask(title, description, dueDate, priority);
    }

    const removeTask = (projectIndex, tasksIndex) => {
        getProjectByIndex(projectIndex).tasks.splice(tasksIndex, 1);
    };

    // These functions are for console functionality
    const printAllProjectNames = () => {
        console.log(`${getAllProjectNames().join(", ")}`);
    }

    const printTask = (projectIndex, tasksIndex) => {
        console.log(getTask(projectIndex, tasksIndex).formatTask())
    };

    const printAllTasksByIndex = (index) => {
        console.log(`In ${projects[index].name} \n${getProjectByIndex(index).formatAllTasks().join("\n \n")}`);
    };

    const printAll = () => {
        console.log("Printing all...");
        projects.forEach((project) => printAllTasksByIndex(projects.indexOf(project)));
    }

    return {
        addProject,
        addTaskToProject,
        removeTask,
        printAllProjectNames,
        printTask,
        printAllTasksByIndex,
        printAll,
    };
}

// Testing
window.allProjects = ProjectController();
allProjects.addProject("Stuff Test");
allProjects.addProject("Stuff Test 2");
allProjects.addTaskToProject(0, "task 1", "some thingy to do", "01/02/2020", 1);
allProjects.addTaskToProject(0, "task 2", "some thingy to do", "01/02/2020", 5);
allProjects.addTaskToProject(1, "tasky", "thingy to do", "01/23/2020", 4);
allProjects.printTask(1, 0);

allProjects.printAll();
allProjects.removeTask(0, 1);
allProjects.printAll();


// Need to add ability to edit tasks and projects.