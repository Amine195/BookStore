<div class="card shadow-sm p-3 mb-5">    
    <div class="card-body px-3">
        <form id="bookForm" @submit.prevent="submitForm">
            
                <div class="mb-3">
                    <label for="title" class="form-label small">Title</label>
                    <input type="text" class="form-control form-control-sm small" id="title" x-model="bookTitle" required>
                </div>  
            
                <div class="mb-3 ">
                    <label for="author" class="form-label small">Auteur</label>
                    <input type="text" class="form-control form-control-sm" id="author" x-model="bookAuthor" required>
                </div>

                <div class="mb-3">
                    <label for="publisher" class="form-label small">Éditeur</label>
                    <input type="text" class="form-control form-control-sm" id="publisher" x-model="bookPublisher" required>
                </div>

                <div class="mb-3">
                    <label for="publicationDate" class="form-label small">Date de publication</label>
                    <input type="date" class="form-control form-control-sm" id="publicationDate" x-model="bookPublicationDate" required>
                </div>

                <div class="mb-3">
                    <label for="category" class="form-label small">Category</label>
                    <select class="form-select form-select-sm small" id="category" x-model="bookCategory" required>
                        <option value="" disabled>Select A Category</option>
                        <option>Conte</option>
                        <option>Science-Fiction</option>
                        <option>Roman</option>
                        <option>Satire</option>
                        <option>Fantasy</option>
                        <option>Aventure</option>
                        <option>Horreur</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="language" class="form-label small">Langue</label>
                    <select class="form-select form-select-sm" id="language" x-model="bookLanguage" required>
                        <option value="" disabled>Select A Language</option>
                        <option>Anglais</option>
                        <option>Français</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="pages" class="form-label small">Pages</label>
                    <input type="number" class="form-control form-control-sm" id="pages" x-model="bookPages" min="1" required>
                </div>

                <div class="mb-3">
                    <label for="format" class="form-label small">Format</label>                    
                    <select class="form-select form-select-sm" id="format" x-model="bookFormat" required>
                        <option value="" disabled>Select A Format</option>
                        <option>Bronché</option>
                        <option>Poche</option>
                        <option>EBook</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="stock" class="form-label small">Stock</label>
                    <input type="number" class="form-control form-control-sm" id="stock" x-model="bookStock" min="0" required>
                </div>

                <div class="mb-3">
                    <label for="price" class="form-label small">Prix</label>
                    <input type="number" step="0.01" class="form-control form-control-sm" id="price" x-model="bookPrice" required>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label small">Description</label>
                    <textarea class="form-control form-control-sm" id="description" rows="3" x-model="bookDescription" required></textarea>
                </div>
            
                <button type="submit" class="btn btn-outline-success btn-sm" type="submit">
                    Enregistrer
                </button>
            </div>
        </form>
    </div>
</div>

