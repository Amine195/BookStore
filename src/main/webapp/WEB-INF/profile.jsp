<%@ include file="/Partials/header.jsp" %>
<c:set var="pageName" value="Profile" />

<main class="container text-center">
    <%@ include file="/Includes/breadcrumb.jsp" %>
    
    <section class="small">
        <p><i class="bi bi-person-circle h1 mb-5 text-muted"></i></p>
        <p class="mb-2">Session username: <code class="ms-2">${sessionScope.username}</code></p>
        <p class="mb-2">Session isConnected: <code class="ms-2">${sessionScope.isConnected}</code></p>
        <p class="mb-2">Session role: <code class="ms-2">${sessionScope.role}</code></p>
        
        <c:if test="${sessionScope.role == 'USER'}">
            <p class="mb-2">Session cart <br><code class="ms-2">${sessionScope.cart}</code></p>
            
            <p>Session cart détail<br>
                <c:if test="${empty sessionScope.cart}">
                    <p class="text-danger">Le panier est vide.</p>
                </c:if>

                <c:if test="${not empty sessionScope.cart}">
                    <c:forEach var="item" items="${sessionScope.cart}">
                        <code>
                            ${item.book}
                            <hr>
                        </code>
                    </c:forEach>
                </c:if>
            </p>
        </c:if>
            
        <a class="btn btn-sm btn-outline-primary px-4" href="/book">Liste des books</a>
    </section>
</main>

<%@ include file="/Partials/footer.jsp" %>
