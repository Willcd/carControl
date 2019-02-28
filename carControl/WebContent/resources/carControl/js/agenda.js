
CARCONTROL.agendaUso = new Object();

$(document).ready(function() {	
	// select do formulario
	CARCONTROL.agendaUso.buscaListaVeiculo = function(){
		var x = null;
		var cfg = {
				type: "GET",
				url : "/carControl/rest/veiculoRest/buscaVeiculoPorPlaca/"+x,
				success: function (listaVeiculo) {
					CARCONTROL.agendaUso.exibirAgendamento(listaVeiculo);
				},
				error: function(err){
					alert("Erro ao consultar os veiculos..." + err.responseText);
				}
		};
		CARCONTROL.ajax.get(cfg);
	}
	CARCONTROL.agendaUso.exibirAgendamento = function(listaVeiculo){
		var veiculos = '<option value = "" >Selecione</option>';
		var descricaoVeiculo;
		var i;
		for(i in listaVeiculo){
			descricaoVeiculo = listaVeiculo[i].marca+" "+listaVeiculo[i].modelo+" placa: "+listaVeiculo[i].placa;
			veiculos += "<option value = "+listaVeiculo[i].id+">"+descricaoVeiculo+"</option>";     
		}
		$("#selectVeiculo").html(veiculos);
		var cfg = {
				title: "Agendar veiculo",
				height: 330,
				width:650,
				modal:true,
				buttons: {
					"Salvar agendamento": function(){
						var calendar = $('#calendar').fullCalendar('getCalendar');
						var dataAtual = calendar.moment().format();
						//var dataAtual =  moment( calendar , moment.ISO_8601).format();
						var veiculo = $("#selectVeiculo option:selected").val();
						var dataHoraSaida = $("#dataHoraSaida").val();	
						var dataHoraRetorno = $("#dataHoraRetorno").val();

						var agend = new Object();
						agend.idVeiculo = veiculo;
						agend.dataHoraSaida =  moment( dataHoraSaida , moment.ISO_8601).format();
						agend.dataHoraRetorno =  moment( dataHoraRetorno , moment.ISO_8601).format();
						console.log("dataAtual= "+dataAtual);
						console.log("dataHoraSaida= "+dataHoraSaida);

						if(dataHoraSaida <= dataAtual){
							alert("Data de Saida nao pode ser anterior a data atual");
							$(this).dialog("close");
						}else{
							if(dataHoraSaida > dataHoraRetorno){
								alert("Data e hora de Retorno nao pode ser anterior a data e hora de Saida");
								$(this).dialog("close");
							}else{
								agend.obs =  $("#obs").val();
								console.log(agend);
								var cfg = {
										type: "POST",
										url: "/carControl/rest/agendarest/appointment/",
										data: agend,
										success:function(msg){
											alert(msg);
											return false;
											//window.location.href="http://localhost:8080/carControl/resources/carControl/agenda/agenda.html";
										},
										error : function(err) {
											alert("Erro ao registrar agendamento de Veiculo: " + err.responseText);
											return false;
										}
								};
								CARCONTROL.ajax.post(cfg);
								$(this).dialog("close");
								CARCONTROL.agendaUso.atualizar();
							}
						}
						//CARCONTROL.agendaUso.exibirAgenda(undefined);
					},"Cancelar": function(){
						$(this).dialog("close");
					}


				}		
		};
		$("#frmAgendaVeiculo").dialog(cfg);
	};
	/*Configurações do Calendar*/
	var date = new Date();
	var d = date.getDate(),
	m = date.getMonth(),
	y = date.getFullYear();

	$('#calendar').fullCalendar({
		height: 400,
		lang: 'pt-br',
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listMonth'
		},
		buttonText: {
			today: 'Hoje',
			month: 'Mês',
			week: 'Semana',
			day: 'Dia',
			list: 'Lista'
		},
		eventRender: function(event, element) {
			element.attr('title', event.tooltip);
		},
		editable: true,
		eventDrop: function(event, delta, revertFunc, jsEvent, ui, view,start, end) {

			CARCONTROL.agendaUso.atualizarData(event.start.format(),event.id);
		},
		eventClick: function(event) {
			CARCONTROL.agendaUso.infoAgendamento(event);
		}
	});
	//exibir agenda
	CARCONTROL.agendaUso.exibirAgenda = function(listaDeAgendamento){

		if(listaDeAgendamento != undefined && listaDeAgendamento.length > 0 && listaDeAgendamento[0].id != undefined){

			console.log(listaDeAgendamento);
			var i;
			for(i in listaDeAgendamento){

				var dts = "";
				var dtr = "";
				var evento = "";
				dts =  moment( listaDeAgendamento[i].dataHoraSaida).format("YYYY-MM-DD HH:mm") ;
				dtr =  moment( listaDeAgendamento[i].dataHoraRetorno).format("YYYY-MM-DD HH:mm") ;
				evento = listaDeAgendamento[i].veiculo.placa;
				tooltip = listaDeAgendamento[i].condutor.nome;
				tooltip = tooltip[0];	
				var teste = {
						tudo: listaDeAgendamento[i],
						id : listaDeAgendamento[i].id,
						title: evento,
						start: dts,
						end: dtr,
						borderColor: "#333399",
						//tooltip: tudo.condutor.nome+" "+tudo.condutor.snome,
				}
				$('#calendar').fullCalendar('renderEvent', teste);
			}	
		}else{
			if(listaDeAgendamento == undefined ||(listaDeAgendamento != undefined && listaDeAgendamento.length > 0)){

				var cfg = {
						type: "GET",
						url: "/carControl/rest/agendarest/buscaListaDeAgendamento/",
						success:function(listaDeAgendamento){
							console.log(listaDeAgendamento);
							CARCONTROL.agendaUso.exibirAgenda(listaDeAgendamento);
						},
						error:function(err){
							console.log("deuRuim");
						}
				};
				CARCONTROL.ajax.get(cfg);
			}else{
				console.log("Nenhum Registro");
			}
		}
	};
	CARCONTROL.agendaUso.deleteAgend = function(idAgend){
		//var id = $("#idAgend").val();
		var cfg = {
				type: "DELETE",
				url: "/carControl/rest/agendarest/removerAgendamento/"+idAgend,
				success:function(msg){

					alert(msg);
					return false;
				},
				error : function(err) {
					alert("Erro ao remover agendamento de Veiculo: " + err.responseText);
					return false;
				}
		};
		CARCONTROL.ajax.post(cfg);	
		CARCONTROL.agendaUso.atualizar();
		//return true;		
	} 
	$(document).ready(CARCONTROL.agendaUso.exibirAgenda(undefined));
	//informações do agendamento
	CARCONTROL.agendaUso.infoAgendamento = function(event){

		var dts = moment( event.tudo.dataHoraSaida).format("DD/MM/YYYY HH:mm");
		var dtr = moment( event.tudo.dataHoraRetorno).format("DD/MM/YYYY HH:mm");
		$("#datas").val(dts);
		$("#datar").val(dtr);
		$("#condutor").val(event.tudo.condutor.nome+" "+event.tudo.condutor.snome);
		$("#veiculo").val(event.tudo.veiculo.marca+" "+event.tudo.veiculo.modelo);
		$("#placa").val(event.tudo.veiculo.placa);
		$("#evento").val(event.tudo.obs);	
		$("#idAgend").val(event.id);		
		var cfg = {
				title: "Detalhes do agendamento",
				height: 492,
				width:448,
				modal:true,
				buttons: {
					"ok": function(){
						$(this).dialog("close");
					},
					"Excluir ": function(){
						var dialog = this;
						var id = event.id;
						CARCONTROL.agendaUso.deleteAgend(id);		
						$(this).dialog("close");

						$('#calendar').fullCalendar( 'refresh' );
						CARCONTROL.agendaUso.exibirAgenda(undefined);


					}
				}		
		};
		$("#agendament").dialog(cfg);
	}
	CARCONTROL.agendaUso.atualizar = function(){
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
	/*  
	CARCONTROL.agendaUso.atualizarAgend = function(novaData,idConsulta){

	var data = {};
	novaData = novaData.split("T");
	novaData = novaData[0]+" "+novaData[1];
	data.id = idConsulta; 
	data.dateTimeConsult = novaData;
	var cfg = ({
			type: "PUT",
			url: context,
			data: data,
			success:function(data){
				alertify.success('Alteração realizada com sucesso!');
			},
			error:function(msg){
				alertify.error('Occorreu um erro!'+msg);					
			}
		});
		DWS.ajax.put(cfg);
} 
	 */

});



