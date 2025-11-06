const BASE_URL = "http://localhost:8080";

export default {
    async sendRequest(path, method = "GET", data = null) {
        try {
            const options = {
                method,
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            };

            if (data && method !== "GET") {
                options.body = JSON.stringify(data);
            }

            const result = await fetch(`${BASE_URL}${path}`, options);
            if (!result.ok) throw new Error(`Erreur HTTP ${result.status}`);

            const response = await result.json();
            return response;
        } catch (error) {
            console.error("Erreur dans sendRequest :", error);
            throw error;
        }
    },

    async login(data) {
        return await this.sendRequest("/auth/login", "POST", data);
    },

    async logout() {
        const response = await this.sendRequest("/auth/logout", "POST");

        if (response.success) {
            window.location.href = `${BASE_URL}/connection`;
        } else {
            console.error("Logout failed");
        }
    }
};