package br.com.carControlRest.pojo.vo;

import java.io.Serializable;
import java.sql.Timestamp;

public class RetornoDeVeiculo implements Serializable{

	private static final long serialVersionUID = 1L;

	
	private int idUso;
	private int kmRetorno;
	private Timestamp dataHoraRetorno;
	
	public int getIdUso() {
	    return idUso;
	}
	public void setIdUso(int idUso) {
	    this.idUso = idUso;
	}
	public int getKmRetorno() {
	    return kmRetorno;
	}
	public void setKmRetorno(int kmRetorno) {
	    this.kmRetorno = kmRetorno;
	}
	public Timestamp getDataHoraRetorno() {
	    return dataHoraRetorno;
	}
	public void setDataHoraRetorno(Timestamp dataHoraRetorno) {
	    this.dataHoraRetorno = dataHoraRetorno;
	}
}
