package br.com.carControlRest.pojo.po;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Veiculo implements Serializable {

	private static final long serialVersionUID = 1L;
	/*
	 * Declarar o nome dos atributos de maneira idêntica ao nome dos
	 * campos do formulário que enviarão os dados para serem armazenados
	 * nestes.
	 */	
	@Id	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String marca;
	private String modelo;
	private String cor;
	private String placa;
	private String chassi;
	private int km;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMarca() {
		return marca;
	}
	public void setMarca(String marca) {
		this.marca = marca;
	}
	public String getModelo() {
		return modelo;
	}
	public void setModelo(String modelo) {
		this.modelo = modelo;
	}
	public String getCor() {
		return cor;
	}
	public void setCor(String cor) {
		this.cor = cor;
	}
	public String getPlaca() {
		return placa;
	}
	public void setPlaca(String placa) {
		this.placa = placa;
	}
	public String getChassi() {
		return chassi;
	}
	public void setChassi(String chassi) {
		this.chassi = chassi;
	}
	public int getKm() {
		return km;
	}
	public void setKm(int km) {
		this.km = km;
	}
	
	

}
