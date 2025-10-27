document.addEventListener('alpine:init', () => {
    Alpine.store('books', {
        booksList: [],

        async loadBooks() {
            try {
                const response = await fetch('http://localhost:8080/book/listJsonFormat');

                if (!response.ok) {
                    throw new Error('Erreur HTTP : ' + response.status);
                }

                const data = await response.json();
                this.booksList = data;
            } catch (error) {
                console.error('Erreur lors du chargement des livres :', error);
            }
        },
    });


    Alpine.data('bookApp', () => ({
        selectedOnglet: "Details",
        isLoading: true,
        
        async init() {
            await Alpine.store('books').loadBooks();
            setTimeout(() => this.isLoading = false, 1000);
        },
        
        newBook() {
            this.selectedOnglet = "New";
        },
        
        showBookDetails(id) {
            this.selectedOnglet = "Details";
        },
        
        editBook(id) {
            this.selectedOnglet = "Edit";
        }
    }));
});
