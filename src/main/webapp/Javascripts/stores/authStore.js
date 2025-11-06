import { ROUTES } from "../constants/routes.js";
import { sendRequest } from "../utils/httpClient.js";

export default {
    login: async function (data) {
        return await sendRequest(ROUTES.authLogin, data);
    },

    logout: async function () {
        try {
            const response = await sendRequest(ROUTES.authLogout);

            if (response?.success) {
                window.location.href = ROUTES.connection;
            } else {
                console.error("Échec de la déconnexion :", response);
            }
        } catch (error) {
            console.error("Erreur pendant la déconnexion :", error);
        }
    }
};