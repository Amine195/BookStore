<tr>
    <th scope="row" x-text="book.id">1</th>
    <td x-text="book.title">Mark</td>
    <td x-text="book.publicationDate">Otto</td>
    <td>
        <div class="dropdown">
            <button class="btn btn-outline-danger btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-gear"></i>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item py-0" href="#" @click="showBookDetails(book.id)"><small class="fw-medium text-success"><i class="bi bi-arrow-repeat me-2"></i> Details</small></a></li>
                <li><a class="dropdown-item py-0" href="#" @click="editBook(book.id)"><small class="fw-medium text-primary"><i class="bi bi-pen me-2"></i> Edit</small></a></li>
                <li><a class="dropdown-item py-0" href="#" @click="deleteBook(book.id)"><small class="fw-medium text-danger"><i class="bi bi-trash3 me-2"></i> Delete</small></a></li>
            </ul>
        </div>
    </td>
</tr>