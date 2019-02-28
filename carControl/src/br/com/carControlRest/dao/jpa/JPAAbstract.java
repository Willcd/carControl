package br.com.carControlRest.dao.jpa;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import br.com.carControlRest.pojo.po.Agendamento;


public abstract class JPAAbstract<T> extends JPAConnection {

    public abstract String getEntityName();

    public void inserir( T t ) {
	EntityManager em = getEntityManager();
	em.getTransaction().begin();
	em.persist(t);
	em.getTransaction().commit();
    }

    public T buscaPorId(int id){
	String hql = "select c from "+getEntityName()+" c where id ="+id;
	Query query = super.getQuery(hql);
	@SuppressWarnings("unchecked")
	List<T> list = query.getResultList();
	for(T t:list){
	    return (T) t;
	}
	return null;
    }
   
    public void alterar( T t ) {
	EntityManager em = getEntityManager();
	em.getTransaction().begin();
	em.merge(t);
	em.getTransaction().commit();
    }
    public void remover( T t ) {
	EntityManager em = getEntityManager();
	em.getTransaction().begin();
	em.remove(t);
	em.getTransaction().commit();
    }
    public List<T> buscaLista() {

	String hql = "select c from "+getEntityName();
	Query query = super.getQuery(hql);
	@SuppressWarnings("unchecked")
	List<T> list = query.getResultList();
	
	return list;
    }

}
