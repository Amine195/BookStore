import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/module.esm.js";

import authStore from "./stores/authStore.js";
import bookStore from "./stores/bookStore.js";

import book from "./components/book.js";
import login from "./components/login.js";
import cart from "./components/cart.js";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
    Alpine.store("auth", authStore);
    Alpine.store("books", bookStore);

    Alpine.data("book", book);
    Alpine.data("login", login);
    Alpine.data("cart", cart);
});

Alpine.start();
