<%@ include file="Partials/header.jsp" %>
<c:set var="pageName" value="About" />

<main class="container">
    <%@ include file="/Includes/breadcrumb.jsp" %>
    
    <section class="container small">
        <table class="table w-75 ms-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">TP Question</th>
                    <th scope="col">Réalisation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>On vous demande de créer une petite application web(à 2 au moins 6 pages excluant la page index) qui va permettre de simuler quelques fonctionnalités d?un site offrant des services de consultation de produits et éventuellement d'achats ).</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i></td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Je n'impose pas de sujet en particulier, le choix vous revient. Ainsi le catalogue peut être: Des appartements, Produits pour animaux, Livres, Des  services, Etc?</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i> Book store</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>On vous demande de créer un site Web dynamique incluant: Accès à une BDD JDBC ou  FrameWork de persistance(Hibernate, JPA ).</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i> JDBC</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>Affichage de données de la BDD.</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i></td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>Recherche dans la BDD selon plusieurs critères (au moins 4).</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i></td>
                </tr>
                <tr>
                    <th scope="row">6</th>
                    <td>Mise à jour de données dans la BDD (modification ou suppression).</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i></td>
                </tr>
                <tr>
                    <th scope="row">7</th>
                    <td>Validation de données (saisies): peut être faite coté client (javascript) ou serveur.</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i> coté client (javascript)</td>
                </tr>
                <tr>
                    <th scope="row">8</th>
                    <td>Gestion d'erreurs (Exceptions).</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill"></i></td>
                </tr>
                <tr>
                    <th scope="row">9</th>
                    <td>L'aspect présentation est important.</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i></td>
                </tr>
                <tr>
                    <th scope="row">10</th>
                    <td>Le modèle MVC doit être respecté.</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i></td>
                </tr>
                <tr>
                    <th scope="row">11</th>
                    <td>Les pages Web qui ne sont pas directement accessibles à l'utilisateur doivent être protégées (en les sauvegardant dans WEB-Inf).</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i></td>
                </tr>
                <tr>
                    <th scope="row">12</th>
                    <td>Séparation des différents types de fichiers (js, css, jsp, html, images) dans différents dossiers.</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i></td>
                </tr>
                <tr>
                    <th scope="row">13</th>
                    <td>Les noms des classes et des fichiers doivent être significatifs.</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i></td>
                </tr>
                <tr>
                    <th scope="row">14</th>
                    <td>Pour l'accès aux données, utiliser une BDD Oracle ou MySQL.</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill text-success"></i> MariaDB (AlwaysData)</td>
                </tr>
                <tr>
                    <th scope="row">15</th>
                    <td>L'application doit être internationalisée (au moins 2 langues au choix de l?utilisateur disponible sur les différentes pages).</td>
                    <td class="text-nowrap"><i class="bi bi-check-circle-fill"></i></td>
                </tr>
            </tbody>
        </table>
    </section>
</main>

<%@ include file="Partials/footer.jsp" %>
