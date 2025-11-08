package bookstore.project.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AuthController extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) {
        String action = request.getPathInfo();
        
        switch(action) {
            case "/login":
                login(request, response);
                break;
                
            case "/logout":
                logout(request, response);
                break;
                
            default:
                logout(request, response);
                break;
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        processRequest(request, response);
    }
    
    private void login(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");

        try
        {
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            Gson gson = new Gson();
            JsonObject json = gson.fromJson(sb.toString(), JsonObject.class);
            
            String username = json.get("username").getAsString();
            String password = json.get("password").getAsString();
            boolean isAdmin = json.get("isAdmin").getAsBoolean();

            boolean isValid = "asdf".equals(password);
            
            if(isValid) {
                HttpSession session = request.getSession(true);
                session.setAttribute("username", username);
                session.setAttribute("role", isAdmin ? "ADMIN" : "USER");
                session.setAttribute("isConnected", true);
            }
            
            String jsonResponse = gson.toJson(isValid);
            response.getWriter().write(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
        }   
    }
            
    private void logout(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");
        
        try {
            HttpSession session = request.getSession(false);
            
            Gson gson = new Gson();
            JsonObject jsonResponse = new JsonObject();

            if (session != null) {
                session.invalidate();
                jsonResponse.addProperty("success", true);
                
            } else {
                jsonResponse.addProperty("success", false);
            }

            response.getWriter().write(gson.toJson(jsonResponse));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
