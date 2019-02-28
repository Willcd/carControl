package br.com.carControlRest.pojo.vo;

import java.io.Serializable;
import java.sql.Timestamp;

public class Agend implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private int idVeiculo;
    private Timestamp dataHoraSaida;
    private Timestamp dataHoraRetorno;
    private String obs;
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
    public Timestamp getDataHoraRetorno() {
        return dataHoraRetorno;
    }
    public void setDataHoraRetorno(Timestamp dataHoraRetorno) {
        this.dataHoraRetorno = dataHoraRetorno;
    }
    public String getObs() {
        return obs;
    }
    public void setObs(String obs) {
        this.obs = obs;
    }
    
}
