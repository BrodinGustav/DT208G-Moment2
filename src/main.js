// Klass som hanterar listan av todos och dess operationer
var TodoList = /** @class */ (function () {
    // Konstruktor som initierar todos-arrayen och laddar todos från LocalStorage
    function TodoList() {
        this.todos = [];
        this.loadFromLocalStorage();
    }
    // Metod för att lägga till nya todos med prioritet
    TodoList.prototype.addTodo = function (task, priority) {
        // Kontrollera om sträng för uppgift är tom eller om prioritering är giltig.
        if (task.trim() === "" || isNaN(priority) || priority < 1 || priority > 3) {
            return false; // Returnera false om ogiltiga värden har matats in
        }
        // Skapa en ny todo och lägg till i listan
        var newTodo = {
            task: task,
            completed: false,
            priority: priority
        };
        this.todos.push(newTodo); //Todo läggs i array
        this.saveToLocalStorage(); // Spara ändringar till LocalStorage
        return true; // Returnera true för att indikera att todo har lagts till
    };
    // Metod för att markera en todo som klar
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) { //Kontrollerar att Index är större eller lika med noll och att index är mindre än längden på arrayen.
            this.todos[todoIndex].completed = true; // Markera todo som klar 
            this.saveToLocalStorage(); // Spara ändringar till LocalStorage
        }
    };
    // Metod för att radera en todo
    TodoList.prototype.deleteTodo = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos.splice(todoIndex, 1); // Radera todo från listan
            this.saveToLocalStorage();
        }
    };
    // Metod för att hämta hela listan av todos
    TodoList.prototype.getTodos = function () {
        return this.todos; // Returnera listan av todos
    };
    // Metod för att spara todos till LocalStorage
    TodoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem("todos", JSON.stringify(this.todos)); // Spara todos som sträng i LocalStorage
    };
    // Metod för att hämta todos från LocalStorage
    TodoList.prototype.loadFromLocalStorage = function () {
        var storedTodos = localStorage.getItem("todos"); // Hämta todos från LocalStorage
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos); // Om det finns lagrade todos, ladda dem till listan
        }
    };
    return TodoList;
}());
document.addEventListener("DOMContentLoaded", function () {
    // Skapa en instans av TodoList-klassen för att hantera todos
    var todoListManager = new TodoList();
    todoListManager.loadFromLocalStorage(); // Ladda todos från localStorage
    renderTodos(); // Anropa renderTodos() direkt efter att todos har laddats
    // Hämta referenser till HTML-elementen från DOM
    var todoForm = document.getElementById('todo-form');
    var todoTaskInput = document.getElementById('todo-task');
    var todoPriorityInput = document.getElementById('todo-priority');
    // Funktion för att rendera todos på webbsidan
    function renderTodos() {
        var todoList = document.getElementById('todo-list'); // Säkerställer att todoList är tillgängligt när renderTodos() anropas
        todoList.innerHTML = ''; // Rensa listan för att undvika dubbletter
        // Iterera över varje todo och skapa HTML-element
        todoListManager.getTodos().forEach(function (todo, index) {
            var listItem = document.createElement('li'); // Skapa ett <li>-element
            listItem.textContent = "".concat(todo.task, " - Prioritering: ").concat(todo.priority); // Text för todo
            if (todo.completed) {
                listItem.classList.add('completed'); // Lägg till CSS-klassen om todo är klar
            }
            // Lägg till en knapp för att markera todo som klar
            var markCompletedButton = document.createElement('button');
            markCompletedButton.textContent = 'Klar';
            markCompletedButton.addEventListener('click', function () {
                todoListManager.markTodoCompleted(index);
                renderTodos(); // Uppdatera visningen av todos efter ändring
            });
            //Lägg till knapp för att radera todo
            var deleteToDoButton = document.createElement('button');
            deleteToDoButton.textContent = 'Radera';
            deleteToDoButton.addEventListener('click', function () {
                todoListManager.deleteTodo(index);
                renderTodos();
            });
            // Lägg till knappar i todo-elementet och <li>-element i listan
            todoList.appendChild(markCompletedButton);
            todoList.appendChild(deleteToDoButton);
            todoList.appendChild(listItem);
        });
    }
    // Lyssnare för formuläret för att lägga till nya todos
    todoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Förhindra standardbeteendet för formuläret
        var task = todoTaskInput.value; //Hämta input från formuläret
        var priority = parseInt(todoPriorityInput.value); //Hämta prioritet från formuläret
        // Om todo har lagts till, rendera om listan av todos
        if (todoListManager.addTodo(task, priority)) {
            renderTodos();
            todoTaskInput.value = '';
            todoPriorityInput.value = '';
        }
        else {
            alert('Felaktig input. Var god välj prioritet mellan 1-3.');
        }
    });
    renderTodos(); // Rendera listan av todos när sidan laddas
});
