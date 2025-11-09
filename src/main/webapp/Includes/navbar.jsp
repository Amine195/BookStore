<header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="/">
                <img class="me-4" src="Images/logo.png" alt="Logo" width="200">
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <c:if test="${sessionScope.isConnected}">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mt-1">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/book">
                                <small>Books</small>
                            </a>
                        </li>      
                    </ul>
                    
                    <a class="nav-link d-flex align-items-center mt-1" href="/profile">
                        <i class="bi bi-person-circle me-1"></i>
                        <span class="small">Bonjour ${sessionScope.username}</span>
                    </a>

                    <span class="mx-3"></span>

                    <c:if test="${sessionScope.role == 'USER'}">
                        <c:choose>
                            <c:when test="${pageContext.request.servletPath == '/WEB-INF/profile.jsp'}">  
                                
                                <a class="nav-link d-flex align-items-center mt-1" href="/cart">
                                    <i class="bi bi-cart me-1"></i>
                                    <span class="badge text-bg-danger" x-text="$store.books.totalQuantity"></span>
                                </a>

                                <span class="mx-2"></span>
                            </c:when>
                                
                            <c:when test="${pageContext.request.servletPath == '/WEB-INF/cart.jsp'}">                               
                                <a class="nav-link d-flex align-items-center mt-1" href="#">
                                    <i class="bi bi-cart me-1"></i>
                                    <span class="badge text-bg-danger" x-text="$store.books.totalQuantity"></span>
                                </a>

                                <span class="mx-2"></span>
                            </c:when>

                            <c:otherwise>
                                <span class="cursor-pointer d-inline-flex align-items-center mt-1" @click="$dispatch('show-cart')">
                                    <i class="bi bi-cart me-1"></i>
                                    <span class="badge text-bg-danger" x-text="$store.books.totalQuantity"></span>
                                </span>

                                <span class="mx-2"></span>
                            </c:otherwise>
                        </c:choose>
                    </c:if>

                    <button class="btn mt-1" @click="await $store.auth.logout()">
                        <i class="bi bi-box-arrow-right me-1"></i>
                        <span class="small">Logout</span>
                    </button>
                </div>
            </c:if>
        </div>     
    </nav>
</header>
                    
<div style="margin-bottom: 100px;"></div>