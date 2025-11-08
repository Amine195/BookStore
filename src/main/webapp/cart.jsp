<%@ include file="Partials/header.jsp" %>

<main x-data="cart" class="container">
    <h1 class="text-center mb-4"><i class="bi bi-bag-check text-success"></i></h1>
    
    <div class="row justify-content-center">
        

        <div class="col-12 col-md-6 col-lg-6">
            <template x-if="isDone">
                <div class="text-center">
                    <div class="alert alert-success my-4" role="alert">
                        <small class="">Payement effectuer avec success</small>
                    </div>
                    <a class="btn btn-sm btn-outline-primary px-4" href="/book">Revenir a la liste des books</a>
                </div>
            </template>
            
            <template x-if="isProcessing">
                <div class="loading-box my-4">
                    <span class="loading-text">Processing...</span>
                    <div class="loader my-4"></div>
                    <a class="btn btn-sm btn-outline-primary px-4" href="#">Revenir a la liste des books</a>
                </div>
            </template>
            
            <template x-if="!isProcessing && !isDone && !$store.books.booksCart.length">
                <div class="text-center">
                    <div class="alert alert-light text-center my-4" role="alert">
                        <small class="">Votre panier est vide</small>
                    </div>
                    <a class="btn btn-sm btn-outline-primary px-4" href="/book">Revenir a la liste des books</a>
                </div>
            </template>
                                    
            <template x-if="!isProcessing && !isDone && $store.books.booksCart.length">
                <%@ include file="/Includes/cartCard.jsp" %>
            </template>
        </div>
    </div>
</main>

<%@ include file="Partials/footer.jsp" %>

