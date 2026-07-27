import "./styles.css";
import { format, parse, set } from "date-fns";

class Task {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description
        // Assume that the date given is formatted mm/dd/yyyy, ex "02/21/1999".
        this.dueDate = parse(`${dueDate}`, 'MM/dd/yyyy', new Date());
        // Priority goes from 1 to 5, with 1 being most prioritized and 5 being least prioritized.
        this.priority = priority;
    }

    // Literally just a copy of the constructor
    edit (title, description, dueDate, priority) {
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

    formatDate () {
        return format(this.dueDate, "MM/dd/yyyy");
    }

    formatDateForm () {
        return format(this.dueDate, "yyyy-MM-dd");
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

    changeName (name) {
        this.name = name;
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

    const removeProject = (projectIndex) => {
        projects.splice(projectIndex, 1);
    }

    const editProject = (index, name) => {
        getProjectByIndex(index).changeName(name);
    }

    const getProjectByIndex = (index) => projects[index];

    const getProjectName = (index) => getProjectByIndex(index).name;

    const getTask = (projectIndex, taskIndex) => projects[projectIndex].getTaskAtIndex(taskIndex);

    const formatAllTasksByIndex = (index) => getProjectByIndex(index).formatAllTasks();

    const getAllProjectNames = () => projects.map((project) => project.name);

    // Runs the addTask method to the project at the given index
    const addTaskToProject = (index, title, description, dueDate, priority) => {
        getProjectByIndex(index).addTask(title, description, dueDate, priority);
    }

    const removeTask = (projectIndex, taskIndex) => {
        getProjectByIndex(projectIndex).tasks.splice(taskIndex, 1);
    };

    // Edits task at the given indices
    const editTask = (projectIndex, tasksIndex, title, description, dueDate, priority) => {
        getTask(projectIndex, tasksIndex).edit(title, description, dueDate, priority);
    }

    // These functions are for console functionality
    //
    const printAllProjectNames = () => {
        console.log(`${getAllProjectNames().join(", ")}`);
    }

    const printTask = (projectIndex, taskIndex) => {
        console.log(getTask(projectIndex, taskIndex).formatTask())
    };

    const printAllTasksByIndex = (index) => {
        console.log(`In ${projects[index].name} \n${getProjectByIndex(index).formatAllTasks().join("\n \n")}`);
    };

    const printAll = () => {
        console.log("Printing all...");
        projects.forEach((project) => printAllTasksByIndex(projects.indexOf(project)));
    }

    return {
        getProjectByIndex,
        addProject,
        removeProject,
        editProject,
        getTask,
        addTaskToProject,
        removeTask,
        editTask,
        getProjectName,
        getAllProjectNames,
        printAllProjectNames,
        printTask,
        printAllTasksByIndex,
        printAll,
    };
}

// Uses stuff from the ProjectController to update the webpage.
function ScreenController () {
    // Testing
    const allProjects = ProjectController();
    allProjects.addProject("Stuff Test");
    allProjects.addProject("Stuff Test 2");
    allProjects.addTaskToProject(0, "task 1", "some thingy to do", "01/01/2020", 1);
    allProjects.addTaskToProject(0, "task 2", "some thingy to do", "01/02/2020", 5);
    allProjects.addTaskToProject(0, "task 3", "thingy do", "02/10/2020", 3);
    allProjects.addTaskToProject(1, "tasky", "thingy to do", "01/23/2020", 4);
    allProjects.addTaskToProject(1, "tasky 2", "to do", "02/23/2020", 2);
    allProjects.printTask(1, 0);

    allProjects.printAll();
    allProjects.editTask(0, 0, "task replacement", "some thingy to do", "01/22/2020", 1);
    allProjects.editProject(0, "new name");
    allProjects.addProject("i dont want to be here");
    allProjects.addTaskToProject(2, "taskksskks", "some thingy to do", "01/02/2020", 5);
    allProjects.printAll();
    allProjects.removeProject(2);
    allProjects.addProject("Stuff Test 3");
    allProjects.printAll();

    // Variable for the div in the sidebar that gets filled with the project names
    const projectSidebar = document.getElementById("projects");

    // Variables for the header that says the name of the current project and the buttons next to it
    // Also the add task button
    // The project edit button is for the form not the one on the page
    const projectHeader = document.getElementById("project-title");
    const projectEditButton = document.getElementById("submit-project-edit");
    const projectRemoveButton = document.getElementById("remove-project");
    const taskAddButton = document.getElementById("submit-task");

    // Variable for the div that gets filled with tasks
    const tasksDiv = document.getElementById("tasks");

    // Variables for the edit project form 
    const projectEditDialog = document.querySelector("#edit-project-dialog");
    const projectEditForm = document.querySelector("#edit-project");
    const projectEditInput = document.querySelector("#name-edit");

    // Variables for the edit task form
    const taskEditDialog = document.querySelector("#edit-task-dialog");
    const taskEditForm = document.querySelector("#edit-task");
    const taskEditFormButton = document.querySelector("#submit-task-edit");

    const taskEditTitle = document.querySelector("#title-edit");
    const taskEditDueDate = document.querySelector("#date-edit");
    const taskEditPriority = document.querySelector("#priority-edit");
    const taskEditDesc = document.querySelector("#description-edit");

    // Value is the index of the project whose todo's are currently being shown
    let currentProject = 0;

    // Populates the projects div in the sidebar and gives each div the index of their respective project as data
    // Also darkens the div corresponding to currentProject
    function populateSideBar () {
        projectSidebar.replaceChildren();
        allProjects.getAllProjectNames().forEach((name, index) => {
            const projectDiv = document.createElement("div");
            const projectName = document.createElement("h2");

            projectDiv.setAttribute("class", "project");
            projectDiv.setAttribute("data-project", index);
            projectName.textContent = name;

            if (index === currentProject) {
                projectDiv.classList.add("selected");
            }

            projectDiv.appendChild(projectName);
            projectSidebar.appendChild(projectDiv);
        });
    }

    // Changes the name in the header 
    // Also changes the data-project to be the currentProject on the buttons in the header and the button to add tasks
    function populateHeader () {
        projectHeader.textContent = allProjects.getProjectName(currentProject);
        projectEditButton.setAttribute("data-project", currentProject);
        taskAddButton.setAttribute("data-project", currentProject);
    }

    function populateTasks () {
        tasksDiv.replaceChildren();
        allProjects.getProjectByIndex(currentProject).tasks.forEach((task, index) => {
            tasksDiv.appendChild(createTaskElement(task, currentProject, index));
        });
    }

    // Since the task elements are a lot more complicated than the header and sidebar
    // this function just returns a complete task element to make things more streamlined
    function createTaskElement (task, projectIndex, taskIndex) {
        const taskDiv = document.createElement("div")
        taskDiv.setAttribute("class", "task");
        const taskTitle = document.createElement("p")
        taskTitle.setAttribute("class", "task-title");
        const taskDueDate = document.createElement("p")
        taskDueDate.setAttribute("class", "due-date");
        const taskPriority = document.createElement("p")
        taskPriority.setAttribute("class", "priority");

        const taskEditButton = document.createElement("button")
        taskEditButton.setAttribute("command", "show-modal");
        taskEditButton.setAttribute("commandfor", "edit-task-dialog");
        taskEditButton.setAttribute("data-task", taskIndex);
        const taskRemoveButton = document.createElement("button")
        taskRemoveButton.setAttribute("class", "remove-task");
        taskRemoveButton.setAttribute("data-task", taskIndex);

        // Event listener to remove task
        // Made here because it has to be unique to each task
        taskRemoveButton.addEventListener("click", (event) => {
            const target = event.target;
            removeTask(currentProject, target.getAttribute('data-index'));
        });

        // Event listener to add data to the button on the edit dialog referring to this task
        // Made here for the same reasons as the other one
        // Also fills in the form with the values of the task to make things easier
        taskEditButton.addEventListener("click", (event) => {
            const target = event.target;
            taskEditFormButton.setAttribute("data-task", target.getAttribute("data-task"));
            taskEditTitle.value = task.title;
            taskEditDueDate.value = task.formatDateForm();
            taskEditPriority.value = task.priority;
            taskEditDesc.value = task.description;
        });

        const taskDesc = document.createElement("p")
        taskDesc.setAttribute("class", "description");

        taskTitle.textContent = task.title;
        taskDueDate.textContent = `Due: ${task.formatDate()}`;
        taskPriority.textContent = `Priority: ${task.priority}`;
        taskEditButton.textContent = "Edit Task";
        taskDesc.textContent = task.description;
        taskRemoveButton.textContent = "Remove Task";

        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskDueDate);
        taskDiv.appendChild(taskPriority);
        taskDiv.appendChild(taskEditButton);
        taskDiv.appendChild(taskRemoveButton);
        taskDiv.appendChild(taskDesc);

        return taskDiv;
    }

    function updateDisplay () {
        populateSideBar();
        populateHeader();
        populateTasks();
    }

    projectSidebar.addEventListener("click", (event) => {
        const clickedProject = event.target.closest(".project");
        if (!clickedProject) return;

        if (currentProject != clickedProject.getAttribute('data-project')) {
            currentProject = parseInt(clickedProject.getAttribute('data-project'));
            updateDisplay();
        }
    });

    // Add ability to remove, edit, and add projects and tasks to page
    // Also make sure to prevent default on submit buttons!! 
    //             And check validity!!
    // Hopefully won't be too hard since update display works fine :)

    // Removes current project and sets the displayed project to be the first project
    function removeProject (index) {
        allProjects.removeProject(index);
        currentProject = 0;
        updateDisplay();
    }

    // Listener for remove project button
    // Prevents there being no projects since that will probably make a lot of bugs
    projectRemoveButton.addEventListener("click", (event) => {
        if (allProjects.getAllProjectNames().length === 1) return;
        removeProject(currentProject);
    });

    // Removes the task from projects and updates display
    // Event listener is made in the createTaskElement function
    function removeTask (projectIndex, taskIndex) {
        allProjects.removeTask(projectIndex, taskIndex);
        updateDisplay();
    }

    // Edits the name of the current project and updates display
    function editProject (index, name) {
        allProjects.editProject(index, name);
        updateDisplay();
    }

    // Event listener for the project edit button on the form
    projectEditButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (projectEditForm.checkValidity()) {
            editProject(currentProject, projectEditInput.value);
            projectEditForm.reset();
            projectEditDialog.close();
        }
    });

    // Edits the task and updates display
    function editTask (projectIndex, taskIndex, title, description, dueDate, priority) {
        allProjects.editTask(projectIndex, taskIndex, title, description, dueDate, priority);
        updateDisplay();
    }

    // Event listener for the task edit button on the form
    taskEditFormButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (taskEditForm.checkValidity()) {
            editTask(currentProject, event.target.getAttribute("data-task"), taskEditTitle.value, taskEditDesc.value, convertFormDate(taskEditDueDate.value), taskEditPriority.value);
            taskEditForm.reset();
            taskEditDialog.close();
        }
    });




    
    // Converts the form's date from yyyy-MM-dd to MM/dd/yyyy and returns it as a string
    function convertFormDate (date) {
        let newDate = parse(`${date}`, 'yyyy-MM-dd', new Date())
        newDate = format(newDate, "MM/dd/yyyy");
        return newDate;
    }

    updateDisplay();
               
}

ScreenController();