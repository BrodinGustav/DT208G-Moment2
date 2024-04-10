// Interface 
interface Todo {
    id: number;                                              // Id för att identifiera varje todo
    task: string;                                            // Texten för själva uppgiften
    completed: boolean;                                      // Markera om uppgiften är klar eller inte
    priority: number;                                        // En heltalsvariabel från 1 till 3 för prioritering
  }

  // Klass som hanterar listan av todos och dess operationer
class TodoList {
    private todos: Todo[];                                   // Array för att lagra todos
    private nextId: number;                                  //Variabel som håller koll på nästa tilldelade ID för todo 

    // Konstruktor som initierar todos-arrayen och laddar todos från LocalStorage
    constructor() {
      this.todos = [];
      this.loadFromLocalStorage();
      this.nextId = 1;                                      //Börjar med ID 1
    }
  
    // Metod för att lägga till nya todos med prioritet
    addTodo(task: string, priority: number): boolean {
     
    // Kontrollera om sträng för uppgift är tom eller om prioritering är giltig.
      if (task.trim() === "" || isNaN(priority) || priority < 1 || priority > 3) {
    
        return false;                                           // Returnera false om ogiltiga värden har matats in
      }
  
      // Skapa en ny todo och lägg till i listan
      const newTodo: Todo = {
        id: this.nextId,
        task: task,
        completed: false,
        priority: priority
      };

      // Öka nästa tilldelade ID för nästa todo
      this.nextId++;

      this.todos.push(newTodo);                                 //Todo läggs i array
      this.saveToLocalStorage();                                // Spara ändringar till LocalStorage
      return true;                                              // Returnera true för att indikera att todo har lagts till
    }
  
    // Metod för att markera en todo som klar
    markTodoCompleted(todoId: number): void {
        let todoIndex = -1;                                     // Initialisera med ett ogiltigt index

        for (let i = 0; i < this.todos.length; i++) {           //Loopar igenom this.todos-array efter specifikt ID
            if (this.todos[i].id === todoId) {
                todoIndex = i;                                  
                break; 
            }
        }

          // Kontrollera om ett giltigt index hittades
    if (todoIndex !== -1) {
        this.todos[todoIndex].completed = true;                 // Markera todo som klar
        this.saveToLocalStorage(); 
    }
}
 
    // Metod för att radera en todo
    deleteTodo(todoId: number): void {
        let todoIndex = -1; 

        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === todoId) {
                todoIndex = i; 
                break; 
            }
        }
    
        // Kontrollera om ett giltigt index hittades
        if (todoIndex !== -1) {
            this.todos.splice(todoIndex, 1);                    // Radera todo från listan
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
      markCompletedButton.textContent = 'Klar';
      markCompletedButton.addEventListener('click', () => {                // Markera todo som klar vid klick
        todoListManager.markTodoCompleted(index);                               
        renderTodos();                                                          // Uppdatera visningen av todos efter ändring
      });                           
  
       //Lägg till knapp för att radera todo
       const deleteToDoButton = document.createElement('button');
       deleteToDoButton.textContent = 'Radera';
       deleteToDoButton.addEventListener('click', () => {                  //Radera todo vid klick
         todoListManager.deleteTodo(index);
         renderTodos();
       })

       // Lägg till knappar i todo-elementet och <li>-element i listan
       listItem.appendChild(markCompletedButton);  
       listItem.appendChild(deleteToDoButton);
       todoList.appendChild(listItem); 
     });
   }

 // Lyssnare för formuläret för att lägga till nya todos
 todoForm.addEventListener('submit', (event) => {
    event.preventDefault();                                                 // Förhindra standardbeteendet för formuläret
    const task = todoTaskInput.value;                                       //Hämta input från formuläret
    const priority = parseInt(todoPriorityInput.value);                     //Hämta prioritet från formuläret
    
    // Om todo har lagts till, rendera om listan av todos
    if (todoListManager.addTodo(task, priority)) {
      renderTodos(); 
      todoTaskInput.value = '';                                             
      todoPriorityInput.value = ''; 
  
    } else {
      alert('Invalid input. Var god välj prioritet mellan 1-3.'); 
    }
  });
  

  // Lyssnare för knappen för att markera todos som klara
  markCompletedButton.addEventListener('click', () => {
    renderTodos();                                                          // Rendera om listan av todos när knappen klickas
  });
   
renderTodos(); // Rendera listan av todos när sidan laddas
  
});
