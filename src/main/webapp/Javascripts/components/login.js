import { ROUTES } from "../constants/routes.js";
import { handleAsyncWrapperAuth } from "../utils/helpers.js";

export default () => ({
    username: "",
    password: "",
    isAdmin: false,

    isLoading: false,
    responseIsValid: null,
    responseMsgText: null,
    
    errors: {
        username: null,
        password: null
    },

    submitForm: handleAsyncWrapperAuth(async function () {
        this.clearErrors();

        if (this.username.trim().length < 3) {
            this.errors.username = "Le username doit contenir au moins 3 caractères.";
        }

        if (this.password.trim().length < 4) {
            this.errors.password = "Le mot de passe doit contenir au moins 4 caractères.";
        }

        if (this.errors.username || this.errors.password) {
            return;
        }
        
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
            this.password = "";
            this.isLoading = false;
            return;
        }

        if(response == true) {
            this.responseIsValid = true;
            this.responseMsgText = "The password is correct. redirection...";
            this.isLoading = false;
            window.location.href = ROUTES.books;
        }
    }, "Erreur dans submitForm"),

    handleInput: function() {
        this.responseIsValid = null;
        this.responseMsgText = null;
    },
    
    clearErrors() {
        this.errors.username = null;
        this.errors.password = null;
    }
});