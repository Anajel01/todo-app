import './style.css'

interface Todo{
  id:number;
  title: string;
  completed: boolean;
}

//step 2: initialize the todos array
let todos: Todo[] = []

//step 3: get refrence to the html elements, these are refrencing to the html
const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement

//step 4: function to add a new todo
// const addTodo = () => {} this is the basic structure of the code, always type that out before the code
//void means there is no returns. String means they are pushing out words, can not push out numbers. 
const addTodo = (text:string): void => { //void means there is no returns. String means they are pushing out words, can not push out numbers. 
  const newTodo: Todo = {          //this is like a variable
    id: Date.now(),
    title: text,
    completed: false
  }
  todos.push(newTodo) //we refrence the Todo from line 21, we only use command push for arrays
  console.log("Todo added: ", todos); //console log to test if stuff works. 
renderTodos() //renders the todos when new is added to the list, aka you dont need to refresh the page for it to show up
}


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
      <input type="checkbox" ${todo.completed ? 'checked' : ''} class="complete-checkbox" id="checkbox"> Mark as completed
      <button>Remove</button>
      <button id="editBtn">Edit</button>




    `; 
    if (todo.completed) {
      li.style.backgroundColor = 'green';
    }
    // addRemoveButtonListener is further down in the code. We have onclick in the function instead of template literals. More safe to use addEventListener.
    addRemoveButtonListener(li, todo.id); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo.
    addEditButtonListener(li, todo.id); 
    addCheckboxListener(li, todo.id);
    todoList.appendChild(li); // Append the list item to the ul element
  });
};

renderTodos()
const addCheckboxListener = (li: HTMLLIElement, id: number) => {
  const checkbox = li.querySelector('.complete-checkbox') as HTMLInputElement;
  checkbox.addEventListener('change', () => toggleCompleteStatus(id));
};

const toggleCompleteStatus = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
};

todoForm.addEventListener('submit', (e) => {    //e in here stands for an event, this could for example be a klick or anything other that a user might do.
  e.preventDefault()     //this function prevents the page from reloading every time you press submit. basically removes the "deafult" function of reloading the page every time you submit something
  const text = todoInput.value.trim()
  if (text !=='') (
    addTodo(text)
  )          //this value converts strings into numbers, it takes whatever you put into it into a number
    


     
})

const addRemoveButtonListener = (li: HTMLLIElement, id: number) => {
  const removeButton = li.querySelector('button')
 removeButton?.addEventListener('click', () => removeTodo(id))   //we are listening for a klick on the button, the remove button has a question mark is optional, so that it doesnt automatically do it, it does it only when we klick, which is when the optional aspect of it becomes mandatory
}

const removeTodo = (id:number) => {
 todos = todos.filter(todo => todo.id !== id)
 renderTodos()
}


//edit function to the code, to change value in a field we added, we are coding the prompt in 
//what we need to make this work is: access to id, the edit button, event listener, function edit, prompt, render(somewhere to type in the change) 
const addEditButtonListener = (li: HTMLLIElement,  id:number) => {
  const editButton = li.querySelector('#editBtn')  //#editBtn is an id, we need to add it because otherwose the command will look for other buttons, it will be refrenced on line 45
  editButton?.addEventListener('click', () => editTodo(id))  //this onlt listens for the user, listening for the klick of the specific button, it doesnt do anything else

}

const editTodo = (id:number) => {
  const todo = todos.find(todo => todo.id === id) //=== if you put three of these, they are absolutelly ytue, but if we have ! we are changing if its true. = can change, == is kinda true, ===is absolitelly true
  if (todo) {   //if the button todo is there do the action
    const text = prompt("edit todo text", todo.title)   //check step 4 for refrence to text and title
    if (text) {
      todo.title = text
      renderTodos()
    }
  }
}

//We will create an option so that our colour picker changes the colour of our background
//for that, we need to add: function, event listener,, BGC + BODY

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement
  if(colorPicker) {
    colorPicker.addEventListener('input', (event: Event)=> {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value)
    })
  }
  else {
    console.error('Color picker element not found')
  }

}
const changeBackgroundColor = (color:string):void => {
  document.body.style.backgroundColor = color   //command document goes to our html, that is why we need to have it, to find the code
}

document.addEventListener('DOMContentLoaded', () => {     
  initializeColorPicker()
})

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

// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos

// Option 3: Add a button to toggle all todos
// Edit a todo item and update it
// Add an input field to edit a todo item
// Save the updated todo item
// Cancel the editing of a todo item
// Add a button to cancel the editing of a todo item

// Option 4: Add a button to filter todos by status
// Add a button to filter todos by status
// Function to filter todos by status

// Option 5: Add a button to sort todos by status
// Add a button to sort todos by status
// Function to sort todos by status

// Option 6: Due Date for Todos:
// Add a date input field to set a due date for each todo item.
// Display the due date next to each todo item.
// Highlight overdue todos.
// Priority Levels:

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.
// Search Functionality:

// Option 8: Add a search input field to filter todos based on the search query.
// Display only the todos that match the search query.
// Category Tags:

// Option 9: Add a text input field to assign category tags to each todo item.
// Display the tags next to each todo item.
// Filter todos by category tags.
// Progress Indicator:

// Option 10: Add a progress bar to show the percentage of completed todos.
// Update the progress bar as todos are marked as completed or incomplete.
// Dark Mode Toggle:

// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.
// Export/Import Todos:

// Option 12: Add buttons to export the list of todos to a JSON file.
// Add functionality to import todos from a JSON file.
// Notifications:

// Option 13: Add notifications to remind users of due todos.
// Use the Notification API to show browser notifications.

// Option 14: Local Storage:
// Save the list of todos to local storage.
// Retrieve the todos from local storage on page load.
// Add a button to clear all todos from local storage.

// Option 15: JSDOC Comments:
// Add JSDoc comments to document the functions and interfaces in the code.
// Link : https://jsdoc.app/

// Optional 16: Handle Errors:
// Add error handling for user input validation. Show red text or border for invalid input.
// Display error messages for invalid input.


