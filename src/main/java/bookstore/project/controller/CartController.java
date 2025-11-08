package bookstore.project.controller;

import bookstore.project.beans.Book;
import bookstore.project.beans.CartItem;
import bookstore.project.dao.BookDAO;
import bookstore.project.dao.IBookDAO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class CartController extends HttpServlet {
    private IBookDAO bookDAO;
    
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        this.bookDAO = new BookDAO();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getPathInfo();
        action = (action == null) ? "/load" : action;
        
        switch(action) {
            case "/load":
                getCart(request, response);
                break;
                
            case "/add":
                addToCart(request, response);
                break;
                
            case "/delete":
                deleteFromCart(request, response);
                break;
                
            default:
                getCart(request, response);
                break;
        }
    }
            
    private void getCart(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");

        try {
            // Récupérer la session
            HttpSession session = request.getSession();

            // Récupérer le panier
            List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");

            // Si aucun panier → retourner tableau vide
            if (cart == null) {
                cart = new ArrayList<>();
            }

            // Convertir en JSON
            Gson gson = new Gson();
            String json = gson.toJson(cart);

            // Envoyer la réponse JSON
            response.getWriter().write(json);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private void addToCart(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");
        
        try {
            // Lire la data envoyés par Alpine
            String body = readRequestBody(request);

            Gson gson = new Gson();
            JsonObject json = gson.fromJson(body, JsonObject.class);
            
            // chercher le Book
            int id = json.get("id").getAsInt();
            Book book = bookDAO.getBook(id);
            
            // Récupérer la session
            HttpSession session = request.getSession();
            
            // Récupérer ou créer le panier
            List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
            if (cart == null)
                cart = new ArrayList<>();
            
            // Vérifier si l'article existe déjà
            boolean found = false;
            for (CartItem item : cart) {
                if (item.getBook().getId() == id) {
                    item.setQuantity(item.getQuantity() + 1);
                    found = true;
                    break;
                }
            }
            
            // Sinon l'ajouter
            if (!found) {
                cart.add(new CartItem(book, 1));
            }
            
            // Sauvegarder en session
            session.setAttribute("cart", cart);
            
            // Envoyer la reponse
            String jsonResponse = gson.toJson(cart);
            response.getWriter().write(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
        }
    } 
    
    private void deleteFromCart(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");

        
    } 

    private String readRequestBody(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }
        return sb.toString();
    }
}
