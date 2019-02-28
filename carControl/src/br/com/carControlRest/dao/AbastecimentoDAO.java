package br.com.carControlRest.dao;

import java.util.List;

import br.com.carControlRest.pojo.po.Abastecimento;
import br.com.carControlRest.pojo.vo.Pesquisa;

public interface AbastecimentoDAO {
    
    public void inserir(Abastecimento abastecimento);
 
    public List<Abastecimento> buscaPorCondutor(Pesquisa pesquisa);
    
    public List<Abastecimento> buscaPorVeiculo(Pesquisa pesquisa);


}
