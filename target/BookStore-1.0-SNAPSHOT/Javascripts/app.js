import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/module.esm.js";

import authStore from "./stores/authStore.js";
import bookStore from "./stores/bookStore.js";

import bookApp from "./components/bookApp.js";
import login from "./components/login.js";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
    Alpine.store("auth", authStore);
    Alpine.store("books", bookStore);

    Alpine.data("bookApp", bookApp);
    Alpine.data("login", login);
});

Alpine.start();
