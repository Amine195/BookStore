package bookstore.project.controller;

import bookstore.project.beans.Book;
import bookstore.project.dao.BookDAO;
import bookstore.project.dao.IBookDAO;
import static com.sun.org.apache.xerces.internal.util.XMLChar.trim;

import java.io.IOException;
import java.sql.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BookController extends HttpServlet {
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getPathInfo();        
        action = (action == null) ? "/list" : action;
        
        switch(action) {
            case "/add":
                addNewBook(request, response);
                break;
                
            case "/update":
                updateBook(request, response);
                break;
                
            case "/delete":
                deleteBook(request, response);
                break;
                
            case "/list":
                getAllBooks(request, response);
                break;
                
            case "/get":
                getBook(request, response);
                break;
                
            default:
                getAllBooks(request, response);
                break;
        }
    }

    private void addNewBook(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // 1. Récupération et nettoyage des paramètres
        String title = request.getParameter("title");
        String author = request.getParameter("author");
        String publisher = request.getParameter("publisher");
        String publicationDateStr = request.getParameter("publicationDate");
        String category = request.getParameter("category");
        String language = request.getParameter("language");
        String pagesStr = request.getParameter("pages");
        String format = request.getParameter("format");
        String priceStr = request.getParameter("price");
        String stockStr = request.getParameter("stock");
        String description = request.getParameter("description");
        
        // 2. Convertir les types       
        int pages = Integer.parseInt(pagesStr);
        double price = Double.parseDouble(priceStr);
        int stock = Integer.parseInt(stockStr);
        Date publicationDate = Date.valueOf(publicationDateStr);
        
        // 3. Créer le Book
        Book newBook = new Book(
            title, author, publisher, publicationDate, category,
            language, pages, format, price, stock, description
        );
        
        // 4. Enregistrer le livre via le DAO
        boolean success = bookDAO.addBook(newBook);
        System.out.println(success);
    }

    private void updateBook(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("updateBook");
    }

    private void deleteBook(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("deleteBook");
    }

    private void getAllBooks(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("getAllBooks");
    }

    private void getBook(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("getBook");
    }
}
