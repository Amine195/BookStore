import { ROUTES } from "../constants/routes.js";
import { sendRequest } from "../utils/httpClient.js";

export default {
    async login(data) {
        return await sendRequest(ROUTES.authLogin, data);
    },

    async logout() {
        try {
            const response = await sendRequest(ROUTES.authLogout);

            // Si le serveur confirme la déconnexion → redirige vers la page de connexion
            if (response?.success) {
                window.location.href = ROUTES.connection;
            } else {
                console.error("Échec de la déconnexion :", response);
            }
        } catch (error) {
            // Gestion des erreurs de déconnexion
            console.error("Erreur pendant la déconnexion :", error);
        }
    }
};