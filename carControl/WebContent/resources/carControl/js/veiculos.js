CARCONTROL.veiculo = new Object();

$(document).ready(function() {

	CARCONTROL.veiculo.cadastrar = function() {

		if (document.getElementById("marca").value == "" || document.getElementById("modelo").value == "" || document.getElementById("cor").value == "" || document.getElementById("chassi").value == "") {
			var cfg = {
					title : "Mensagem",
					height : 200,
					width : 400,
					modal : true,
					buttons : {
						"Ok" : function() {
							$(this).dialog("close");
						}
					}
			};
			$("#msg").html("Todos os campos são obrigatórios de preenchimento!");
			$("#msg").dialog(cfg);
			return false;

		} else {
			var newCar = new Object();
			newCar.id = $("#idVeiculo").val();
			newCar.marca = $("#marca").val();
			newCar.modelo = $("#modelo").val();
			newCar.cor = $("#cor").val();
			newCar.placa = $("#placa").val();
			newCar.chassi = $("#chassi").val();
			newCar.km = $("#km").val();
			var cfg = {
					url : "/carControl/rest/veiculoRest/addVeiculo",
					data : newCar,
					success : function(msg) {
						var cfg = {
								title : "Mensagem",
								height : 200,
								width : 400,
								modal : true,
								buttons : {
									"Ok" : function() {
										$(this).dialog("close");
									}
								}
						};
						$("#msg").html(msg);
						$("#msg").dialog(cfg);
						return false;
						CARCONTROL.veiculo.buscar();

					},
					error : function(err) {
						var cfg = {
								title : "Mensagem",
								height : 300,
								width : 500,
								modal : true,
								buttons : {
									"Ok" : function() {
										$(this).dialog("close");
									}
								}
						};
						$("#msg").html("Erro ao cadastrar um novo Veiculo: " + err.responseText);
						$("#msg").dialog(cfg);
						return false;
						CARCONTROL.veiculo.buscar();
					}
			};
			CARCONTROL.ajax.post(cfg);
			CARCONTROL.veiculo.buscar();

			$("#idVeiculo").val("");
			$("#marca").val("");
			$("#modelo").val("");
			$("#cor").val("");
			$("#placa").val("");
			$("#chassi").val("");
			$("#km").val("");
		}
	};
	CARCONTROL.veiculo.buscar = function(){
		var valorBusca = $("#consultaVeiculo").val();
		CARCONTROL.veiculo.exibirVeiculos(undefined,valorBusca);
	};
	CARCONTROL.veiculo.exibirVeiculos = function(listaVeiculo, valorBusca){
		var html = "<table = class='table row'>";
		html +=
			"<tr><th>Marca</th><th>Modelo</th><th>cor</th><th>Placa</th><th>Chassi</th><th>Km</th><th>açoes</th></tr>";
		if(listaVeiculo != undefined && listaVeiculo.length > 0 && listaVeiculo[0].id != undefined){
			for(var i = 0; i < listaVeiculo.length; i++){
				html+="<tr>"+
				"<td>"+listaVeiculo[i].marca+"</td>"+
				"<td>"+listaVeiculo[i].modelo+"</td>"+
				"<td>"+listaVeiculo[i].cor+"</td>"+
				"<td>"+listaVeiculo[i].placa+"</td>"+
				"<td>"+listaVeiculo[i].chassi+"</td>"+
				"<td>"+listaVeiculo[i].km+"</td>"+

				"<td>"+
				'<a onclick='+'CARCONTROL.veiculo.editarVeiculo("'+listaVeiculo[i].id+'")'+'>Editar</a>'+
				"</td>"+
				"<td>"+
				'<a onclick='+'CARCONTROL.veiculo.confirmaExclusao("'+listaVeiculo[i].id+'")'+'>Deletar</a>'+
				"</td>"+
				"</tr>";
			}
		}else{
			if(listaVeiculo == undefined || (listaVeiculo != undefined && listaVeiculo.length > 0)){
				if(valorBusca ==""){
					valorBusca = null;
				}
				var cfg = {
						type:"GET",
						url:"/carControl/rest/veiculoRest/buscaVeiculoPorPlaca/"+valorBusca,
						success: function(listaVeiculo){
							CARCONTROL.veiculo.exibirVeiculos(listaVeiculo);							
						},
						error: function(err){
							alert("Erro ao consultar os veiculos..." + err.responseText);
						}
				};
				CARCONTROL.ajax.get(cfg);
			}else{
				html += "<tr><td colsplan = '3'>Nenhum Registro Enconrado</td></tr>";
			}
		}
		html += "</table>";
		$("#resultadoVeiculos").html(html);
	};
	CARCONTROL.veiculo.exibirVeiculos(undefined, "");

	CARCONTROL.veiculo.confirmaExclusao = function(id){
		var cfg = {
				title: "Mensagem",
				height: 200,
				width: 400,
				modal: true,
				buttons:{
					"Ok": function(){
						CARCONTROL.veiculo.deletarVeiculo(id);	
					},
					"Cancelar": function(){
						$(this).dialog("close");
					}
				}
		};
		$("#msg").html("Confirma excluir veiculo?");
		$("#msg").dialog(cfg);
	}; 

	CARCONTROL.veiculo.deletarVeiculo = function(id){
		console.log(id);
		var cfg = {
				type: "DELETE",
				url: "/carControl/rest/veiculosRest/deletarVeiculo/"+id,
				success: function (data){
					var cfg = {
							title: "Mensagem",
							height: 200,
							width: 400,
							modal: true,
							buttons:{
								"Ok": function(){
									$(this).dialog("close");
								}
							}
					};
					$("#msg").html(data);
					$("#msg").dialog(cfg);
					CARCONTROL.veiculo.buscar();
				},
				error: function(err){
					alert("Erro ao deletar o Veiculo: " + err.responseText);
				}
		};
		CARCONTROL.ajax.post(cfg);
	};
	CARCONTROL.veiculo.editarVeiculo = function(id){

		var cfg = {
				type:"GET",
				url:"/carControl/rest/veiculosRest/buscaPorId/"+id,
				success:function(vcl){
					$("#idVeiculoEdit").val(vcl.id);
					$("#marcaEdit").val(vcl.marca);
					$("#modeloEdit").val(vcl.modelo);
					$("#corEdit").val(vcl.cor);
					$("#placaEdit").val(vcl.placa);
					$("#chassiEdit").val(vcl.chassi);
					$("#kmEdit").val(vcl.km);
					CARCONTROL.veiculo.exibirEdicao(vcl);						
				},
				error: function(err){
					alert("Erro ao editar veiculo: "+err.responseText);
				}					
		};
		CARCONTROL.ajax.get(cfg);	
		
	};
	CARCONTROL.veiculo.exibirEdicao = function(vlc){
		var cfg = {
				title:"Editar Veículo",
				height:430,
				width: 480,
				modal:true,
				buttons:{
					"Salvar": function(){
						var dialog = this;
						var newVlc = new Object();
						newVlc.id = $("#idVeiculoEdit").val();
						newVlc.marca = $("#marcaEdit").val();
						newVlc.modelo = $("#modeloEdit").val();
						newVlc.cor = $("#corEdit").val();
						newVlc.placa = $("#placaEdit").val();
						newVlc.chassi = $("#chassiEdit").val();
						newVlc.km = $("#kmEdit").val();
						var cfg = {
								type: "PUT",
								url: "/carControl/rest/veiculosRest/editarVeiculo",
								data: newVlc,
								success: function (data){
									$(dialog).dialog("close");
									$("#idVeiculoEdit").val("");
									$("#marcaEdit").val("");
									$("#modeloEdit").val("");
									$("#corEdit").val("");
									$("#placaEdit").val("");
									$("#chassiEdit").val("");
									$("#kmEdit").val("");
									CARCONTROL.veiculo.buscar();
								},
								error : function(err){
									alert("Erro ao editar o veiculo: "+err.responseText);	
								}
						};
						CARCONTROL.ajax.post(cfg);
					},"cancelar": function(){
						$(this).dialog("close");
					}
				},close: function(){}
		};
		$("#editarVeiculo").dialog(cfg);
	};


});