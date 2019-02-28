package br.com.carControlRest.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.carControlRest.dao.CondutorDAO;
import br.com.carControlRest.dao.DAOFactory;
import br.com.carControlRest.pojo.po.Condutor;
import br.com.carControlRest.pojo.po.LoginCondutor;
import br.com.carControlRest.util.EncodeDecode;

@Path("condutorRest") // Caminho URI da classe Rest utilizada.

public class CondutorRest extends UtilRest {

    public CondutorRest() {
    }
    @POST // Processará as requisições enviadas pelo método post.
    @Path("/addCondutor") // Caminho URI do método da classe que receberá os dados do formulário que os armazenará em sua respectiva classe e os incluirá no banco de dados.						
    @Consumes("application/*") // Caminho URI que identifica o tipo de mídia enviado pelo lado cliente, no caso, informações do formulário no formato de aplicação.							 
    public Response addCondutor( String condutorParam) {

	System.out.println("addContatoRest");
	try {/* Instancia a classe ObjectMapper e chama o método readValue() leitura dos valores repassados pelo cliente no formato JSON, 
	 * atribui os valores aos atributos da classe (devem obritoriamente ter o mesmo nome dos atributos da classe Java correspondente) */

	    Condutor condutor = new ObjectMapper().readValue(condutorParam, Condutor.class);
	    System.out.println("addContatoRest-2");

	    EncodeDecode ed = new EncodeDecode();
	    String senha = ed.decode64(condutor.getLoginCondutor().getSenha());
	    String smd5 = ed.md5(condutor.getLoginCondutor().getSenha());
	    condutor.getLoginCondutor().setSenha(smd5);
	    condutor.getLoginCondutor().setSal(ed.salt(smd5, senha));

	    System.out.println("addContatoRest-3");


	    CondutorDAO cDAO = (CondutorDAO)DAOFactory.getInstanceOf(CondutorDAO.class);
	    cDAO.inserir(condutor);
	    System.out.println("addContatoRest-4");

	    return this.buildResponse("Condutor cadastrado com sucesso.");
	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }
    @GET
    @Path("/buscaCondutorPorNome/{nome}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response buscaCondutorPorNome(@PathParam("nome") String nome){
	System.out.println(nome);
	try{
	    List<Condutor> condutores = new ArrayList<Condutor>();
	    CondutorDAO condutor = (CondutorDAO)DAOFactory.getInstanceOf(CondutorDAO.class);
	    condutores = condutor.buscaCondutorPorNome(nome);

	    return this.buildResponse(condutores);
	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }
    @DELETE
    @Path("/deletarCondutor/{id}")
    @Consumes("application/*")
    public Response deletarCondutor(@PathParam("id") int id){
	try{
	    CondutorDAO cDao = (CondutorDAO)DAOFactory.getInstanceOf(CondutorDAO.class);
	    Condutor c =cDao.buscaPorId(id);
	    cDao.remover(c);
	    return this.buildResponse("Condutor excluido com sucesso. ");
	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}	
    }
    @GET
    @Path("/buscaPorId/{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response buscaCondutorPorId(@PathParam("id") int id){
	try{
	    CondutorDAO cDao = (CondutorDAO)DAOFactory.getInstanceOf(CondutorDAO.class);

	    Condutor condutor = cDao.buscaPorId(id);

	    return this.buildResponse(condutor);
	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }
    @PUT
    @Path("/editarCondutor/")
    @Consumes("application/*")
    public Response editarCondutor(String condutorParam,String loginCondutorParam){
	try{
	    LoginCondutor loginCondutor = new ObjectMapper().readValue(loginCondutorParam, LoginCondutor.class);
	    EncodeDecode ed = new EncodeDecode();
	    String senha = ed.decode64(loginCondutor.getSenha());
	    String smd5 = ed.md5(loginCondutor.getSenha());
	    loginCondutor.setSenha(smd5);
	    loginCondutor.setSal(ed.salt(smd5, senha));

	    Condutor condutor = new ObjectMapper().readValue(condutorParam, Condutor.class);
	    condutor.setLoginCondutor(loginCondutor);


	    CondutorDAO ecDao = (CondutorDAO)DAOFactory.getInstanceOf(CondutorDAO.class);
	    ecDao.alterar(condutor);

	    return this.buildResponse(condutor);
	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }
    @GET
    @Path("/buscaLogin/")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response buscaLogin(@Context HttpServletRequest request){


	System.out.println("buscaLogin");
	int condutorId = -1;
	for (javax.servlet.http.Cookie cookie : request.getCookies()) {
	    if (cookie.getName().equals("condutor"))
		condutorId = Integer.parseInt(cookie.getValue());
	}
	System.out.println(condutorId);
	try{
	    CondutorDAO cDao = (CondutorDAO)DAOFactory.getInstanceOf(CondutorDAO.class);

	    Condutor condutor = cDao.buscaPorId(condutorId);
	    System.out.println(condutor.getNome());

	    return this.buildResponse(condutor);
	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }

}
