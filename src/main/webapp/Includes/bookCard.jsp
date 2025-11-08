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
                <button class="btn btn-outline-primary btn-sm me-2" @click="showBookDetails(book.id)">
                    <i class="bi bi-arrow-repeat"></i> Details
                </button>
                <button class="btn btn-outline-success btn-sm" @click="$store.books.handleAddToCart($event, book.id)">
                    <i class="bi bi-plus"></i> Add to cart
                </button>
            </div>
        </div>
    </div>
</div>
