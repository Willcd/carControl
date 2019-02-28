package br.com.carControlRest.pojo.po;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Condutor implements Serializable{

	private static final long serialVersionUID = 1L;
	/*
	* Declarar o nome dos atributos de maneira idêntica ao nome dos campos 
	* do formulário que enviarão os dados para serem armazenados nestes.
	*/
	@Id	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String snome;
	
	private Date dataNascimento;
	private String cpf;
	private String rg;
	private String cnh;
	private String telefone;
	@OneToOne(cascade=CascadeType.PERSIST)
	private LoginCondutor loginCondutor;
	public int getId() {
	    return id;
	}
	public void setId(int id) {
	    this.id = id;
	}
	public String getNome() {
	    return nome;
	}
	public void setNome(String nome) {
	    this.nome = nome;
	}
	public String getSnome() {
	    return snome;
	}
	public void setSnome(String snome) {
	    this.snome = snome;
	}
	
	public Date getDataNascimento() {
	    return dataNascimento;
	}
	public void setDataNascimento(Date dataNascimento) {
	    this.dataNascimento = dataNascimento;
	}
	public String getCpf() {
	    return cpf;
	}
	public void setCpf(String cpf) {
	    this.cpf = cpf;
	}
	public String getRg() {
	    return rg;
	}
	public void setRg(String rg) {
	    this.rg = rg;
	}
	public String getCnh() {
	    return cnh;
	}
	public void setCnh(String cnh) {
	    this.cnh = cnh;
	}
	public String getTelefone() {
	    return telefone;
	}
	public void setTelefone(String telefone) {
	    this.telefone = telefone;
	}
	public LoginCondutor getLoginCondutor() {
	    return loginCondutor;
	}
	public void setLoginCondutor(LoginCondutor loginCondutor) {
	    this.loginCondutor = loginCondutor;
	}
	

	
	

	
	
}
