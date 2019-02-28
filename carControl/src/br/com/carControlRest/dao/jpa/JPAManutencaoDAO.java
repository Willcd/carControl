package br.com.carControlRest.dao.jpa;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.persistence.Query;
import br.com.carControlRest.dao.AbastecimentoDAO;
import br.com.carControlRest.dao.ManutencaoDAO;
import br.com.carControlRest.pojo.po.Abastecimento;
import br.com.carControlRest.pojo.po.Manutencao;
import br.com.carControlRest.pojo.po.UsoDeVeiculo;
import br.com.carControlRest.pojo.vo.Pesquisa;


    public class JPAManutencaoDAO extends JPAAbstract<Manutencao> implements ManutencaoDAO {

	    @Override
	    public String getEntityName(){
		return "Manutencao";
	    }

	    public List<Manutencao> buscaPorCondutor(Pesquisa pesquisa){
		
	   	Timestamp datai = pesquisa.getDataInicial();
	   	Timestamp dataf = pesquisa.getDataFinal();
	   	String tipoServico = pesquisa.getTipoServico();

	   	int id = pesquisa.getIdCondutor();
	   	
	   	StringBuilder hql = new StringBuilder("from Manutencao m ");
	   	hql.append("join fetch ");
	   	hql.append("m.condutor as c ");
	   	hql.append("where c.id = :id");
	   	hql.append(" and m.dataServico between :dti and :dtf");
	   	if(pesquisa.getTipoServico() != ""){
	   	    hql.append(" and m.tipoServico like :ts ");
	   	}
	   	Query query = getEntityManager().createQuery(hql.toString());
	   	query.setParameter("id", id);
	   	query.setParameter("dti", datai);
	   	query.setParameter("dtf",dataf);
	   	if(pesquisa.getTipoServico() != ""){
	   	 query.setParameter("ts",tipoServico);
		   	
	   	}
	   	
	   	List<Manutencao> listaServico = query.getResultList();

	   	return listaServico;
	       }
	    	//errado
	       public List<Manutencao> buscaPorVeiculo(Pesquisa pesquisa){

	   	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	   	java.sql.Timestamp datai = (Timestamp) pesquisa.getDataInicial();
	   	java.sql.Timestamp dataf = (Timestamp) pesquisa.getDataFinal();
	   	String tipoServico = pesquisa.getTipoServico();


	   	int id = pesquisa.getIdVeiculo();

	   	StringBuilder hql = new StringBuilder("from Manutencao m ");
	   	hql.append("join fetch ");
	   	hql.append("m.veiculo as v ");
	   	hql.append("where ");
	   	hql.append("v.id = :id ");
	   	hql.append(" and m.dataServico between :dti and :dtf");
	   	if(pesquisa.getTipoServico() != ""){
	   	    hql.append(" and m.tipoServico like :ts ");
	   	}
	   	Query query = getEntityManager().createQuery(hql.toString());
	   	query.setParameter("id", id);
	   	query.setParameter("dti", datai);
	   	query.setParameter("dtf",dataf);
	   	if(pesquisa.getTipoServico() != ""){
		   	query.setParameter("ts",tipoServico);
	   	}
	   	
	   	List<Manutencao> listaServico = query.getResultList();
	   	return listaServico;
	       }

    
    
}
