package br.com.carControlRest.dao.jpa;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Query;

import br.com.carControlRest.dao.AbastecimentoDAO;
import br.com.carControlRest.pojo.po.Abastecimento;
import br.com.carControlRest.pojo.vo.Pesquisa;

public class JPAAbastecimentoDAO extends JPAAbstract<Abastecimento> implements AbastecimentoDAO {

    @Override
    public String getEntityName(){
	return "Abastecimento";
    }

    public List<Abastecimento> buscaPorCondutor(Pesquisa pesquisa){

	Timestamp datai = pesquisa.getDataInicial();
	Timestamp dataf = pesquisa.getDataFinal();
	int id = pesquisa.getIdCondutor();

	System.out.println("teste "+id+" "+datai+" "+dataf);

	StringBuilder hql = new StringBuilder("from Abastecimento a ");
	hql.append("join fetch ");
	hql.append("a.condutor as c ");
	hql.append("where c.id = :id");
	hql.append(" and a.dataHoraAbastec between :datai and :dataf");

	Query query = getEntityManager().createQuery(hql.toString());
	query.setParameter("id", id);
	query.setParameter("datai", datai);
	query.setParameter("dataf",dataf);
	@SuppressWarnings("unchecked")
	List<Abastecimento> listaAbastecimento = query.getResultList();

	return listaAbastecimento;
    }

    public List<Abastecimento> buscaPorVeiculo(Pesquisa pesquisa){

	//SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	Timestamp datai = (Timestamp) pesquisa.getDataInicial();
	Timestamp dataf = (Timestamp) pesquisa.getDataFinal();

	int id = pesquisa.getIdVeiculo();

	StringBuilder hql = new StringBuilder("from Abastecimento a ");
	hql.append("join fetch ");
	hql.append("a.veiculo as v ");
	hql.append("where ");
	hql.append("v.id = :id ");
	hql.append(" and a.dataHoraAbastec between :datai and :dataf");

	Query query = getEntityManager().createQuery(hql.toString());
	query.setParameter("id", id);
	query.setParameter("datai", datai);
	query.setParameter("dataf",dataf);

	@SuppressWarnings("unchecked")
	List<Abastecimento> listaAbastecimento = query.getResultList();
	return listaAbastecimento;
    }

}
