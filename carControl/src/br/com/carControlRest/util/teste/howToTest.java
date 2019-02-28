package br.com.carControlRest.util.teste;

import java.util.List;

import br.com.carControlRest.dao.AgendamentoDAO;
import br.com.carControlRest.dao.DAOFactory;
import br.com.carControlRest.dao.VeiculoDAO;
import br.com.carControlRest.pojo.po.Agendamento;
import br.com.carControlRest.pojo.po.Veiculo;

public class howToTest {

    public static void main(String[] args) {
	// TODO Auto-generated method stub
	//buscaVeiculoDisponivel();
	//testeAgendamento();
    }
    public static void testeAgendamento(Agendamento agendamento) {
	
	AgendamentoDAO agDAO = (AgendamentoDAO)DAOFactory.getInstanceOf(AgendamentoDAO.class);
	boolean b = agDAO.buscaPorUsuarioEPeriodoAgend(agendamento);
	System.out.println(b);
    }
    public static void buscaVeiculoDisponivel() {

	try{	
	    //Conexao conec = new Conexao();
	    //Connection conexao = conec.abrirConexao();
	    //JDBCVeiculoDAO jdbcVeiculoDao = new JDBCVeiculoDAO(conexao);
	    //List<Veiculo> listaVeiculo = jdbcVeiculoDao.buscaVeiculoDisponivel(placa);
	    //conec.fecharConexao();

	    
	    VeiculoDAO veiculoDAO = (VeiculoDAO)DAOFactory.getInstanceOf(VeiculoDAO.class);
	    List<Veiculo> listaVeiculo = veiculoDAO.buscaVeiculoDisponivel();
	    
	    for(Veiculo veiculo: listaVeiculo){
		System.out.println(veiculo.getId()+" ,  "+veiculo.getPlaca());
	    }

	} catch (Exception e) {
	    e.printStackTrace();
	}
    }
    public static void testePesquisaUsoDeVeiculoPorVeiculo(){
	
    }
}



