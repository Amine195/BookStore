<div class="card shadow-sm p-3 mb-5">    
    <div class="card-body px-3">
        <form id="bookForm" @submit.prevent="submitForm">
            
                <div class="mb-3">
                    <label for="title" class="form-label small">Title</label>
                    <input type="text" class="form-control form-control-sm small" id="title" x-model="bookTitle">
                    <div class="text-danger small" x-show="errors.title">
                        <small x-text="errors.title"></small>
                    </div>
                </div>  
            
                <div class="mb-3 ">
                    <label for="author" class="form-label small">Author</label>
                    <input type="text" class="form-control form-control-sm" id="author" x-model="bookAuthor">
                    <div class="text-danger small" x-show="errors.author">
                        <small x-text="errors.author"></small>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="publisher" class="form-label small">Publisher</label>
                    <input type="text" class="form-control form-control-sm" id="publisher" x-model="bookPublisher">
                    <div class="text-danger small" x-show="errors.publisher">
                        <small x-text="errors.publisher"></small>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="publicationDate" class="form-label small">Publication date</label>
                    <input type="date" class="form-control form-control-sm" id="publicationDate" x-model="bookPublicationDate">
                    <div class="text-danger small" x-show="errors.publicationDate">
                        <small x-text="errors.publicationDate"></small>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="category" class="form-label small">Category</label>
                    <select class="form-select form-select-sm small" id="category" x-model="bookCategory">
                        <option value="" disabled>Select A Category</option>
                        <option>Conte</option>
                        <option>Science-Fiction</option>
                        <option>Roman</option>
                        <option>Satire</option>
                        <option>Fantasy</option>
                        <option>Aventure</option>
                        <option>Horreur</option>
                    </select>
                    <div class="text-danger small" x-show="errors.category">
                        <small x-text="errors.category"></small>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="language" class="form-label small">Language</label>
                    <select class="form-select form-select-sm" id="language" x-model="bookLanguage">
                        <option value="" disabled>Select A Language</option>
                        <option>Anglais</option>
                        <option>Français</option>
                    </select>
                    <div class="text-danger small" x-show="errors.language">
                        <small x-text="errors.language"></small>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="pages" class="form-label small">Pages</label>
                    <input type="number" class="form-control form-control-sm" id="pages" x-model="bookPages" min="1">
                    <div class="text-danger small" x-show="errors.pages">
                        <small x-text="errors.pages"></small>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="format" class="form-label small">Format</label>                    
                    <select class="form-select form-select-sm" id="format" x-model="bookFormat">
                        <option value="" disabled>Select A Format</option>
                        <option>Bronché</option>
                        <option>Poche</option>
                        <option>EBook</option>
                    </select>
                    <div class="text-danger small" x-show="errors.format">
                        <small x-text="errors.format"></small>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="stock" class="form-label small">Stock</label>
                    <input type="number" class="form-control form-control-sm" id="stock" x-model="bookStock" min="0">
                    <div class="text-danger small" x-show="errors.stock">
                        <small x-text="errors.stock"></small>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="price" class="form-label small">Price</label>
                    <input type="number" step="0.01" class="form-control form-control-sm" id="price" x-model="bookPrice">
                    <div class="text-danger small" x-show="errors.price">
                        <small x-text="errors.price"></small>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label small">Description</label>
                    <textarea class="form-control form-control-sm" id="description" rows="3" x-model="bookDescription"></textarea>
                    <div class="text-danger small" x-show="errors.description">
                        <small x-text="errors.description"></small>
                    </div>
                </div>
            
                <button type="submit" class="btn btn-outline-success btn-sm" type="submit">
                    Save
                </button>
            </div>
        </form>
    </div>
</div>

