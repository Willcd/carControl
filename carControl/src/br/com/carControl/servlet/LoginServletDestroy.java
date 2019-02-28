package br.com.carControl.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class LoginServletDestroy
 */
//@WebServlet(urlPatterns = "/LoginServletDestroy")
public class LoginServletDestroy extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServletDestroy() {
	super();
	// TODO Auto-generated constructor stub
    }
    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	System.out.println("logout");

	
	HttpSession sessao = request.getSession();
	sessao.invalidate();
	response.sendRedirect("http://localhost:8080/carControl/");


    }

    /**
     * @see Servlet#destroy()
     */
    public void destroy() {
	// TODO Auto-generated method stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// TODO Auto-generated method stub
	process(request, response);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// TODO Auto-generated method stub
	process(request, response);
    }


}
