package bookstore.project.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    public static final String dbUrl = "jdbc:mysql://localhost:3306/bookstore";
    public static final String dbUserName = "root";
    public static final String dbPassword = "root";
    
    private static DatabaseConnection instance;
    private Connection connection;
    
    private DatabaseConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(dbUrl, dbUserName, dbPassword);
            System.out.println("Database connected successfully: " + dbUrl);
            
        } catch (ClassNotFoundException e) {
            System.err.println("JDBC Driver not found: " + e.getMessage());
            throw new RuntimeException(e);
            
        } catch (SQLException e) {
            System.err.println("Database connection failed: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
    
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
    
    public Connection getConnection() {
        return connection;
    }

    public static void main(String[] args) {
        DatabaseConnection.getInstance().getConnection();
    }
}
