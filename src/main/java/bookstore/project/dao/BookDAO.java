package bookstore.project.dao;

import bookstore.project.beans.Book;
import bookstore.project.db.DatabaseConnection;
import bookstore.project.db.SQL_BOX;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
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

        try (PreparedStatement statement = this.connection.prepareStatement(query)) {
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

        } catch (SQLException e) {
            throw new RuntimeException(
                "Erreur lors de l’ajout du livre '" + book.getTitle() + "' : " + e.getMessage(), e
            );
        }
    }


    @Override
    public boolean updateBook(Book book) {
        String query = SQL_BOX.UPDATE_BOOK;

        try (PreparedStatement statement = this.connection.prepareStatement(query)) {
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
            statement.setInt(12, book.getId());

            int result = statement.executeUpdate();
            return result == 1;
            
        } catch (SQLException e) {
            throw new RuntimeException(
                "Erreur lors de la mise à jour du livre ID=" + book.getId() + " : " + e.getMessage(), e
            );
        }
    }

    @Override
    public boolean deleteBook(int bookId) {
        String query = SQL_BOX.DELETE_BOOK;

        try (PreparedStatement statement = this.connection.prepareStatement(query)) {
            statement.setInt(1, bookId);
            int result = statement.executeUpdate();
            return result == 1;
            
        } catch (SQLException e) {
            System.err.println("Erreur lors de la suppression du livre ID=" + bookId + " : " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<Book> getAllBooks() {
        List<Book> books = new ArrayList<>();
        String query = SQL_BOX.DELETE_BOOK;

        try (PreparedStatement ps = this.connection.prepareStatement(query);
            ResultSet result = ps.executeQuery()) {

            while (result.next()) {
                int id = result.getInt("id");
                String title = result.getString("title");
                String author = result.getString("author");
                String publisher = result.getString("publisher");
                java.sql.Date publicationDate = result.getDate("publication_date");
                String category = result.getString("category");
                String language = result.getString("language");
                int pages = result.getInt("pages");
                String format = result.getString("format");
                double price = result.getDouble("price");
                int stock = result.getInt("stock");
                String description = result.getString("description");

                Book found = new Book(
                    id, title, author, publisher, publicationDate,
                    category, language, pages, format, price, stock, description
                );

                books.add(found);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erreur lors de la lecture des livres : " + e.getMessage(), e);
        }

        return books;
    }


    @Override
    public Book getBook(int bookId) {
        String query = SQL_BOX.GET_BOOK;

        try (PreparedStatement statement = this.connection.prepareStatement(query)) {
            statement.setInt(1, bookId);
            
            try (ResultSet result = statement.executeQuery()) {
                if (result.next()) {
                    return new Book(
                        result.getInt("id"),
                        result.getString("title"),
                        result.getString("author"),
                        result.getString("publisher"),
                        result.getDate("publication_date"),
                        result.getString("category"),
                        result.getString("language"),
                        result.getInt("pages"),
                        result.getString("format"),
                        result.getDouble("price"),
                        result.getInt("stock"),
                        result.getString("description")
                    );
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(
                "Erreur lors de la récupération du livre ID=" + bookId + " : " + e.getMessage(), e
            );
        }

        return null;
    }
}
