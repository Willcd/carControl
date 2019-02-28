package br.com.carControlRest.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.carControlRest.dao.DAOFactory;
import br.com.carControlRest.dao.VeiculoDAO;
import br.com.carControlRest.pojo.po.Veiculo;

@Path("veiculoRest") // Caminho URI da classe Rest utilizada.

public class VeiculoRest extends UtilRest {

	public VeiculoRest(){}
	@POST 
	@Path("/addVeiculo") 
	@Consumes("application/*") 
	public Response inserir(String veiculoParam) {
		try {/* Instancia a classe ObjectMapper e chama o método readValue() leitura dos valores repassados pelo cliente no formato JSON, no caso os campos do formulário e atribui os valores destes campos aos atributos da classe Contato. Os valores obtidos do formulario são armazenos em atributos javascript,esses atributos por sua vez devem obritoriamente ter o mesmo nome dos atributos da classe 
		 * Java correspondente Com isso é possivel a realização de um "de-para" dos valores contidos no objeto JSON (contatoParam) para um objeto da classe Contato. Aqui, importante observação de que o nome dos atributos declarados na classe, que irão receber os valores dos campos do formulário, sejam declarados de maneira identica ao nome dos campos do formulário que enviará seus valores. */

			Veiculo veiculo = new ObjectMapper().readValue(veiculoParam, Veiculo.class);
			VeiculoDAO veiculoDAO = (VeiculoDAO)DAOFactory.getInstanceOf(VeiculoDAO.class);
			veiculoDAO.inserir(veiculo);
			
			return this.buildResponse("Veículo cadastrado com sucesso.");
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/buscaVeiculoPorPlaca/{valorBusca}")	
	@Consumes("application/*")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscaVeiculoPorPlaca(@PathParam("valorBusca") String valorBusca){
		
		VeiculoDAO veiculoDAO = (VeiculoDAO)DAOFactory.getInstanceOf(VeiculoDAO.class);
		List<Veiculo> listaVeiculo = veiculoDAO.buscar(valorBusca);

		return this.buildResponse(listaVeiculo);
	}
	@DELETE
	@Path("/deletarVeiculo/{id}")
	@Consumes("application/*")
	public Response deletarVeiculo(@PathParam("id") int id){
		
		VeiculoDAO veiculoDao = (VeiculoDAO)DAOFactory.getInstanceOf(VeiculoDAO.class);
		Veiculo veiculoRem = veiculoDao.buscaPorId(id);
		veiculoDao.remover(veiculoRem);
		//Veiculo deletado com sucesso. 
		return this.buildResponse("Veiculo removido com sucesso! ");

	}	
	@GET
	@Path("/buscaPorId/{id}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscaPorId(@PathParam("id") int id){
		
		VeiculoDAO vd = (VeiculoDAO)DAOFactory.getInstanceOf(VeiculoDAO.class);
		Veiculo vId = vd.buscaPorId(id);
		return this.buildResponse(vId);
	}
	@PUT
	@Path("/editarVeiculo/")
	@Consumes("application/*")
	public Response editarVeiculo(String veiculoParam){
		
		try{

			Veiculo vEdit = new ObjectMapper().readValue(veiculoParam, Veiculo.class);
			VeiculoDAO veiculoDao = (VeiculoDAO)DAOFactory.getInstanceOf(VeiculoDAO.class);
			veiculoDao.alterar(vEdit);

			return this.buildResponse(vEdit);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());		
		}	
	}

}
