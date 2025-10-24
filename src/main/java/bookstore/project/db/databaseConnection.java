package bookstore.project.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class databaseConnection {
    public static final String dbUrl = "jdbc:mysql://localhost:3306/bookstore";
    public static final String dbUserName = "root";
    public static final String dbPassword = "root";
    
    public static Connection getConnection() {
        System.out.println("Start getConnection");
        
        try {
            // Load MySql JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Open Connection
            connection = DriverManager.getConnection(dbUrl, dbUserName, dbPassword);
            
            if(connection != null) {
                System.out.println("Connected");
                return connection;
            } else {
                System.out.println("Connection Issue");
                return null;
            }
            
        } catch (Exception e) {
            System.out.println("Exception in DB Connection ==> " + e.getMessage());
            e.printStackTrace();
            return null;
        }

    }
    
    public static Connection connection = getConnection();
    
    public static void main(String[] args) {
        System.out.println(databaseConnection.connection);
    }
}
