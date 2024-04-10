Todo List Applikation
Beskrivning
Det här är en enkel webbapplikation för att hantera en lista av "todo"-uppgifter. Användare kan lägga till nya uppgifter, markera dem som klara och ta bort dem från listan. Prioritet kan också anges för varje uppgift.

Tekniker och verktyg
HTML: För strukturen och layouten av webbsidan.
CSS: För att styla och designa webbsidan.
JavaScript (TypeScript): För att hantera funktionaliteten hos todo-listan.
Parcel: En webbapplikationsbuntare för att bygga och köra applikationen.
LocalStorage: För att lagra todo-uppgifterna lokalt i användarens webbläsare.

Installation och användning
Klona projektet från GitHub: https://github.com/BrodinGustav/DT208G-Moment2.git
Öppna terminalen och navigera till projektmappen.
Installera projektets beroenden genom att köra kommandot npm install.
Kör applikationen genom att använda kommandot npm start. Det här kommandot startar utvecklingsservern och öppnar applikationen i din standardwebbläsare.
Du kan nu lägga till, markera och ta bort todo-uppgifter från listan.

Projektstruktur
index.html: Huvud-HTML-filen som innehåller strukturen för webbsidan och länkar till andra resurser.
style.css: CSS-filen för att styla och designa webbsidan.
main.ts: Huvud-JavaScript (TypeScript)-filen som innehåller koden för att hantera funktionaliteten hos todo-listan.
package.json: Projektets paketkonfigurationsfil som innehåller metadata och beroenden.
README.md: Den här filen, som innehåller information om projektet och hur det kan användas.

Funktioner
Lägg till ny todo: Användare kan skriva in en uppgift och ange dess prioritet (1-3) för att lägga till den i listan.
Markera todo som klar: Användare kan klicka på knappen "Klar" intill varje uppgift för att markera den som klar.
Radera todo: Användare kan klicka på knappen "Radera" intill varje uppgift för att ta bort den från listan.
Prioritet: Varje uppgift kan ha en prioritet mellan 1 och 3, där 1 är den högsta och 3 är den lägsta prioriteringen.
Lokal lagring: Todo-uppgifterna lagras lokalt i användarens webbläsare med hjälp av LocalStorage, vilket gör att de behålls även efter att sidan har laddats om.



