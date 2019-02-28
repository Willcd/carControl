CARCONTROL.relatorioAbastecimento = new Object();

$(document).ready(function() {

	var tPesquisa;
	var lista;
	var html;
	CARCONTROL.relatorioAbastecimento.tipoPesquisa = function(){
		tPesquisa = $("#tipoPesquisa option:selected").val();
		if (tPesquisa != 0){
			var x = null;
			if(tPesquisa ==1){
				var cfg = {
						type: "GET",
						url : "/carControl/rest/condutorRest/buscaCondutorPorNome/"+x,
						success: function (listaCondutor) {
							CARCONTROL.relatorioAbastecimento.alimentaListaCondutorNoSelect(listaCondutor);
							$("#labelPequisa").html("Selecione um Condutor");

						},
						error: function(err){
							alert("Erro ao consultar condutores..." + err.responseText);
						}
				};
				CARCONTROL.ajax.get(cfg);
			}else{
				if(tPesquisa ==2){

					var cfg = {
							type: "GET",
							url : "/carControl/rest/veiculoRest/buscaVeiculoPorPlaca/"+x,
							success: function (listaVeiculo) {
								CARCONTROL.relatorioAbastecimento.alimentaListaVeiculoNoSelect(listaVeiculo);
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
	CARCONTROL.relatorioAbastecimento.alimentaListaCondutorNoSelect = function(listaCondutor){
		var condutores = '<option value = "" >Selecione</option>';
		for(var i=0; i<listaCondutor.length; i++){
			condutores += "<option value = "+listaCondutor[i].id+">"+listaCondutor[i].nome+"</option>";     
		}
		$("#listaPesquisa").html(condutores);
	};
	CARCONTROL.relatorioAbastecimento.alimentaListaVeiculoNoSelect = function(listaVeiculo){
		var veiculos = '<option value = "" >Selecione</option>';
		for(var i=0; i<listaVeiculo.length; i++){
			veiculos += "<option value = "+listaVeiculo[i].id+">"+listaVeiculo[i].modelo+"</option>";     
		}
		$("#listaPesquisa").html(veiculos);
	};
	CARCONTROL.relatorioAbastecimento.pesquisaAbastecimentoDeVeiculo = function(){
		tPesquisa = $("#tipoPesquisa option:selected").val();
		var dataInicial = $("#dataInicial").val();
		var dataFinal = $("#dataFinal").val();	
		$("#listaRelatorio").html("").trigger('blur');

		if(tPesquisa == 0){
			alert("Defina os parametros de pesquisa! ");
		}else{
			var pesquisa = new Object();
			pesquisa.tipoPesquisa = tPesquisa;
			if(tPesquisa == 1){
				pesquisa.idCondutor =  $("#listaPesquisa option:selected").val();
			}
			if(tPesquisa == 2){
				pesquisa.idVeiculo =  $("#listaPesquisa option:selected").val();
			}
			if(dataInicial){

				pesquisa.dataInicial =  moment( dataInicial , moment.ISO_8601).format("YYYY-MM-DDT00:00:00-03:00") ;
			}else{
				pesquisa.dataInicial =  moment('2017-10-25T00:00:00-03:00', moment.ISO_8601).format() ;
			}
			if(dataFinal){
				pesquisa.dataFinal =  moment( dataFinal , moment.ISO_8601).format("YYYY-MM-DDT23:59:59-03:00") ;

			}else{
				dataFinal = new Date();
				pesquisa.dataFinal =  moment( dataFinal , moment.ISO_8601).format() ;
			}
			
			var cfg = {
					type: "POST",
					url : "/carControl/rest/abastecimentoRest/relatorioDeAbastecimento/",
					data : pesquisa,
					success: function (listaAbastecimento) {
						lista = "";
						lista = listaAbastecimento;
						CARCONTROL.relatorioAbastecimento.exibeLista(listaAbastecimento);

						if ( listaAbastecimento[0] != 'undefined' && listaAbastecimento[0] != null) {

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
	CARCONTROL.relatorioAbastecimento.exibeLista = function(listaAbastecimento){

		html ="";
		html ="<div id='geraPDF'> <table class='table'>";
		if(listaAbastecimento != undefined && listaAbastecimento.length > 0 && listaAbastecimento[0].id != undefined){
			if(tPesquisa==1){
				html += "<h4>Historico de Abastecimentos por Condutor: <b>"+listaAbastecimento[0].condutor.nome+' '+
				listaAbastecimento[0].condutor.snome+"</b></h4><thead class='thead-inverse'>";

				html +="<tr><th>Veiculo</th><th>Data/hora abastecimento</th><th>Km</th><th>Combustivel</th>" +
						"<th>Volume(Lts)</th><th>Valor</th></tr></thead><tbody>";
				for(var i=0; i<listaAbastecimento.length; i++){
					html += "<tr>"+
					"<td>"+listaAbastecimento[i].veiculo.modelo+' '+listaAbastecimento[i].veiculo.placa+"</td>"+
					"<td>"+moment(listaAbastecimento[i].dataHoraAbastec).format("DD/MM/YYYY HH:mm:ss")+"</td>"+
					"<td>"+listaAbastecimento[i].km+"</td>"+
					"<td>"+listaAbastecimento[i].tipoCombust+"</td>"+
					"<td>"+listaAbastecimento[i].volume+"</td>"+
					"<td>"+listaAbastecimento[i].valorPg+"</td>"+
					"</tr>";
				
				}
			}else{
				html += "<h4>Historico de Abastecimentos por Veiculo: <b>"+listaAbastecimento[0].veiculo.marca+' '+listaAbastecimento[0].veiculo.modelo+
				"</b> Placa: <b> "+listaAbastecimento[0].veiculo.placa+"</h4>" +
						"<tr><th>Condutor</th><th>Data/hora do abastecimento</th><th> Km </th><th>" +
						"Volume(Lts)</th><th>Valor</th></tr></thead>";
				for(var i=0; i<listaAbastecimento.length; i++){
					html += "<tr>"+
					"<td>"+listaAbastecimento[i].condutor.nome+' '+listaAbastecimento[i].condutor.snome+"</td>"+
					"<td>"+moment(listaAbastecimento[i].dataHoraAbastec).format("DD/MM/YYYY HH:mm:ss")+"</td>"+
					"<td>"+listaAbastecimento[i].km+"</td>"+
					"<td>"+listaAbastecimento[i].volume+"</td>"+
					"<td>"+listaAbastecimento[i].valorPg+"</td>"+
					"</tr>";
				}
				html += "</tbody>";
			}
		}else{
			html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
		}
		console.log(listaAbastecimento.length);
		html += "</table> </div>" +
		"<div class='form-group text-right'><label for='button'></label>" +
		"<button type = 'button' class = 'btn btn-info legenda' onclick='CARCONTROL.relatorioAbastecimento.geraPDF()'>Gerar PDF</button></div>";

		//"<button type = 'button' class = 'btn btn-info legenda' onclick ='CARCONTROL.relatorioUso.geraPDF("+listaUsoDeVeiculo+)>Gerar PDF</button></div>";
		//"<td>" + '<a onclick=' + 'CARCONTROL.veiculoSaida.carregarVeiculo("' + listaVeiculo[i].id + '")' + '>Reg. saida</a>' + "</td>" + "</tr>";

		$("#listaRelatorio").html(html).trigger('blur');
		//var x = document.getElementById('listaRelatorio');
		//x.style.display = 'block';
	};
	CARCONTROL.relatorioAbastecimento.geraPDF = function(){

		if(lista != undefined && lista.length > 0 && lista[0].id != undefined){
			console.log('lista ok');
		}else{
			console.log("deu ruim");
		}

		var ip=1;
		var il = 48;
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

		if(tPesquisa==1){

			doc.text(93, 32, lista[0].condutor.nome+" "+lista[0].condutor.snome);			
			doc.line(18, 35, 193, 35);
			doc.text(23, 41, 'Veiculo');
			doc.text(47, 41, 'Data/hora abastecimento');
			doc.text(105, 41, 'Km');
			doc.text(120, 41, 'Combustivel');
			doc.text(156, 41, 'Volume');
			doc.text(180, 41, 'Valor');
			doc.setLineWidth(0.5);
			doc.line(18, 43, 193, 43);
			doc.setFontStyle('normal');
			doc.setFontSize(10);
			doc.text(20, 32, 'Historico de Abastecimentos por condutor: ');	
			doc.setLineWidth(0.1);
			doc.text (175,280,"pagina "+ip);
			//Cabeçalho - fim

			for(i in lista){
				
			
				
				doc.text(20, il, lista[i].veiculo.modelo+' '+lista[i].veiculo.placa);
				doc.text(58, il, moment(lista[i].dataHoraAbastec).format("DD/MM/YYYY HH:mm:ss"));
				doc.text(106, il, ""+lista[i].km);
				doc.text(125, il, lista[i].tipoCombust);
				doc.text(160, il, ""+lista[i].volume);
				doc.text(185, il, ""+lista[i].valorPg);
			
				doc.line(18, il+2, 193, il+2);
				if(il < 270){
					il= il +6;	
				}else{
					doc.addPage();
					ip++;

					//Cabeçalho - Condutor - inicio
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
					doc.text(23, 41, 'Veiculo');
					doc.text(47, 41, 'Data/hora abastecimento');
					doc.text(105, 41, 'Km');
					doc.text(120, 41, 'Combustivel');
					doc.text(156, 41, 'Volume');
					doc.text(180, 41, 'Valor');
					doc.setLineWidth(0.5);
					doc.line(18, 43, 193, 43);
					doc.setFontStyle('normal');
					doc.setFontSize(10);
					doc.text(20, 32, 'Historico de Abastecimentos por condutor: ');	
					doc.setLineWidth(0.1);
					doc.text (175,280,"pagina "+ip);
					//Cabeçalho -Condutor- fim
					il = 48;
				}
			}
		}else{
			if(tPesquisa==2){
				
				
				doc.text(93, 32, lista[0].veiculo.marca+" "+lista[0].veiculo.modelo);	
				doc.text(146, 32, lista[0].veiculo.placa);	

				doc.line(18, 35, 193, 35);
				doc.text(21, 41, 'Condutor');
				doc.text(47, 41, 'Data/hora abastecimento');
				doc.text(105, 41, 'Km');
				doc.text(120, 41, 'Combustivel');
				doc.text(156, 41, 'Volume');
				doc.text(180, 41, 'Valor');
				doc.setLineWidth(0.5);
				doc.line(18, 43, 193, 43);
				doc.setFontStyle('normal');
				doc.setFontSize(10);
				
				
				doc.text(20, 32, 'Historico de Abastecimentos por Veiculo: ');	
				doc.text(130, 32, ' Placa: ');	

				doc.setLineWidth(0.1);
				doc.text (175,280,"pagina "+ip);

				il = 48
				for(i in lista){
					
					
					doc.text(20, il, lista[i].condutor.nome+' '+lista[i].condutor.snome);
					doc.text(58, il, moment(lista[i].dataHoraAbastec).format("DD/MM/YYYY HH:mm:ss"));
					doc.text(106, il, ""+lista[i].km);
					doc.text(125, il, lista[i].tipoCombust);
					doc.text(160, il, ""+lista[i].volume);
					doc.text(185, il, ""+lista[i].valorPg);
					
					doc.line(18, il+2, 193, il+2);
					if(il < 270){
						il= il +6;	
					}else{
						doc.addPage();
						ip++;
						//Cabeçalho - Veiculo - inicio
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
						doc.text(23, 41, 'Veiculo');
						doc.text(47, 41, 'Data/hora abastecimento');
						doc.text(105, 41, 'Km');
						doc.text(120, 41, 'Combustivel');
						doc.text(156, 41, 'Volume');
						doc.text(180, 41, 'Valor');
						doc.setLineWidth(0.5);
						doc.line(18, 43, 193, 43);
						doc.setFontStyle('normal');
						doc.setFontSize(10);
						doc.text(20, 32, 'Historico de Abastecimentos por condutor: ');	
						doc.setLineWidth(0.1);
						doc.text (175,280,"pagina "+ip);
						//Cabeçalho - Veiculo - fim
					}
				}	
			}
		}

		doc.save('test.pdf');

	};
});
