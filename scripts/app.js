// Amardeep Mann
// 2-13-23
// Task Tracker
// We created a to-do list app that accepts new tasks and allows us to edit old ones. It also remebers our tasks via local storage

import { saveToLocalStorage, getLocalStorage } from "./localStorage.js";

let addTaskBtn = document.getElementById('addTaskBtn');
let saveTaskBtn = document.getElementById('saveTaskBtn');
let taskNameInput = document.getElementById('taskNameInput');
let taskDateInput = document.getElementById('taskDateInput');
let taskStatusInput = document.getElementById('taskStatusInput');

let data = getLocalStorage();
let isEdit = false;
let removeOldItem;

addTaskBtn.addEventListener('click', function() {
    let tempValue = enterTaskInput.value;
    isEdit = false;
    ClearInputs();
    addModalTitle.textContent = 'Add Task';
    taskNameInput.value = tempValue;
});

saveTaskBtn.addEventListener('click', function() {
    data[taskStatusInput.value].push({
        name: taskNameInput.value,
        info: taskInfoInput.value,
        dueDate: taskDateInput.value,
        priority: taskProInput.value
    });
    console.log(data);
    if (isEdit) {
        console.warn('Removing old item');
        removeOldItem();
    };
    PopulateAllData();
});

function ClearInputs() {
    enterTaskInput.value = '';
    taskNameInput.value = '';
    taskInfoInput.value = '';
    taskProInput.value = 'low';
    taskStatusInput.value = 'toDo';
    taskDateInput.value = '2023-02-14';
}

function PopulateDate(property, container) {
    let array = data[property];
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        let div = document.createElement('div');
        div.classList.add('listItem', 'd-flex', 'justify-content-between');
        let leftDiv = document.createElement('div');
        leftDiv.classList.add('text-lefty');
        let rightDiv = document.createElement('div');
        rightDiv.classList.add('d-flex', 'flex-column');
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
        btn.setAttribute('data-bs-toggle', 'modal');
        btn.setAttribute('data-bs-target', '#addModal');
        btn.addEventListener('click', function() {
            isEdit = true;
            taskNameInput.value = item.name;
            taskInfoInput.value = item.info;
            taskProInput.value = item.priority;
            taskDateInput.value = item.dueDate;
            taskStatusInput.value = property;
            addModalTitle.textContent = 'Edit Task';
            removeOldItem = function() {
                array.splice(i, 1);
            }
        });

        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.classList.add('delBtn', 'btn', 'btn-danger');
        delBtn.addEventListener('click', function() {
            array.splice(i, 1);
            PopulateAllData();
        });

        leftDiv.append(name, date, prio);
        rightDiv.append(btn, delBtn);
        div.append(leftDiv, rightDiv);
        container.append(div);
    }
}

function PopulateAllData() {
    toDoDiv.innerHTML = '';
    inProDiv.innerHTML = '';
    compDiv.innerHTML = '';
    PopulateDate('toDo', toDoDiv);
    PopulateDate('inPro', inProDiv);
    PopulateDate('comp', compDiv);
    saveToLocalStorage(data);
}

// Populate all data to start
PopulateAllData();