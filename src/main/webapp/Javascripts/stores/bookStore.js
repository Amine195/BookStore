export default {
    booksList: [],

    async sendRequest(url, method, data) {
        try {
            const result = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify(data)
            });
            if (!result.ok) throw new Error(`Erreur HTTP ${result.status}`);
            return await result.json();
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
};