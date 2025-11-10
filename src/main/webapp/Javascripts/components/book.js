import { handleAsyncWrapperBook } from "../utils/helpers.js";
import {
    createEmptyBook,
    createEmptyErrors,
    formatBookFromResponse 
} from '../utils/bookModel.js';
import { validateBook } from '../utils/bookValidator.js';
import { 
    showSuccessNotification, 
    showDeleteConfirmation 
} from '../utils/notifications.js';

export default () => ({
    selectedOption: "Cart",
    isLoading: true,
    
    isLoadingDetails: false,
    isLoadingDetailsProgress: 0,
    isLoadingDetailsProgressId: undefined,
    
    isLoadingCart: false,
    isLoadingCartProgress: 0,
    
    ...createEmptyBook(),
    
    filters: {
        categories: [],
        format: [],
        langue: [],
        enStock: []
    },
    
    errors: createEmptyErrors(),

    resetBook() {
        Object.assign(this, createEmptyBook());
    },

    getCurrentBook() {
        return {
            id: this.bookId,
            title: this.bookTitle,
            author: this.bookAuthor,
            publisher: this.bookPublisher,
            publicationDate: this.bookPublicationDate,
            category: this.bookCategory,
            language: this.bookLanguage,
            pages: this.bookPages,
            format: this.bookFormat,
            stock: this.bookStock,
            price: this.bookPrice,
            description: this.bookDescription
        };
    },

    setBook(response) {
        const book = formatBookFromResponse(response);
        Object.assign(this, book);
    },
    
    clearErrors() {
        Object.keys(this.errors).forEach(key => {
            this.errors[key] = null;
        });
    },
    
    validateCurrentBook() {
        const { valid, errors } = validateBook(this.getCurrentBook());
        this.errors = errors;
        return valid;
    },
    
    init: handleAsyncWrapperBook(async function () {
        await Alpine.store("books").loadBooks(this.filters);
        setTimeout(() => (this.isLoading = false), 500);
    }, "Erreur lors de l'initialisation"),

    newBook: function() {
        this.selectedOption = "New";
        this.resetBook();
        this.clearErrors();
    },

    addBook: handleAsyncWrapperBook(async function () {
        const book = this.getCurrentBook();
        const response = await Alpine.store("books").saveBook(book);

        if(response) {
            await Alpine.store("books").loadBooks(this.filters);
            
            await showSuccessNotification(
                `<small>Add Book<small>`,
                `<small>The book <strong style="color:#8EBE79">${this.bookTitle}</strong> was added successfully<small>`
            );
            
            this.resetBook();
        }   
    }, "Erreur dans addBook"),

    showBookDetails: handleAsyncWrapperBook(async function (id) {
        if(this.selectedOption === "Details") {
            const isLoadingDetailsProgressId = Date.now();
            this.isLoadingDetailsProgressId = isLoadingDetailsProgressId;

            this.isLoadingDetailsProgress = 0;
            this.isLoadingDetails = true;

            const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            for (let p = 0; p <= 100; p++) {
                if (this.isLoadingDetailsProgressId !== isLoadingDetailsProgressId) return;

                this.isLoadingDetailsProgress = p;
                await wait(10);
            }
            if (this.isLoadingDetailsProgressId !== isLoadingDetailsProgressId) return;
            this.isLoadingDetails = false;
        }
           
        const response = await Alpine.store("books").selectBook(id);
        this.setBook(response);
        this.selectedOption = "Details";
                
        
    }, "Erreur dans showBookDetails"),

    editBook: handleAsyncWrapperBook(async function (id) {
            const response = await Alpine.store("books").selectBook(id);
            this.setBook(response);
            this.clearErrors();
            this.selectedOption = "Edit";    
    }, "Erreur dans editBook"),

    updateBook: handleAsyncWrapperBook(async function () {
        const book = this.getCurrentBook();
        const response = await Alpine.store("books").updateBook(book);

        if(response) {
            await Alpine.store("books").loadBooks(this.filters);

            await showSuccessNotification(
                `<small>Update Book<small>`,
                `<small>The book <strong style="color:#8EBE79">${this.bookTitle}</strong> was updated successfully<small>`
            );

            this.selectedOption = "Details";
        }
    }, "Erreur dans updateBook"),

    deleteBook: handleAsyncWrapperBook(async function (id) {
        const result = await showDeleteConfirmation();

        if (result.isConfirmed) {
            const response = await Alpine.store("books").deleteBook(id);

            if (response) {
                await Alpine.store("books").loadBooks(this.filters);
                await showSuccessNotification(
                    `<small>Deleted!<small>`,
                    `<small>The book has been successfully deleted.<small>`
                );
                this.resetBook();
                this.selectedOption = "Details";
            }
        }    
    }, "Erreur dans deleteBook"),
    
    submitForm: handleAsyncWrapperBook(async function () {
        if (!this.validateCurrentBook()) return;
        
        if (this.selectedOption === "New") {
            await this.addBook();
        } else if (this.selectedOption === "Edit") {
            await this.updateBook();
        }
    }, "Erreur dans submitForm"),

    sendFilters: handleAsyncWrapperBook(async function () {
        this.isLoading = true;
        await Alpine.store("books").loadBooks(this.filters);
        setTimeout(() => (this.isLoading = false), 200);
    }, "Erreur dans sendFilters"),
    
    showCart: handleAsyncWrapperBook(async function () {        
        if(this.selectedOption === "Cart") {
            this.isLoadingCartProgress = 0;
            this.isLoadingCart = true;

            const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            for (let p = 0; p <= 100; p++) {
                this.isLoadingCartProgress = p;
                await wait(10);
            }

            this.isLoadingCart = false;
        }
        
        this.selectedOption = "Cart";
    }, "Erreur dans showCart")
});