package bookstore.project.dao;

import bookstore.project.beans.Book;
import java.util.List;

public interface IBookDAO {
    public boolean addBook(Book book);
    public boolean updateBook(Book book);
    public boolean deleteBook(int bookId);
    public List<Book> getAllBooks();
    public Book getBook(int bookId);
}
