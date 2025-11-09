package bookstore.project.controller;

import bookstore.project.beans.Book;
import bookstore.project.beans.CartItem;
import bookstore.project.dao.BookDAO;
import bookstore.project.dao.IBookDAO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class CartController extends HttpServlet {
    private IBookDAO bookDAO;
    
    @Override
    public void init(ServletConfig config) {
        try {
            super.init(config);
            this.bookDAO = new BookDAO();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {             
            RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/cart.jsp");
            dispatcher.forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
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
                
            case "/done":
                processFinish(request, response);
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

        } catch (Exception e) {
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
            if (cart == null) cart = new ArrayList<>();
            
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

        try {
            // Lire JSON envoyé par Alpine
            String body = readRequestBody(request);
            
            Gson gson = new Gson();
            JsonObject json = gson.fromJson(body, JsonObject.class);

            int id = json.get("id").getAsInt();

            // Récupérer la session
            HttpSession session = request.getSession();

            // Récupérer panier
            List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");

            // Parcourir le panier et décrémenter la quantité
            for (CartItem item : cart) {
                if (item.getBook().getId() == id) {
                    item.setQuantity(item.getQuantity() - 1);
                    if (item.getQuantity() <= 0) cart.remove(item);
                    break;
                }
            }

            // Sauvegarder le panier modifié
            session.setAttribute("cart", cart);

            // Retourner panier mis à jour
            String jsonResponse = gson.toJson(cart);
            response.getWriter().write(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private void processFinish(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");

        try {
            // Récupérer la session
            HttpSession session = request.getSession();

            List<CartItem> emptyCart = new ArrayList<>();
            session.setAttribute("cart", emptyCart);
            
            // Convertir en JSON
            Gson gson = new Gson();
            String json = gson.toJson(emptyCart);

            // Envoyer la réponse JSON
            response.getWriter().write(json);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String readRequestBody(HttpServletRequest request) {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sb.toString();
    }
}
