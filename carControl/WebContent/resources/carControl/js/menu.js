$(document).ready(function(){
	btnCadastroVeiculo = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/veiculos/cadastrarVeiculo.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				window.location.href="http://localhost:8080/carControl/";
			}else{
				$("#1").html(data);
				$("#2").load("carControl/veiculos/listaVeiculos.html");
			}
		});
		return true;
	};
	btnCadastroCondutor = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/condutor/cadastrarCondutor.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				window.location.href="http://localhost:8080/carControl/";
			}else{
				$("#1").html(data);
				$("#2").load("carControl/condutor/listaCondutores.html");	

			}

		});
		return true;
	};
	btnSaidaVeiculo = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/usoDeVeiculo/saidaVeiculo.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				window.location.href="http://localhost:8080/carControl/";
				
			}else{
				$("#1").html(data);
				$("#2").load("carControl/usoDeVeiculo/listaVDisponivel.html");	

			}

		});
	}
	btnRetornoVeiculo = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/usoDeVeiculo/devolucaoVeiculo.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				window.location.href="http://localhost:8080/carControl/";
				
			}else{
				$("#1").html(data);
				$("#2").html("");

			}

		});
	}
	btnAgenda = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/agenda/agenda.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				//http://localhost:8080/carControl/
				window.location.href="http://localhost:8080/carControl/";
				
			}else{
				$("#1").html(data);
				//$("#2").load("");

			}

		});
	}
	btnRelatorioUso = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/pesquisa/pesquisaUso.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				window.location.href="http://localhost:8080/carControl/";
				
			}else{
				$("#1").html(data);
				//$("#2").load("");

			}

		});
	}
	
	btnRelatorioAbastecimento = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/pesquisa/pesquisaAbastecimento.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				window.location.href="http://localhost:8080/carControl/";
				
			}else{
				$("#1").html(data);
				//$("#2").load("");

			}

		});
	}
	btnRelatorioManutencao = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/pesquisa/pesquisaManutencao.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				window.location.href="http://localhost:8080/carControl/";
				
			}else{
				$("#1").html(data);
				//$("#2").load("");

			}

		});
	}
	
	btnAbastecimento = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/abastecimento/abastecimento.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				window.location.href="http://localhost:8080/carControl/";
				
			}else{
				$("#1").html(data);
				//$("#2").load("");

			}

		});
	}
	btnManutencao = function(){
		$("#1").html("");
		$("#2").html("");
		$.get("carControl/manutencao/manutencao.html",function(data){
			if(data.substring(2,9)=="DOCTYPE"){
				window.location.href="http://localhost:8080/carControl/";
				
			}else{
				$("#1").html(data);
				//$("#2").load("");

			}

		});
	}
	
});