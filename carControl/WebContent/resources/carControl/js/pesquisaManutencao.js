CARCONTROL.relatorioManutencao = new Object();

$(document).ready(function() {

	var tPesquisa;
	var lista;
	var html;
	CARCONTROL.relatorioManutencao.tipoPesquisa = function(){
		tPesquisa = $("#tipoPesquisa option:selected").val();
		if (tPesquisa != 0){
			var x = null;
			if(tPesquisa ==1){
				var cfg = {
						type: "GET",
						url : "/carControl/rest/condutorRest/buscaCondutorPorNome/"+x,
						success: function (listaCondutor) {
							CARCONTROL.relatorioManutencao.alimentaListaCondutorNoSelect(listaCondutor);
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
								CARCONTROL.relatorioManutencao.alimentaListaVeiculoNoSelect(listaVeiculo);
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
	CARCONTROL.relatorioManutencao.alimentaListaCondutorNoSelect = function(listaCondutor){
		var condutores = '<option value = "" >Selecione</option>';
		for(var i=0; i<listaCondutor.length; i++){
			condutores += "<option value = "+listaCondutor[i].id+">"+listaCondutor[i].nome+"</option>";     
		}
		$("#listaPesquisa").html(condutores);
	};
	CARCONTROL.relatorioManutencao.alimentaListaVeiculoNoSelect = function(listaVeiculo){
		var veiculos = '<option value = "" >Selecione</option>';
		for(var i=0; i<listaVeiculo.length; i++){
			veiculos += "<option value = "+listaVeiculo[i].id+">"+listaVeiculo[i].modelo+"</option>";     
		}
		$("#listaPesquisa").html(veiculos);
	};
	CARCONTROL.relatorioManutencao.pesquisaManutencao = function(){
		tPesquisa = $("#tipoPesquisa option:selected").val();
		var dataInicial = $("#dataInicial").val();
		var dataFinal = $("#dataFinal").val();	
		$("#listaRelatorio").html("").trigger('blur');

		if(tPesquisa == 0){
			alert("Defina os parametros de pesquisa! ");
		}else{
			var pesquisa = new Object();
			
			pesquisa.tipoServico = $("#selectServico option:selected").val();
			
			
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
					url : "/carControl/rest/manutencaoRest/relatorioDeManutencao/",
					data : pesquisa,
					success: function (listaManutencao) {
						lista = "";
						lista = listaManutencao;
						CARCONTROL.relatorioManutencao.exibeLista(listaManutencao);

						if ( listaManutencao[0] != 'undefined' && listaManutencao[0] != null) {

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
	CARCONTROL.relatorioManutencao.exibeLista = function(listaManutencao){

		html ="";
		html ="<div id='geraPDF'> <table class='table'>";
		if(listaManutencao != undefined && listaManutencao.length > 0 && listaManutencao[0].id != undefined){
			if(tPesquisa==1){
				html += "<h4>Condutor: <b>"+listaManutencao[0].condutor.nome+' '+
				listaManutencao[0].condutor.snome+"</b></h4><thead class='thead-inverse'>";

				html +="<tr><th>Veiculo</th><th>Data</th><th>Km</th><th>Serviço</th>" +
						"<th>Peças</th><th>Mão de Obra</th><th>Total</th></tr></thead><tbody>";
				for(var i=0; i<listaManutencao.length; i++){
					html += "<tr>"+
					"<td>"+listaManutencao[i].veiculo.modelo+' '+listaManutencao[i].veiculo.placa+"</td>"+
					"<td>"+moment(listaManutencao[i].dataHoraServico).format("DD/MM/YYYY")+"</td>"+
					"<td>"+listaManutencao[i].km+"</td>"+
					"<td>"+listaManutencao[i].tipoServico+"</td>"+

					"<td>"+listaManutencao[i].custoPecas+"</td>"+
					"<td>"+listaManutencao[i].maoDeObra+"</td>"+
					"<td>"+listaManutencao[i].valorTotal+"</td>"+
					"</tr>";
				}
			}else{
				
				html += "<h4>Veiculo: <b>"+listaManutencao[0].veiculo.marca+' '+listaManutencao[0].veiculo.modelo+
				"</b> Placa: <b> "+listaManutencao[0].veiculo.placa+"</b></h4><thead class='thead-inverse'>";

				html +="<tr><th>Condutor</th><th>Data</th><th>Km</th><th>Serviço</th>" +
						"<th>Peças</th><th>Mão de Obra</th><th>Total</th></tr></thead><tbody>";
				for(var i=0; i<listaManutencao.length; i++){
					html += "<tr>"+
					"<td>"+listaManutencao[i].condutor.nome+' '+listaManutencao[i].condutor.snome+"</td>"+
					"<td>"+moment(listaManutencao[i].dataHoraServico).format("DD/MM/YYYY")+"</td>"+
					"<td>"+listaManutencao[i].km+"</td>"+
					"<td>"+listaManutencao[i].tipoServico+"</td>"+

					"<td>"+listaManutencao[i].custoPecas+"</td>"+
					"<td>"+listaManutencao[i].maoDeObra+"</td>"+
					"<td>"+listaManutencao[i].valorTotal+"</td>"+
					"</tr>";

				}
				html += "</tbody>";
			}
		}else{
			html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
		}
		console.log(listaManutencao.length);
		html += "</table> </div>" +
		"<div class='form-group text-right'><label for='button'></label>" +
		"<button type = 'button' class = 'btn btn-info legenda' onclick='CARCONTROL.relatorioManutencao.geraPDF()'>Gerar PDF</button></div>";

		$("#listaRelatorio").html(html).trigger('blur');
		//var x = document.getElementById('listaRelatorio');
		//x.style.display = 'block';
	};
	CARCONTROL.relatorioManutencao.geraPDF = function(){

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

			doc.text(100, 32, lista[0].condutor.nome+" "+lista[0].condutor.snome);			
			doc.line(18, 35, 193, 35);
			doc.text(23, 41, 'Veiculo');
			doc.text(65, 41, 'Data');
			doc.text(90, 41, 'Km');
			doc.text(108, 41, 'Serviço');
			doc.text(132, 41, 'Peças');
			doc.text(152, 41, 'Mão de obra');
			doc.text(182, 41, 'Total');

			doc.setLineWidth(0.5);
			doc.line(18, 43, 193, 43);
			doc.setFontStyle('normal');
			doc.setFontSize(10);
			doc.text(20, 32, 'Historico de Manutenção e Revisão por condutor: ');	
			doc.setLineWidth(0.1);
			doc.text (175,280,"pagina "+ip);
			//Cabeçalho - fim

			for(i in lista){
				
			
				
				doc.text(20, il, lista[i].veiculo.modelo+' '+lista[i].veiculo.placa);				//(23, 41, 'Veiculo')
				doc.text(61, il, moment(lista[i].dataHoraServico).format("DD/MM/YYYY"));	        //(58, 41, 'Data/hora')
				doc.text(90, il, ""+lista[i].km);													//(84, 41, 'Km')
				doc.text(108, il, lista[i].tipoServico);											//(104, 41, 'Serviço')
				doc.text(134, il, ""+lista[i].custoPecas);											//(128, 41, 'Peças')
				doc.text(159, il, ""+lista[i].maoDeObra);											//(150, 41, 'Mão de obra')
				doc.text(184, il, ""+lista[i].valorTotal);											//(180, 41, 'Total')

				doc.line(18, il+2, 193, il+2);
				if(il < 270){
					il= il +6;	
				}else{
					doc.addPage();
					ip++;

					//Cabeçalho - Condutor - inicio
					doc.setFontSize(32);
					doc.setFontStyle('bold');
					doc.text(20,20,'CarControl');	
					doc.setFontStyle('normal');
					doc.setFontSize(10);
					doc.text(38,23,'Controle de Veiculos e Frotas');
					doc.setFontStyle('bold');
					doc.setFontSize(12);
					doc.setLineWidth(0.1);		//lines(lines, x, y, scale, style, closed)
					
					doc.text(100, 32, lista[0].condutor.nome+" "+lista[0].condutor.snome);			
					doc.line(18, 35, 193, 35);
					doc.text(23, 41, 'Veiculo');
					doc.text(65, 41, 'Data');
					doc.text(90, 41, 'Km');
					doc.text(108, 41, 'Serviço');
					doc.text(132, 41, 'Peças');
					doc.text(152, 41, 'Mão de obra');
					doc.text(182, 41, 'Total');

					doc.setLineWidth(0.5);
					doc.line(18, 43, 193, 43);
					doc.setFontStyle('normal');
					doc.setFontSize(10);
					doc.text(20, 32, 'Historico de Manutenção e Revisão por condutor: ');	
					doc.setLineWidth(0.1);
					doc.text (175,280,"pagina "+ip);
					//Cabeçalho - fim			
					il = 48;
				}
			}
		}else{
			if(tPesquisa==2){
								
				doc.text(102, 32, lista[0].veiculo.marca+" "+lista[0].veiculo.modelo);	
				doc.text(168, 32, lista[0].veiculo.placa);	

				doc.line(18, 35, 193, 35);
				doc.text(23, 41, 'Condutor');
				doc.text(65, 41, 'Data');
				doc.text(90, 41, 'Km');
				doc.text(108, 41, 'Serviço');
				doc.text(132, 41, 'Peças');
				doc.text(152, 41, 'Mão de obra');
				doc.text(182, 41, 'Total');
				doc.setLineWidth(0.5);
				doc.line(18, 43, 193, 43);
				doc.setFontStyle('normal');
				doc.setFontSize(10);
				
				doc.text(20, 32, 'Historico de Manutenção e Revisão por Veiculo: ');	
				doc.text(150, 32, ' Placa: ');	

				doc.setLineWidth(0.1);
				doc.text (175,280,"pagina "+ip);

				il = 48
				for(i in lista){
					
					
					doc.text(20, il, lista[i].condutor.nome+' '+lista[i].condutor.snome);
					doc.text(61, il, moment(lista[i].dataHoraServico).format("DD/MM/YYYY"));	        //(58, 41, 'Data/hora')
					doc.text(90, il, ""+lista[i].km);													//(84, 41, 'Km')
					doc.text(108, il, lista[i].tipoServico);											//(104, 41, 'Serviço')
					doc.text(134, il, ""+lista[i].custoPecas);											//(128, 41, 'Peças')
					doc.text(159, il, ""+lista[i].maoDeObra);											//(150, 41, 'Mão de obra')
					doc.text(184, il, ""+lista[i].valorTotal);	
					
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

						doc.text(102, 32, lista[0].veiculo.marca+" "+lista[0].veiculo.modelo);	
						doc.text(168, 32, lista[0].veiculo.placa);	

						doc.line(18, 35, 193, 35);
						doc.text(23, 41, 'Condutor');
						doc.text(65, 41, 'Data');
						doc.text(90, 41, 'Km');
						doc.text(108, 41, 'Serviço');
						doc.text(132, 41, 'Peças');
						doc.text(152, 41, 'Mão de obra');
						doc.text(182, 41, 'Total');
						doc.setLineWidth(0.5);
						doc.line(18, 43, 193, 43);
						doc.setFontStyle('normal');
						doc.setFontSize(10);
						
						doc.text(20, 32, 'Historico de Manutenção e Revisão por Veiculo: ');	
						doc.text(150, 32, ' Placa: ');	
						doc.setLineWidth(0.1);
						doc.text (175,280,"pagina "+ip);
						//Cabeçalho - Veiculo - fim
					}
				}	
			}
		}
		Data = new Date();
		
		doc.save('Historico de Manutenção e Revisão'+moment(Data).format("DD/MM/YYYY HH/mm/ss")+'.pdf');

	};
});
