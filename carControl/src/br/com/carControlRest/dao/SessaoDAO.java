package br.com.carControlRest.dao;

import br.com.carControlRest.pojo.po.Condutor;

public interface SessaoDAO {
	
	public Condutor buscar (String usuario, String pass, String sal);


}
