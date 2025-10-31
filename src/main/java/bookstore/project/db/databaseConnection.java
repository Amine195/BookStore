package bookstore.project.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    public static final String dbUrl = "jdbc:mysql://mysql-bded6365885.alwaysdata.net:3306/bded6365885_tpdevweb";
    public static final String dbUserName = "426550_gzltmn";
    public static final String dbPassword = "bdebanalyste";
    
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
}
