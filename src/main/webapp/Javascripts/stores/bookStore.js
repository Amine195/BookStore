import { ROUTES } from "../constants/routes.js";
import { sendRequest } from "../utils/httpClient.js";

export default {
    // Liste des livres
    booksList: [],

    loadBooks: async function (data) {
        this.booksList = await sendRequest(ROUTES.booksLoad, data);
    },
    
    saveBook: async function (book) {
        return await sendRequest(ROUTES.bookSave, book);
    },

    selectBook: async function (id) {
        return await sendRequest(ROUTES.bookSelect, { id });
    },

    updateBook: async function (book) {
        return await sendRequest(ROUTES.bookUpdate, book);
    },

    deleteBook: async function (id) {
        return await sendRequest(ROUTES.bookDelete, { id });
    }
};