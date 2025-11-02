import { ROUTES } from "../constants/routes.js";
import { sendRequest } from "../utils/httpClient.js";

export default {
    // Liste des livres
    booksList: [],

    async loadBooks(data) {
        this.booksList = await sendRequest(ROUTES.booksLoad, data);
    },

    async saveBook(book) {
        return await sendRequest(ROUTES.bookSave, book);
    },

    async selectBook(id) {
        return await sendRequest(ROUTES.bookSelect, { id });
    },

    async updateBook(book) {
        return await sendRequest(ROUTES.bookUpdate, book);
    },

    async deleteBook(id) {
        return await sendRequest(ROUTES.bookDelete, { id });
    }
};