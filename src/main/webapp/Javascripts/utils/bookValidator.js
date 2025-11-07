import { createEmptyErrors } from './bookModel.js';

export const validateBook = (book) => {
    const errors = createEmptyErrors();
    let valid = true;

    const validations = [
        {
            condition: !book.title || book.title.trim().length < 2,
            field: 'title',
            message: "Le titre doit contenir au moins 2 caractères."
        },
        {
            condition: !book.author || book.author.trim().length < 2,
            field: 'author',
            message: "L'auteur doit contenir au moins 2 caractères."
        },
        {
            condition: !book.publisher || book.publisher.trim().length < 2,
            field: 'publisher',
            message: "L'éditeur est obligatoire."
        },
        {
            condition: !book.publicationDate,
            field: 'publicationDate',
            message: "La date de publication est obligatoire."
        },
        {
            condition: !book.category,
            field: 'category',
            message: "Veuillez sélectionner une catégorie."
        },
        {
            condition: !book.language,
            field: 'language',
            message: "Veuillez sélectionner une langue."
        },
        {
            condition: !book.pages || book.pages <= 0,
            field: 'pages',
            message: "Le nombre de pages doit être supérieur à 0."
        },
        {
            condition: !book.format,
            field: 'format',
            message: "Veuillez sélectionner un format."
        },
        {
            condition: !book.stock || book.stock < 0,
            field: 'stock',
            message: "Le stock doit être un nombre ≥ 0."
        },
        {
            condition: !book.price || book.price <= 0,
            field: 'price',
            message: "Le prix doit être supérieur à 0."
        },
        {
            condition: !book.description || book.description.trim().length < 10,
            field: 'description',
            message: "La description doit contenir au moins 10 caractères."
        }
    ];

    validations.forEach(({ condition, field, message }) => {
        if (condition) {
            errors[field] = message;
            valid = false;
        }
    });

    return { valid, errors };
};


