<%@ include file="/Partials/header.jsp" %>

<main x-data="bookApp" class="container mt-4">
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
                <c:if test="${sessionScope.role eq 'ADMIN'}">
                    <button class="btn btn-sm btn-outline-primary" @click="newBook()">Add book</button>
                </c:if>
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
                            <c:if test="${sessionScope.role eq 'ADMIN'}">
                                <%@ include file="/Includes/bookTab.jsp" %>
                            </c:if>
                            <c:if test="${sessionScope.role eq 'USER'}">
                                <%@ include file="/Includes/bookCard.jsp" %>
                            </c:if>
                        </template>
                    </template> 
                </div>
            </template>
        </div>

        <%-- BOOK DETAILS / NEW / EDIT --%>
        <div class="col-5 px-5">
            <h5 class="fw-bold ms-1 mb-3"><span x-text="selectedOption"></span> Book</h5>
            
            <template x-if="selectedOption === 'Details'">
                <div>
                    <template x-if="!bookId">
                        <p class="small"><span class="fw-bold text-primary me-2">|</span> Aucun produit selectionner.</p>
                    </template>
                    <template x-if="bookId">
                        <%@ include file="/Includes/bookDetails.jsp" %>
                    </template>
                </div>
               
            </template>
            
            <template x-if="selectedOption === 'New' || selectedOption === 'Edit'">
                <%@ include file="/Includes/bookForm.jsp" %>
            </template>         
        </div>
    </section>
</main>

<%@ include file="/Partials/footer.jsp" %>
