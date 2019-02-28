package br.com.carControlRest.pojo.vo;

import java.io.Serializable;
import java.sql.Timestamp;

public class Pesquisa implements Serializable {

    private static final long serialVersionUID = 1L;

  //pesquisaUso.tipoPesquisa
  //pesquisaUso.idCondutor =  $("#listaPesquisa option:selected").val();
  //pesquisaUso.idVeiculo =  $("#listaPesquisa option:selected").val();
  //pesquisaUso.dataInicial =  moment( dataInicial , moment.ISO_8601).format("YYYY-MM-DDT00:00:00-02:00") ;
  //pesquisaUso.dataFinal =  moment( dataFinal , moment.ISO_8601).format("YYYY-MM-DDT23:59:59-02:00") ;

  	    
    
    private int tipoPesquisa;
    private int idCondutor;
    private int idVeiculo;
    private Timestamp dataInicial;
    private Timestamp dataFinal;
    private String tipoServico;
    
    public int getTipoPesquisa() {
        return tipoPesquisa;
    }
    public void setTipoPesquisa(int tipoPesquisa) {
        this.tipoPesquisa = tipoPesquisa;
    }
    public int getIdCondutor() {
        return idCondutor;
    }
    public void setIdCondutor(int idCondutor) {
        this.idCondutor = idCondutor;
    }
    public int getIdVeiculo() {
        return idVeiculo;
    }
    public void setIdVeiculo(int idVeiculo) {
        this.idVeiculo = idVeiculo;
    }
    public Timestamp getDataInicial() {
        return dataInicial;
    }
    public void setDataInicial(Timestamp dataInicial) {
        this.dataInicial = dataInicial;
    }
    public Timestamp getDataFinal() {
        return dataFinal;
    }
    public void setDataFinal(Timestamp dataFinal) {
        this.dataFinal = dataFinal;
    }
    public String getTipoServico() {
        return tipoServico;
    }
    public void setTipoServico(String tipoServico) {
        this.tipoServico = tipoServico;
    }

}