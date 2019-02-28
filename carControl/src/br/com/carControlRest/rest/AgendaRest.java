package br.com.carControlRest.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.carControlRest.dao.AgendamentoDAO;
import br.com.carControlRest.dao.CondutorDAO;
import br.com.carControlRest.dao.DAOFactory;
import br.com.carControlRest.dao.VeiculoDAO;
import br.com.carControlRest.pojo.po.Agendamento;
import br.com.carControlRest.pojo.po.Condutor;
import br.com.carControlRest.pojo.po.Veiculo;
import br.com.carControlRest.pojo.vo.Agend;

@Path("agendarest")
public class AgendaRest extends UtilRest {

    public AgendaRest() {}
    @POST
    @Path("/appointment/")
    @Consumes("application/*")
    public Response inserirAgendamento(String agendParam, @Context HttpServletRequest request){	
	try {
	    Agend agend = new ObjectMapper().readValue(agendParam, Agend.class);
	    Agendamento agendamento = new Agendamento();
	    agendamento.setDataHoraSaida(agend.getDataHoraSaida());
	    agendamento.setDataHoraRetorno(agend.getDataHoraRetorno());
	    agendamento.setObs(agend.getObs());

	    int id = -1;
	    for (javax.servlet.http.Cookie cookie : request.getCookies()) {
		if (cookie.getName().equals("condutor"))
		    id = Integer.parseInt(cookie.getValue());
	    }	
	    /*
	     * Restrições
	     * 1 - Um veiculo não pode ser agendado por dois condutores no mesmo horario
	     * 2 - Um condutor não pode agendar dois veiculos para o mesmo horario
	     */
	    CondutorDAO condutorDAO = (CondutorDAO) DAOFactory.getInstanceOf(CondutorDAO.class);
	    Condutor condutor = condutorDAO.buscaPorId(id);
	    agendamento.setCondutor(condutor);

	    VeiculoDAO veiculoDAO = (VeiculoDAO) DAOFactory.getInstanceOf(VeiculoDAO.class);
	    Veiculo veiculo = veiculoDAO.buscaPorId(agend.getIdVeiculo());
	    agendamento.setVeiculo(veiculo);

	    AgendamentoDAO agendamentoDAO = (AgendamentoDAO) DAOFactory.getInstanceOf(AgendamentoDAO.class);
	    boolean condutorBoolean = agendamentoDAO.buscaPorUsuarioEPeriodoAgend(agendamento);
	    System.out.println(condutorBoolean);
	    if(condutorBoolean){
		boolean veiculoBoolean = agendamentoDAO.buscaPorVeiculoEPeriodoAgend(agendamento);
		if(veiculoBoolean){
		    System.out.println("agendamento ok");
		    agendamentoDAO.inserir(agendamento);
		}else{
		    System.out.println("veiculo ja agendado");
		    return this.buildResponse("Veiculo possue agendamento para esse intervalo de tempo."
			    + "<br>"
			    + "Selecione outro veiculo.");
		}
	    }else{
		System.out.println("condutor com agendamento");
		return this.buildResponse("Não é possivel agendar veiculo."
			+ "<br>"
			+ " Condutor possue agendamento para esse intervalo de tempo.");
	    }   
	    return this.buildResponse("Agendamento registrado com sucesso.");
	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }
    @GET
    @Path("/buscaListaDeAgendamento/")
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public Response buscaListaDeAgendamento() {

	AgendamentoDAO agendDAO = (AgendamentoDAO)DAOFactory.getInstanceOf(AgendamentoDAO.class);
	List<Agendamento> listaDeAgendamento = 	agendDAO.buscaLista();

	return this.buildResponse(listaDeAgendamento);
    }
    @DELETE
    @Path("/removerAgendamento/{idAgend}")
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public Response removerAgendamento(@PathParam("idAgend")int idAgend,  @Context HttpServletRequest request) {
	/*
	 * Restrições
	 * Apenas o usuario que fez o agendamento pode remover o mesmo
	 */
	int id = -1;
	for (javax.servlet.http.Cookie cookie : request.getCookies()) {
	    if (cookie.getName().equals("condutor"))
		id = Integer.parseInt(cookie.getValue());
	}

	CondutorDAO condutorDAO = (CondutorDAO) DAOFactory.getInstanceOf(CondutorDAO.class);
	Condutor condutor = condutorDAO.buscaPorId(id);

	AgendamentoDAO agendDAO = (AgendamentoDAO)DAOFactory.getInstanceOf(AgendamentoDAO.class);
	Agendamento ag = agendDAO.buscaPorId(idAgend);

	if(ag.getCondutor().getId() == id || condutor.getLoginCondutor().isAdm() == true){
	    agendDAO.remover(ag);
	    return this.buildResponse("Agendamento removido com sucesso.");	
	}else{
	    return this.buildResponse("Remoção de agendamento não autorizado. Solicite a um administrador ou ao responsavel pelo agendamento");
	}	
    }
}
