package br.com.carControlRest.pojo.po;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class LoginCondutor implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String email;
	private String senha;
	private String sal;
	@Column(nullable = false, columnDefinition = "boolean default false") 
	private boolean adm;
	
	public int getId() {
	    return id;
	}
	public void setId(int id) {
	    this.id = id;
	}
	public String getEmail() {
	    return email;
	}
	public void setEmail(String email) {
	    this.email = email;
	}
	public String getSenha() {
	    return senha;
	}
	public void setSenha(String senha) {
	    this.senha = senha;
	}
	public String getSal() {
	    return sal;
	}
	public void setSal(String sal) {
	    this.sal = sal;
	}
	public boolean isAdm() {
	    return adm;
	}
	public void setAdm(boolean adm) {
	    this.adm = adm;
	}

}
