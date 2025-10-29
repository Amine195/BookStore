<div class="card shadow-sm mb-3">
    <div class="card-body">
        <h6 class="card-title fw-bold">
            <img class="me-3" src="Images/book.png" alt="Logo" width="25">
            <span x-text="book.title"></span>
        </h6>

        <p class="card-text small" x-text="book.description"></p>
        <p class="card-text">
            <small class="text-body-secondary">
                Publication date &nbsp; <span x-text="book.publicationDate"></span>
            </small>
        </p>

        <div class="d-flex mt-3">
            <div class="me-auto">
                <button class="btn btn-outline-success btn-sm">
                    Add to cart
                </button>
            </div>
            <div>
                <button class="btn btn-outline-secondary btn-sm me-2" @click="showBookDetails(book.id)">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-outline-primary btn-sm me-2" @click="editBook(book.id)">
                    <i class="bi bi-pen"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm me-2" @click="deleteBook(book.id)">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </div>
    </div>
</div>
