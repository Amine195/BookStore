<div class="card">
    <div class="card-body small">    
        <label class="fw-semibold text-body-tertiary mb-1">Titre</label>
        <h6 class="card-title fw-bold mb-3" x-text="$store.books.selectedBook.title"></h6>

        <label class="fw-semibold text-body-tertiary mb-1">Author</label>
        <p class="card-title mb-3" x-text="$store.books.selectedBook.author"></p>

        <label class="fw-semibold text-body-tertiary mb-1">Publisher</label>
        <p class="card-title mb-3" x-text="$store.books.selectedBook.publisher"></p>

        <label class="fw-semibold text-body-tertiary mb-1">Publication Date</label>
        <p class="card-title mb-3" x-text="$store.books.selectedBook.publicationDate"></p>

        <label class="fw-semibold text-body-tertiary mb-1">Category</label>
        <p class="card-title mb-3" x-text="$store.books.selectedBook.category"></p>

        <label class="fw-semibold text-body-tertiary mb-1">Language</label>
        <p class="card-title mb-3" x-text="$store.books.selectedBook.language"></p>

        <label class="fw-semibold text-body-tertiary mb-1">Pages</label>
        <p class="card-title mb-3" x-text="$store.books.selectedBook.pages"></p>

        <label class="fw-semibold text-body-tertiary mb-1">Format</label>
        <p class="card-title mb-3" x-text="$store.books.selectedBook.format"></p>

        <label class="fw-semibold text-body-tertiary mb-1">Stock</label>
        <p class="card-title mb-3" x-text="$store.books.selectedBook.stock"></p>

        <label class="fw-semibold text-body-tertiary mb-1">Price</label>
        <p class="card-title mb-3" x-text="Number($store.books.selectedBook.price).toFixed(2) + ' CAD'"></p>

        <label class="fw-semibold text-body-tertiary mb-1">Description</label>
        <p class="card-title mb-3" x-text="$store.books.selectedBook.description"></p>
    </div>
</div>
