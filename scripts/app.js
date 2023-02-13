import { saveToLocalStorage, getLocalStorage } from "./localStorage.js";

let addTaskBtn = document.getElementById('addTaskBtn');
let saveTaskBtn = document.getElementById('saveTaskBtn');
let taskNameInput = document.getElementById('taskNameInput');
let taskDateInput = document.getElementById('taskDateInput');
let taskStatusInput = document.getElementById('taskStatusInput');

let data = getLocalStorage();

addTaskBtn.addEventListener('click', function() {
    taskNameInput.value = enterTaskInput.value;
});

saveTaskBtn.addEventListener('click', function() {
    data[taskStatusInput.value].push({
        name: taskNameInput.value,
        info: taskInfoInput.value,
        dueDate: taskDateInput.value,
        priority: taskProInput.value
    });
    console.log(data);
    ClearInputs();
    PopulateAllData();
    saveToLocalStorage(data);
});

function ClearInputs() {
    enterTaskInput.value = '';
    taskNameInput.value = '';
    taskInfoInput.value = '';
    taskDateInput.value = '2023-02-14';
}

function PopulateDate(array, container) {
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        let div = document.createElement('div');
        div.classList.add('listItem', 'd-flex', 'justify-content-between');
        let leftDiv = document.createElement('div');
        leftDiv.classList.add('text-lefty');
        let rightDiv = document.createElement('div');
        let name = document.createElement('p');
        name.textContent = item.name;
        name.classList.add('taskName');
        let date = document.createElement('p');
        date.textContent = 'Due: ' + item.dueDate.toString();
        date.classList.add('taskDate');
        let prio = document.createElement('p');
        prio.textContent = 'Priority: ' + item.priority;
        prio.classList.add('taskPrio');
        let btn = document.createElement('button');
        btn.textContent = 'Edit';
        btn.classList.add('editBtn', 'btn', 'btn-warning');

        leftDiv.append(name, date, prio);
        rightDiv.append(btn);
        div.append(leftDiv, rightDiv);
        container.append(div);
    }
}

function PopulateAllData() {
    toDoDiv.innerHTML = '';
    inProDiv.innerHTML = '';
    compDiv.innerHTML = '';
    PopulateDate(data.toDo, toDoDiv);
    PopulateDate(data.inPro, inProDiv);
    PopulateDate(data.comp, compDiv);
}

// Populate all data to start
PopulateAllData();