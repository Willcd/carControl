package br.com.carControlRest.dao.jpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class JPAConnection {

	private EntityManagerFactory conexao;
	
		//private static EntityManager em = null;
		private static ThreadLocal<EntityManager> em= new ThreadLocal<>();

	
	private EntityManagerFactory conectar() {
		try {
			if ( conexao != null && conexao.isOpen() ) {
				return conexao;
			}
		} catch (Exception e) {}
		conexao = Persistence.createEntityManagerFactory("carControl"); //deve conter aqui a informação do atributo name da tag <persistence­unit>
		return conexao;
		//EntityManager em = conexao.createEntityManager();
	}
	
	// este método será o nosso createdStatement
	protected EntityManager getEntityManager() {
	//	if(em==null){
	//	em = conectar().createEntityManager();
	//	}
	//	return em;
		
		EntityManager localEm = em.get();
		if(localEm==null || !localEm.isOpen()){
			localEm = conectar().createEntityManager();
			em.set(localEm);
		}
		return localEm;
	}
	
	// este método será o nosso prepareStatement
	protected Query getQuery(String hql) {
	
		return this.getEntityManager().createQuery(hql);
	}
	//fechar conexão
	public static void closeEntityManager(){
		EntityManager localEm = em.get();
		if(localEm != null && localEm.isOpen()){
			localEm.close();
			em.set(null);
		}
		
	}

}
