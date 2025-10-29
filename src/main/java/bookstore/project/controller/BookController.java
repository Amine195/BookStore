package bookstore.project.controller;

import bookstore.project.beans.Book;
import bookstore.project.dao.BookDAO;
import bookstore.project.dao.IBookDAO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Date;
import java.util.List;
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
                
            case "/listJsonFormat":
                getAllBooksJsonFormat(request, response);
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
        
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");
        
        try
        {
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            
            Gson gson = new Gson();
            JsonObject json = gson.fromJson(sb.toString(), JsonObject.class);

            String title = json.get("title").getAsString();
            String author = json.get("author").getAsString();
            String publisher = json.get("publisher").getAsString();
            String publicationDateStr = json.get("publicationDate").getAsString();
            String category = json.get("category").getAsString();
            String language = json.get("language").getAsString();
            int pages = json.get("pages").getAsInt();
            String format = json.get("format").getAsString();
            double price = json.get("price").getAsDouble();
            int stock = json.get("stock").getAsInt();
            String description = json.get("description").getAsString();
            
            Date publicationDate = Date.valueOf(publicationDateStr);
            
            Book newBook = new Book(
                title, author, publisher, publicationDate, category,
                language, pages, format, price, stock, description
            );
            
            boolean status = bookDAO.addBook(newBook);
            String jsonResponse = gson.toJson(status);
            response.getWriter().write(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void updateBook(HttpServletRequest request, HttpServletResponse response) {
        
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");
        
        try
        {
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            
            Gson gson = new Gson();
            JsonObject json = gson.fromJson(sb.toString(), JsonObject.class);
            
            int id = json.get("id").getAsInt();
            String title = json.get("title").getAsString();
            String author = json.get("author").getAsString();
            String publisher = json.get("publisher").getAsString();
            String publicationDateStr = json.get("publicationDate").getAsString();
            String category = json.get("category").getAsString();
            String language = json.get("language").getAsString();
            int pages = json.get("pages").getAsInt();
            String format = json.get("format").getAsString();
            double price = json.get("price").getAsDouble();
            int stock = json.get("stock").getAsInt();
            String description = json.get("description").getAsString();
            
            Date publicationDate = Date.valueOf(publicationDateStr);
            
            Book updatedBook = new Book(
                id, title, author, publisher, publicationDate, category,
                language, pages, format, price, stock, description
            );
            
            boolean status = bookDAO.updateBook(updatedBook);
            String jsonResponse = gson.toJson(status);
            response.getWriter().write(jsonResponse);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void deleteBook(HttpServletRequest request, HttpServletResponse response) {  
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");

        try {
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            Gson gson = new Gson();
            JsonObject json = gson.fromJson(sb.toString(), JsonObject.class);
            int id = json.get("id").getAsInt();
            
            boolean status = bookDAO.deleteBook(id);
            String jsonResponse = gson.toJson(status);
            response.getWriter().write(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void getAllBooks(HttpServletRequest request, HttpServletResponse response) {        
        try
        {
            RequestDispatcher dispatcher = request.getRequestDispatcher("/Pages/books/bookList.jsp");
            dispatcher.forward(request, response);
        }
        catch(ServletException | IOException e)
        {
            e.printStackTrace();
        }
    }
    
    private void getAllBooksJsonFormat(HttpServletRequest request, HttpServletResponse response) {
        List<Book> books = bookDAO.getAllBooks();
        
        try {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(books);
            response.getWriter().write(json);

        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private void getBook(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");

        try {
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            Gson gson = new Gson();
            JsonObject json = gson.fromJson(sb.toString(), JsonObject.class);
            int id = json.get("id").getAsInt();
            
            Book book = bookDAO.getBook(id);

            String jsonResponse = gson.toJson(book);
            response.getWriter().write(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
