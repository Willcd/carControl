package br.com.carControlRest.dao;

import java.util.List;

import br.com.carControlRest.pojo.po.Condutor;

public interface CondutorDAO {

    public void inserir(Condutor condutor);
    public void alterar(Condutor condutor);
    public void remover(Condutor condutor);
    public Condutor buscaPorId(int id);
    public List<Condutor> buscaCondutorPorNome(String nome);

    public Condutor condutorLogin(String usuario, String senha, String sal);
}
