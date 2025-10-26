<%@ include file="/Partials/header.jsp" %>

<main class="container">
    <%@ include file="/Includes/breadcrumb.jsp" %>
        
    <section class="row">
        <div class="col-2">
            <h5 class="fw-bold mb-3">Filtres</h5>
            <form id="filtersForm">
                <%@ include file="/Includes/filters/categories.jsp" %>
                <%@ include file="/Includes/filters/langues.jsp" %>
                <%@ include file="/Includes/filters/formats.jsp" %>
                <%@ include file="/Includes/filters/stocks.jsp" %>
            </form>
        </div>
        <div class="col-5">
            <h5 class="fw-bold mb-3">
                Books List &nbsp;
                <button class="btn btn-sm btn-outline-primary">Add book</button>
            </h5>
            <c:forEach var="book" items="${books}">            
                <div class="card shadow-sm mb-3">
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                                <h6 class="card-title fw-bold">
                                    <img class="me-3" src="Images/book.png" alt="Logo" width="25">
                                    ${book.title}
                                </h6>

                                <p class="card-text small">${book.description}</p>
                                <p class="card-text">
                                    <small class="text-body-secondary">
                                        Publication date &nbsp; ${book.publicationDate}
                                    </small>
                                </p>

                                <div class="d-flex justify-content-start mt-3">
                                    <button class="btn btn-outline-primary btn-sm me-2" onclick="showDetails('${book.id}')">
                                        <i class="bi bi-info-circle me-1"></i> Détails
                                    </button>
                                    <button class="btn btn-outline-success btn-sm" onclick="addToCart('${book.id}')">
                                        <i class="bi bi-cart-plus me-1"></i> Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
        <div class="col-5">
            <h5 class="fw-bold ms-1 mb-3">Book Details</h5>
            <p class="small"><span class="fw-bold text-primary me-2">|</span> Aucun produit selectionner.</p>
        </div>
    </section>
</main>

<%@ include file="/Partials/footer.jsp" %>
