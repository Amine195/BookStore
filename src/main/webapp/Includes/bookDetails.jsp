<div class="card position-relative overflow-hidden shadow-sm p-3 mb-5">
    
    <div x-show="isLoadingDetails" class="progress position-absolute top-0 start-0 w-100" style="height: 4px; border-top-left-radius: .375rem; border-top-right-radius: .375rem;">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
            role="progressbar" :style="{ width: isLoadingDetailsProgress + '%' }"></div>
    </div>
    
    <div class="card-body small">
        <div class="row">
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Titre</label>
                <h6 class="card-title fw-bold mb-3" x-text="bookTitle"></h6>
            </div>
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Publication Date</label>
                <p class="card-title mb-3" x-text="bookPublicationDate"></p>
            </div>
        </div>
              
        <div class="row">
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Author</label>
                <p class="card-title mb-3" x-text="bookAuthor"></p>
            </div>
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Publisher</label>
                <p class="card-title mb-3" x-text="bookPublisher"></p>
            </div>
        </div>
       
        <div class="row">
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Category</label>
                <p class="card-title mb-3" x-text="bookCategory"></p>
            </div>
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Language</label>
                <p class="card-title mb-3" x-text="bookLanguage"></p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Pages</label>
                <p class="card-title mb-3" x-text="bookPages"></p>
            </div>
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Format</label>
                <p class="card-title mb-3" x-text="bookFormat"></p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Stock</label>
                <p class="card-title mb-3" x-text="bookStock"></p>
            </div>
            <div class="col-6">
                <label class="fw-semibold text-body-tertiary mb-1">Price</label>
                <p class="card-title mb-3" x-text="bookPrice.toFixed(2) + ' CAD'"></p>
            </div>
        </div>
        
        <label class="fw-semibold text-body-tertiary mb-1">Description</label>
        <p class="card-title mb-3" x-text="bookDescription"></p>
    </div>
</div>
