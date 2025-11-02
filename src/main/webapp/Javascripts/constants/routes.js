export const ROUTES = {
    // Base
    base: `${window.location.origin}`,
    books: `${window.location.origin}/book`,
    connection: `${window.location.origin}/connection`,
    
    // Auth
    authLogin: `${window.location.origin}/auth/login`,
    authLogout: `${window.location.origin}/auth/logout`,
    
    // Books
    booksLoad: `${window.location.origin}/book/listJsonFormat`,
    bookSave: `${window.location.origin}/book/add`,
    bookSelect: `${window.location.origin}/book/get`,
    bookUpdate: `${window.location.origin}/book/update`,
    bookDelete: `${window.location.origin}/book/delete`
};