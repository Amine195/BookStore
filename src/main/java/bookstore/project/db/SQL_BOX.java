package bookstore.project.db;

public class SQL_BOX {
    public static final String ADD_NEW_BOOK = 
        "INSERT INTO book (title, author, publisher, publication_date, category, language, pages, format, price, stock, description) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    public static final String UPDATE_BOOK = 
        "UPDATE book SET " +
        "title=?, author=?, publisher=?, publication_date=?, category=?, language=?, pages=?, format=?, price=?, stock=?, description=? " +
        "WHERE id=?";
    
    public static final String DELETE_BOOK =
        "DELETE FROM book WHERE id=?;";
    
    public static final String GET_ALL_BOOKS =
        "SELECT * FROM book;";
    
    public static final String GET_BOOK =
        "SELECT * FROM Book WHERE id=?";

}
