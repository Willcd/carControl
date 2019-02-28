package br.com.carControlRest.rest;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.carControlRest.dao.AgendamentoDAO;
import br.com.carControlRest.dao.CondutorDAO;
import br.com.carControlRest.dao.DAOFactory;
import br.com.carControlRest.dao.UsoDeVeiculoDAO;
import br.com.carControlRest.dao.VeiculoDAO;
import br.com.carControlRest.pojo.po.Agendamento;
import br.com.carControlRest.pojo.po.Condutor;
import br.com.carControlRest.pojo.po.UsoDeVeiculo;
import br.com.carControlRest.pojo.po.Veiculo;
import br.com.carControlRest.pojo.vo.Pesquisa;
import br.com.carControlRest.pojo.vo.RetornoDeVeiculo;
import br.com.carControlRest.pojo.vo.SaidaDeVeiculo;

@Path("usoRest") // Caminho URI da classe Rest utilizada.
public class UsoDeVeiculoRest extends UtilRest {
    public UsoDeVeiculoRest() {  }
    @POST
    @Path("/addsaida")
    @Consumes("application/*")
    public Response registrarSaida(String saidaDeVeiculoParam, @Context HttpServletRequest request) {

	try {
	    int id = -1;
	    for (javax.servlet.http.Cookie cookie : request.getCookies()) {
		if (cookie.getName().equals("condutor"))
		    id = Integer.parseInt(cookie.getValue());
	    }
	    SaidaDeVeiculo saida = new ObjectMapper().readValue(saidaDeVeiculoParam, SaidaDeVeiculo.class);

	    Agendamento cunsultaDisp = new Agendamento();
	    cunsultaDisp.setDataHoraSaida(saida.getDataHoraSaida());
	    CondutorDAO condutorDAO = (CondutorDAO) DAOFactory.getInstanceOf(CondutorDAO.class);
	    Condutor condutor = condutorDAO.buscaPorId(id);
	    cunsultaDisp.setCondutor(condutor);
	    /*
	     * Restrição:
	     * Verificar se há agendamento do veiculo para outro usuario que não seja quem esta 
	     * retirando o veiculo no momento atual ate uma hora alem do horario de saida do veiculo. 
	     * Se houver, não registrar a saida do veiculo e emitir mensagem de erro.
	     */
	    AgendamentoDAO agendDAO = (AgendamentoDAO)DAOFactory.getInstanceOf(AgendamentoDAO.class);
	    boolean validarSaida = agendDAO.confirmaDisponibilidadeDoVeiculo(cunsultaDisp);
	    if(validarSaida){
		System.out.println("validação rest");
		UsoDeVeiculo usoDeVeiculo = new UsoDeVeiculo();
		usoDeVeiculo.setCondutor(condutor);

		VeiculoDAO veiculoDAO = (VeiculoDAO) DAOFactory.getInstanceOf(VeiculoDAO.class);
		Veiculo veiculo = veiculoDAO.buscaPorId(saida.getIdVeiculo());
		usoDeVeiculo.setKmInicio(veiculo.getKm());
		usoDeVeiculo.setVeiculo(veiculo);

		SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY-MM-DD'T'HH:MM:SS");
		dateFormat.setTimeZone(TimeZone.getTimeZone("America/Sao_Paulo"));

		usoDeVeiculo.setDataHoraSaida(saida.getDataHoraSaida());
		// salvar
		UsoDeVeiculoDAO usoDeVeiculoDAO = (UsoDeVeiculoDAO) DAOFactory.getInstanceOf(UsoDeVeiculoDAO.class);
		usoDeVeiculoDAO.inserir(usoDeVeiculo);

		System.out.println("saida ok ");

		return this.buildResponse("Saida registrada com sucesso.");

	    }else{
		System.out.println("nao valido");

		return this.buildResponse("Não foi possivel registrar saída.<br>"
			+ " Veiculo reservado para outro usuario em menos de 1 hora! ");

	    }
	} catch (Exception e) {
	    e.printStackTrace();
		System.out.println("erro");

	    return this.buildErrorResponse(e.getMessage());
	}

    }

