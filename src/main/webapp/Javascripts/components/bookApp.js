export default () => ({
    // État global du composant
    selectedOption: "Details",
    isLoading: true,
    
    filters: {
        categories: [],
        format: [],
        langue: [],
        enStock: []
    },

    // Propriétés d’un livre
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

    // Méthodes utilitaires
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

    // Initialise la liste des livres et gère le loader
    async init() {
        try {
            await Alpine.store("books").loadBooks(this.filters);
        } catch (error) {
            console.error("Erreur lors du chargement des livres :", error);
        } finally {
            setTimeout(() => (this.isLoading = false), 1000);
        }
    },

    // Soumet le formulaire selon le mode actuel (ajout ou modification)
    async submitForm() {
        try {
            if (this.selectedOption === "New") {
                await this.addBook();
            } else if (this.selectedOption === "Edit") {
                await this.updateBook();
            }
        } catch (error) {
            console.error("Erreur dans submitForm :", error);
        }
    },

    // Prépare le formulaire pour un nouveau livre
    newBook() {
        this.selectedOption = "New";
        this.resetBook();
    },

    // Ajoute un nouveau livre
    async addBook() {
        try {
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
        } catch (error) {
            console.error("Erreur dans addBook :", error);
        }
        
    },

    // Affiche les détails d’un livre
    async showBookDetails(id) {
        try {
            this.selectedOption = "Details";
            const response = await Alpine.store("books").selectBook(id);
            this.getBookObj(response);
        } catch (error) {
            console.error("Erreur dans showBookDetails :", error);
        }
    },

    // Prépare la modification d’un livre
    async editBook(id) {
        try {
            this.selectedOption = "Edit";
            const response = await Alpine.store("books").selectBook(id);
            this.getBookObj(response);
        } catch (error) {
            console.error("Erreur dans editBook :", error);
        }
    },

    // Met à jour un livre existant
    async updateBook() {
        try {
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
        } catch (error) {
            console.error("Erreur dans updateBook :", error);
        }
    },

    // Supprime un livre avec confirmation SweetAlert2
    async deleteBook(id) {
        try {
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
        } catch (error) {
            console.error("Erreur dans deleteBook :", error);
        }
        
    },

    // Applique les filtres de recherche
    async sendFilters() {
        try {
            await Alpine.store("books").loadBooks(this.filters);
        } catch (error) {
            console.error("Erreur dans sendFilters :", error);
        }
    },
});