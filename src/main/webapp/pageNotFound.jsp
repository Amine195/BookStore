<%@ include file="Partials/header.jsp" %>
<c:set var="pageName" value="Error_404" />

<main class="container">
    <h1 class="text-center mb-4"><i class="bi bi-sign-stop text-danger"></i></h1>
    
    <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-6">
            <div class="text-center">
                <div class="alert alert-danger text-center my-4" role="alert">
                    <small class="">404 Page not found</small>
                </div>
                <a class="btn btn-sm btn-outline-primary px-4" href="/book">Revenir a la liste des books</a>
            </div>
        </div>
    </div>
</main>

<%@ include file="Partials/footer.jsp" %>