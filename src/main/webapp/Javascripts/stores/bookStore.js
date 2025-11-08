import { ROUTES } from "../constants/routes.js";
import { sendRequest } from "../utils/httpClient.js";

export default {
    booksList: [],
    booksCart: [],
    
    async init() {
        this.booksCart = await sendRequest(ROUTES.cartLoad);
    },

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
    },
    
    addToCart: async function (id) {
        this.booksCart = await sendRequest(ROUTES.cartAdd, { id });
    },
    
    totalQuantity() {
        return this.booksCart.reduce((sum, item) => sum + item.quantity, 0);
    },
        
    subtotal() {
        return this.booksCart.reduce((total, item) => {
            return total + (item.book.price * item.quantity);
        }, 0);
    },

    tps() {
        return this.subtotal() * 0.05;
    },

    tvq() {
        return this.subtotal() * 0.09975;
    },

    total() {
        return this.subtotal() + this.tps() + this.tvq();
    }
};