package br.com.carControlRest.dao.jpa;

import java.util.List;

import javax.persistence.Query;

import br.com.carControlRest.dao.VeiculoDAO;
import br.com.carControlRest.pojo.po.Veiculo;

public class JPAVeiculoDAO extends JPAAbstract<Veiculo> implements VeiculoDAO{

	@Override
	public String getEntityName(){
		return "Veiculo";
	}
	public List<Veiculo> buscar(String valorBusca){
		
		String hql = "from Veiculo v";
		if(!valorBusca.equals("null") && !valorBusca.equals("")){
			hql += " where placa like '"+valorBusca+"%'";
		}
		Query query = super.getQuery(hql);

		@SuppressWarnings("unchecked")
		List<Veiculo> listaVeiculo = query.getResultList();
		return listaVeiculo;	
	}
	 public List<Veiculo> buscaVeiculoDisponivel(){
		
	     String hql =  "select v from Veiculo v "
	     	+ "where v not in (select u.veiculo from UsoDeVeiculo u where u.dataHoraRetorno is null)";
			
		Query query = super.getQuery(hql);

		@SuppressWarnings("unchecked")
		List<Veiculo> listaVeiculo = query.getResultList();
		
		return listaVeiculo;
	    }
	
	
	
}
