package br.com.carControlRest.pojo.po;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

    
    @Entity
    public class Manutencao implements Serializable{

        private static final long serialVersionUID = 1L;

        @Id	@GeneratedValue(strategy=GenerationType.IDENTITY)
        private int id;
        @ManyToOne(cascade=CascadeType.PERSIST)
        private Condutor condutor;
        @ManyToOne(cascade=CascadeType.PERSIST)
        private Veiculo veiculo;
        private float custoPecas;
        private float maoDeObra;
        private float valorTotal;
        private String tipoServico; 
        private long km;
        private Timestamp dataServico;
        private String nf;
        private String descritivo;
        
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
	public float getCustoPecas() {
	    return custoPecas;
	}
	public void setCustoPecas(float custoPecas) {
	    this.custoPecas = custoPecas;
	}
	public float getMaoDeObra() {
	    return maoDeObra;
	}
	public void setMaoDeObra(float maoDeObra) {
	    this.maoDeObra = maoDeObra;
	}
	public float getValorTotal() {
	    return valorTotal;
	}
	public void setValorTotal(float valorTotal) {
	    this.valorTotal = valorTotal;
	}
	public String getTipoServico() {
	    return tipoServico;
	}
	public void setTipoServico(String tipoServico) {
	    this.tipoServico = tipoServico;
	}
	public long getKm() {
	    return km;
	}
	public void setKm(long km) {
	    this.km = km;
	}
	
	public Timestamp getDataHoraServico() {
	    return dataServico;
	}
	public void setDataServico(Timestamp dataServico) {
	    this.dataServico = dataServico;
	}
	public String getNf() {
	    return nf;
	}
	public void setNf(String nf) {
	    this.nf = nf;
	}
	public String getDescritivo() {
	    return descritivo;
	}
	public void setDescritivo(String descritivo) {
	    this.descritivo = descritivo;
	}

        
        
}
