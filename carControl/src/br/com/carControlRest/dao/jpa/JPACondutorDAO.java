package br.com.carControlRest.dao.jpa;

import java.util.List;

import javax.persistence.Query;

import br.com.carControlRest.dao.CondutorDAO;
import br.com.carControlRest.pojo.po.Condutor;

public class JPACondutorDAO extends JPAAbstract<Condutor> implements CondutorDAO {

    @Override
    public String getEntityName() {
	return "Condutor";
    }
    public List<Condutor> buscaCondutorPorNome(String valorBusca) {

	String hql = "from Condutor c";
	if(!valorBusca.equals("null") && !valorBusca.equals("")){
	    hql += " where nome like '"+valorBusca+"%'";
	}
	System.out.println(hql);
	Query query = super.getQuery(hql);
	System.out.println(query);
	@SuppressWarnings("unchecked")
	List<Condutor> listaCondutor = query.getResultList();
	return listaCondutor;

    }	
    public Condutor condutorLogin(String usuario, String senha, String sal){

	StringBuilder hql = new StringBuilder("from Condutor c ");
	hql.append("join fetch ");
	hql.append("c.loginCondutor as lc ");
	hql.append("where ");
	hql.append("c.nome = :usuario ");
	hql.append("and ");
	hql.append("lc.senha = :s ");
	hql.append("and ");
	hql.append("lc.sal = :sal ");


	Query query = getEntityManager().createQuery(hql.toString());

	query.setParameter("usuario", usuario);
	query.setParameter("s", senha);
	query.setParameter("sal",sal);

	@SuppressWarnings("unchecked")
	List<Condutor> list = query.getResultList();
	Condutor co = new Condutor();
	for(Condutor c:list){
	    System.out.println(c.getNome());
	    
	    co = c;
	}
	    System.out.println("jpa: " +co.getNome());

	return co;
    }	
    @Override
    public Condutor buscaPorId(int id){

	StringBuilder hql = new StringBuilder("from Condutor c ");
	hql.append("join fetch ");
	hql.append("c.loginCondutor as lc ");
	hql.append("where ");
	hql.append("c.id = :id ");	 

	Query query = getEntityManager().createQuery(hql.toString());

	query.setParameter("id", id);

	@SuppressWarnings("unchecked")
	Condutor condutor = (Condutor) query.getSingleResult();

	return  condutor;
	
    } 
}