CARCONTROL.manutencao = new Object();


$(document).ready(function() {
	setInterval(function() {
		informaValor("#valor")
	}, 1000);
	function informaValor(field) {	
		var valor =  parseFloat($("#custoPecas").val()) + parseFloat($("#maoDeObra").val() );
		$(field).val(valor.toFixed(2));
	}
		
	CARCONTROL.manutencao.buscarVeiculo = function() {
		var valorBusca = $("#consultaVeiculo").val();
		CARCONTROL.manutencao.exibirVeiculos(undefined, valorBusca);
	};
	CARCONTROL.manutencao.exibirVeiculos = function(listaVeiculo, valorBusca) {
		var html = "<table  class='table row '>";
		html += "<tr><th>Marca</th><th>Modelo</th><th>cor</th><th>Placa</th><th>Chassi</th><th>Km</th><th>açoes</th></tr>";
		if (listaVeiculo != undefined && listaVeiculo.length > 0 && listaVeiculo[0].chassi != undefined) {
			for (var i = 0; i < listaVeiculo.length; i++) {
				html += "<tr>" + "<td>" + listaVeiculo[i].marca + "</td>" + 
				"<td>" + listaVeiculo[i].modelo + "</td>" + "<td>" + listaVeiculo[i].cor + "</td>" + "<td>" + listaVeiculo[i].placa + "</td>" + 
				"<td>" + listaVeiculo[i].chassi + "</td>" + "<td>" + listaVeiculo[i].km + "</td>" + "<td>" + 
				'<button type = "button" class = "btn legenda " onClick =' + 'CARCONTROL.manutencao.carregarVeiculo("' + listaVeiculo[i].id + '")'+'>Selecionar</button>' + "</td>" + "</tr>";

			}
		} else {
			if (listaVeiculo == undefined || (listaVeiculo != undefined && listaVeiculo.length > 0)) {
				if (valorBusca == "") {
					valorBusca = null;
				}
				var cfg = {
						type:"GET",
						url:"/carControl/rest/veiculoRest/buscaVeiculoPorPlaca/"+valorBusca,
						success: function(listaVeiculo){
							CARCONTROL.manutencao.exibirVeiculos(listaVeiculo);							
						},
						error: function(err){
							alert("Erro ao consultar os veiculos..." + err.responseText);
						}
				};
				CARCONTROL.ajax.get(cfg);
			} else {
				html += "<tr><td colsplan = '3'>Nenhum Registro Enconrado</td></tr>";
			}
		}
		html += "</table>";
		$("#listaVeiculos").html(html);
	};
	CARCONTROL.manutencao.exibirVeiculos(undefined, "");
	
	CARCONTROL.manutencao.carregarVeiculo = function(id) {
		var cfg = {
				type : "GET",
				url : "/carControl/rest/veiculoRest/buscaPorId/" + id,
				success : function(veiculo) {
					$("#idVeiculo").val(veiculo.id).trigger('blur');
					$("#marca").val(veiculo.marca).trigger('blur');
					$("#modelo").val(veiculo.modelo).trigger('blur');
					$("#cor").val(veiculo.cor).trigger('blur');
					$("#placa").val(veiculo.placa).trigger('blur');
				},
				error : function(err) {
					alert("Erro ao Carregar Veiculo.. " + err.responseText);
				}
		};
		CARCONTROL.ajax.get(cfg);
	};
	CARCONTROL.manutencao.salvarManutencao = function() {
		
		var dataServico = $("#dataServico").val();	
		var tipoServico = $("#selectServico option:selected").val();
		var manutencaoVO = new Object();			
		manutencaoVO.idVeiculo = $("#idVeiculo").val();
		manutencaoVO.custoPecas = $("#custoPecas").val();
		manutencaoVO.maoDeObra = $("#maoDeObra").val();
		manutencaoVO.valorTotal = $("#valor").val();
		manutencaoVO.nf = $("#nf").val();
		manutencaoVO.dataServico = moment(dataServico).format();	
		manutencaoVO.tipoServico = tipoServico;
		manutencaoVO.km = $("#km").val();
		manutencaoVO.descritivo = $("#comment").val();
		var cfg = {
				type : "POST",
				url : "/carControl/rest/manutencaoRest/addServico",
				data : manutencaoVO,
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
					$("#msg").html("Erro ao Registrar Serviço: " + err.responseText);
					$("#msg").dialog(cfg);					
					return false;
				}				
		};
		CARCONTROL.ajax.post(cfg);
		$("#idVeiculo").val("");
		$("#dataSevico").val("");	
		$("#maoDeObra").val("");
		$("#custoPecas").val("");
		$("#valor").val("");
		$("#nf").val("");
		$("#selectServico option:selected").val("");
		$("#km").val("");	
		$("#marca").val("");
		$("#modelo").val("");
		$("#cor").val("");
		$("#placa").val("");
		$("#comment").val("");
	};
});
