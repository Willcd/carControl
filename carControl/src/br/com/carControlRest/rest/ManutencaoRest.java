package br.com.carControlRest.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.carControlRest.dao.CondutorDAO;
import br.com.carControlRest.dao.DAOFactory;
import br.com.carControlRest.dao.ManutencaoDAO;
import br.com.carControlRest.dao.VeiculoDAO;
import br.com.carControlRest.pojo.po.Condutor;
import br.com.carControlRest.pojo.po.Manutencao;
import br.com.carControlRest.pojo.po.Veiculo;
import br.com.carControlRest.pojo.vo.ManutencaoVO;
import br.com.carControlRest.pojo.vo.Pesquisa;

@Path("manutencaoRest")
public class ManutencaoRest extends UtilRest {

    public ManutencaoRest() {}

    @POST
    @Path("/addServico")
    @Consumes("application/*")
    public Response inserirServico(String servicoVOParam, @Context HttpServletRequest request){	
	try {
	    ManutencaoVO manutencaoVO  = new ObjectMapper().readValue(servicoVOParam, ManutencaoVO.class);
	    Manutencao manutencao = new Manutencao();
	    VeiculoDAO veiculoDAO = (VeiculoDAO)DAOFactory.getInstanceOf(VeiculoDAO.class);
	    Veiculo veiculo = veiculoDAO.buscaPorId(manutencaoVO.getIdVeiculo());		    
	    manutencao.setVeiculo(veiculo);
	    
	    int id = -1;
	    for (javax.servlet.http.Cookie cookie : request.getCookies()) {
		if (cookie.getName().equals("condutor"))
		    id = Integer.parseInt(cookie.getValue());
	    }	
	    
	    CondutorDAO condutorDAO = (CondutorDAO)DAOFactory.getInstanceOf(CondutorDAO.class);
	    Condutor condutor = condutorDAO.buscaPorId(id);
	    manutencao.setCondutor(condutor);
	    manutencao.setCustoPecas(manutencaoVO.getCustoPecas());
	    manutencao.setMaoDeObra(manutencaoVO.getMaoDeObra());
	    manutencao.setValorTotal(manutencaoVO.getValorTotal());
	    manutencao.setTipoServico(manutencaoVO.getTipoServico());
	    manutencao.setDataServico(manutencaoVO.getDataServico());
	    manutencao.setKm(manutencaoVO.getKm());
	    manutencao.setDescritivo(manutencaoVO.getDescritivo());
	    manutencao.setNf(manutencaoVO.getNf());
	    
	    ManutencaoDAO manutencaoDAO = (ManutencaoDAO)DAOFactory.getInstanceOf(ManutencaoDAO.class);
	    manutencaoDAO.inserir(manutencao);
	    
	    return this.buildResponse("Manutenção registrada com sucesso.");
	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }
   
    @POST
    @Path("/relatorioDeManutencao/")
    @Consumes("application/*") 
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public Response relatorioDeManutencao(String pesquisaParam) {

	List<Manutencao> listaManutencao; 
	try{	    
	    Pesquisa pesquisa = new ObjectMapper().readValue(pesquisaParam, Pesquisa.class);

	    ManutencaoDAO manutencaoDAO = (ManutencaoDAO)DAOFactory.getInstanceOf(ManutencaoDAO.class);
	    if(pesquisa.getTipoPesquisa()==1){
		listaManutencao = manutencaoDAO.buscaPorCondutor(pesquisa);
	    }else{

		listaManutencao = manutencaoDAO.buscaPorVeiculo(pesquisa);
	    }

	    return this.buildResponse(listaManutencao);

	} catch (Exception e) {
	    System.out.println("erro");
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }
}