CARCONTROL.abastecimento = new Object();
$(document).ready(function() {
	setInterval(function() {
		informaVolume("#volume")
	}, 1000);
	function informaVolume(field) {	
		var volume = $("#valor").val() / $("#preco").val() ;
		$(field).val(volume.toFixed(3));
	}		
	CARCONTROL.abastecimento.buscarVeiculo = function() {
		var valorBusca = $("#consultaVeiculo").val();
		CARCONTROL.abastecimento.exibirVeiculos(undefined, valorBusca);
	};
	CARCONTROL.abastecimento.exibirVeiculos = function(listaVeiculo, valorBusca) {
		var html = "<table = class='table row'>";
		html += "<tr><th>Marca</th><th>Modelo</th><th>cor</th><th>Placa</th><th>Chassi</th><th>Km</th><th>açoes</th></tr>";
		if (listaVeiculo != undefined && listaVeiculo.length > 0 && listaVeiculo[0].chassi != undefined) {
			for (var i = 0; i < listaVeiculo.length; i++) {
				html += "<tr>" + "<td>" + listaVeiculo[i].marca + "</td>" + 
				"<td>" + listaVeiculo[i].modelo + "</td>" + "<td>" + listaVeiculo[i].cor + "</td>" + "<td>" + listaVeiculo[i].placa + "</td>" + 
				"<td>" + listaVeiculo[i].chassi + "</td>" + "<td>" + listaVeiculo[i].km + "</td>" + "<td>" + 
				'<button type = "button" class = "btn legenda " onClick =' + 'CARCONTROL.abastecimento.carregarVeiculo("' + listaVeiculo[i].id + '")'+'>Selecionar</button>'
				+ "</td>" + "</tr>";

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
							CARCONTROL.abastecimento.exibirVeiculos(listaVeiculo);							
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
	CARCONTROL.abastecimento.exibirVeiculos(undefined, "");

	CARCONTROL.abastecimento.carregarVeiculo = function(id) {

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
	CARCONTROL.abastecimento.salvarAbastecimento = function() {

		var dataHoraAbastec = $("#dataHAbastecimento").val();	
		var tipoCombustivel = $("#selectCombust option:selected").val();
		var abastec = new Object();		
		abastec.idVeiculo = $("#idVeiculo").val();
		abastec.precoLt = $("#preco").val();
		abastec.valorPg = $("#valor").val();
		abastec.nf = $("#nf").val();
		abastec.volume = $("#volume").val();
		abastec.dataHoraAbastec =  moment( dataHoraAbastec , moment.ISO_8601).format();	
		abastec.tipoCombust = tipoCombustivel;
		console.log(tipoCombustivel);
		abastec.km = $("#km").val();
		var cfg = {
				type : "POST",
				url : "/carControl/rest/abastecimentoRest/addAbastecimento",
				data : abastec,
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
					$("#msg").html("Erro ao registrar abastecimento: " + err.responseText);
					$("#msg").dialog(cfg);					
					return false;
				}				
		};
		CARCONTROL.ajax.post(cfg);
		$("#dataHAbastecimento").val("");	
		$("#idVeiculo").val("");
		$("#preco").val("");
		$("#valor").val("");
		$("#nf").val("");
		$("#volume").val("");
		$("#selectCombust option:selected").val("");
		$("#km").val("");	
		$("#marca").val("");
		$("#modelo").val("");
		$("#cor").val("");
		$("#placa").val("");
	};
});
