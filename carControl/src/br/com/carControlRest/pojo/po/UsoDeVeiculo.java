package br.com.carControlRest.pojo.po;

import java.io.Serializable;
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
public class UsoDeVeiculo implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private int kmInicio;
    private int kmFim;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private Veiculo veiculo;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private Condutor condutor;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataHoraSaida;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataHoraRetorno;

    public int getId() {
	return id;
    }
    public void setId(int id) {
	this.id = id;
    }
    public int getKmInicio() {
	return kmInicio;
    }
    public void setKmInicio(int kmInicio) {
	this.kmInicio = kmInicio;
    }
    public int getKmFim() {
	return kmFim;
    }
    public void setKmFim(int kmFim) {
	this.kmFim = kmFim;
    }
    public Veiculo getVeiculo() {
	return veiculo;
    }
    public void setVeiculo(Veiculo veiculo) {
	this.veiculo = veiculo;
    }
    public Condutor getCondutor() {
	return condutor;
    }
    public void setCondutor(Condutor condutor) {
	this.condutor = condutor;
    }
    public Date getDataHoraSaida() {
	return dataHoraSaida;
    }
    public void setDataHoraSaida(Date dataHoraSaida) {
	this.dataHoraSaida = dataHoraSaida;
    }
    public Date getDataHoraRetorno() {
	return dataHoraRetorno;
    }
    public void setDataHoraRetorno(Date dataHoraRetorno) {
	this.dataHoraRetorno = dataHoraRetorno;
    }

}
