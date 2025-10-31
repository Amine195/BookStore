export default () => ({
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
});