<%@ include file="/Partials/header.jsp" %>

<main x-data="bookApp" class="container">
    <%@ include file="/Includes/breadcrumb.jsp" %>
        
    <section class="row">
        
        <%-- FILTRES --%>
        <div class="col-2">
            <h5 class="fw-bold mb-3">Filtres</h5>
            <form id="filtersForm">
                <%@ include file="/Includes/filters/categories.jsp" %>
                <%@ include file="/Includes/filters/langues.jsp" %>
                <%@ include file="/Includes/filters/formats.jsp" %>
                <%@ include file="/Includes/filters/stocks.jsp" %>
            </form>
        </div>
            
        <%-- BOOK LIST --%>
        <div class="col-5">
            
            <%-- TITLE --%>
            <h5 class="fw-bold mb-3">
                Books List &nbsp;
                <button class="btn btn-sm btn-outline-primary" @click="newBook()">Add book</button>
            </h5>
            <hr>
            
            <%-- SPINNER --%>
            <template x-if="isLoading">
                <div>
                    <div class="spinner-border spinner-border-sm text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>    
                    </div>
                    <span class="fw-semibold text-body-tertiary small ms-1">Chargement des livres...</span>
                </div>
            </template>
            
            <%-- BOOK LIST CARD --%>
            <template x-if="!isLoading">
                <div>
                    <template x-if="$store.books.booksList.length === 0">
                        <p class="small"><span class="fw-bold text-primary me-2">|</span> Aucun produit dans la base de données.</p>
                    </template>
                 
                    <template x-if="$store.books.booksList.length > 0">
                        <template x-for="book in $store.books.booksList" :key="book.id">
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
                        </template>
                    </template> 
                </div>
            </template>
        </div>

        <%-- BOOK DETAILS / NEW / EDIT --%>
        <div class="col-5">
            <h5 class="fw-bold ms-1 mb-3"><span x-text="selectedOnglet"></span> Book</h5>
            
            <template x-if="selectedOnglet === 'Details'">
                <div>
                    <template x-if="!$store.books.selectedBook">
                        <p class="small"><span class="fw-bold text-primary me-2">|</span> Aucun produit selectionner.</p>
                    </template>
                    <template x-if="$store.books.selectedBook">
                        <%@ include file="/Includes/bookDetails.jsp" %>
                    </template>
                </div>
               
            </template>
            
            <template x-if="selectedOnglet === 'New'">
                
            </template>         
        </div>
    </section>
</main>

<%@ include file="/Partials/footer.jsp" %>
