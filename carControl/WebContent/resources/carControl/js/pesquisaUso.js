CARCONTROL.relatorioUso = new Object();

$(document).ready(function() {

	var pesquisa;
	var lista;
	var html;
	CARCONTROL.relatorioUso.tipoPesquisa = function(){
		pesquisa = $("#tipoPesquisa option:selected").val();
		if (pesquisa != 0){
			var x = null;
			if(pesquisa ==1){
				var cfg = {
						type: "GET",
						url : "/carControl/rest/condutorRest/buscaCondutorPorNome/"+x,
						success: function (listaCondutor) {
							CARCONTROL.relatorioUso.alimentaListaCondutorNoSelect(listaCondutor);
							$("#labelPequisa").html("Selecione um Condutor");

						},
						error: function(err){
							alert("Erro ao consultar condutores..." + err.responseText);
						}
				};
				CARCONTROL.ajax.get(cfg);
			}else{
				if(pesquisa ==2){

					var cfg = {
							type: "GET",
							url : "/carControl/rest/veiculoRest/buscaVeiculoPorPlaca/"+x,
							success: function (listaVeiculo) {
								CARCONTROL.relatorioUso.alimentaListaVeiculoNoSelect(listaVeiculo);
								$("#labelPequisa").html("Selecione um Veiculo");

							},
							error: function(err){
								alert("Erro ao consultar os veiculos..." + err.responseText);
							}
					};
					CARCONTROL.ajax.get(cfg);

				}
			}
		}
	};
	CARCONTROL.relatorioUso.alimentaListaCondutorNoSelect = function(listaCondutor){
		var condutores = '<option value = "" >Selecione</option>';
		for(var i=0; i<listaCondutor.length; i++){
			condutores += "<option value = "+listaCondutor[i].id+">"+listaCondutor[i].nome+"</option>";     
		}
		$("#listaPesquisa").html(condutores);
	};
	CARCONTROL.relatorioUso.alimentaListaVeiculoNoSelect = function(listaVeiculo){
		var veiculos = '<option value = "" >Selecione</option>';
		for(var i=0; i<listaVeiculo.length; i++){
			veiculos += "<option value = "+listaVeiculo[i].id+">"+listaVeiculo[i].modelo+"</option>";     
		}
		$("#listaPesquisa").html(veiculos);
	};
	CARCONTROL.relatorioUso.pesquisaUsoDeVeiculo = function(){
		pesquisa = $("#tipoPesquisa option:selected").val();
		var dataInicial = $("#dataInicial").val();
		var dataFinal = $("#dataFinal").val();	
		$("#listaRelatorio").html("").trigger('blur');

		if(pesquisa == 0){
			alert("Defina os parametros de pesquisa! ");
		}else{
			var pesquisaUso = new Object();
			pesquisaUso.tipoPesquisa = pesquisa;
			if(pesquisa == 1){
				pesquisaUso.idCondutor =  $("#listaPesquisa option:selected").val();
			}
			if(pesquisa == 2){
				pesquisaUso.idVeiculo =  $("#listaPesquisa option:selected").val();
			}
			if(dataInicial){

				pesquisaUso.dataInicial =  moment( dataInicial , moment.ISO_8601).format("YYYY-MM-DDT00:00:00-03:00") ;
			}else{
				pesquisaUso.dataInicial =  moment('2017-10-25T00:00:00-03:00', moment.ISO_8601).format() ;
			}
			if(dataFinal){
				pesquisaUso.dataFinal =  moment( dataFinal , moment.ISO_8601).format("YYYY-MM-DDT23:59:59-03:00") ;

			}else{
				dataFinal = new Date();
				pesquisaUso.dataFinal =  moment( dataFinal , moment.ISO_8601).format() ;
			}
			console.log(pesquisaUso.dataInicial);
			console.log(pesquisaUso.dataFinal);
			var cfg = {
					type: "POST",
					url : "/carControl/rest/usoRest/relatorioDeUso/",
					data : pesquisaUso,
					success: function (listaUsoDeVeiculo) {
						lista = "";
						lista = listaUsoDeVeiculo;
						CARCONTROL.relatorioUso.exibelista(listaUsoDeVeiculo);

						if ( listaUsoDeVeiculo[0] != 'undefined' && listaUsoDeVeiculo[0] != null) {

						}else{
							var cfg = {
									title: "Mensagem",
									height: 200,
									width: 500,
									modal: true,
									buttons:{
										"Ok": function(){
											$(this).dialog("close");
										}
									}
							};
							$("#msg").html("<br>Nenhum histórico de uso encontrado... ");
							$("#msg").dialog(cfg);
						}

					},
					error : function(err) {
						var cfg = {
								title: "Mensagem",
								height: 300,
								width: 500,
								modal: true,
								buttons:{
									"Ok": function(){
										$(this).dialog("close");
									}
								}
						};
						$("#msg").html("Erro ao pesquisar uso de Veiculo. " + err.responseText);
						$("#msg").dialog(cfg);
					}
			};
			CARCONTROL.ajax.post(cfg);
		}
	};
	CARCONTROL.relatorioUso.exibelista = function(listaUsoDeVeiculo){

		html ="";
		html ="<div id='geraPDF'> <table class='table'>";
		if(listaUsoDeVeiculo != undefined && listaUsoDeVeiculo.length > 0 && listaUsoDeVeiculo[0].id != undefined){
			html += "<thead class='thead-inverse'>";
			if(pesquisa==1){
				html += "<h4>Historico de Uso de Veiculo por Condutor: <b>"+listaUsoDeVeiculo[0].condutor.nome+' '+
				listaUsoDeVeiculo[0].condutor.snome+"</b></h4><thead class='thead-inverse'>"+
				"<tr><th>Veiculo</th><th>Saida</th><th>Km Saida</th><th>Retorno</th><th>Km Retorno</th></tr></thead><tbody>";
				for(var i=0; i<listaUsoDeVeiculo.length; i++){
					html += "<tr>"+
					"<td>"+listaUsoDeVeiculo[i].veiculo.modelo+' '+listaUsoDeVeiculo[i].veiculo.placa+"</td>"+
					"<td>"+moment(listaUsoDeVeiculo[i].dataHoraSaida).format("DD/MM/YYYY HH:mm:ss")+"</td>"+
					"<td>"+listaUsoDeVeiculo[i].kmInicio+"</td>"+
					"<td>"+moment(listaUsoDeVeiculo[i].dataHoraRetorno).format("DD/MM/YYYY HH:mm:ss")+"</td>"+
					"<td>"+listaUsoDeVeiculo[i].kmFim+"</td>"+
					"</tr>";
				}
			}else{
				html += "<h4>Historico de Uso por Veiculo: <b>"+listaUsoDeVeiculo[0].veiculo.marca+' '+listaUsoDeVeiculo[0].veiculo.modelo+
				"</b> Placa: <b> "+listaUsoDeVeiculo[0].veiculo.placa+"</h4>" +
						"<tr><th>Condutor</th><th>Data/hora do abastecimento</th><th> Km </th><th>" +
						"Volume(Lts)</th><th>Valor</th></tr></thead>";
				for(var i=0; i<listaUsoDeVeiculo.length; i++){
					html += "<tr>"+
					"<td>"+listaUsoDeVeiculo[i].condutor.nome+' '+listaUsoDeVeiculo[i].condutor.snome+"</td>"+
					"<td>"+moment(listaUsoDeVeiculo[i].dataHoraSaida).format("DD/MM/YYYY HH:mm:ss")+"</td>"+
					"<td>"+listaUsoDeVeiculo[i].kmInicio+"</td>"+
					"<td>"+moment(listaUsoDeVeiculo[i].dataHoraRetorno).format("DD/MM/YYYY HH:mm:ss")+"</td>"+
					"<td>"+listaUsoDeVeiculo[i].kmFim+"</td>"+
					"</tr>";
				}
				html += "</tbody>";
			}
		}else{
			html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
		}
		console.log(listaUsoDeVeiculo.length);
		html += "</table> </div>" +
		"<div class='form-group text-right'><label for='button'></label>" +
		"<button type = 'button' class = 'btn btn-info legenda' onclick='CARCONTROL.relatorioUso.geraPDF()'>Gerar PDF</button></div>";



//		"<button type = 'button' class = 'btn btn-info legenda' onclick ='CARCONTROL.relatorioUso.geraPDF("+listaUsoDeVeiculo+)>Gerar PDF</button></div>";


		//"<td>" + '<a onclick=' + 'CARCONTROL.veiculoSaida.carregarVeiculo("' + listaVeiculo[i].id + '")' + '>Reg. saida</a>' + "</td>" + "</tr>";


		$("#listaRelatorio").html(html).trigger('blur');
		var x = document.getElementById('listaRelatorio');
		x.style.display = 'block';


	};
	CARCONTROL.relatorioUso.geraPDF = function(){

		if(lista != undefined && lista.length > 0 && lista[0].id != undefined){
			console.log('lista ok');
		}else{
			console.log("deu ruim");
		}

		var ip=1;
		var il = 48;
		var nome;	
		var veiculo;
		var doc = new jsPDF();
		//Cabeçalho - inicio
		doc.setFontSize(32);
		doc.setFontStyle('bold');
		doc.text(20, 20, 'CarControl');	
		doc.setFontStyle('normal');
		doc.setFontSize(10);
		doc.text(38, 23, 'Controle de Veiculos e Frotas');
		doc.setFontStyle('bold');
		doc.setFontSize(12);
		doc.setLineWidth(0.1);		//lines(lines, x, y, scale, style, closed)

		if(pesquisa==1){

			nome = lista[0].condutor.nome+" "+lista[0].condutor.snome;
			doc.text(93, 32, nome);			
			doc.line(18, 35, 193, 35);
			doc.text(25, 40, 'Veiculo');
			doc.text(72, 40, 'Saida');
			doc.text(102, 40, 'Km Saida');
			doc.text(138, 40, 'Retorno');
			doc.text(165, 40, 'Km Retorno');
			doc.setLineWidth(0.5);
			doc.line(18, 43, 193, 43);
			doc.setFontStyle('normal');
			doc.setFontSize(10);
			doc.text(20, 32, 'Historico de Uso por condutor: ');	
			doc.setLineWidth(0.1);
			doc.text (175,280,"pagina "+ip);
			//Cabeçalho - fim

			for(i in lista){
				doc.text(20, il, lista[i].veiculo.modelo+' '+lista[i].veiculo.placa);
				doc.text(60, il, moment(lista[i].dataHoraSaida).format("DD/MM/YYYY HH:mm:ss"));
				doc.text(110, il, ""+lista[i].kmInicio);
				doc.text(130, il, moment(lista[i].dataHoraRetorno).format("DD/MM/YYYY HH:mm:ss"));
				doc.text(180, il, ""+lista[i].kmFim );
				doc.line(18, il+2, 193, il+2);
				if(il < 270){
					il= il +6;	
				}else{
					doc.addPage();
					ip++;

					//Cabeçalho - inicio
					doc.setFontSize(32);
					doc.setFontStyle('bold');
					doc.text(20, 20, 'CarControl');	
					doc.setFontStyle('normal');
					doc.setFontSize(10);
					doc.text(38, 23, 'Controle de Veiculos e Frotas');
					doc.setFontStyle('bold');
					doc.setFontSize(12);
					doc.setLineWidth(0.1);		//lines(lines, x, y, scale, style, closed)

					nome = lista[0].condutor.nome+" "+lista[0].condutor.snome;
					doc.text(93, 32, nome);			
					doc.line(18, 35, 193, 35);
					doc.text(25, 40, 'Veiculo');
					doc.text(72, 40, 'Saida');
					doc.text(102, 40, 'Km Saida');
					doc.text(138, 40, 'Retorno');
					doc.text(165, 40, 'Km Retorno');
					doc.setLineWidth(0.5);
					doc.line(18, 43, 193, 43);
					doc.setFontStyle('normal');
					doc.setFontSize(10);
					doc.text(20, 32, 'Historico de Uso por Condutor: ');	
					doc.setLineWidth(0.1);
					doc.text (175,280,"pagina "+ip);
					//Cabeçalho - fim
					il = 48;
				}
			}
		}else{
			if(pesquisa==2){

				veiculo = lista[0].veiculo.modelo+" "+lista[0].veiculo.cor+" Placa: "+lista[0].veiculo.placa;
				doc.text(93, 32, veiculo);			
				doc.line(18, 35, 193, 35);
				doc.text(25, 40, 'Condutor');
				doc.text(72, 40, 'Saida');
				doc.text(102, 40, 'Km Saida');
				doc.text(138, 40, 'Retorno');
				doc.text(165, 40, 'Km Retorno');
				doc.setLineWidth(0.5);
				doc.line(18, 43, 193, 43);
				//Corpo
				doc.setFontStyle('normal');
				doc.setFontSize(10);
				doc.text(20, 32, 'Historico de Uso por Veiculo: ');	

				doc.setLineWidth(0.1);
				doc.text (175,280,"pagina "+ip);

				il = 48
				for(i in lista){

					doc.text(20, il, lista[i].condutor.nome+' '+lista[i].condutor.snome);
					doc.text(60, il, moment(lista[i].dataHoraSaida).format("DD/MM/YYYY HH:mm:ss"));
					doc.text(110, il, ""+lista[i].kmInicio);
					doc.text(130, il, moment(lista[i].dataHoraRetorno).format("DD/MM/YYYY HH:mm:ss"));
					doc.text(180, il, ""+lista[i].kmFim );
					doc.line(18, il+2, 193, il+2);
					if(il < 270){
						il= il +6;	
					}else{
						doc.addPage();
						ip++;
						//Cabeçalho - inicio
						doc.setFontSize(32);
						doc.setFontStyle('bold');
						doc.text(20, 20, 'CarControl');	
						doc.setFontStyle('normal');
						doc.setFontSize(10);
						doc.text(38, 23, 'Controle de Veiculos e Frotas');
						doc.setFontStyle('bold');
						doc.setFontSize(12);
						doc.setLineWidth(0.1);		//lines(lines, x, y, scale, style, closed)

						veiculo = lista[0].veiculo.modelo+" "+lista[0].veiculo.cor+" Placa: "+lista[0].veiculo.placa;
						doc.text(93, 32, veiculo);			
						doc.line(18, 35, 193, 35);
						doc.text(25, 40, 'Veiculo');
						doc.text(72, 40, 'Saida');
						doc.text(102, 40, 'Km Saida');
						doc.text(138, 40, 'Retorno');
						doc.text(165, 40, 'Km Retorno');
						doc.setLineWidth(0.5);
						doc.line(18, 43, 193, 43);
						doc.setFontStyle('normal');
						doc.setFontSize(10);
						doc.text(20, 32, 'Historico de Uso por Veiculo: ');	
						doc.setLineWidth(0.1);
						doc.text (175,280,"pagina "+ip);
						//Cabeçalho - fim
					}
				}	
			}
		}
		
		doc.save('test.pdf');
		
	};
});
