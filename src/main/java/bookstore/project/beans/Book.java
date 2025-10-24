package bookstore.project.beans;

import java.sql.Date;

public class Book {
    private int id;
    private String title;
    private String author;
    private String publisher;
    private Date publicationDate;
    private String category;
    private String language;
    private int pages;
    private String format;
    private double price;
    private int stock;
    private String description;

    public Book() {}

    public Book(String title, String author, String publisher, Date publicationDate,
            String category, String language, int pages, String format,
            double price, int stock, String description) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publicationDate = publicationDate;
        this.category = category;
        this.language = language;
        this.pages = pages;
        this.format = format;
        this.price = price;
        this.stock = stock;
        this.description = description;
    }

    public Book(int id, String title, String author, String publisher, Date publicationDate,
            String category, String language, int pages, String format,
            double price, int stock, String description) {
        this(title, author, publisher, publicationDate, category, language, pages, format, price, stock, description);
        this.id = id;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return String.format(
            "Book { id=%d, title='%s', author='%s', publisher='%s', publicationDate=%s, " +
            "category='%s', language='%s', pages=%d, format='%s', price=%.2f, stock=%d, description='%s' }",
            id, title, author, publisher, publicationDate,
            category, language, pages, format, price, stock, description
        );
    }
}

