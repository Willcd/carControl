CARCONTROL.veiculoSaida = new Object();

$(document).ready(function() {

	setInterval(function() {
		currentTime("#idTimeField")
	}, 1000);

	function currentTime(field) {

		var now = new Date();
		var data = moment(now).format('DD/MM/YYYY HH:mm:ss');

		//$(field).val(now.getDate() + "/" + mes + "/" + now.getFullYear() + "  " + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());

		$(field).val(data);
	}

	CARCONTROL.veiculoSaida.buscar = function() {
		var valorBusca = $("#consultaVDisponivel").val();
		CARCONTROL.veiculoSaida.exibirVeiculos(undefined, valorBusca);
	};
	CARCONTROL.veiculoSaida.exibirVeiculos = function(listaVeiculo, valorBusca) {
		var html = "<table = class='table row'>";
		html += "<tr><th>Marca</th><th>Modelo</th><th>cor</th><th>Placa</th><th>Chassi</th><th>Km</th><th>açoes</th></tr>";
		if (listaVeiculo != undefined && listaVeiculo.length > 0 && listaVeiculo[0].chassi != undefined) {
			for (var i = 0; i < listaVeiculo.length; i++) {
				html += "<tr>" + "<td>" + listaVeiculo[i].marca + "</td>" + "<td>" + listaVeiculo[i].modelo + "</td>" + "<td>" + listaVeiculo[i].cor + "</td>" + "<td>" + listaVeiculo[i].placa + "</td>" + "<td>" + listaVeiculo[i].chassi + "</td>" + "<td>" + listaVeiculo[i].km + "</td>" +

				"<td>" + '<a onclick=' + 'CARCONTROL.veiculoSaida.carregarVeiculo("' + listaVeiculo[i].id + '")' + '>Reg. saida</a>' + "</td>" + "</tr>";
			}
		} else {
			if (listaVeiculo == undefined || (listaVeiculo != undefined && listaVeiculo.length > 0)) {
				if (valorBusca == "") {
					valorBusca = null;
				}
				var cfg = {
						type : "GET",
						url : "/carControl/rest/usoRest/buscaVeiculoDisponivel/",
						success : function(listaVeiculo) {
							CARCONTROL.veiculoSaida.exibirVeiculos(listaVeiculo);
						},
						error : function(err) {
							alert("Erro ao consultar os veiculos..." + err.responseText);
						}
				};
				CARCONTROL.ajax.get(cfg);
			} else {
				html += "<tr><td colsplan = '3'>Nenhum Registro Enconrado</td></tr>";
			}
		}
		html += "</table>";
		$("#listaVeiculosDisponiveis").html(html);
	};
	CARCONTROL.veiculoSaida.exibirVeiculos(undefined, "");

	CARCONTROL.veiculoSaida.validarSaida = function() {

		var idveiculo = $("#idVeiculoSaida").val();
		if(idveiculo == "" || idveiculo == null){
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
			$("#msg").html("Selecione um Veiculo.");
			$("#msg").dialog(cfg);
		}else{
			var cfg = {
					type : "GET",
					url : "/carControl/rest/usoRest/buscaUsoDevolucaoPorIdUsuario/",
					success : function(usoDeVeiculo) {
						if(usoDeVeiculo  != null){
							console.log(usoDeVeiculo.id);
							var cfg = {
									title: "Mensagem",
									height: 200,
									width: 400,
									modal: true,
									buttons:{
										"Ok": function(){
											$(this).dialog("close");
										}
									},
									close: function(){	
									}
							};
							$("#msg").html("Há um veiculo em uso para esse usuario! ");
							$("#msg").dialog(cfg);
						}
						else{

							CARCONTROL.veiculoSaida.registrarSaida(idveiculo);

						}
					},
					error : function(err) {

						CARCONTROL.veiculoSaida.registrarSaida(idveiculo);
					}	
			};
			CARCONTROL.ajax.get(cfg);
		}
	};

	CARCONTROL.veiculoSaida.carregarVeiculo = function(id) {

		var cfg = {
				type : "GET",
				url : "/carControl/rest/veiculoRest/buscaPorId/" + id,
				success : function(veiculo) {
					$("#idVeiculoSaida").val(veiculo.id).trigger('blur');
					$("#marca").val(veiculo.marca).trigger('blur');
					$("#modelo").val(veiculo.modelo).trigger('blur');
					$("#cor").val(veiculo.cor).trigger('blur');
					$("#placa").val(veiculo.placa).trigger('blur');
					$("#kmini").val(veiculo.km).trigger('blur');

				},
				error : function(err) {
					alert("Erro ao Carregar Veiculo.. " + err.responseText);
				}
		};
		CARCONTROL.ajax.get(cfg);

	};

	CARCONTROL.veiculoSaida.registrarSaida = function(idveiculo) {

		var now = new Date();
		saidaDeVeiculo = new Object();
		saidaDeVeiculo.idVeiculo = idveiculo;
		saidaDeVeiculo.dataHoraSaida =  moment( now , moment.ISO_8601).format() ;

		console.log(saidaDeVeiculo.idVeiculo+" "+saidaDeVeiculo.dataHoraSaida);

		var cfg = {
				url : "/carControl/rest/usoRest/addsaida",
				data : saidaDeVeiculo,
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
					CARCONTROL.veiculoSaida.buscar();
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
					$("#msg").html("Erro ao registrar saida de Veiculo: " + err.responseText);
					$("#msg").dialog(cfg);

					return false;

				}

		};
		CARCONTROL.ajax.post(cfg);
		$("#idVeiculoSaida").val("");
		$("#marca").val("");
		$("#modelo").val("");
		$("#cor").val("");
		$("#placa").val("");
		$("#kmini").val("");
		CARCONTROL.veiculoSaida.buscar();


	};


});
