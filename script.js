let todos = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {

    let task = taskInput.value.trim();

    if(task===""){
        alert("Task cannot be empty");
        return;
    }

    todos.push({
        id:Date.now(),
        task:task,
        completed:false
    });

    taskInput.value="";
    displayTasks();
}

function displayTasks(list=todos){

    todoList.innerHTML="";

    list.forEach(todo=>{

        const li=document.createElement("li");

        if(todo.completed){
            li.classList.add("completed");
        }

        li.innerHTML=`
        <span>${todo.task}</span>

        <div class="actions">

        <button class="complete"
        onclick="toggleComplete(${todo.id})">
        ${todo.completed?"Undo":"Done"}
        </button>

        <button class="edit"
        onclick="editTask(${todo.id})">
        Edit
        </button>

        <button class="delete"
        onclick="deleteTask(${todo.id})">
        Delete
        </button>

        </div>
        `;

        todoList.appendChild(li);

    });

}

function deleteTask(id){

    todos=todos.filter(todo=>todo.id!==id);

    displayTasks();
}

function toggleComplete(id){

    todos=todos.map(todo=>{

        if(todo.id===id){
            todo.completed=!todo.completed;
        }

        return todo;

    });

    filterTasks(currentFilter);

}

function editTask(id){

    const todo=todos.find(t=>t.id===id);

    let newTask=prompt("Edit Task",todo.task);

    if(newTask===null) return;

    newTask=newTask.trim();

    if(newTask===""){
        alert("Task cannot be empty");
        return;
    }

    todo.task=newTask;

    displayTasks();

}

function filterTasks(type){

    currentFilter=type;

    if(type==="all"){
        displayTasks();
    }

    else if(type==="completed"){

        displayTasks(
            todos.filter(todo=>todo.completed)
        );

    }

    else{

        displayTasks(
            todos.filter(todo=>!todo.completed)
        );

    }

}

function searchTask(){

    let search=document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    let result=todos.filter(todo=>
    todo.task.toLowerCase().includes(search));

    displayTasks(result);

}

displayTasks();