//selectors:
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event Listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//Functions

function addTodo(event) {
  event.preventDefault(); //stops the page refreshing
  //idea is to create a div, with a checked & delete button added but auto add on click
  if (!todoInput.value == "") {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add to local storage
    saveLocalTodos(todoInput.value);
    //check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'; //styling bin item
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //append todo
    todoList.appendChild(todoDiv);
    todoInput.value = '';
  }

}
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    removeLocalCompleted(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    saveLocalCompleted(todo);
  }
}

function filterTodo() {
  const todos = document.querySelectorAll('.todo');
  todos.forEach(function (todo) {
    switch (filterOption.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'pending':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}
function saveLocalCompleted(todo) {
  let completed = JSON.parse(localStorage.getItem('completed'));
  if (completed === null) {
    completed = [];
    completed.push(todo.innerText);
    localStorage.setItem('completed', JSON.stringify(completed));
  }
  else if (completed.includes(todo.innerText) === true) {
    let index = completed.indexOf(todo.innerText, 0);
    completed.splice(index, 1);
    localStorage.setItem('completed', JSON.stringify(completed))
  } else {
    completed.push(todo.innerText);
    localStorage.setItem('completed', JSON.stringify(completed));
  }
}

function saveLocalTodos(todo) {
  //check todos exist
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

/*
  1. Add the saved item to the Completed list in local storage      DONE
  2. When unchecking the completed list, needs to be removed from the 'completed' list but put back into the todos!.  DONE
  3. getTodos must return both non-complete & completed todos and style them accordingly   DONE
*/
function getTodos() {
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }
  else {
    const completed = JSON.parse(localStorage.getItem('completed'));
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(function (todo) {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add("todo");
      //create list
      const newTodo = document.createElement('li');
      newTodo.innerText = todo;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);
      //check button
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //delete button
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteButton.classList.add("delete-btn");
      todoDiv.appendChild(deleteButton);
      //append todo
      todoList.appendChild(todoDiv);
      if (completed.includes(todo)) {
        todoDiv.classList.toggle("completed");
      }
    })
  }
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalCompleted(todo) {
  let completed;
  if (localStorage.getItem('completed') === null) {
    completed = [];
  } else {
    completed = JSON.parse(localStorage.getItem('completed'));
  }
  const todoIndex = todo.children[0].innerText;
  completed.splice(completed.indexOf(todoIndex), 1);
  localStorage.setItem('completed', JSON.stringify(completed));
}
