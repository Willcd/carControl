
$(document).ready(function() {

	CARCONTROL.condutor = new Object();

	CARCONTROL.condutor.cadastrar = function() {


		if (document.getElementById("nome" ).value == "" || document.getElementById("snome" ).value == ""   || document.getElementById("dtnasc").value == "" ||
				document.getElementById("cpf"  ).value == "" || document.getElementById("rg"  ).value == ""     || document.getElementById("cnh").value == ""    || 
				document.getElementById("email").value == "" || document.getElementById("telefone").value == "" || document.getElementById("senha").value == "" ) {
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
			if( document.getElementById("senha").value != document.getElementById("rsenha").value) {
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
				$("#msg").html("Senha Incoreta. Redefina sua senha!");
				$("#msg").dialog(cfg);
				return false;
			} else {
				
				var senha64 = Base64.encode($("#senha").val());
				alert(senha64);
				var condutor =new Object();
				condutor.id = null;
				condutor.nome = $("#nome").val();
				condutor.snome = $("#snome").val();
				condutor.dataNascimento = moment($("#dtnasc").val());
				
				condutor.cpf = $("#cpf").val();
				condutor.rg = $("#rg").val();
				condutor.cnh = $("#cnh").val();
				condutor.telefone = $("#telefone").val();
				var loginCondutor = new Object();
				loginCondutor.email = $("#email").val();
				loginCondutor.senha = senha64;
				var checkbox = document.querySelector('input[type="checkbox"]');
				  if(checkbox.checked) {
					  loginCondutor.adm = true;
						
					}else{
						loginCondutor.adm = false;
					}
				
				condutor.loginCondutor = loginCondutor;
					console.log(loginCondutor.adm);
					console.log(condutor.loginCondutor.adm);

			
				
				$("#nome").val("");
				$("#snome").val("");
				$("#dtnasc").val("");
				$("#cpf").val("");
				$("#rg").val("");
				$("#cnh").val("");
				$("#email").val("");
				$("#telefone").val("");
				$("#senha").val("");
				$("#rsenha").val("");
				var cfg = {
						url : "/carControl/rest/condutorRest/addCondutor",
						data : condutor,					
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
							$("#nome").val("");
							$("#snome").val("");
							$("#dtnasc").val("");
							$("#cpf").val("");
							$("#rg").val("");
							$("#cnh").val("");
							$("#email").val("");
							$("#telefone").val("");
							$("#senha").val("");

							CARCONTROL.condutor.buscar();
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
							$("#msg").html("Erro ao cadastrar um novo condutor... " + err.responseText);
							$("#msg").dialog(cfg);
							return false;
						}
				};
				CARCONTROL.ajax.post(cfg);

			}
			CARCONTROL.condutor.exibirCondutor(undefined,"");

		}
	};
	CARCONTROL.condutor.buscar = function(){
		var valorBusca = $("#consultaCondutor").val();
		CARCONTROL.condutor.exibirCondutor(undefined, valorBusca);	
	};
	CARCONTROL.condutor.exibirCondutor = function(listaCondutor, valorBusca){
		var html = "<table = class='table row'>";
		html +=
			"<tr><th>Nome</th><th>Sobrenome</th><th>Data nascimento</th><th>CPF</th><th>RG</th><th>CNH</th><th>email</th><th>telefone</th><th>açoes</th></tr>";
		if(listaCondutor != undefined && listaCondutor.length > 0 && listaCondutor[0].cpf != undefined){
			var dataNascimento;
			for(var i = 0; i < listaCondutor.length; i++){
				dataNascimento = moment(listaCondutor[i].dataNascimento).format('DD/MM/YYYY');
				html+="<tr>"+
				"<td>"+listaCondutor[i].nome+"</td>"+
				"<td>"+listaCondutor[i].snome+"</td>"+
				"<td>"+dataNascimento+"</td>"+
				"<td>"+listaCondutor[i].cpf+"</td>"+
				"<td>"+listaCondutor[i].rg+"</td>"+
				"<td>"+listaCondutor[i].cnh+"</td>"+
				"<td>"+listaCondutor[i].loginCondutor.email+"</td>"+
				"<td>"+listaCondutor[i].telefone+"</td>"+
				"<td>"+
				'<a onclick='+'CARCONTROL.condutor.editarCondutor("'+listaCondutor[i].id+'")'+'>Editar</a>'+
				"</td>"+
				"<td>"+
				'<a onclick='+'CARCONTROL.condutor.confirmaExclusao("'+listaCondutor[i].id+'")'+'>Deletar</a>'+
				"</td>"+
				"</tr>";
			}
		}else{

			if(listaCondutor == undefined || (listaCondutor != undefined && listaCondutor.length > 0)){
				if(valorBusca==""){
					valorBusca = null;
				}
				var cfg = {

						type:"GET",
						url:"/carControl/rest/condutorRest/buscaCondutorPorNome/"+valorBusca,
						success: function(listaCondutor){
							CARCONTROL.condutor.exibirCondutor(listaCondutor);						
						},
						error: function(err){
							alert("Erro ao consultar condutores..." + err.responseText);
						}
				};
				CARCONTROL.ajax.get(cfg);
			}else{
				html += "<tr><td colsplan = '3'>Nenhum Registro Enconrado</td></tr>";
			}
		}
		html += "</table>";
		$("#resultadoCondutores").html(html);
	};
	CARCONTROL.condutor.exibirCondutor(undefined,"");

	CARCONTROL.condutor.confirmaExclusao = function(id){
		var cfg = {
				title: "Mensagem",
				height: 200,
				width: 400,
				modal: true,
				buttons:{
					"Ok": function(){
						CARCONTROL.condutor.deletarCondutor(id);	
					},
					"Cancelar": function(){
						$(this).dialog("close");
					}
				}
		};
		$("#msg").html("Confirma excluir condutor?");
		$("#msg").dialog(cfg);
	}; 
	CARCONTROL.condutor.deletarCondutor = function(id){
		console.log(cpf +" js");
		var cfg = {
				type: "DELETE",
				url: "/carControl/rest/condutorRest/deletarCondutor/"+id,
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
					CARCONTROL.condutor.buscar();
				},
				error: function(err){
					alert("Erro ao excluir condutor: " + err.responseText);
				}
		};
		CARCONTROL.ajax.post(cfg);
	};
	CARCONTROL.condutor.editarCondutor = function(id){
		console.log(cpf +" js");

		var cfg = {
				type:"GET",
				url:"/carControl/rest/condutorRest/buscaPorId/"+id,
				success:function(condut){	
					$("#idCondutorEdit").val(condut.id);
					$("#nomeEdit").val(condut.nome);
					$("#snomeEdit").val(condut.snome);
										
					$("#dtnascEdit").val(moment(condut.dataNascimento).format('DD/MM/YYYY'));
//					console.log(moment(condut.dataNascimento).format('DD/MM/YYYY'));
					$("#cpfEdit").val(condut.cpf);
					$("#rgEdit").val(condut.rg);
					$("#cnhEdit").val(condut.cnh);
					$("#mailEdit").val(condut.email);
					$("#foneEdit").val(condut.telefone);
					$("#senhaEdit").val("");
					CARCONTROL.condutor.exibirEdicao(condut);

				},
				error: function(err){
					alert("Erro ao editar veiculo: "+err.responseText);
				}					
		};
		CARCONTROL.ajax.get(cfg);			
	};
	CARCONTROL.condutor.exibirEdicao = function(condut){
		var cfg = {
				title:"Editar Condutor",
				height:565,
				width: 720,
				modal:true,
				buttons:{
					"Salvar": function(){
						if (document.getElementById("nomeEdit").value == "" || document.getElementById("snomeEdit").value == ""||
								document.getElementById("dtnascEdit").value == ""|| document.getElementById("cpfEdit" ).value == "" || 
								document.getElementById("rgEdit"  ).value == "" || document.getElementById("cnhEdit").value == "" ||
								document.getElementById("mailEdit").value == "" || document.getElementById("foneEdit").value == "" || 
								document.getElementById("senhaEdit").value == "" ) {
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
						}else{
							if( document.getElementById("senhaEdit").value != document.getElementById("rsenhaEdit").value) {
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
								$("#msg").html("Senha Incoreta. Redefina sua senha!");
								$("#msg").dialog(cfg);
								return false;
							} else {
							var dialog = this;
							var newCondut = new Object();
							
							
							newCondut.email = $("#").val();
							newCondut.telefone = $("#foneEdit").val();
							var s = $("#senhaEdit").val();
							newCondut.senha = Base64.encode(s);
							
							var newCondut =new Object();
							newCondut.id =  $("#idCondutorEdit").val();
							newCondut.nome = $("#nomeEdit").val();
							newCondut.snome = $("#snomeEdit").val();
							newCondut.dataNascimento = moment($("#dtnascEdit").val());

							newCondut.cpf = $("#cpfEdit").val();
							newCondut.rg = $("#rgEdit").val();
							newCondut.cnh = $("#cnhEdit").val();
							var loginCondutor = new Object();
							loginCondutor.email = $("#mailEdit").val();
							loginCondutor.senha = senha64;
							loginCondutor.adm = $("#admEdit").val();

							if($("#admEdit").val()=='true'){
								loginCondutor.adm = true;
								
								}else{
									loginCondutor.adm = false;
								}
							
							newCondut.loginCondutor = loginCondutor;
							
							
						}
						var cfg = {
								type: "PUT",
								url: "/carControl/rest/condutorRest/editarCondutor",
								data: newCondut,
								success: function (data){
									$(dialog).dialog("close");
									$("#idCondutorEdit").val("");
									$("#nomeEdit").val("");
									$("#snomeEdit").val("");
									$("#dtnascEdit").val("");
									$("#cpfEdit").val("");
									$("#rgEdit").val("");
									$("#cnhEdit").val("");
									$("#mailEdit").val("");
									$("#foneEdit").val("");
									$("#senhaEdit").val("");
									$("#salCondutorEdit").val("");

									CARCONTROL.condutor.buscar();
								},
								error : function(err){
									alert("Erro ao editar condutor: "+err.responseText);	
								}
						};
						CARCONTROL.ajax.post(cfg);
						}
					},"cancelar": function(){
						$(this).dialog("close");
					}
				},close: function(){}
		};
		$("#editarCondutor").dialog(cfg);
	
	};
});

