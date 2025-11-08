<div class="card shadow-sm p-2 mb-5">
    <div class="card-body small">     
        <template x-for="item in $store.books.booksCart" :key="item.book.id">
            <div>
                <div class="d-flex justify-content-between mb-3">
                    <div>
                        <h6 class="fw-semibold mb-0" x-text="item.book.title"></h6>
                        <span class="fw-semibold text-body-tertiary small" x-text="item.book.author"></span>
                    </div>

                    <div>
                        <span class="fw-bold" x-text="item.quantity"></span>
                        × <span x-text="item.book.price.toFixed(2)"></span> CAD
                        <button class="btn btn-sm btn-outline-dark py-0 px-1 ms-2" @click="$store.books.removeFromCart(item.book.id)"><i class="bi bi-dash"></i></button>
                        <button class="btn btn-sm btn-outline-dark py-0 px-1" @click="$store.books.addToCart(item.book.id)"><i class="bi bi-plus"></i></button>
                    </div>
                </div>
                
                <c:if test="${pageContext.request.servletPath == '/cart.jsp'}">
                    <p class="text-muted" x-text="item.book.description"></p>
                </c:if>
            </div>
        </template>
        
        <hr class="mt-0">
        
        <div>
            <div class="d-flex justify-content-between text-muted small">
                <p class="mb-1">Sous-total :</p>
                <p class="mb-1"><span x-text="$store.books.subtotal.toFixed(2)"></span> CAD</p>
            </div>
            
            <div class="d-flex justify-content-between text-muted small">
                <p class="mb-1">TPS (5%) : </p>
                <p class="mb-1"><span x-text="$store.books.tps.toFixed(2)"></span> CAD</p>
            </div>
            
            <div class="d-flex justify-content-between mb-2 text-muted small">
                <p class="mb-1">TVQ (9.975%) : </p>
                <p class="mb-1"><span x-text="$store.books.tvq.toFixed(2)"></span> CAD</p>
            </div>
            
            <hr class="mt-0">
            
            <div class="d-flex justify-content-between mb-2">
                <p class="mb-1"><strong>Total : </p>
                <p class="mb-1"><span x-text="$store.books.total.toFixed(2)"></span> CAD</p>
            </div>
          
            <c:choose>
                <c:when test="${pageContext.request.servletPath == '/cart.jsp'}">                               
                    <a class="btn btn-sm btn-success w-100" href="cart.jsp">Payement</a>
                </c:when>

                <c:otherwise>
                    <a class="btn btn-sm btn-success w-100" href="cart.jsp">Cart details</a>
                </c:otherwise>
            </c:choose>
        </div>        
    </div>
</div>