package bookstore.project.dao;

import bookstore.project.beans.Book;
import java.util.List;

public interface IBookDAO {
    // 1- Insert Book
    public boolean addBook(Book book);
    
    // 2- Update Book
    public boolean updateBook(Book book);
    
    // 3- Delete Book
    public boolean updateBook(int bookId);
    
    // 4- Get All Books
    public List<Book> getAllBooks();
    
    // 5- Get Single Book
    public Book getBook(int bookId);
}
