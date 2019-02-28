package br.com.carControlRest.pojo.po;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Agendamento implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private Condutor condutor;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private Veiculo veiculo;
    private Timestamp dataHoraSaida;
    private Timestamp DataHoraRetorno;
    private String obs;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Condutor getCondutor() {
        return condutor;
    }
    public void setCondutor(Condutor condutor) {
        this.condutor = condutor;
    }
    public Veiculo getVeiculo() {
        return veiculo;
    }
    public void setVeiculo(Veiculo veiculo) {
        this.veiculo = veiculo;
    }
    public Timestamp getDataHoraSaida() {
        return dataHoraSaida;
    }
    public void setDataHoraSaida(Timestamp dataHoraSaida) {
        this.dataHoraSaida = dataHoraSaida;
    }
    public Timestamp getDataHoraRetorno() {
        return DataHoraRetorno;
    }
    public void setDataHoraRetorno(Timestamp dataHoraRetorno) {
        DataHoraRetorno = dataHoraRetorno;
    }
    public String getObs() {
        return obs;
    }
    public void setObs(String obs) {
        this.obs = obs;
    }

    
}
