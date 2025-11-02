import { ROUTES } from "../constants/routes.js";

export default () => ({
    // États de connexion
    username: "",
    password: "",
    isAdmin: false,

    // États UI
    isLoading: false,
    responseIsValid: null,
    responseMsgText: null,

    // Methods
    async submitForm() {
        try {
            this.isLoading = true;

            // Petite attente pour effet visuel (optionnel)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Appel au store auth
            const response = await Alpine.store("auth").login({
                username: this.username,
                password: this.password,
                isAdmin: this.isAdmin
            });

            if(response == false) {
                this.responseIsValid = false;
                this.responseMsgText = "The password is incorrect";
                
                this.password = "";
                this.isLoading = false;
                return;
            }
            
            if(response == true) {
                this.responseIsValid = true;
                this.responseMsgText = "The password is correct. redirection...";

                await new Promise(resolve => setTimeout(resolve, 1000));
                window.location.href = ROUTES.books;
                return;
            }
        } catch (error) {
            console.error("Erreur dans submitForm :", error);
            this.responseIsValid = false;
            this.responseMsgText = "Connection error. Please try again later.";
            
        } finally {
            // Toujours désactiver le loader à la fin
            this.isLoading = false;
        }
    },

    // Réinitialise les messages d’erreur/succès
    handleInput() {
        this.responseIsValid = null;
        this.responseMsgText = null;
    }
});