    @POST
    @Path("/addRetorno")
    @Consumes("application/*")
    public Response registrarRetorno(String retornoParam) {

	try {
	    RetornoDeVeiculo retorno =  new ObjectMapper().readValue(retornoParam, RetornoDeVeiculo.class);

	    UsoDeVeiculoDAO usoDeVeiculoDAO = (UsoDeVeiculoDAO) DAOFactory.getInstanceOf(UsoDeVeiculoDAO.class); 
	    UsoDeVeiculo usoDeVeiculo = usoDeVeiculoDAO.buscaPorId(retorno.getIdUso());
	    SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY-MM-DD'T'HH:MM:SS");
	    dateFormat.setTimeZone(TimeZone.getTimeZone("America/Sao_Paulo"));


	    usoDeVeiculo.setDataHoraRetorno(retorno.getDataHoraRetorno());
	    usoDeVeiculo.setKmFim(retorno.getKmRetorno());
	    System.out.println(usoDeVeiculo.getKmFim());

	    VeiculoDAO veiculoDAO = (VeiculoDAO) DAOFactory.getInstanceOf(VeiculoDAO.class);
	    Veiculo veiculo = veiculoDAO.buscaPorId(usoDeVeiculo.getVeiculo().getId());
	    veiculo.setKm(usoDeVeiculo.getKmFim());
	    // salvar
	    veiculoDAO.alterar(veiculo);

	    UsoDeVeiculoDAO usoDeVeiculoDAO2 = (UsoDeVeiculoDAO) DAOFactory.getInstanceOf(UsoDeVeiculoDAO.class); 
	    usoDeVeiculoDAO2.alterar(usoDeVeiculo);

	    return this.buildResponse("Retorno registrado com sucesso.");

	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }

    @GET
    @Path("/buscaUsoDevolucaoPorIdUsuario/")
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public Response buscaUsoDevolucaoPorIdUsuario( @Context HttpServletRequest request) {

	int idCondutor = -1;
	for (javax.servlet.http.Cookie cookie : request.getCookies()) {
	    if (cookie.getName().equals("condutor"))
		idCondutor = Integer.parseInt(cookie.getValue());
	    System.out.println("idcondutor buscaUsoDevolucaoPorIdUsuario "+idCondutor);
	} 	    
	CondutorDAO condutorDAO = (CondutorDAO) DAOFactory.getInstanceOf(CondutorDAO.class);
	Condutor condutor = condutorDAO.buscaPorId(idCondutor);
	UsoDeVeiculoDAO usoDeVeiculoDAO = (UsoDeVeiculoDAO) DAOFactory.getInstanceOf(UsoDeVeiculoDAO.class);
	UsoDeVeiculo usoDeVeiculo = usoDeVeiculoDAO.buscaUsoEmAbertoPorUsuario(condutor.getId());

	return this.buildResponse(usoDeVeiculo);

    } 
    @GET
    @Path("/buscaUsoPorId/{id}")
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public Response buscaUsoPorId(@PathParam("id") int id) {
	System.out.println(id);
	
	//int id1 = Integer.parseInt(id);

	System.out.println(id);

	UsoDeVeiculoDAO usoDeVeiculoDAO = (UsoDeVeiculoDAO) DAOFactory.getInstanceOf(UsoDeVeiculoDAO.class);
	UsoDeVeiculo usoDeVeiculo = usoDeVeiculoDAO.buscaUsoPorId(id);
	
	System.out.println(usoDeVeiculo);
	return this.buildResponse(usoDeVeiculo);

    }
    @GET
    @Path("/buscaListaUsoDevolucao/")
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public Response buscaListaUsoDevolucao(@PathParam("id") int id, @Context HttpServletRequest request) {

	int idCondutor = -1;
	for (javax.servlet.http.Cookie cookie : request.getCookies()) {
	    if (cookie.getName().equals("condutor"))
		idCondutor = Integer.parseInt(cookie.getValue());
	} 	    
	CondutorDAO condutorDAO = (CondutorDAO) DAOFactory.getInstanceOf(CondutorDAO.class);
	Condutor condutor = condutorDAO.buscaPorId(idCondutor);
	if(condutor.getLoginCondutor().isAdm()==true){
	    System.out.println("UsoRest "+condutor.getLoginCondutor().isAdm());
	    List<UsoDeVeiculo> listaUsoDeVeiculo; 

	    UsoDeVeiculoDAO usoDeVeiculoDAO = (UsoDeVeiculoDAO) DAOFactory.getInstanceOf(UsoDeVeiculoDAO.class);
	    listaUsoDeVeiculo = usoDeVeiculoDAO.buscaListaUsoEmAberto();

	    return this.buildResponse(listaUsoDeVeiculo);

	}else{
	    return this.buildResponse(false);

	}
    }

    @GET
    @Path("/buscaVeiculoDisponivel/")
    @Consumes("application/*") 
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public Response buscaVeiculoDisponivel(String placaParam, @Context HttpServletRequest request) {

	try{	
	    VeiculoDAO veiculoDAO = (VeiculoDAO)DAOFactory.getInstanceOf(VeiculoDAO.class);
	    List<Veiculo> listaVeiculo = veiculoDAO.buscaVeiculoDisponivel();

	    return this.buildResponse(listaVeiculo);

	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }
    @POST
    @Path("/relatorioDeUso/")
    @Consumes("application/*") 
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public Response relatorioDeUso(String pesquisaUsoParam, @Context HttpServletRequest request) {

	try{	    
	    Pesquisa pesquisa = new ObjectMapper().readValue(pesquisaUsoParam, Pesquisa.class);

	    List<UsoDeVeiculo> listaUsoDeVeiculo; 
	    UsoDeVeiculoDAO usoDAO = (UsoDeVeiculoDAO)DAOFactory.getInstanceOf(UsoDeVeiculoDAO.class);
	    if(pesquisa.getTipoPesquisa()==1){
		listaUsoDeVeiculo = usoDAO.buscaPorCondutor(pesquisa);
	    }else{
		listaUsoDeVeiculo = usoDAO.buscaPorVeiculo(pesquisa);
	    }

	    return this.buildResponse(listaUsoDeVeiculo);

	} catch (Exception e) {
	    System.out.println("erro");
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}

    }

}