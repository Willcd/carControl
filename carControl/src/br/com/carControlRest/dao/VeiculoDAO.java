package br.com.carControlRest.dao;

import java.util.List;

import br.com.carControlRest.pojo.po.Veiculo;

public interface VeiculoDAO {

    public void inserir(Veiculo veiculo);
    public void alterar(Veiculo veiculo);
    public void remover(Veiculo veiculo);
    public Veiculo buscaPorId(int id);
    public List<Veiculo> buscar(String valorBusca);
    public List<Veiculo> buscaVeiculoDisponivel();
    public List<Veiculo> buscaLista();

}
