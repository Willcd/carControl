package br.com.carControlRest.dao;

import br.com.carControlRest.dao.jpa.JPAAbastecimentoDAO;
import br.com.carControlRest.dao.jpa.JPAAgendamentoDAO;
import br.com.carControlRest.dao.jpa.JPACondutorDAO;
import br.com.carControlRest.dao.jpa.JPAManutencaoDAO;
import br.com.carControlRest.dao.jpa.JPAUsoDeVeiculoDAO;
import br.com.carControlRest.dao.jpa.JPAVeiculoDAO;

public class DAOFactory {

    @SuppressWarnings("rawtypes")
    public static Object getInstanceOf(Class c) {
	if ( c.equals(CondutorDAO.class) ) {
	    return new JPACondutorDAO();
	} else if ( c.equals(VeiculoDAO.class) ) {
	    return new JPAVeiculoDAO();
	} else if ( c.equals(UsoDeVeiculoDAO.class) ) {
	    return new JPAUsoDeVeiculoDAO();
	} else if ( c.equals(AgendamentoDAO.class) ) {
	    return new JPAAgendamentoDAO();
	} else if ( c.equals(AbastecimentoDAO.class) ) {
	    return new JPAAbastecimentoDAO();
	} else if ( c.equals(ManutencaoDAO.class) ) {
	    return new JPAManutencaoDAO();
	}
	return null;

    }
}
