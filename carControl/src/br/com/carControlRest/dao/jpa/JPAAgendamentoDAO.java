package br.com.carControlRest.dao.jpa;


import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.persistence.Query;

import org.hibernate.type.TimestampType;

import br.com.carControlRest.dao.AgendamentoDAO;
import br.com.carControlRest.pojo.po.Agendamento;
import br.com.carControlRest.pojo.po.UsoDeVeiculo;
import br.com.carControlRest.pojo.vo.Pesquisa;

public class JPAAgendamentoDAO extends JPAAbstract<Agendamento> implements AgendamentoDAO {

    @Override
    public String getEntityName() {
	return "Agendamento";
    } 
    //pesquisa agendamento por usuario e time range
    public boolean buscaPorUsuarioEPeriodoAgend(Agendamento agendamento){
		
	StringBuilder hql = new StringBuilder("from Agendamento a ");
	hql.append("join fetch ");
	hql.append("a.condutor as c ");
	hql.append("where ");
	hql.append("a.dataHoraSaida between :dataS and :dataR ");		//?
	hql.append("and a.DataHoraRetorno between :dataS and :dataR ");		//?
	hql.append("and c.id = :id");

	Query query = getEntityManager().createQuery(hql.toString());
	query.setParameter("id", agendamento.getCondutor().getId());
	query.setParameter("dataS", agendamento.getDataHoraSaida());
	//SELECT DATE_FORMAT( ( TIMESTAMP( '2010-06-17 03:07:22' ) + TIMESTAMP( '0001-01-05 05:07:10' ) ) , '%Y-%m-%d %H:%i:%s' )
	query.setParameter("dataR",agendamento.getDataHoraRetorno());
	
	System.out.println( agendamento.getDataHoraSaida());
	System.out.println();
	
	List<Agendamento> listaAgendamento = query.getResultList();

	System.out.println(listaAgendamento);

	if(listaAgendamento.isEmpty()){
	    return true;
	}else{
	    return false;
	}
    }  
    //pesquisa agendamento por veiculo e time range
    public boolean buscaPorVeiculoEPeriodoAgend(Agendamento agendamento){

	StringBuilder hql = new StringBuilder("from Agendamento a ");
	hql.append("join fetch ");
	hql.append("a.veiculo as v ");
	hql.append("where ");
	hql.append("a.dataHoraSaida between :dataS and :dataR ");	//?
	hql.append("and a.DataHoraRetorno between :dataS and :dataR ");	//?
	hql.append("and v.id = :id");

	Query query = getEntityManager().createQuery(hql.toString());
	query.setParameter("id", agendamento.getVeiculo().getId());
	query.setParameter("dataS", agendamento.getDataHoraSaida());
	query.setParameter("dataR",agendamento.getDataHoraRetorno());

	List<Agendamento> listaAgendamento = query.getResultList();

	System.out.println(listaAgendamento);

	if(listaAgendamento.isEmpty()){
	    return true;
	}else{
	    return false;
	}
    }
    //pesquisa agendamento de veiculo por  time range e id usuario <>
    public boolean confirmaDisponibilidadeDoVeiculo(Agendamento cunsultaDisp){

	long fim = cunsultaDisp.getDataHoraSaida().getTime() + 3600000; // 1 hora = 60 seg x 60 min = 3600 seg + 000(miliseg)
	long ini = cunsultaDisp.getDataHoraSaida().getTime();	
	Timestamp saidaIni = new Timestamp ((ini/1000)*1000);
	Timestamp saidaFim = new Timestamp ((fim/1000)*1000);
	System.out.println(saidaIni);
	System.out.println(saidaFim);	
	System.out.println("jpaagendamento");		
	StringBuilder hql = new StringBuilder("from Agendamento a ");
	hql.append("join fetch ");
	hql.append("a.condutor as c ");
	hql.append("where ");
	hql.append("a.dataHoraSaida between :dataS and :dataR ");	//?
	hql.append("and a.DataHoraRetorno between :dataS and :dataR ");	//?
	hql.append("and c.id != :id");
	Query query = getEntityManager().createQuery(hql.toString());
	query.setParameter("dataS", saidaIni);
	query.setParameter("dataR", saidaFim);
	query.setParameter("id", cunsultaDisp.getCondutor().getId());
	List<Agendamento> listaAgendamento = query.getResultList();
	System.out.println(listaAgendamento);
	if(listaAgendamento.isEmpty()){
	    return true;
	}else{
	    return false;
	}
    }  

}


