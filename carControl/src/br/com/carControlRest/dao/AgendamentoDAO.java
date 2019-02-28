package br.com.carControlRest.dao;

import java.util.List;

import br.com.carControlRest.pojo.po.Agendamento;

public interface AgendamentoDAO {
    
    public void inserir(Agendamento agendamento);
    public void alterar(Agendamento agendamento);
    public void remover(Agendamento agendamento);
    public Agendamento buscaPorId(int id);
    public List<Agendamento> buscaLista();
    public boolean buscaPorUsuarioEPeriodoAgend(Agendamento agendamento);
    public boolean buscaPorVeiculoEPeriodoAgend(Agendamento agendamento);
    public boolean confirmaDisponibilidadeDoVeiculo(Agendamento cunsultaDisp);


}
