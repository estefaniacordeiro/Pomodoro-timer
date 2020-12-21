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
    /* console.log(inputValue); */

    let textTask = document.createTextNode(inputValue);
    let txt = document.createTextNode("\u00D7");
    /* console.log(textTask); */

    li.appendChild(textTask);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        listTasks.appendChild(li);
        let countIndex = add(count);
        li.dataset.index = countIndex - 1;
        console.log(li);

        // Save the tasks into array
        arrayListTasks.push(inputValue);
        console.log(arrayListTasks);
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
        let index = li.dataset.index;
        console.log(index);
        console.log(arrayListTasks.splice(index, 1));
        console.log(arrayListTasks);
    })
}

function add() {
    count += 1;
    return count;
}
