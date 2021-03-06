'use strict';
let arrayListTasks = [];

let count = 0;

let addTask = document.getElementById('tasks__title__add-button');

addTask.addEventListener("click", newElement);

// Create a new list item when clicking on the "Add" button
function newElement() {
    let inputTask = document.getElementById('tasks__title__input');
    let listTasks = document.getElementById('tasks__list');

    let li = document.createElement("li");
    let span = document.createElement("span");

    let inputValue = inputTask.value;

    let textTask = document.createTextNode(inputValue);
    let txt = document.createTextNode("\u00D7");

    li.appendChild(textTask);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        listTasks.appendChild(li);
        let countIndex = add(count);
        li.dataset.index = countIndex - 1;

        // Save the tasks into array
        arrayListTasks.push(inputValue);

        // Save the tasks in local storage
        let tasksList = JSON.stringify(arrayListTasks);
        localStorage.setItem('tasks', tasksList);
    }
    // Initialize the input of add tasks.
    inputTask.value = "";

    // Add a "checked" symbol when clicking on a list item
    li.addEventListener('click', function(e) {
        for (let i = 0; i < arrayListTasks.length; i++) {
            li.className = "checked";
        }
        if (e.target.tagName === "li") {
            e.target.classList.toggle('checked');
        }
    }, false);

    // Create a "close" button and append it to each list item
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    // Click on a close button to hide the current list item
    span.addEventListener('click', function() {
        li.style.display = "none";
        const replaceTextContent = li.textContent.replace("×", "");
        let indexCurrent= arrayListTasks.indexOf(replaceTextContent);
        let currentArrayListTasks = arrayListTasks.splice(indexCurrent, 1);
        refreshTasksWithLocalStorage(arrayListTasks);
    })
}

/* Function to take events from localStorage */
function refreshTasksWithLocalStorage(arrayListTasks) {
    const tasksList = JSON.stringify(arrayListTasks);
    localStorage.setItem('tasks', tasksList);
}

function add() {
    count += 1;
    return count;
}
