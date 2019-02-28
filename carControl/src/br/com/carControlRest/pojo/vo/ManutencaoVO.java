package br.com.carControlRest.pojo.vo;

import java.io.Serializable;
import java.sql.Timestamp;

public class ManutencaoVO  implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private int idVeiculo;
    private float custoPecas;
    private float maoDeObra;
    private float valorTotal;
    private String tipoServico;
    private String tipoPesquisa;
    private long km;
    private Timestamp dataServico;
    private String nf;
    private String descritivo;
    
    public int getIdVeiculo() {
        return idVeiculo;
    }
    public void setIdVeiculo(int idVeiculo) {
        this.idVeiculo = idVeiculo;
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
    public String getTipoPesquisa() {
        return tipoPesquisa;
    }
    public void setTipoPesquisa(String tipoPesquisa) {
        this.tipoPesquisa = tipoPesquisa;
    }
    public long getKm() {
        return km;
    }
    public void setKm(long km) {
        this.km = km;
    }
    public Timestamp getDataServico() {
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
