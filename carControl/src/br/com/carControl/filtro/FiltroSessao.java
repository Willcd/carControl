package br.com.carControl.filtro;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import br.com.carControlRest.dao.jpa.JPAConnection;

/**
 * Servlet Filter implementation class FiltroSessao
 */
public class FiltroSessao implements Filter {

    /**
     * Default constructor. 
     */
    public FiltroSessao() {
	// TODO Auto-generated constructor stub
    }

    /**
     * @see Filter#destroy()
     */
    public void destroy() {
	// TODO Auto-generated method stub
    }
    
    /**
     * @see Filter#init(FilterConfig)
     */
    
    public void init(FilterConfig fConfig) throws ServletException {
	// TODO Auto-generated method stub
    }

    /**
     * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
     */
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
	// TODO Auto-generated method stub
	// place your code here
	String context = request.getServletContext().getContextPath();

	try{
	    HttpSession session = ((HttpServletRequest) request).getSession();
	    String usuario = (String) session.getAttribute("login");
	  
	    if(usuario == null){
		session.setAttribute("msg", "Você não está logado no sistema!");
		((HttpServletResponse) response).sendRedirect(context+"/login.html");
		//((HttpServletResponse) response).sendRedirect(context+"/login.html");

	    }else{
		// pass the request along the filter chain
		chain.doFilter(request, response);	
		JPAConnection.closeEntityManager();
	    }
	}catch (Exception e){
	    e.printStackTrace();
	}
    }

   
}
