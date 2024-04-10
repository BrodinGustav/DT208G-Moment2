Todo List Applikation

***Beskrivning***
Det här är en enkel webbapplikation för att hantera en lista av "todo"-uppgifter. Användare kan lägga till nya uppgifter, markera dem som klara och ta bort dem från listan. Prioritet kan också anges för varje uppgift.

***Struktur och komponenter***

Interface: Todo
För att definiera strukturen för varje todo har ett interface Todo skapats. Detta interface har tre egenskaper:

task: En sträng som representerar själva uppgiften.
completed: En boolean som indikerar om uppgiften är klar eller inte.
priority: En heltalsvariabel från 1 till 3 för att ange prioritet på uppgiften.


*** Klass: TodoList
En klass TodoList har skapats för att hantera listan av todos och dess operationer. Den innehåller följande metoder:

***constructor(): Konstruktorn initialiserar en tom array för att lagra todos och laddar tidigare sparade todos från LocalStorage om det finns några.
***addTodo(task: string, priority: number): boolean: Metoden för att lägga till nya todos i listan. Den tar emot uppgiftens namn och prioritet och lägger till en ny todo i listan om de är giltiga.
***markTodoCompleted(todoIndex: number): void: Metoden för att markera en todo som klar. Den tar emot ett index för den todo som ska markeras som klar och ändrar dess completed-egenskap till true.
***deleteTodo(todoIndex: number): void: Metoden för att ta bort en todo från listan. Den tar emot ett index för den todo som ska tas bort och tar bort den från listan.
***getTodos(): Todo[]: Metoden för att hämta hela listan av todos.
***saveToLocalStorage(): void: Metoden för att spara todos till LocalStorage som en sträng.
***loadFromLocalStorage(): void: Metoden för att hämta todos från LocalStorage och ladda dem till listan.

***Frontend-gränssnitt***
Gränssnittet består av HTML-element och JavaScript-kod för att rendera todos på webbsidan och hantera användarens interaktioner.

***HTML-element:
Ett formulär för att lägga till nya todos med fält för att ange uppgiftens namn och prioritet.
En lista (ul) med ID todo-list där alla todos kommer att visas.
Knappar för att markera todos som klara och ta bort dem från listan.

***JavaScript-kod:
Eventlyssnare för formuläret för att lägga till nya todos.
Eventlyssnare för knappen för att markera todos som klara.
Eventlyssnare för knapparna för att ta bort todos från listan.
En funktion renderTodos() som renderar todos på webbsidan och uppdaterar vyn efter varje ändring.

***Installation och användning***

Klona projektet från GitHub: https://github.com/BrodinGustav/DT208G-Moment2.git
Öppna terminalen och navigera till projektmappen.
Installera projektets beroenden genom att köra kommandot npm install.
Kör applikationen genom att använda kommandot npm start. Det här kommandot startar utvecklingsservern och öppnar applikationen i din standardwebbläsare.
Du kan nu lägga till, markera och ta bort todo-uppgifter från listan.

***Projektstruktur***

index.html: Huvud-HTML-filen som innehåller strukturen för webbsidan och länkar till andra resurser.
style.css: CSS-filen för att styla och designa webbsidan.
main.ts: Huvud-JavaScript (TypeScript)-filen som innehåller koden för att hantera funktionaliteten hos todo-listan.
package.json: Projektets paketkonfigurationsfil som innehåller metadata och beroenden.
README.md: Den här filen, som innehåller information om projektet och hur det kan användas.

***Funktioner***

Lägg till ny todo: Användare kan skriva in en uppgift och ange dess prioritet (1-3) för att lägga till den i listan.
Markera todo som klar: Användare kan klicka på knappen "Klar" intill varje uppgift för att markera den som klar.
Radera todo: Användare kan klicka på knappen "Radera" intill varje uppgift för att ta bort den från listan.
Prioritet: Varje uppgift kan ha en prioritet mellan 1 och 3, där 1 är den högsta och 3 är den lägsta prioriteringen.
Lokal lagring: Todo-uppgifterna lagras lokalt i användarens webbläsare med hjälp av LocalStorage, vilket gör att de behålls även efter att sidan har laddats om.



