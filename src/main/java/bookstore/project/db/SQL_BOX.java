package bookstore.project.db;

public class SQL_BOX {
    public static final String ADD_NEW_BOOK = 
        "INSERT INTO book (title, author, publisher, publication_date, category, language, pages, format, price, stock, description) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
}
