<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/Partials/header.jsp" %>

<main class="container mb-3">
    <section>
        <h1>Book list page</h1>
        
        <c:forEach var="book" items="${books}">
            <p>${book.title}</p>
        </c:forEach>
    </section>
</main>

<%@ include file="/Partials/footer.jsp" %>
