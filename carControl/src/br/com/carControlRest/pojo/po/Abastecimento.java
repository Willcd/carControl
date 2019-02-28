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
public class Abastecimento implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private Condutor condutor;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private Veiculo veiculo;
    private float precoLt;
    private float valorPg;
    private float volume;
    private String tipoCombust;
    private long km;
    private Timestamp dataHoraAbastec;
    private String nf;
    
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
    
    public float getPrecoLt() {
        return precoLt;
    }
    public void setPrecoLt(float precoLt) {
        this.precoLt = precoLt;
    }
    public float getValorPg() {
        return valorPg;
    }
    public void setValorPg(float valorPg) {
        this.valorPg = valorPg;
    }
    public float getVolume() {
        return volume;
    }
    public void setVolume(float volume) {
        this.volume = volume;
    }
    public String getTipoCombust() {
        return tipoCombust;
    }
    public void setTipoCombust(String tipoCombust) {
        this.tipoCombust = tipoCombust;
    }
    public long getKm() {
        return km;
    }
    public void setKm(long km) {
        this.km = km;
    }
    public Timestamp getDataHoraAbastec() {
        return dataHoraAbastec;
    }
    public void setDataHoraAbastec(Timestamp dataHoraAbastec) {
        this.dataHoraAbastec = dataHoraAbastec;
    }
    public String getNf() {
        return nf;
    }
    public void setNf(String nf) {
        this.nf = nf;
    }
   
}
