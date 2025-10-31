document.addEventListener("alpine:init", () => {
    Alpine.store("auth", authStore);
    Alpine.store("books", booksStore);

    Alpine.data("bookApp", );
    Alpine.data("login", );
});
