package br.com.carControlRest.dao.jpa;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;
import javax.persistence.TemporalType;


import br.com.carControlRest.dao.UsoDeVeiculoDAO;
import br.com.carControlRest.pojo.po.Condutor;
import br.com.carControlRest.pojo.po.UsoDeVeiculo;
import br.com.carControlRest.pojo.vo.Pesquisa;

public class JPAUsoDeVeiculoDAO extends JPAAbstract<UsoDeVeiculo> implements UsoDeVeiculoDAO {

    @Override
    public String getEntityName() {
	return "UsoDeVeiculo";
    }
    public UsoDeVeiculo buscaUsoEmAbertoPorUsuario(int id){

	StringBuilder hql = new StringBuilder("from UsoDeVeiculo u ");
	hql.append("join fetch ");
	hql.append("u.condutor as c ");
	hql.append("where ");
	hql.append("u.dataHoraRetorno = null ");
	hql.append("and ");
	hql.append("c.id = :id");

	Query query = getEntityManager().createQuery(hql.toString());
	query.setParameter("id", id);
	
	//query.setMaxResults(1);

	List<UsoDeVeiculo> list = query.getResultList();
	for(UsoDeVeiculo u:list){
	    return  u;
	}
	return null;

    }
    public UsoDeVeiculo buscaUsoPorId(int id){

	StringBuilder hql = new StringBuilder("from UsoDeVeiculo u ");
	hql.append("where ");
	hql.append("u.id = :id");
	
	Query query = getEntityManager().createQuery(hql.toString());
	query.setParameter("id", id);
	@SuppressWarnings("unchecked")
	List<UsoDeVeiculo> list = query.getResultList();
	for(UsoDeVeiculo u:list){
	    return  u;
	}
	return null;

    }
    public List<UsoDeVeiculo> buscaPorCondutor(Pesquisa pesquisa){

	Timestamp datai = pesquisa.getDataInicial();
	Timestamp dataf = pesquisa.getDataFinal();

	int id = pesquisa.getIdCondutor();

	StringBuilder hql = new StringBuilder("from UsoDeVeiculo u ");
	hql.append("join fetch ");
	hql.append("u.condutor as c ");
	hql.append("where u.dataHoraSaida between :datai and :dataf ");
	hql.append("and c.id = :id");

	Query query = getEntityManager().createQuery(hql.toString());
	query.setParameter("id", id);
	query.setParameter("datai", datai);
	query.setParameter("dataf",dataf);

	List<UsoDeVeiculo> listaUsoDeVeiculo = query.getResultList();

	return listaUsoDeVeiculo;
    }

    public List<UsoDeVeiculo> buscaPorVeiculo(Pesquisa pesquisa){

	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	java.sql.Timestamp datai = (Timestamp) pesquisa.getDataInicial();
	java.sql.Timestamp dataf = (Timestamp) pesquisa.getDataFinal();

	int id = pesquisa.getIdVeiculo();

	StringBuilder hql = new StringBuilder("from UsoDeVeiculo u ");
	hql.append("join fetch ");
	hql.append("u.veiculo as v ");
	hql.append("where ");
	hql.append("v.id = :id ");
	hql.append(" and u.dataHoraSaida between :datai and :dataf");

	Query query = getEntityManager().createQuery(hql.toString());
	query.setParameter("id", id);
	query.setParameter("datai", datai);
	query.setParameter("dataf",dataf);

	List<UsoDeVeiculo> listaUsoDeVeiculo = query.getResultList();
	return listaUsoDeVeiculo;
    }
    public List<UsoDeVeiculo> buscaListaUsoEmAberto(){

	StringBuilder hql = new StringBuilder("from UsoDeVeiculo u ");
	hql.append("join fetch ");
	hql.append("u.condutor as c ");
	hql.append("where ");
	hql.append("u.dataHoraRetorno = null ");

	Query query = getEntityManager().createQuery(hql.toString());

	List<UsoDeVeiculo> listaUsoDeVeiculo = query.getResultList();
	return listaUsoDeVeiculo;
    }

}