package br.com.carControlRest.pojo.vo;

import java.io.Serializable;
import java.sql.Timestamp;

public class Abastec  implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private int idVeiculo;
    private float precoLt;
    private float valorPg;
    private float volume;
    private String tipoCombust;
    private long km;
    private Timestamp dataHoraAbastec;
    private String nf;
    public int getIdVeiculo() {
        return idVeiculo;
    }
    public void setIdVeiculo(int idVeiculo) {
        this.idVeiculo = idVeiculo;
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
    
	