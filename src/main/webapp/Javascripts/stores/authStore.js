export default {
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
};