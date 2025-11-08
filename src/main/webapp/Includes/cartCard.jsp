<div class="card shadow-sm p-2 mb-5">
    <div class="card-body small">
        <template x-for="item in $store.books.booksCart" :key="item.book.id">
            <div class="d-flex justify-content-between">
                <div class="mb-3">
                    <h6 class="fw-semibold mb-0" x-text="item.book.title"></h6>
                    <span class="fw-semibold text-body-tertiary small" x-text="item.book.author"></span>
                </div>

                <div>
                    <span class="fw-semibold text-danger" x-text="item.quantity"></span> ×
                    <span x-text="item.book.price.toFixed(2)"></span> CAD
                </div>
            </div>    
        </template>
        
        <hr class="mt-0">
        
        <div>
            <div class="d-flex justify-content-between text-muted small">
                <p class="mb-1">Sous-total :</p>
                <p class="mb-1"><span x-text="$store.books.subtotal().toFixed(2)"></span> CAD</p>
            </div>
            
            <div class="d-flex justify-content-between text-muted small">
                <p class="mb-1">TPS (5%) : </p>
                <p class="mb-1"><span x-text="$store.books.tps().toFixed(2)"></span> CAD</p>
            </div>
            
            <div class="d-flex justify-content-between mb-2 text-muted small">
                <p class="mb-1">TVQ (9.975%) : </p>
                <p class="mb-1"><span x-text="$store.books.tvq().toFixed(2)"></span> CAD</p>
            </div>
            
            <hr class="mt-0">
            
            <div class="d-flex justify-content-between mb-2">
                <p class="mb-1"><strong>Total : </p>
                <p class="mb-1"><span x-text="$store.books.total().toFixed(2)"></span> CAD</p>
            </div>
          
            <button class="btn btn-sm btn-success w-100">Payement</button>
        </div>        
    </div>
</div>