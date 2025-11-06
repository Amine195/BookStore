import { handleAsyncWrapperBook } from "../utils/helpers.js";

export default () => ({
    selectedOption: "Details",
    isLoading: true,
    
    filters: {
        categories: [],
        format: [],
        langue: [],
        enStock: []
    },

    bookId: null,
    bookTitle: "",
    bookAuthor: "",
    bookPublisher: "",
    bookPublicationDate: "",
    bookCategory: "",
    bookLanguage: "",
    bookPages: null,
    bookFormat: "",
    bookStock: null,
    bookPrice: null,
    bookDescription: "",
    
    errors: {
        title: null,
        author: null,
        publisher: null,
        publicationDate: null,
        category: null,
        language: null,
        pages: null,
        format: null,
        stock: null,
        price: null,
        description: null
    },

    resetBook() {
        this.bookId = null;
        this.bookTitle = "";
        this.bookAuthor = "";
        this.bookPublisher = "";
        this.bookPublicationDate = "";
        this.bookCategory = "";
        this.bookLanguage = "";
        this.bookPages = null;
        this.bookFormat = "";
        this.bookStock = null;
        this.bookPrice = null;
        this.bookDescription = "";
    },

    newBookObj() {
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

    getBookObj(response) {
        if (!response) return;

        this.bookId = response.id ?? null;
        this.bookTitle = response.title ?? "";
        this.bookAuthor = response.author ?? "";
        this.bookPublisher = response.publisher ?? "";
        this.bookPublicationDate = response.publicationDate
            ? new Date(response.publicationDate).toISOString().slice(0, 10)
            : "";
        this.bookCategory = response.category ?? "";
        this.bookLanguage = response.language ?? "";
        this.bookPages = response.pages ?? null;
        this.bookFormat = response.format ?? "";
        this.bookStock = response.stock ?? null;
        this.bookPrice = response.price ?? null;
        this.bookDescription = response.description ?? "";
    },
    
    clearErrors() {
        for (const key in this.errors) {
            this.errors[key] = null;
        }
    },
    
    validateBook() {
        this.clearErrors();
        let valid = true;

        if (!this.bookTitle || this.bookTitle.trim().length < 2) {
            this.errors.title = "Le titre doit contenir au moins 2 caractères.";
            valid = false;
        }

        if (!this.bookAuthor || this.bookAuthor.trim().length < 2) {
            this.errors.author = "L'auteur doit contenir au moins 2 caractères.";
            valid = false;
        }

        if (!this.bookPublisher || this.bookPublisher.trim().length < 2) {
            this.errors.publisher = "L'éditeur est obligatoire.";
            valid = false;
        }

        if (!this.bookPublicationDate) {
            this.errors.publicationDate = "La date de publication est obligatoire.";
            valid = false;
        }

        if (!this.bookCategory) {
            this.errors.category = "Veuillez sélectionner une catégorie.";
            valid = false;
        }

        if (!this.bookLanguage) {
            this.errors.language = "Veuillez sélectionner une langue.";
            valid = false;
        }

        if (!this.bookPages || this.bookPages <= 0) {
            this.errors.pages = "Le nombre de pages doit être supérieur à 0.";
            valid = false;
        }

        if (!this.bookFormat) {
            this.errors.format = "Veuillez sélectionner un format.";
            valid = false;
        }

        if (this.bookStock === null || this.bookStock < 0) {
            this.errors.stock = "Le stock doit être un nombre ≥ 0.";
            valid = false;
        }

        if (!this.bookPrice || this.bookPrice <= 0) {
            this.errors.price = "Le prix doit être supérieur à 0.";
            valid = false;
        }

        if (!this.bookDescription || this.bookDescription.trim().length < 10) {
            this.errors.description = "La description doit contenir au moins 10 caractères.";
            valid = false;
        }

        return valid;
    },

    
    init: handleAsyncWrapperBook(async function () {
        await Alpine.store("books").loadBooks(this.filters);
        setTimeout(() => (this.isLoading = false), 1000);
    }, "Erreur lors de l'initialisation"),

    newBook: function() {
        this.selectedOption = "New";
        this.resetBook();
    },

    addBook: handleAsyncWrapperBook(async function () {
        const book = this.newBookObj();
        const response = await Alpine.store("books").saveBook(book);

        if(response) {
            await Alpine.store("books").loadBooks(this.filters);
            this.resetBook();

            Swal.fire({
                title: "Add Book",
                html: `The book <strong style="color:#8EBE79">${this.bookTitle}</strong> was added successfully`,
                icon: "success",
                confirmButtonColor: '#8EBE79'
            });
        }   
    }, "Erreur dans addBook"),

    showBookDetails: handleAsyncWrapperBook(async function (id) {
        const response = await Alpine.store("books").selectBook(id);
        this.getBookObj(response);
        this.selectedOption = "Details";
    }, "Erreur dans showBookDetails"),

     editBook: handleAsyncWrapperBook(async function (id) {
            const response = await Alpine.store("books").selectBook(id);
            this.getBookObj(response);
            this.clearErrors();
            this.selectedOption = "Edit";    
    }, "Erreur dans editBook"),

    updateBook: handleAsyncWrapperBook(async function () {
        const book = this.newBookObj();
        const response = await Alpine.store("books").updateBook(book);

        if(response) {
            await Alpine.store("books").loadBooks(this.filters);

            Swal.fire({
                title: "Update Book",
                html: `The book <strong style="color:#8EBE79">${this.bookTitle}</strong> was updated successfully`,
                icon: "success",
                confirmButtonColor: '#8EBE79'
            });

            this.selectedOption = "Details";
        }
    }, "Erreur dans updateBook"),

    deleteBook: handleAsyncWrapperBook(async function (id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        const result = await swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "This action is irreversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            const response = await Alpine.store("books").deleteBook(id);

            if (response) {
                await Alpine.store("books").loadBooks(this.filters);
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "The book has been successfully deleted.",
                    icon: "success",
                    confirmButtonColor: "#8EBE79"
                });
            }
        }    
    }, "Erreur dans deleteBook"),
    
    submitForm: handleAsyncWrapperBook(async function () {
        if (!this.validateBook()) return;
        
        if (this.selectedOption === "New") {
            await this.addBook();
        } else if (this.selectedOption === "Edit") {
            await this.updateBook();
        }
    }, "Erreur dans submitForm"),

    sendFilters: handleAsyncWrapperBook(async function () {
        await Alpine.store("books").loadBooks(this.filters);
    }, "Erreur dans sendFilters")
});