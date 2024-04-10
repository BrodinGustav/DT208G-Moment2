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
  
  