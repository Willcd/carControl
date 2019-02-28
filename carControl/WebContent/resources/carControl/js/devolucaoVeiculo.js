CARCONTROL.retornoVeiculo = new Object();

$(document).ready(function() {

	CARCONTROL.retornoVeiculo.buscaPorIdUsuario = function() {
		var cfg = {
				type : "GET",
				url : "/carControl/rest/usoRest/buscaUsoDevolucaoPorIdUsuario/",
				success : function(usoDeVeiculo) {
					
					CARCONTROL.retornoVeiculo.imprimirDevolucao(usoDeVeiculo)

				},
				error : function(err) {
					//alert("Erro ao recuperar saida de Veiculo.. " + err.responseText);
					var html = "<br>" +
					"Não Há veiculo a ser devolvido pelo usuario!";
					//" " + err.responseText;
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
					$("#msg").html(html);
					$("#msg").dialog(cfg);
				}
		};
		CARCONTROL.ajax.get(cfg);
	};
	
	CARCONTROL.retornoVeiculo.buscaPorIdUsuario();

	CARCONTROL.retornoVeiculo.buscarLista = function() {
		var cfg = {
				type : "GET",
				url : "/carControl/rest/usoRest/buscaListaUsoDevolucao/",
				success : function(lisaUsoDeVeiculo) {
					var listaUso = lisaUsoDeVeiculo;
					if(listaUso == undefined || (listaUso != undefined && listaUso.length > 0)){

						var html = "<table = class='table row'>";
						html += "<h4>Lista de Registros de uso em aberto</b></h4><thead class='thead-inverse'>"+
						"<tr><th>Veiculo</th><th>Saida</th><th>Km </th><th>Condutor</th><th>Ações</th></tr></thead><tbody>";
						var i;
						for(i in listaUso){
							console.log(i);
							html += "<tr>"+
							"<td>"+listaUso[i].veiculo.modelo+' '+listaUso[i].veiculo.placa+"</td>"+
							"<td>"+moment(listaUso[i].dataHoraSaida).format("DD/MM/YYYY HH:mm:ss")+"</td>"+
							
							"<td>"+listaUso[i].veiculo.km+"</td>"+

							"<td>"+listaUso[i].condutor.nome+" "+listaUso[i].condutor.nome+"</td>"+

							"<td>"+
							'<button type = "button" class = "btn legenda " onClick =' + 'CARCONTROL.retornoVeiculo.carregarDevolucao("' + listaUso[i].id + '")'+'>Selecionar</button>'+

							"</td>"+
							"</tr>";		

						}


						html += "</table>";
						$("#listaDevolucao").html(html);
					}
				},
				error : function(err) {
					var html = "<br>" +
					"Não Há veiculo a ser devolvido!";
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
					$("#msg").html(html);
					$("#msg").dialog(cfg);
				}
		};
		CARCONTROL.ajax.get(cfg);
	};
	
	CARCONTROL.retornoVeiculo.buscarLista();

	CARCONTROL.retornoVeiculo.imprimirDevolucao = function(usoDeVeiculo){

		if (usoDeVeiculo != undefined && usoDeVeiculo.id != undefined) {
			
			$("#idUsoVeiculo").val("");
			$("#idUsuario").val("");
			$("#idVeiculo").val("");

			$("#idUsoVeiculo").val(usoDeVeiculo.id).trigger('blur');
			$("#idUsuario").val(usoDeVeiculo.condutor.id).trigger('blur');
			$("#idVeiculo").val(usoDeVeiculo.veiculo.id).trigger('blur');

			$("#marca").val(usoDeVeiculo.veiculo.marca).trigger('blur');
			$("#modelo").val(usoDeVeiculo.veiculo.modelo).trigger('blur');
			$("#cor").val(usoDeVeiculo.veiculo.cor).trigger('blur');
			$("#placa").val(usoDeVeiculo.veiculo.placa).trigger('blur');
			$("#kmini").val(usoDeVeiculo.veiculo.km).trigger('blur');
			var date = moment(usoDeVeiculo.dataHoraSaida).format('DD/MM/YYYY HH:mm:ss');				
			$("#dataHoraSaida").val(date).trigger('blur');
		}
	}
	CARCONTROL.retornoVeiculo.carregarDevolucao = function(id){

		console.log("CARCONTROL.retornoVeiculo.carregarDevolucao "+id);
		alert(id);
		console.log(id);

		var cfg = {
				type : "GET",
				url : "/carControl/rest/usoRest/buscaUsoPorId/"+id,
				success : function(usoDeVeiculo) {
					CARCONTROL.retornoVeiculo.imprimirDevolucao(usoDeVeiculo)

				},
				error : function(err) {
					console.log("não ha devoluções")
				}
		};
		CARCONTROL.ajax.get(cfg);
	};			




	setInterval(function() {
		currentTime("#idTimeField")
	}, 1000);

	function currentTime(field) {
		var now = new Date();
		var data = moment(now).format('DD/MM/YYYY HH:mm:ss');

		$(field).val(data);
	};

	CARCONTROL.retornoVeiculo.validarRetorno = function() {
		console.log($("#kmini").val())
		console.log($("#kmfim").val())


		var ini = $("#kmini").val();
		var kmfinal = $("#kmfim").val();
		if(kmfinal == ""){
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
			$("#msg").html("Quilometragem final deve ser informada.");
			$("#msg").dialog(cfg);
			return false;

		}else{
			console.log(ini);
			console.log(kmfinal);
			if(parseInt(ini) > parseInt(kmfinal)){
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
				$("#msg").html("Quilometragem final deve ser maior que a inicial.");
				$("#msg").dialog(cfg);
				return false;
			}else{
				var dh = new Date();
				retorno = new Object();
				retorno.idUso = $("#idUsoVeiculo").val();
				retorno.dataHoraRetorno = dh;
				retorno.kmRetorno = $("#kmfim").val();

				var cfg = {
						url : "/carControl/rest/usoRest/addRetorno",
						data : retorno,
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
							$("#msg").html("Erro ao registrar devolução de Veiculo: " + err.responseText);
							$("#msg").dialog(cfg);
							return false;
						}

				};
				CARCONTROL.ajax.post(cfg);	

				$("#idUsoVeiculo").val("");
				$("#idUsuario").val("");
				$("#idVeiculo").val("");
				$("#marca").val("");
				$("#modelo").val("");
				$("#cor").val("")
				$("#placa").val("");
				$("#kmini").val("");	
				$("#kmfim").val("");	
				$("#dataHoraSaida").val("");
			}
		}
	};

});