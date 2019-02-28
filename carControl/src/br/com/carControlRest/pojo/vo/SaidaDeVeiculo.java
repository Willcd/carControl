package br.com.carControlRest.pojo.vo;

import java.io.Serializable;
import java.sql.Timestamp;

public class SaidaDeVeiculo implements Serializable{

	private static final long serialVersionUID = 1L;

	private int idVeiculo;
	private Timestamp dataHoraSaida;
	
	public int getIdVeiculo() {
	    return idVeiculo;
	}
	public void setIdVeiculo(int idVeiculo) {
	    this.idVeiculo = idVeiculo;
	}
	public Timestamp getDataHoraSaida() {
	    return dataHoraSaida;
	}
	public void setDataHoraSaida(Timestamp dataHoraSaida) {
	    this.dataHoraSaida = dataHoraSaida;
	}

}
    
