package bookstore.project.filters;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
        try {
            HttpServletRequest req = (HttpServletRequest) request;
            HttpServletResponse res = (HttpServletResponse) response;
            HttpSession session = req.getSession(false);

            if (session == null || session.getAttribute("isConnected") == null) {
                res.sendRedirect(req.getContextPath() + "/connection");
                return;
            }

            chain.doFilter(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
