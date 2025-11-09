package bookstore.project.controller;

import bookstore.project.beans.Book;
import bookstore.project.dao.BookDAO;
import bookstore.project.dao.IBookDAO;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BookController extends HttpServlet {
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
        doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
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

    private void addNewBook(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");
        
        try {          
            String body = readRequestBody(request);
            
            Gson gson = new Gson();
            JsonObject json = gson.fromJson(body, JsonObject.class);

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
                title,
                author,
                publisher,
                publicationDate,
                category,
                language,
                pages,
                format,
                price,
                stock,
                description
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
        
        try{
            String body = readRequestBody(request);
            
            Gson gson = new Gson();
            JsonObject json = gson.fromJson(body, JsonObject.class);
            
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
                id,
                title,
                author,
                publisher,
                publicationDate,
                category,
                language,
                pages,
                format,
                price,
                stock,
                description
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
            String body = readRequestBody(request);

            Gson gson = new Gson();
            JsonObject json = gson.fromJson(body, JsonObject.class);
            
            int id = json.get("id").getAsInt();
            
            boolean status = bookDAO.deleteBook(id);
            
            String jsonResponse = gson.toJson(status);
            response.getWriter().write(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void getAllBooks(HttpServletRequest request, HttpServletResponse response) {        
        try {
            RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/bookList.jsp");
            dispatcher.forward(request, response);
            
        } catch(ServletException | IOException e) {
            e.printStackTrace();
        }
    }
    
    private void getAllBooksJsonFormat(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");
        
        try {
            List<Book> books = bookDAO.getAllBooks();
            
            String body = readRequestBody(request);

            Gson gson = new Gson();
            JsonObject json = gson.fromJson(body, JsonObject.class);
            
            JsonArray categories = json.getAsJsonArray("categories");
            JsonArray format = json.getAsJsonArray("format");
            JsonArray langue = json.getAsJsonArray("langue");
            JsonArray enStock = json.getAsJsonArray("enStock");
            
            List<Book> filtered = books.stream()
                .filter(b -> {
                    boolean match = true;
                    if (categories != null && categories.size() > 0)
                        match &= contains(categories, b.getCategory());

                    if (format != null && format.size() > 0)
                        match &= contains(format, b.getFormat());

                    if (langue != null && langue.size() > 0)
                        match &= contains(langue, b.getLanguage());

                    if (enStock != null && enStock.size() > 0) {
                        String value = enStock.get(0).getAsString();
                        if (value.equalsIgnoreCase("true")) {
                            match &= b.getStock() > 0;
                        } else if (value.equalsIgnoreCase("false")) {
                            match &= b.getStock() == 0;
                        }
                    } else {
                        match &= b.getStock() >= 0;
                    }

                    return match;
                })
                .collect(Collectors.toList());
            
            response.getWriter().write(gson.toJson(filtered));            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void getBook(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");

        try {
            String body = readRequestBody(request);

            Gson gson = new Gson();
            JsonObject json = gson.fromJson(body, JsonObject.class);
            
            int id = json.get("id").getAsInt();
            
            Book book = bookDAO.getBook(id);

            String jsonResponse = gson.toJson(book);
            response.getWriter().write(jsonResponse);

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
    
    private boolean contains(JsonArray array, String value) {
        for (int i = 0; i < array.size(); i++) {
            if (array.get(i).getAsString().equalsIgnoreCase(value)) {
                return true;
            }
        }
        return false;
    }
}
