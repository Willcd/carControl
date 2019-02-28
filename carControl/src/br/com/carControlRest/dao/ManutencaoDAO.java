package br.com.carControlRest.dao;

import java.util.List;

import br.com.carControlRest.pojo.po.Manutencao;
import br.com.carControlRest.pojo.vo.Pesquisa;

public interface ManutencaoDAO {
    
    public void inserir(Manutencao manutencao);
    
    public List<Manutencao> buscaPorCondutor(Pesquisa pesquisa);
    
    public List<Manutencao> buscaPorVeiculo(Pesquisa pesquisa);

}
