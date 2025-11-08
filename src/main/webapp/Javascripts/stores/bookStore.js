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
    
    removeFromCart: async function (id) {
        this.booksCart = await sendRequest(ROUTES.cartDelete, { id });
    },
    
    processFinish: async function () {
        this.booksCart = await sendRequest(ROUTES.processFinish);
        return this.booksCart.length;
    },
    
    handleAddToCart: async function(event, id) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        
        const floatNumber = document.createElement('div');
        floatNumber.className = 'float-number';
        floatNumber.textContent = '+1';
        floatNumber.style.position = 'fixed';
        floatNumber.style.left = `${rect.left + rect.width / 2 - 15}px`;
        floatNumber.style.top = `${rect.top - 10}px`;
        
        document.body.appendChild(floatNumber);
        
        setTimeout(() => floatNumber.remove(), 1000);
        await this.addToCart(id);
    },
       
    get totalQuantity() {
        return this.booksCart.reduce((sum, item) => sum + item.quantity, 0);
    },
        
    get subtotal() {
        return this.booksCart.reduce((total, item) => {
            return total + (item.book.price * item.quantity);
        }, 0);
    },

    get tps() {
        return this.subtotal * 0.05;
    },

    get tvq() {
        return this.subtotal * 0.09975;
    },

    get total() {
        return this.subtotal + this.tps + this.tvq;
    }
};