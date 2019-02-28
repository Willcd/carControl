package br.com.carControl.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import br.com.carControlRest.util.EncodeDecode;
import br.com.carControlRest.dao.CondutorDAO;
import br.com.carControlRest.dao.DAOFactory;
import br.com.carControlRest.pojo.po.Condutor;



/**
 * Servlet implementation class LoginServlet
 */
//@WebServlet(urlPatterns = "/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
	super();
	// TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	String usuario = request.getParameter("usuario");
	String senha = request.getParameter("senha");
	EncodeDecode ed = new EncodeDecode();

	String senha64 = ed.encode64(senha);    
	String senhaMD5 = ed.md5(senha64);
	String sSalt = ed.salt(senhaMD5, senha);
	System.out.println(senha64);
	System.out.println(senhaMD5);
	System.out.println(sSalt);
	System.out.println(senha);
	//login
	Condutor condutorLogin = new Condutor();
	try{
	    CondutorDAO condutorDao = (CondutorDAO)DAOFactory.getInstanceOf(CondutorDAO.class);
	    condutorLogin = condutorDao.condutorLogin(usuario, senhaMD5, sSalt);
	    String context = request.getServletContext().getContextPath();

	    if(condutorLogin.getNome()!=null){
		System.out.println("LoginServlet: " +condutorLogin.getNome());

		HttpSession sessao = request.getSession();

		sessao.setAttribute("login", "usuario");

		Cookie cookie = new Cookie("condutor",String.valueOf(condutorLogin.getId()));
		response.addCookie(cookie);	

		response.sendRedirect(context+"/resources/index.html");



	    } else{
		response.sendRedirect("http://localhost:8080/carControl/");
		//response.sendRedirect(context+"/login.html");

	    }
	} catch (Exception e) {
	    e.printStackTrace();
	}
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
