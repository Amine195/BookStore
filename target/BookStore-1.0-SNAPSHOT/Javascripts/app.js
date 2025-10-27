document.addEventListener('alpine:init', () => {
    Alpine.store('books', {
        booksList: [],
        selectedBook: null,

        async loadBooks() {
                        console.log(this.booksList.length)
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
        
        async selectBook(id) {
            const response = await fetch("http://localhost:8080/book/get", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            });

            if (!response.ok) {
                throw new Error("Erreur HTTP : " + response.status);
            }

            const data = await response.json();
            this.selectedBook = data;
        },
        
        async deleteBook(id) {
            const response = await fetch("http://localhost:8080/book/delete", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            });

            if (!response.ok) {
                throw new Error("Erreur HTTP : " + response.status);
            }

            const data = await response.json();
            return data;
        }
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
        
        async showBookDetails(id) {
            this.selectedOnglet = "Details";
            await Alpine.store('books').selectBook(id);
        },
        
        editBook(id) {
            this.selectedOnglet = "Edit";
        },
        
        async deleteBook(id) {
            const response = await Alpine.store('books').deleteBook(id);
            if(response) {
                await Alpine.store('books').loadBooks();
            }
        }
    }));
});
