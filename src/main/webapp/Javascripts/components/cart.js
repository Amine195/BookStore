import { ROUTES } from "../constants/routes.js";
import { handleAsyncWrapperAuth } from "../utils/helpers.js";

export default () => ({
    isDone: false,
    isProcessing: false,

    processFinish: handleAsyncWrapperAuth(async function () {
        try {
            this.isProcessing = true;

            const value = await Alpine.store("books").processFinish();

            await new Promise(resolve => setTimeout(resolve, 2000));

            this.isProcessing = false;
            this.isDone = value === 0;

        } catch (err) {
            console.error("Process finish error:", err);
            this.isProcessing = false;
        }
    }, "Erreur dans submitForm")
});