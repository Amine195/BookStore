const BASE_URL = "http://localhost:8080";

export default {
    booksList: [],

    async sendRequest(path, method = "POST", data = null) {
        try {
            const options = {
                method,
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            };

            if (data !== null && method !== "GET") {
                options.body = JSON.stringify(data);
            }

            const result = await fetch(`${BASE_URL}${path}`, options);
            if (!result.ok) throw new Error(`Erreur HTTP ${result.status}`);
            return await result.json();
        } catch (error) {
            console.error("Erreur dans sendRequest :", error);
            throw error;
        }
    },

    async loadBooks(data) {
        this.booksList = await this.sendRequest("/book/listJsonFormat", "POST", data);
    },

    async saveBook(book) {
        return await this.sendRequest("/book/add", "POST", book);
    },

    async selectBook(id) {
        return await this.sendRequest("/book/get", "POST", { id });
    },

    async updateBook(book) {
        return await this.sendRequest("/book/update", "POST", book);
    },

    async deleteBook(id) {
        return await this.sendRequest("/book/delete", "POST", { id });
    }
};
