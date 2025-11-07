export const createEmptyBook = () => ({
    bookId: null,
    bookTitle: "",
    bookAuthor: "",
    bookPublisher: "",
    bookPublicationDate: "",
    bookCategory: "",
    bookLanguage: "",
    bookPages: null,
    bookFormat: "",
    bookStock: null,
    bookPrice: null,
    bookDescription: ""
});

export const formatBookFromResponse = (response) => {
    if (!response) return;

    return {
        bookId: response.id ?? null,
        bookTitle: response.title ?? "",
        bookAuthor: response.author ?? "",
        bookPublisher: response.publisher ?? "",
        bookPublicationDate: response.publicationDate
            ? new Date(response.publicationDate).toISOString().slice(0, 10)
            : "",
        bookCategory: response.category ?? "",
        bookLanguage: response.language ?? "",
        bookPages: response.pages ?? null,
        bookFormat: response.format ?? "",
        bookStock: response.stock ?? null,
        bookPrice: response.price ?? null,
        bookDescription: response.description ?? ""
    };
};

export const createEmptyErrors = () => ({
    title: null,
    author: null,
    publisher: null,
    publicationDate: null,
    category: null,
    language: null,
    pages: null,
    format: null,
    stock: null,
    price: null,
    description: null
});
