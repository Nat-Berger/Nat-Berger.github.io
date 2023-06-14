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
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  //append todo
  todoList.appendChild(todoDiv);
  todoInput.value = '';
}
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    if (localStorage.getItem('completed') === null){
      localStorage.setItem('completed', JSON.stringify(todo));
      let completed = JSON.parse(localStorage.getItem('completed')); //what if theres none? 
      console.log(completed);


      //WHAT THE FUCK AM I DOING?


    }
    if (completed.includes(todo)){ 
      const completedIndex = todo.children[0].innerText;
      console.log(completedIndex);
      completed.splice(completed.indexOf(completedIndex), 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }else{
      localStorage.setItem('completed', JSON.stringify(todo));
    }
  
    //update local storage to include the attribute of 'completed'


    const checked = todo.children[0].innerText; //gives me item name
    let item_in_storage = localStorage.getItem('completed');
    if (item_in_storage.includes(checked)){
      console.log('It include' + checked);
    }
    else{
      saveLocalCompletedTodos(checked);
    }
     //saving as object
    // //const completed = localStorage.getItem('completed');
    // let completed = ["item1", "item2"];
    // console.log(completed);

    // if (completed.includes((checked)) === true){
    //   console.log("I am this item: " + checked);
    // }
    // else{
    //   saveLocalCompletedTodos(checked);
    // }
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

function saveLocalCompletedTodos(todo){
  let todos;
  if (localStorage.getItem('completed') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('completed'));
  }
  todos.push(todo);
  localStorage.setItem('completed', JSON.stringify(todos));
}
function removeLocalCompletedTodos(todo)
{
  localStorage.getItem(todo)
  console.log('Unchecked');
}
function getTodos() {
  let todo;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
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
  })
}
function removeLocalTodos(todo){
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