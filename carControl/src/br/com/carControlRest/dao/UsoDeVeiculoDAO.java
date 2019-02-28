package br.com.carControlRest.dao;

import java.util.List;

import br.com.carControlRest.pojo.po.UsoDeVeiculo;
import br.com.carControlRest.pojo.vo.Pesquisa;

public interface UsoDeVeiculoDAO {

    public void inserir(UsoDeVeiculo usoDeVeiculo);
    public void alterar(UsoDeVeiculo usoDeVeiculo);
    public UsoDeVeiculo buscaPorId(int id);

    public UsoDeVeiculo buscaUsoEmAbertoPorUsuario(int id);

    public UsoDeVeiculo buscaUsoPorId(int id);

    public List<UsoDeVeiculo> buscaPorCondutor(Pesquisa pesquisa);
    
    public List<UsoDeVeiculo> buscaPorVeiculo(Pesquisa pesquisa);
   
    public List<UsoDeVeiculo> buscaListaUsoEmAberto();

    



}
