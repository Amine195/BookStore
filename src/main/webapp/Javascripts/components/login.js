import { ROUTES } from "../constants/routes.js";
import { handleAsyncWrapperAuth } from "../utils/helpers.js";

export default () => ({
    username: "",
    password: "",
    isAdmin: false,

    isLoading: false,
    responseIsValid: null,
    responseMsgText: null,

    submitForm: handleAsyncWrapperAuth(async function () {
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

            await new Promise(resolve => setTimeout(resolve, 500));
            this.isLoading = false;

            window.location.href = ROUTES.books;
            return;
        }
    }, "Erreur dans submitForm"),

    handleInput: function() {
        this.responseIsValid = null;
        this.responseMsgText = null;
    }
});