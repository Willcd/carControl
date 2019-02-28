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

import br.com.carControlRest.dao.AbastecimentoDAO;
import br.com.carControlRest.dao.VeiculoDAO;
import br.com.carControlRest.pojo.po.Abastecimento;
import br.com.carControlRest.pojo.po.Condutor;
import br.com.carControlRest.pojo.po.UsoDeVeiculo;
import br.com.carControlRest.pojo.po.Veiculo;
import br.com.carControlRest.pojo.vo.Abastec;
import br.com.carControlRest.pojo.vo.Pesquisa;
import br.com.carControlRest.dao.CondutorDAO;
import br.com.carControlRest.dao.DAOFactory;
import br.com.carControlRest.dao.UsoDeVeiculoDAO;

@Path("abastecimentoRest")
public class AbastecimentoRest extends UtilRest {

    public AbastecimentoRest() {}

    @POST
    @Path("/addAbastecimento")
    @Consumes("application/*")
    public Response inserirAbastecimento(String abastecParam, @Context HttpServletRequest request){	
	try {
	    Abastec abastec  = new ObjectMapper().readValue(abastecParam, Abastec.class);
	    Abastecimento abastecimento = new Abastecimento();
	    VeiculoDAO veiculoDAO = (VeiculoDAO)DAOFactory.getInstanceOf(VeiculoDAO.class);
	    Veiculo veiculo = veiculoDAO.buscaPorId(abastec.getIdVeiculo());
	    abastecimento.setVeiculo(veiculo);

	    int id = -1;
	    for (javax.servlet.http.Cookie cookie : request.getCookies()) {
		if (cookie.getName().equals("condutor"))
		    id = Integer.parseInt(cookie.getValue());
	    }	
	    /* Validação
	     * if ( nf ja cadastrada )
	     * não inserir abastecimento
	     * retornar mensagem de erro
	     */
	    CondutorDAO condutorDAO = (CondutorDAO)DAOFactory.getInstanceOf(CondutorDAO.class);
	    Condutor condutor = condutorDAO.buscaPorId(id);
	    abastecimento.setCondutor(condutor);
	    abastecimento.setValorPg(abastec.getValorPg());
	    abastecimento.setPrecoLt(abastec.getPrecoLt());
	    abastecimento.setVolume(abastec.getVolume());
	    abastecimento.setTipoCombust(abastec.getTipoCombust());
	    abastecimento.setNf(abastec.getNf());
	    abastecimento.setDataHoraAbastec(abastec.getDataHoraAbastec());
	    abastecimento.setKm(abastec.getKm());

	    AbastecimentoDAO abastecimentoDAO = (AbastecimentoDAO)DAOFactory.getInstanceOf(AbastecimentoDAO.class);
	    abastecimentoDAO.inserir(abastecimento);

	    return this.buildResponse("Abastecimento registrado com sucesso.");
	} catch (Exception e) {
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}
    }
    @POST
    @Path("/relatorioDeAbastecimento/")
    @Consumes("application/*") 
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public Response relatorioDeAbastecimento(String pesquisaParam) {

	List<Abastecimento> listaAbastecimento; 
	try{	    
	    Pesquisa pesquisa = new ObjectMapper().readValue(pesquisaParam, Pesquisa.class);

	    AbastecimentoDAO abastecimentoDAO = (AbastecimentoDAO)DAOFactory.getInstanceOf(AbastecimentoDAO.class);
	    System.out.println(pesquisa.getTipoPesquisa()+"tipopesquisaRest");
	    if(pesquisa.getTipoPesquisa()==1){
		listaAbastecimento = abastecimentoDAO.buscaPorCondutor(pesquisa);
	    }else{

		listaAbastecimento = abastecimentoDAO.buscaPorVeiculo(pesquisa);
	    }

	    return this.buildResponse(listaAbastecimento);

	} catch (Exception e) {
	    System.out.println("erro");
	    e.printStackTrace();
	    return this.buildErrorResponse(e.getMessage());
	}

    }

}