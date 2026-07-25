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

    // Sends an array containing all the tasks in the project formatted
    getAllTasks () {
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

    // Specific projects are going to be accessed by their names using this function
    const getProject = (name) => projects.find((project) => project.name === name);

    // Runs the addTask method to the project with the given name
    const addTaskToProject = (projectName, title, description, dueDate, priority) => {
        getProject(projectName).addTask(title, description, dueDate, priority);
    }


    // These functions are for console functionality
    const getAllProjectNames = () => projects.map((project) => project.name);

    const printAllProjectNames = () => {
        console.log(`${getAllProjectNames().join(", ")}`);
    }

    const getAllTasksByProjectName = (projectName) => getProject(projectName).getAllTasks();

    const printAllTasksByProjectName = (projectName) => {
        console.log(`In ${projectName} \n${getProject(projectName).getAllTasks().join("\n \n")}`);
    };

    const printAll = () => {
        projects.forEach((project) => printAllTasksByProjectName(project.name));
    }

    return {
        addProject,
        addTaskToProject,
        printAllProjectNames,
        printAllTasksByProjectName,
        printAll,
    };
}

// Testing
window.allProjects = ProjectController();
allProjects.addProject("Stuff Test");
allProjects.addProject("Stuff Test 2");
allProjects.addTaskToProject("Stuff Test", "task 1", "some thingy to do", "01/02/2020", 1);
allProjects.addTaskToProject("Stuff Test", "task 2", "some thingy to do", "01/02/2020", 5);
allProjects.addTaskToProject("Stuff Test 2", "tasky", "thingy to do", "01/23/2020", 4);


allProjects.printAllProjectNames();

allProjects.printAll();

// Need to add ability to remove and edit tasks and projects.