export default () => ({
    selectedOption: "Details",
    isLoading: true,
    filters: {
        categories: [],
        format: [],
        langue: [],
        enStock: []
    },

    // Prop Book
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

    // Utils
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
        this.bookId = response.id;
        this.bookTitle = response.title;
        this.bookAuthor = response.author;
        this.bookPublisher = response.publisher;
        this.bookPublicationDate = response.publicationDate
            ? new Date(response.publicationDate).toISOString().slice(0, 10)
            : "";
        this.bookCategory = response.category;
        this.bookLanguage = response.language;
        this.bookPages = response.pages;
        this.bookFormat = response.format;
        this.bookStock = response.stock;
        this.bookPrice = response.price;
        this.bookDescription = response.description;
    },

    // Méthods
    async init() {
        this.isLoading = true;
        try {
            await Alpine.store("books").loadBooks(this.filters);
        } finally {
            this.isLoading = false;
        }
    },

    async submitForm() {
        if (this.selectedOption == "New") {
            await this.addBook();
        } else if (this.selectedOption == "Edit") {
            await this.updateBook();
        }
    },

    newBook() {
        this.selectedOption = "New";
        this.resetBook();
    },

    async addBook() {
        const book = this.newBookObj();
        const title = this.bookTitle;
        const response = await Alpine.store("books").saveBook(book);

        if (response) {
            await Alpine.store("books").loadBooks(this.filters);
            this.resetBook();

            Swal.fire({
                title: "Add Book",
                html: `The book <strong style="color:#8EBE79">${title}</strong> was added successfully`,
                icon: "success",
                confirmButtonColor: '#8EBE79'
            });
        }
    },

    async showBookDetails(id) {
        this.selectedOption = "Details";
        const response = await Alpine.store("books").selectBook(id);
        this.getBookObj(response);
    },

    async editBook(id) {
        this.selectedOption = "Edit";
        const response = await Alpine.store("books").selectBook(id);
        this.getBookObj(response);
    },

    async updateBook() {
        const book = this.newBookObj();
        const title = this.bookTitle;
        const response = await Alpine.store("books").updateBook(book);

        if (response) {
            await Alpine.store("books").loadBooks(this.filters);

            Swal.fire({
                title: "Update Book",
                html: `The book <strong style="color:#8EBE79">${title}</strong> was updated successfully`,
                icon: "success",
                confirmButtonColor: '#8EBE79'
            });

            this.resetBook();
        }
    },

    async deleteBook(id) {
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
    },

    async sendFilters() {
        this.isLoading = true;
        try {
            await Alpine.store("books").loadBooks(this.filters);
        } finally {
            this.isLoading = false;
        }
    },
});


