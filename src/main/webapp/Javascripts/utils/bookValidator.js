import { createEmptyErrors } from './bookModel.js';

export const validateBook = (book) => {
    const errors = createEmptyErrors();
    let valid = true;

    const validations = [
        {
            condition: !book.title || book.title.trim().length < 2,
            field: 'title',
            message: "The title must contain at least 2 characters."
        },
        {
            condition: !book.author || book.author.trim().length < 2,
            field: 'author',
            message: "The author must contain at least 2 characters."
        },
        {
            condition: !book.publisher || book.publisher.trim().length < 2,
            field: 'publisher',
            message: "The editor is mandatory."
        },
        {
            condition: !book.publicationDate,
            field: 'publicationDate',
            message: "The publication date is mandatory."
        },
        {
            condition: !book.category,
            field: 'category',
            message: "Please select a category."
        },
        {
            condition: !book.language,
            field: 'language',
            message: "Please select a language."
        },
        {
            condition: !book.pages || book.pages <= 0,
            field: 'pages',
            message: "The number of pages must be greater than 0."
        },
        {
            condition: !book.format,
            field: 'format',
            message: "Please select a format."
        },
        {
            condition: !book.stock || book.stock < 0,
            field: 'stock',
            message: "The stock must be a number ≥ 0."
        },
        {
            condition: !book.price || book.price <= 0,
            field: 'price',
            message: "The price must be greater than 0."
        },
        {
            condition: !book.description || book.description.trim().length < 10,
            field: 'description',
            message: "The description must contain at least 10 characters."
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


