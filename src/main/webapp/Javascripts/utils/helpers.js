export function handleAsyncWrapperBook(fn, errorMsg = "Une erreur s'est produite") {
    return async function (...args) {
        try {
            return await fn.apply(this, args);
        } catch (error) {
            console.error(`[bookApp] ${errorMsg}:`, error);
        }
    };
}

export function handleAsyncWrapperAuth(fn, errorMsg = "Une erreur s'est produite") {
    return async function (...args) {
        try {
            return await fn.apply(this, args);
        } catch (error) {
            console.error(`[Login] ${errorMsg}:`, error);
        }
    };
}
