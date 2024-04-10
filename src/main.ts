// Interface 
interface Todo {
    task: string;                                            // Texten för själva uppgiften
    completed: boolean;                                      // Markera om uppgiften är klar eller inte
    priority: number;                                        // En heltalsvariabel från 1 till 3 för prioritering
  }

  // Klass som hanterar listan av todos och dess operationer
class TodoList {
    private todos: Todo[];                                   // Array för att lagra todos
  
    // Konstruktor som initierar todos-arrayen och laddar todos från LocalStorage
    constructor() {
      this.todos = [];
      this.loadFromLocalStorage();
    }
  
    // Metod för att lägga till nya todos med prioritet
    addTodo(task: string, priority: number): boolean {
     
    // Kontrollera om sträng för uppgift är tom eller om prioritering är giltig.
      if (task.trim() === "" || isNaN(priority) || priority < 1 || priority > 3) {
    
        return false;                                           // Returnera false om ogiltiga värden har matats in
      }
  
      // Skapa en ny todo och lägg till i listan
      const newTodo: Todo = {
        task: task,
        completed: false,
        priority: priority
      };

      this.todos.push(newTodo);                                 //Todo läggs i array
      this.saveToLocalStorage();                                // Spara ändringar till LocalStorage
      return true;                                              // Returnera true för att indikera att todo har lagts till
    }
  
    // Metod för att markera en todo som klar
    markTodoCompleted(todoIndex: number): void {
      if (todoIndex >= 0 && todoIndex < this.todos.length) {    //Kontrollerar att Index är större eller lika med noll och att index är mindre än längden på arrayen.
        this.todos[todoIndex].completed = true;                 // Markera todo som klar
        this.saveToLocalStorage();                              // Spara ändringar till LocalStorage
      }
    }
 
    // Metod för att radera en todo
    deleteTodo(todoIndex: number): void {
      if (todoIndex >= 0 && todoIndex < this.todos.length) {
          this.todos.splice(todoIndex, 1);                      // Radera todo från listan
          this.saveToLocalStorage(); 
      }
  }
  
    // Metod för att hämta hela listan av todos
    getTodos(): Todo[] {
      return this.todos;                                        // Returnera listan av todos
    }
  
    // Metod för att spara todos till LocalStorage
    saveToLocalStorage(): void {
      localStorage.setItem("todos", JSON.stringify(this.todos)); // Spara todos som sträng i LocalStorage
    }
  
    // Metod för att hämta todos från LocalStorage
    loadFromLocalStorage(): void {
      const storedTodos = localStorage.getItem("todos");        // Hämta todos från LocalStorage
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);                   // Om det finns lagrade todos, ladda dem till listan
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {

// Skapa en instans av TodoList-klassen för att hantera todos
  const todoListManager = new TodoList();
  todoListManager.loadFromLocalStorage(); // Ladda todos från localStorage
  renderTodos(); // Anropa renderTodos() direkt efter att todos har laddats

 // Hämta referenser till HTML-elementen från DOM
 const todoForm = document.getElementById('todo-form') as HTMLFormElement;
 const todoTaskInput = document.getElementById('todo-task') as HTMLInputElement;
 const todoPriorityInput = document.getElementById('todo-priority') as HTMLInputElement;
 const todoList = document.getElementById('todo-list') as HTMLUListElement;
 const markCompletedButton = document.getElementById('mark-completed') as HTMLButtonElement;

  // Funktion för att rendera todos på webbsidan
  function renderTodos(): void {
    const todoList = document.getElementById('todo-list') as HTMLUListElement;  // Säkerställer att todoList är tillgängligt när renderTodos() anropas
    todoList.innerHTML = ''; // Rensa listan för att undvika dubbletter
  
    // Iterera över varje todo och skapa HTML-element
    todoListManager.getTodos().forEach((todo, index) => {
        const listItem = document.createElement('li');                          // Skapa ett <li>-element
        listItem.textContent = `${todo.task} - Priority: ${todo.priority}`;     // Text för todo
        if (todo.completed) {
          listItem.classList.add('completed');                                  // Lägg till CSS-klassen om todo är klar
        }
    
    // Lägg till en knapp för att markera todo som klar
      const markCompletedButton = document.createElement('button');
      markCompletedButton.textContent = 'Completed';
      markCompletedButton.addEventListener('click', (event) => {                // Markera todo som klar vid klick
        todoListManager.markTodoCompleted(index);                               
        renderTodos();                                                          // Uppdatera visningen av todos efter ändring
      });
  
       //Lägg till knapp för att radera todo
       const deleteToDoButton = document.createElement('button');
       deleteToDoButton.textContent = 'Delete';
       deleteToDoButton.addEventListener('click', (event) => {                  //Radera todo vid klick
         todoListManager.deleteTodo(index);
         renderTodos();
       })

       // Lägg till knappar i todo-elementet och <li>-element i listan
       listItem.appendChild(markCompletedButton);                               
       listItem.appendChild(deleteToDoButton);
       todoList.appendChild(listItem); 
     });
   }


   
renderTodos(); // Rendera listan av todos när sidan laddas
  
}

});
