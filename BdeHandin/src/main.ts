import './style.css'

// Define the structure of a todo item
interface Todo {
  id: number; // Unique identifier for each todo
  title: string; // The text of the todo
  completed: boolean; // Whether the todo is completed or not
  dueDate?: string; // Optional due date for the todo
  dueTime?: string; // Optional due time for the todo
}

// Step 2: Initialize the todos array
let todos: Todo[] = [];

// Step 3: Get references to the HTML elements, these are referencing to the HTML
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;

// Step 4: Function to add a new todo
// const addTodo = () => {} this is the basic structure of the code, always type that out before the code
// void means there is no returns. String means they are pushing out words, cannot push out numbers. 
const addTodo = (text: string, dueDate: string, dueTime: string): void => { // void means there is no returns. String means they are pushing out words, cannot push out numbers. 
  const newTodo: Todo = {          // this is like a variable
    id: Date.now(),
    title: text,
    completed: false,
    dueDate, // Add the due date to the new todo
    dueTime  // Add the due time to the new todo
  };
  todos.push(newTodo); // we reference the Todo from line 21, we only use command push for arrays
  console.log("Todo added: ", todos); // console log to test if stuff works. 
  renderTodos(); // renders the todos when new is added to the list, aka you don't need to refresh the page for it to show up
};

// Function to render todos on the page
const renderTodos = (): void => { // void because no return - what we are doing is updating the DOM
  // Clear the current list
  todoList.innerHTML = '';

  // Iterate over the todos array and create list items for each todo
  todos.forEach(todo => { // In this specific case, .forEach is more suitable because we are directly modifying the DOM for each todo item.
    const li = document.createElement('li');
    li.className = 'todo-item'; // Add a class to the list item

    // Use template literals to create the HTML content for each list item
    li.innerHTML = `                      
      <span>${todo.title}</span>
      ${todo.dueDate ? `<span class="due-date">Due: ${todo.dueDate}</span>` : ''}
      ${todo.dueTime ? `<span class="due-time">Time: ${todo.dueTime}</span>` : ''}
      <input type="checkbox" ${todo.completed ? 'checked' : ''} class="complete-checkbox" id="checkbox"> Mark as completed
      <button>Remove</button>
      <button id="editBtn">Edit</button>
    `; 
    if (todo.completed) {
      li.style.backgroundColor = '#D1AD91';
    }
    // addRemoveButtonListener is further down in the code. We have onclick in the function instead of template literals. More safe to use addEventListener.
    addRemoveButtonListener(li, todo.id); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo.
    addEditButtonListener(li, todo.id); 
    addCheckboxListener(li, todo.id);
    todoList.appendChild(li); // Append the list item to the ul element
  });
};

renderTodos();

// Function to add checkbox listener
const addCheckboxListener = (li: HTMLLIElement, id: number) => {
  const checkbox = li.querySelector('.complete-checkbox') as HTMLInputElement;
  checkbox.addEventListener('change', () => toggleCompleteStatus(id));
};

// Function to toggle the completed status of a todo
const toggleCompleteStatus = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
};

// Event listener for the form submission
todoForm.addEventListener('submit', (e) => {    // e in here stands for an event, this could for example be a click or anything other that a user might do.
  e.preventDefault();     // this function prevents the page from reloading every time you press submit. basically removes the "default" function of reloading the page every time you submit something
  const text = todoInput.value.trim();
  const dueDate = (document.getElementById('todo-due-date') as HTMLInputElement).value; // Get due date from the input
  const dueTime = (document.getElementById('todo-due-time') as HTMLInputElement).value; // Get due time from the input
  if (text !== '') {
    addTodo(text, dueDate, dueTime); // Pass the due date and due time to the addTodo function
  }        
});

// Function to add remove button listener
const addRemoveButtonListener = (li: HTMLLIElement, id: number) => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id));   // we are listening for a click on the button, the remove button has a question mark is optional, so that it doesn't automatically do it, it does it only when we click, which is when the optional aspect of it becomes mandatory
};

// Function to remove a todo
const removeTodo = (id: number) => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
};

// Edit function to the code, to change value in a field we added, we are coding the prompt in 
// what we need to make this work is: access to id, the edit button, event listener, function edit, prompt, render (somewhere to type in the change) 
const addEditButtonListener = (li: HTMLLIElement, id: number) => {
  const editButton = li.querySelector('#editBtn');  //#editBtn is an id, we need to add it because otherwise the command will look for other buttons, it will be referenced on line 45
  editButton?.addEventListener('click', () => editTodo(id));  // this only listens for the user, listening for the click of the specific button, it doesn't do anything else
};

// Function to edit a todo
const editTodo = (id: number) => {
  const todo = todos.find(todo => todo.id === id); // === if you put three of these, they are absolutely true, but if we have ! we are changing if it's true. = can change, == is kinda true, === is absolutely true
  if (todo) {   // if the button todo is there do the action
    const text = prompt("Edit todo text", todo.title);   // check step 4 for reference to text and title
    if (text) {
      todo.title = text;
      renderTodos();
    }
  }
};

// We will create an option so that our colour picker changes the colour of our background
// for that, we need to add: function, event listener, BGC + BODY

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};

// Function to change the background color
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;   // command document goes to our HTML, that is why we need to have it, to find the code
};

// Initialize the color picker when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {     
  initializeColorPicker();
});


//MY TASK: okay so i need to create a button to mark my tasks

//WORK I HAVE DONE: Added a checkbox for completed tasks
/** 
 * Kristian: 6th of September 2024, BDE
 * 
 * This is the list of optional features that can be added to the todo list application:
 * You must make at least one of these features to complete the project. The more the merrier.
 * In your submission video, please mention which feature you have implemented and demonstrate how it works. Go through the code and explain how you implemented the feature and how it works.
 * IF, you want to implement something not on list, you can do that as well.
*/


//Optional features list: 

// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item


// Option 6: Due Date for Todos:
// Add a date input field to set a due date for each todo item.
// Display the due date next to each todo item.
// Highlight overdue todos.
// Priority Levels:




