<%@ include file="/Partials/header.jsp" %>

<main x-data="login" class="container text-center mt-5">
    <br>
    
    <section>
        <form id="connexionForm" class="d-inline-block p-4 border rounded shadow-sm" @submit.prevent="submitForm" style="width: 400px;">
            <h5 class="fw-bold mb-3">Connexion</h5>
            <h1 class="mb-3"><i class="bi bi-fingerprint"></i></h1>
            
            <template x-if="responseIsValid != null">
                <div :class="responseIsValid ? 'alert alert-success py-2' : 'alert alert-danger py-2'" role="alert">
                    <p class="mb-0 fw-semibold small">
                        <i :class="!responseIsValid ? 'bi bi-exclamation-triangle me-2' : 'bi bi-check-circle me-2'"></i>
                        <span x-text="responseMsgText"></span>
                    </p>
                </div>
            </template>
            
            <div class="mb-3">
                <label for="username" class="form-label small">Username</label>
                <input 
                    type="text" 
                    class="form-control form-control-sm" 
                    id="username" 
                    name="username" 
                    x-model="username"
                    @input="handleInput"
                    >
                <div class="text-danger small" x-show="errors.username">
                    <small x-text="errors.username"></small>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="password" class="form-label small">Password</label>
                <input 
                    type="password" 
                    class="form-control form-control-sm" 
                    id="password" 
                    name="password" 
                    x-model="password"
                    @input="handleInput"
                    aria-describedby="passwordHelpBlock"
                    >
                <div class="text-danger small" x-show="errors.password">
                    <small x-text="errors.password"></small>
                </div>
                <div id="passwordHelpBlock" class="form-text">
                    <small>The password is asdf.</small>
                </div>
            </div>
            
            <div class="form-check mb-2 text-start">
                <input class="form-check-input" type="checkbox" value="isAdmin" id="checkDefault" x-model="isAdmin">
                <label class="form-check-label small" for="checkDefault">
                    <small class="fw-bold">Admin</small>
                </label>
            </div>
            
            <template x-if="!isLoading">
                <button type="submit" class="btn btn-sm btn-primary w-100">Se connecter</button>
            </template>
            
            <template x-if="isLoading">
                <button class="btn btn-sm btn-primary w-100" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                </button>
            </template>
        </form>
    </section>
</main>

<%@ include file="/Partials/footer.jsp" %>