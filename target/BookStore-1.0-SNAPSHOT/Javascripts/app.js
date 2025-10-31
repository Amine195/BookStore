document.addEventListener("alpine:init", () => {
    Alpine.store("auth", {
        async sendRequest(url, method = "GET", data = null) {
            try {
                const options = {
                    method,
                    headers: { "Content-Type": "application/json; charset=UTF-8" }
                };

                if (data) {
                    options.body = JSON.stringify(data);
                }

                const result = await fetch(url, options);
                if (!result.ok) throw new Error(`Erreur HTTP ${result.status}`);

                const response = await result.json();
                return response;
            } catch (error) {
                console.error("Erreur dans sendRequest :", error);
                throw error;
            }
        },
        
        async login(data) {
            return await this.sendRequest("http://localhost:8080/auth/login", "POST", data);
        },
        
        async logout() {
            response = await this.sendRequest("http://localhost:8080/auth/logout", "POST");
            
            if (response.success) {
                window.location.href = "http://localhost:8080/connection";
            } else {
                console.error("Logout failed");
            }
        }
    });
    
    Alpine.store("books", {
        booksList: [],
        
        async sendRequest(url, method, data) {
            try {
                const options = {
                    method,
                    headers: { "Content-Type": "application/json; charset=UTF-8" },
                    body: JSON.stringify(data)
                };

                const result = await fetch(url, options);
                if (!result.ok) throw new Error(`Erreur HTTP ${result.status}`);

                const response = await result.json();
                return response;
            } catch (error) {
                console.error("Erreur dans sendRequest :", error);
                throw error;
            }
        },

        async loadBooks(data) {
            this.booksList = await this.sendRequest("http://localhost:8080/book/listJsonFormat", "POST", data);
        },
        
        async saveBook(book) {
            return await this.sendRequest("http://localhost:8080/book/add", "POST", book);
        },
        
        async selectBook(id) {
            return await this.sendRequest("http://localhost:8080/book/get", "POST", { id });
        },
        
        async updateBook(book) {
            return await this.sendRequest("http://localhost:8080/book/update", "POST", book);
        },
        
        async deleteBook(id) {
            return await this.sendRequest("http://localhost:8080/book/delete", "POST", { id });
        }
    });

    Alpine.data("bookApp", () => ({
        // Prop data
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
            this.bookPublicationDate = new Date(response.publicationDate).toISOString().slice(0, 10);
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
            await Alpine.store("books").loadBooks(this.filters);
            setTimeout(() => this.isLoading = false, 1000);
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
            const response = await Alpine.store("books").saveBook(book);

            if(response) {
                await Alpine.store("books").loadBooks();
                this.resetBook();
                
                Swal.fire({
                    title: "Add Book",
                    html: `The book <strong style="color:#8EBE79">${this.bookTitle}</strong> was added successfully`,
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
            const response = await Alpine.store("books").updateBook(book);
            
            if(response) {
                await Alpine.store("books").loadBooks(book);
                
                Swal.fire({
                    title: "Update Book",
                    html: `The book <strong style="color:#8EBE79">${this.bookTitle}</strong> was updated successfully`,
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
                    await Alpine.store("books").loadBooks();
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
            await Alpine.store("books").loadBooks(this.filters);
        },
    }));
    
    Alpine.data("login", () => ({
        // Prop data
        username: "",
        password: "",
        isAdmin: false,
        
        isLoading: false,
        responseIsValid: null,
        responseMsgText: null,
        
        // Methods
        async submitForm() {
            try {
                this.isLoading = true;
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const response = await Alpine.store("auth").login({
                    username: this.username,
                    password: this.password,
                    isAdmin: this.isAdmin
                });
               
                if(response == false) {
                    this.responseIsValid = false;
                    this.responseMsgText = "The password is incorrect";
                    
                    this. username = "";
                    this.password = "";
                    this.isAdmin = false;
                    
                    this.isLoading = false;
                    
                } else if(response == true) {
                    this.responseIsValid = true;
                    this.responseMsgText = "The password is correct. redirection...";
                    
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    window.location.href = "http://localhost:8080/book";
                }
            } catch (error) {
                console.error("Erreur dans submitForm :", error);
            }
        },
        
        handleInput() {
            this.responseIsValid = null;
            this.responseMsgText = null;
        }
    }));
});
