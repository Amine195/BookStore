package bookstore.project.dao;

import bookstore.project.beans.Book;
import bookstore.project.db.DatabaseConnection;
import bookstore.project.db.SQL_BOX;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class BookDAO implements IBookDAO {
    private final Connection connection;

    public BookDAO() {
        this.connection = DatabaseConnection
                .getInstance()
                .getConnection();
    }

    @Override
    public boolean addBook(Book book) {
        String query = SQL_BOX.ADD_NEW_BOOK;
        
        try {
            PreparedStatement statement = this.connection.prepareStatement(query);
            
            statement.setString(1, book.getTitle());
            statement.setString(2, book.getAuthor());
            statement.setString(3, book.getPublisher());
            statement.setDate(4, book.getPublicationDate());
            statement.setString(5, book.getCategory());
            statement.setString(6, book.getLanguage());
            statement.setInt(7, book.getPages());
            statement.setString(8, book.getFormat());
            statement.setDouble(9, book.getPrice());
            statement.setInt(10, book.getStock());
            statement.setString(11, book.getDescription());

            int result = statement.executeUpdate();
            return result == 1;
        }
        catch(SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean updateBook(Book book) {
        try {
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        
        return false;
    }

    @Override
    public boolean updateBook(int bookId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Book> getAllBooks() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Book getBook(int bookId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
    public static void main(String[] args) {
        try {
            BookDAO bookDAO = new BookDAO();
            Book newBook = new Book(
                "JEE From scratch",
                "Mohammed amine",
                "T. Egerton",
                java.sql.Date.valueOf("1813-01-28"),
                "Roman",
                "Anglais",
                432,
                "Broché",
                12.99,
                15,
                "A classic English novel about love and society."
            );

            if (bookDAO.addBook(newBook)) {
                System.out.println("Book added successfully!");
            } else {
                System.out.println("Failed to add book.");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
