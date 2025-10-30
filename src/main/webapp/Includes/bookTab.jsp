<tr>
    <th scope="row" x-text="book.id">1</th>
    <td x-text="book.title">Mark</td>
    <td x-text="book.publicationDate">Otto</td>
    <td>
        <button class="btn btn-outline-primary btn-sm me-2" @click="showBookDetails(book.id)">
            <i class="bi bi-arrow-repeat"></i>
        </button>
        <button class="btn btn-outline-success btn-sm me-2" @click="editBook(book.id)">
            <i class="bi bi-pen"></i>
        </button>
        <button class="btn btn-outline-danger btn-sm me-2" @click="deleteBook(book.id)">
            <i class="bi bi-trash3"></i>
        </button>
    </td>
</tr>