function Search()
{
	var tag = $("<div id=\"dialogbox\"></div>");
	if($("#dialogbox").length>0){
		$("#dialogbox").dialog('destroy').remove();
	}
	var values = "";
	$(tag).attr("title", "Sales Search");
	$.ajax({
		type: "POST",
		data:values,
		cache:false,
		url: BASEURL+"sales/dialog_search",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Search': sales_search,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewSearch")[0].reset();
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 300 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function sales_search()
{
	$("#addNewSearch :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var sMethod = $("#method").val();
		var sQuery = $("#query").val();
		var sCenter = $("#center").val();
		var values = {center:sCenter, method:sMethod, query:sQuery};
		$.ajax({
			url: BASEURL+"sales/sales_search",
			type: "post",
			data: values ,
			dataType  : 'html',
			success: function (res) {
				$("#results").html(res);
				$("#dialogbox").dialog('destroy').remove();
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
}

function checkLength()
{
	if ($("#method").val().length <= 0 || $("#query").val().length <= 0) {
		$("#addNewSearch :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}


function View_Search(sSaleId)
{
	$.ajax({
		url: BASEURL+"sales/sales_serarch_view_au",
		type: "post",
		data: {salesID:sSaleId},
		dataType  : 'html',
		success: function (res) {
			$("#display").html(res);
		},
		complete: function(){
			if($("#abn").length > 0)
			 	getABN();
			if ($("#packagesGrid").length > 0){
			   	grid_packages();
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}

function grid_packages(){
	var iSaleId = $("#id").val();
	$("#packagesGrid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"sales/gjpva/"+iSaleId,
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						cli: { type: "string" },
						name: { type: "string" },
						fclass: { type: "string" },
						sclass: { type: "string" }
					}
				},
				total: function(response) {
					return response.length;
				}
			},
			pageSize: 10,
			serverPaging: true,
			serverFiltering: true,
			serverSorting: true
		},
		sortable: true,
		autoBind: true,
		filterable: {
			extra: false,
			operators: {
				string: {
					startswith: "Starts with",
					eq: "Is equal to",
				},
				number: {
					startswith: "Starts with",
					eq: "Is equal to",
				},
				date: {
					eq: "Is equal to",
				},
			}
		},
		pageable: {
			refresh: true,
			pageSizes: true
		},
		columns: [{
			field: "rowNumber",
			title: "Sr. No",
			width: "6%",
			template: "<span class='row-number'></span>",
			filterable: false
		},{
			field:"cli",
			title: "CLI"
		}, {
			field: "name",
			title: "Name"
		}],
		dataBound: function () {
			var rows = this.items();
			$(rows).each(function () {
				var index = $(this).index() + 1
				+ ($("#packagesGrid").data("kendoGrid").dataSource.pageSize() * ($("#packagesGrid").data("kendoGrid").dataSource.page() - 1));;
				var rowLabel = $(this).find(".row-number");
				$(rowLabel).html(index);
			});
		}
	});
}


function Cancel_Search()
{
	$.ajax({
		url: BASEURL+"sales/sales_search",
		type: "post",
		data: { block: 'full'},
		dataType  : 'html',
		success: function (res) {
			$("#display").html(res);
		},
		complete: function(){
			submited_sales()
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}

function getABN(){
	$.getJSON(BASEURL+"sales/abn", {abn: $("#abn").val() },
	function(data){
		if (data['error'] == "true")
		{
			$(".bus_name").html( "" );
			$(".abn_status").html( "" );
			$(".bus_type").html( "" );
		}
		else
		{
			var abn = $("#abn").val();
			$("#abn").val( abn.replace(/\s/g,""));
			if( data['organisationName'] != null) {
				$(".bus_name").html( data['organisationName'] );
			}
			else if (data['tradingName'] != null) {
				$(".bus_name").html( data['tradingName'] );
			}
			else {
				$(".bus_name").html( data['entityName'] );
			}
			$(".abn_status").html( data['entityStatus'] );
			$(".bus_type").html( data['entityDescription'] );
		}
	});
}

function Notes()
{
	var sSaleId = $("#id").val();
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "TPV Notes");
	$.ajax({
		type: "POST",
		data:{sId:sSaleId, method:'notes'},
		cache:false,
		url: BASEURL+"qa/qa_process",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				close: function() {
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 400 );
			$(tag).html(result.data.message).dialog().dialog('open');
		}
	});
}


function Edit_Switch(sSaleId)
{
	$.ajax({
		url: BASEURL+"sales/sales_serarch_edit_au",
		type: "post",
		data: {salesID:sSaleId},
		dataType  : 'html',
		success: function (res) {
			$("#display").html(res);
		},
		complete: function(){
			outsidedp();
			if($("#abn").length > 0)
			 	getABN();
			if ($("#packagesEditGrid").length > 0){
			   	grid_edit_packages();
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}


$( document ).ready(function() {
	submited_sales()
});


function submited_sales(){
	$("#submitedSalesGrid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"sales/submited_sales",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						id: { type: "string" },
						leadId: { type: "string" },
						status: { type: "string" },
						timestamp: { type: "date" },
						agent: { type: "string" },
						campaign: { type: "string" },
						type: { type: "string" }
					}
				},
				total: function(response) {
					return response.length;
				}
			},
			pageSize: 10,
			serverPaging: true,
			serverFiltering: true,
			serverSorting: true
		},
		sortable: true,
		autoBind: true,
		filterable: {
			extra: false,
			operators: {
				string: {
					startswith: "Starts with",
					eq: "Is equal to",
				},
				number: {
					startswith: "Starts with",
					eq: "Is equal to",
				},
				date: {
					eq: "Is equal to",
				},
			}
		},
		pageable: {
			refresh: true,
			pageSizes: true
		},
		columns: [{
			field: "rowNumber",
			title: "Sr. No",
			template: "<span class='row-number'></span>",
			filterable: false
		},{
			field: "id",
			title: "Sales ID "
		},{
			field: "status",
			title: "Status"
		},{
			field: "leadId",
			title: "Lead Id"
		},{
			field: "timestamp",
			title: "Date Submitted",
			format: "{0:MM/dd/yyyy}",
		},{
			field: "agent",
			title: "Agent",
		},{
			field: "campaign",
			title: "Campaign"
		},{
			field: "type",
			title: "Type"
		}],
		dataBound: function () {
			var rows = this.items();
			$(rows).each(function () {
				var index = $(this).index() + 1 + ($("#submitedSalesGrid").data("kendoGrid").dataSource.pageSize() * ($("#submitedSalesGrid").data("kendoGrid").dataSource.page() - 1));;
				var rowLabel = $(this).find(".row-number");
				$(rowLabel).html(index);
			});
		}
	});
}




function grid_edit_packages(){
	var iSaleId = $("#id").val();
	$("#packagesEditGrid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"sales/gjpva/"+iSaleId,
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						cli: { type: "string" },
						name: { type: "string" },
						fclass: { type: "string" },
						sclass: { type: "string" }
					}
				},
				total: function(response) {
					return response.length;
				}
			},
			pageSize: 10,
			serverPaging: true,
			serverFiltering: true,
			serverSorting: true
		},
		sortable: true,
		autoBind: true,
		filterable: {
			extra: false,
			operators: {
				string: {
					startswith: "Starts with",
					eq: "Is equal to",
				},
				number: {
					startswith: "Starts with",
					eq: "Is equal to",
				},
				date: {
					eq: "Is equal to",
				},
			}
		},
		pageable: {
			refresh: true,
			pageSizes: true
		},
		columns: [{
			field: "rowNumber",
			title: "Sr. No",
			width: "6%",
			template: "<span class='row-number'></span>",
			filterable: false
		},{
			field:"cli",
			title: "CLI"
		}, {
			field: "name",
			title: "Name"
		},{
			field: "cli",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createEditLink(cli)#',
			width: "12%",
			filterable: false,
			sortable: false,
		}],
		dataBound: function () {
			var rows = this.items();
			$(rows).each(function () {
				var index = $(this).index() + 1 + ($("#packagesEditGrid").data("kendoGrid").dataSource.pageSize() * ($("#packagesEditGrid").data("kendoGrid").dataSource.page() - 1));;
				var rowLabel = $(this).find(".row-number");
				$(rowLabel).html(index);
			});
		}
	});
}

function createEditLink(id){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:Delete_Package(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/delete.png" alt="DELETE" title="DELETE" ></a>&nbsp;';
	return sHtmlContent;
}

function refershEditGrid(){
	$("#packagesEditGrid").data("kendoGrid").dataSource.read();
}

function AddEditPopUp(sCli) {
	var sId = $("#id").val();
	var sLeadId = $("#leadId").val();
	var sSaleType = $( "#sale_type" ).val();
	var tag = $("<div id=\"dialogbox\"></div>");
	if(sCli!=0)
		$(tag).attr("title", "Edit Package");
	else
		$(tag).attr("title", "Add New Package");
	$.ajax({
		type: "POST",
		data:{salesId:sId ,leadId: sLeadId, cli:sCli, type:sSaleType, opt:'verify'},
		cache:false,
		url: BASEURL+"sales/pf",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': savePackage,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewPackage")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 380 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function savePackage()
{
	$("#addNewPackage :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkEditLength();
	if(valid) {
		var sSaleId = $("#id").val();
		var sLeadId = $("#leadId").val();
		var sSaleType = $("#sale_type" ).val();
		var values = $("#addNewPackage").serialize()+"&leadId="+sLeadId+"&type="+sSaleType+"&sId="+sSaleId;
		$.ajax({
			url: BASEURL+"sales/verfsub",
			type: "post",
			data: values,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$("#error").html(res.data.message);
					$("#dialogbox").dialog('destroy').remove();
					refershEditGrid();
				}else{
					$(".validateTips").html(res.data.message);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
}

function checkEditLength() {
	if ($("#cli").val().length <= 0 || $("#plan").val().length <= 0 ) {
		$("#addNewPackage :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}


function Plan_Dropdown()
{
	$('#plan').empty();
	$('#plan').append(
		$('<option></option>').val('').html('Select Plan')
	);
	var sSaleType = $( "#sale_type" ).val();
	var sLeadId = $("#leadId").val();
	var sCli = $("#cli").val();
	var sSalesId = $("#id").val();
	$.ajax({
			url: BASEURL+"sales/gpa",
			type: "post",
			data: {leadId: sLeadId, type:sSaleType, cli:sCli,salesId:sSalesId, opt:'verify'} ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$.each(res.data.list, function(i,obj) {
						if(obj == 'New Type'){
							$('#plan').append(
								$('<option disabled="disabled"></option>').val(obj).html(i)
							);
						} else {
							$('#plan').append(
								$('<option></option>').val(i).html(obj)
							);
						}
					});
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
	});
}

 //delete packages
function Delete_Package(sCli)
{
	var oId = $("#id").val();
	$.ajax({
		url: BASEURL+"sales/verfsub",
		type: "post",
		data: { method:'delete_au', id: oId, cli: sCli},
		dataType  : 'json',
		success: function (res) {
			if(res.data.success) {
				refershEditGrid();
			}else{
				updateTips(res.data.message);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function updateTips( t ) {
	$( ".validateTipsMain" ).text( t ).addClass( "ui-state-highlight" );
	setTimeout(function() {
		$( ".validateTipsMain" ).removeClass( "ui-state-highlight", 1500 );
	}, 500 );
}



function Email()
{
	if ($('#no_email').is(':checked'))
	{
		$( "#email" ).val("N/A");
		$( "#email" ).attr("disabled", true);
	}
	else
	{
		$( "#email" ).val("");
		$( "#email" ).removeAttr("disabled");
	}
}

function Mobile()
{
	if ($("#no_mobile").is(':checked'))
	{
		$( "#mobile" ).val("N/A");
		$( "#mobile" ).attr("disabled", true);
	}
	else
	{
		$( "#mobile" ).val("");
		$( "#mobile" ).removeAttr("disabled");
	}
}

<!--#########################################################-->
<!--##                                                     ##-->
<!--##                  PHYSICAL ADDRESS                   ##-->
<!--##                                                     ##-->
<!--#########################################################-->

$(function() {
	$( "#dialog:ui-dialog_physical_confirm" ).dialog( "destroy" );

	$( "#dialog-confirm_physical2" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width: 400,
		height: 235,
		modal: true,
		buttons: {
			"Select": function() {
				if ($( "input[name=address_code]:checked" ).val() != undefined)
				{
					$.get(BASEURL+"sales/gnaf/?type=display", { id: $( "input[name=address_code]:checked" ).val() },
						function(res) {
							var data = res.data[0];
							var n = data.split("}");
							$( "#display_physical1" ).val(n[0]);
							$( "#display_physical2" ).val(n[1]);
							$( "#display_physical3" ).val(n[2]);
							$( "#display_physical4" ).val(n[3]);
						});
					$( "#physical" ).val($( "input[name=address_code]:checked" ).val());
					$( "#dialog-confirm_physical2" ).dialog( "close" );
					$( "#dialog-confirm_physical" ).dialog( "close" );
				}
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});
});


$(function() {
	$( "#dialog:ui-dialog_physical" ).dialog( "destroy" );

	var tips = $( ".validateTipsPhysical" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	$( "#dialog-confirm_physical" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width: 475,
		height:350,
		modal: true,
		show: "blind",
		hide: "blind",
		buttons: {
			"Verify Address": function() {
				var address_type = $('input[name=physical_type]:checked'),
					building_type = $( "#physical_building_type" ),
					building_number = $( "#physical_building_number" ),
					building_name = $( "#physical_building_name" ),
					street_number = $( "#physical_street_number" ),
					street_name = $( "#physical_street_name" ),
					street_type = $( "#physical_street_type" ),
					l_pid = $('#physical_locality_pid');

					$.get(BASEURL+"sales/gnaf/?type=check", { address_type: address_type.val(), l_pid: l_pid.val(), building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(res) {
						var data = res.data;
						if (data == "valid")
						{
							$( "#physical_address_code" ).attr("style","display:none;");
							$( "#physical_manual_store" ).attr('style','display:none;');
							$( "#dialog-confirm_physical2" ).dialog( "open" );
							$( "#physical_search_div" ).html("<center><br><br><br><br><p><img src='../assets/images/ajax-loader.gif'>&nbsp;&nbsp;&nbsp;&nbsp;Please wait. Verifying your address...</p></center>");
							$( "#physical_search_div" ).removeAttr('style');

							$.get(BASEURL+"sales/gnaf/?type=search", { address_type: address_type.val(), l_pid: l_pid.val(), building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(res) {
								var data = res.data;
								if (data == 'No Results Found')
								{
									$( "#physical_search_div" ).html("<center><br><br><br><br><p><img src='../assets/images/ajax-loader.gif'>&nbsp;&nbsp;&nbsp;&nbsp;Exact match not found. Looking up similar...</p></center>");

									$.get(BASEURL+"sales/gnaf/?type=format", { l_pid: l_pid.val(), building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(res) {
										/// CLOUD GEOCODER API GET
										var data0= res.data.message;
										$.get(BASEURL+"sales/gnafXML", { input: data0 }, function(data2) {
											$.get(BASEURL+"sales/gnaf/?type=search2", { address_type: address_type.val(), a_pid: data2, building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(res) {
												var data3 = res.data.message;
												$( "#physical_address_code" ).html(data3);
												$( "#physical_search_div" ).attr("style","display:none;");
												$( "#physical_address_code" ).removeAttr('style');
												$( "#physical_manual_store" ).removeAttr('style');
											});
										});
										///
									});
								}
								else
								{

									$( "#physical_address_code" ).html(data);
									$( "#physical_search_div" ).attr("style","display:none;");
									$( "#physical_address_code" ).removeAttr('style');
									$( "#physical_manual_store" ).removeAttr('style');
								}
							});
						}
						else
						{
							updateTips(data);
						}
					});
			},
			"Reset": function() {
				$( "#physical_input" ).val("");
				$( "#physical_input2" ).val("");
				$( "#physical_building_type_tr" ).attr("style","display:none;");
				$( "#physical_building_number_tr" ).attr("style","display:none;");
				$( "#physical_building_name_tr" ).attr("style","display:none;");
				$( "#physical_street_number_tr" ).attr("style","display:none;");
				$( "#physical_street_tr" ).attr("style","display:none;");
				$( "#physical_suburb_tr" ).attr("style","display:none;");
				$( "#physical_state_tr" ).attr("style","display:none;");
				$( "#physical_postcode_tr" ).attr("style","display:none;");
				$( "#physical_input_tr" ).attr("style","display:none;");
				$( "#physical_type_tr" ).attr("style","display:none;");
				$( "#physical_input_tr" ).removeAttr("style");
				$( "#physical_building_type option" ).remove();
				$( "#physical_building_number" ).val("");
				$( "#physical_building_name" ).val("");
				$( "#physical_street_number" ).val("");
				$( "#physical_street_name" ).val("");
				$( "#physical_street_type" ).val("");
				$( "#physical_suburb" ).val("");
				$( "#physical_state" ).val("");
				$( "#physical_postcode" ).val("");
				$('input[name=physical_type]:checked').removeAttr("checked");
			}
		}
	});
});

$(function() {
	$( "#physical_input" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "input",
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 3,
		select: function (event, ui) {
			$( "#physical_locality_pid" ).val(ui.item.id);
			$.get(BASEURL+"sales/gnaf/?type=input_check", { l_pid: ui.item.id }, function(res) {

				var data = res.data;
				$( "#physical_suburb" ).val(data.locality_name);
				$( "#physical_state" ).val(data.primary_postcode);
				$( "#physical_postcode" ).val(data.state_abbreviation);
				$( "#physical_input_tr" ).attr("style","display:none;");
				$( "#physical_type_tr" ).removeAttr("style");
			});
		}
	});
});

$(function() {
	$( "#physical_input2" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "input2",
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 2,
		select: function (event, ui) {
			$( "#physical_locality_pid" ).val(ui.item.id);
			$.get(BASEURL+"sales/gnaf/?type=input_check", { l_pid: ui.item.id }, function(res) {
				var data2= res.data;

				$( "#physical_suburb" ).val(data2['locality_name']);
				$( "#physical_state" ).val(data2['state_abbreviation']);
				$( "#physical_postcode" ).val(data2['primary_postcode']);
				$( "#physical_input_tr" ).attr("style","display:none;");
				$( "#physical_type_tr" ).removeAttr("style");
			});
		}
	});
});

function FS_Physical()
{
	$( "#physical_building_type option" ).remove();
	$( "#physical_building_type" ).append(new Option('', '', true, true));
	$( "#physical_street_number_tr" ).removeAttr("style");
	$( "#physical_street_tr" ).removeAttr("style");
	$( "#physical_suburb_tr" ).removeAttr("style");
	$( "#physical_state_tr" ).removeAttr("style");
	$( "#physical_postcode_tr" ).removeAttr("style");
	$( "#physical_building_type_tr" ).attr("style","display:none;");
	$( "#physical_building_number_tr" ).attr("style","display:none;");
	$( "#physical_building_name_tr" ).attr("style","display:none;");
}

function OB_Physical()
{
	$( "#physical_building_type option" ).remove();
	$( "#physical_building_type" ).append(new Option('LEVEL', 'LEVEL', true, true));
	$( "#physical_building_number_span" ).html("Level Number ");
	$( "#physical_building_number_tr" ).removeAttr("style");
	$( "#physical_street_number_tr" ).removeAttr("style");
	$( "#physical_street_tr" ).removeAttr("style");
	$( "#physical_suburb_tr" ).removeAttr("style");
	$( "#physical_state_tr" ).removeAttr("style");
	$( "#physical_postcode_tr" ).removeAttr("style");
	$( "#physical_building_type_tr" ).attr("style","display:none;");
	$( "#physical_building_name_tr" ).attr("style","display:none;");
}

function BU_Physical()
{
	var newOptions = {
		'' : '',
		'APARTMENT' : 'APARTMENT',
		'DUPLEX' : 'DUPLEX',
		'FACTORY' : 'FACTORY',
		'FLAT' : 'FLAT',
		'HALL' : 'HALL',
		'OFFICE' : 'OFFICE',
		'PENTHOUSE' : 'PENTHOUSE',
		'ROOM' : 'ROOM',
		'SECTION' : 'SECTION',
		'SHOP' : 'SHOP',
		'SITE' : 'SITE',
		'STORE' : 'STORE',
		'STUDIO' : 'STUDIO',
		'SUITE' : 'SUITE',
		'TOWNHOUSE' : 'TOWNHOUSE',
		'UNIT' : 'UNIT',
		'VILLA' : 'VILLA'
	};
	var selectedOption = '';

	var select = $('#physical_building_type');
	if(select.prop) {
	  var options = select.prop('options');
	}
	else {
	  var options = select.attr('options');
	}
	$( "#physical_building_type option" ).remove();

	$.each(newOptions, function(val, text) {
		options[options.length] = new Option(text, val);
	});
	select.val(selectedOption);
	$( "#physical_building_type_tr" ).removeAttr("style");
	$( "#physical_building_number_span" ).html("Building Number ");
	$( "#physical_building_number_tr" ).removeAttr("style");
	$( "#physical_street_number_tr" ).removeAttr("style");
	$( "#physical_street_tr" ).removeAttr("style");
	$( "#physical_suburb_tr" ).removeAttr("style");
	$( "#physical_state_tr" ).removeAttr("style");
	$( "#physical_postcode_tr" ).removeAttr("style");
	$( "#physical_building_name_tr" ).attr("style","display:none;");
}

function LOT_Physical()
{
	$( "#physical_building_type option" ).remove();
	$( "#physical_building_type" ).append(new Option('LOT', 'LOT', true, true));
	$( "#physical_building_number_span" ).html("Lot Number ");
	$( "#physical_building_number_tr" ).removeAttr("style");
	$( "#physical_street_tr" ).removeAttr("style");
	$( "#physical_suburb_tr" ).removeAttr("style");
	$( "#physical_state_tr" ).removeAttr("style");
	$( "#physical_postcode_tr" ).removeAttr("style");
	$( "#physical_street_number_tr" ).attr("style","display:none;");
	$( "#physical_building_type_tr" ).attr("style","display:none;");
	$( "#physical_building_name_tr" ).attr("style","display:none;");
}

$(function() {
	$( "#physical_street_name" ).autocomplete({
		source: function(request, response) {
		$.ajax({
			url:  BASEURL+"sales/gnaf",
			dataType: "json",
			data: {
			  type : "street_name",
			  l_pid : $('#physical_locality_pid').val(),
			  term : request.term
			},
			success: function(res) {
				response(res.data);
			}
		});
	  },
		minLength: 1
	});
});

$(function() {
	$( "#physical_street_type" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "street_type",
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 1
	});
});

function Physical()
{
	$( "#dialog-confirm_physical" ).dialog( "open" );
}


$(function() {
	$( "#dialog:ui-dialog_physical_manual" ).dialog( "destroy" );

	var tips = $( ".validateTipsPhysicalManual" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	$( "#dialog-confirm_physical_manual" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width: 400,
		height:300,
		modal: true,
		buttons: {
			"Submit": function() {
				var building_type = $( "#physical_manual_building_type" ),
					building_number = $( "#physical_manual_building_number" ),
					building_name = $( "#physical_manual_building_name" ),
					street_number = $( "#physical_manual_street_number" ),
					street_name = $( "#physical_manual_street_name" ),
					street_type = $( "#physical_manual_street_type" ),
					l_pid = $('#physical_locality_pid');

				$.get(BASEURL+"sales/gnaf/?type=check", { address_type: "MA", l_pid: l_pid.val(), building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(res) {
					if (res.data == "valid")
					{
						$.get(BASEURL+"sales/gnaf/?type=manual", { l_pid: l_pid.val(), building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(resp) {
							$( "#physical" ).val(resp.data[0]);
							var data = resp.data[0];
							$.get(BASEURL+"sales/gnaf/?type=display", { id: data }, function(response) {
								var data2 = response.data[0];
								var n = data2.split("}");
								$( "#display_physical1" ).val(n[0]);
								$( "#display_physical2" ).val(n[1]);
								$( "#display_physical3" ).val(n[2]);
								$( "#display_physical4" ).val(n[3]);
								$( "#dialog-confirm_physical_manual" ).dialog( "close" );
								$( "#dialog-confirm_physical2" ).dialog( "close" );
								$( "#dialog-confirm_physical" ).dialog( "close" );
							});
						});
					}
					else
					{
						updateTips(data0);
					}
				});
			},
			"Cancel": function() {
				$( "#dialog-confirm_physical_manual" ).dialog( "close" );
			}
		}
	});
});

$(function() {
	$( "#physical_manual_street_name" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "street_name",
					l_pid : $('#physical_locality_pid').val(),
					term : request.term
				},
				success: function(data) {
					response(data);
				}
			});
		},
		minLength: 1
	});
});

$(function() {
	$( "#physical_manual_street_type" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "street_type",
					term : request.term
				},
				success: function(data) {
					response(data);
				}
			});
		},
		minLength: 1
	});
});


function Manual_Physical()
{
	var newOptions = {
		'' : '',
		'APARTMENT' : 'APARTMENT',
		'BLOCK' : 'BLOCK',
		'BUILDING' : 'BUILDING',
		'DUPLEX' : 'DUPLEX',
		'FACTORY' : 'FACTORY',
		'FLAT' : 'FLAT',
		'HALL' : 'HALL',
		'LEVEL' : 'LEVEL',
		'LOT' : 'LOT',
		'OFFICE' : 'OFFICE',
		'PENTHOUSE' : 'PENTHOUSE',
		'ROOM' : 'ROOM',
		'SECTION' : 'SECTION',
		'SHOP' : 'SHOP',
		'SITE' : 'SITE',
		'STORE' : 'STORE',
		'STUDIO' : 'STUDIO',
		'SUITE' : 'SUITE',
		'TOWNHOUSE' : 'TOWNHOUSE',
		'UNIT' : 'UNIT',
		'VILLA' : 'VILLA'
	};
	var selectedOption = $( "#physical_building_type" ).val();

	var select = $('#physical_manual_building_type');
	if(select.prop) {
	  var options = select.prop('options');
	}
	else {
	  var options = select.attr('options');
	}


	$( "#physical_manual_building_type option" ).remove();

	$.each(newOptions, function(val, text) {
		options[options.length] = new Option(text, val);
	});
	select.val(selectedOption);
	$( "#physical_manual_building_number" ).val($( "#physical_building_number" ).val());
	$( "#physical_manual_building_name" ).val("");
	$( "#physical_manual_street_number" ).val($( "#physical_street_number" ).val());
	$( "#physical_manual_street_name" ).val($( "#physical_street_name" ).val());
	$( "#physical_manual_street_type" ).val($( "#physical_street_type" ).val());
	$( "#physical_manual_suburb" ).val($( "#physical_suburb" ).val());
	$( "#physical_manual_state" ).val($( "#physical_state" ).val());
	$( "#physical_manual_postcode" ).val($( "#physical_postcode" ).val());
	$( "#dialog-confirm_physical_manual" ).dialog( "open" );
}

<!--#########################################################-->
<!--##                                                     ##-->
<!--##                  POSTAL ADDRESS                     ##-->
<!--##                                                     ##-->
<!--#########################################################-->

$(function() {
	$( "#dialog:ui-dialog_postal_confirm_switch" ).dialog( "destroy" );

	$( "#dialog-confirm_postal4" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width: 275,
		height: 100,
		modal: true,
		show: "blind",
	});
});

function MailBox()
{
	$( "#dialog-confirm_postal2" ).dialog( "open" );
	$( "#dialog-confirm_postal4" ).dialog( "close" );
}

function MailAddress()
{
	$( "#dialog-confirm_postal" ).dialog( "open" );
	$( "#dialog-confirm_postal4" ).dialog( "close" );
}

function Postal()
{
	$( "#dialog-confirm_postal4" ).dialog( "open" );
}


$(function() {
	$( "#dialog:ui-dialog_postal_confirm" ).dialog( "destroy" );

	$( "#dialog-confirm_postal3" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width: 400,
		height: 235,
		modal: true,
		buttons: {
			"Select": function() {
				if ($( "input[name=address_code]:checked" ).val() != undefined)
				{
					$.get(BASEURL+"sales/gnaf/?type=display", { id: $( "input[name=address_code]:checked" ).val() },
						function(res) {
							var data2 = res.data;
							var n = data2[0].split("}");
							$( "#display_postal1" ).val(n[0]);
							$( "#display_postal2" ).val(n[1]);
							$( "#display_postal3" ).val(n[2]);
							$( "#display_postal4" ).val(n[3]);
						});
					$( "#postal" ).val($( "input[name=address_code]:checked" ).val());
					$( "#dialog-confirm_postal3" ).dialog( "close" );
					$( "#dialog-confirm_postal2" ).dialog( "close" );
					$( "#dialog-confirm_postal" ).dialog( "close" );
				}
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});
});

 //Mail Box Address
$(function() {
	$( "#dialog:ui-dialog_postal_mailbox" ).dialog( "destroy" );

	var tips = $( ".validateTipsMB" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	$( "#dialog-confirm_postal2" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width: 475,
		height:350,
		modal: true,
		show: "blind",
		hide: "blind",
		buttons: {
			"Verify Address": function() {
				var address_type = "MB",
					building_type = $( "#mb_building_type" ),
					building_number = $( "#mb_building_number" ),
					suburb = $( "#mb_suburb" ),
					state = $( "#mb_state" ),
					postcode = $( "#mb_postcode" );

				$.get(BASEURL+"sales/gnaf/?type=check2", { address_type: address_type, building_type: building_type.val(), building_number: building_number.val(), suburb: suburb.val(), state: state.val(), postcode: postcode.val() }, function(res) {
					if (res.data == "valid")
					{
						$( "#postal_address_code" ).attr("style","display:none;");
						$( "#postal_manual_store" ).attr('style','display:none;');
						$( "#postal_search_div" ).html("<center><br><br><br><br><p><img src='../assets/images/ajax-loader.gif'>&nbsp;&nbsp;&nbsp;&nbsp;Please wait. Saving your address...</p></center>");
						$( "#postal_search_div" ).removeAttr('style');
						$( "#dialog-confirm_postal3" ).dialog( "open" );

						$.get(BASEURL+"sales/gnaf/?type=mailbox", { building_type: building_type.val(), building_number: building_number.val(), suburb: suburb.val(), state: state.val(), postcode: postcode.val() }, function(resp) {
							$( "#postal" ).val(resp.data);
							$.get(BASEURL+"sales/gnaf/?type=display", { id: resp.data }, function(response) {
								var data3 = response.data;
								var n = data3[0].split("}");
								$( "#display_postal1" ).val(n[0]);
								$( "#display_postal2" ).val(n[1]);
								$( "#display_postal3" ).val(n[2]);
								$( "#display_postal4" ).val(n[3]);
								$( "#dialog-confirm_postal3" ).dialog( "close" );
								$( "#dialog-confirm_postal2" ).dialog( "close" );
							});
						});
					}
					else
					{
						updateTips(data);
					}
				});
			},
			"Reset": function() {
				$( "#mb_input" ).val("");
				$( "#mb_input2" ).val("");
				$( "#mb_building_type_tr" ).attr("style","display:none;");
				$( "#mb_building_number_tr" ).attr("style","display:none;");
				$( "#mb_suburb_tr" ).attr("style","display:none;");
				$( "#mb_state_tr" ).attr("style","display:none;");
				$( "#mb_postcode_tr" ).attr("style","display:none;");
				$( "#mb_input_tr" ).removeAttr("style");
				$( "#mb_building_type" ).val("");
				$( "#mb_building_number" ).val("");
				$( "#mb_suburb" ).val("");
				$( "#mb_state" ).val("");
				$( "#mb_postcode" ).val("");
			}
		}
	});
});

$(function() {
	$( "#mb_input" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf/",
				dataType: "json",
				data: {
					type : "input3",
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 3,
		select: function (event, ui) {
			var data2 = ui.item.id.split(",");
			$( "#mb_suburb" ).val(data2[0]);
			$( "#mb_state" ).val(data2[1]);
			$( "#mb_postcode" ).val(data2[2]);
			$( "#mb_input_tr" ).attr("style","display:none;");
			$( "#mb_suburb_tr" ).removeAttr("style");
			$( "#mb_state_tr" ).removeAttr("style");
			$( "#mb_postcode_tr" ).removeAttr("style");
			$( "#mb_building_type_tr" ).removeAttr("style");
			$( "#mb_building_number_tr" ).removeAttr("style");
		}
	});
});

$(function() {
	$( "#mb_input2" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "input4",
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 2,
		select: function (event, ui) {
			var data2 = ui.item.id.split(",");
			$( "#mb_suburb" ).val(data2[0]);
			$( "#mb_state" ).val(data2[1]);
			$( "#mb_postcode" ).val(data2[2]);
			$( "#mb_input_tr" ).attr("style","display:none;");
			$( "#mb_suburb_tr" ).removeAttr("style");
			$( "#mb_state_tr" ).removeAttr("style");
			$( "#mb_postcode_tr" ).removeAttr("style");
			$( "#mb_building_type_tr" ).removeAttr("style");
			$( "#mb_building_number_tr" ).removeAttr("style");
		}
	});
});

 // Postal Fixed Address
$(function() {
	$( "#dialog:ui-dialog_postal" ).dialog( "destroy" );

	var tips = $( ".validateTipsPostal" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	$( "#dialog-confirm_postal" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width: 475,
		height:350,
		modal: true,
		show: "blind",
		hide: "blind",
		buttons: {
			"Verify Address": function() {
				var address_type = $('input[name=postal_type]:checked'),
					building_type = $( "#postal_building_type" ),
					building_number = $( "#postal_building_number" ),
					building_name = $( "#postal_building_name" ),
					street_number = $( "#postal_street_number" ),
					street_name = $( "#postal_street_name" ),
					street_type = $( "#postal_street_type" ),
					l_pid = $('#postal_locality_pid');

					$.get( BASEURL+"sales/gnaf/?type=check", { address_type: address_type.val(), l_pid: l_pid.val(), building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(res) {
						if (res.data == "valid")
						{
							$( "#postal_address_code" ).attr("style","display:none;");
							$( "#postal_manual_store" ).attr('style','display:none;');
							$( "#dialog-confirm_postal3" ).dialog( "open" );
							$( "#postal_search_div" ).html("<center><br><br><br><br><p><img src='../assets/images/ajax-loader.gif'>&nbsp;&nbsp;&nbsp;&nbsp;Please wait. Verifying your address...</p></center>");
							$( "#postal_search_div" ).removeAttr('style');

							$.get(BASEURL+"sales/gnaf/?type=search", { address_type: address_type.val(), l_pid: l_pid.val(), building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(res) {
								$( "#postal_address_code" ).html(res.data);
								$( "#postal_search_div" ).attr("style","display:none;");
								$( "#postal_address_code" ).removeAttr('style');
								$( "#postal_manual_store" ).removeAttr('style');
							});
						}
						else
						{
							updateTips(res.data);
						}
					});
			},
			"Reset": function() {
				$( "#postal_input" ).val("");
				$( "#postal_input2" ).val("");
				$( "#postal_building_type_tr" ).attr("style","display:none;");
				$( "#postal_building_number_tr" ).attr("style","display:none;");
				$( "#postal_building_name_tr" ).attr("style","display:none;");
				$( "#postal_street_number_tr" ).attr("style","display:none;");
				$( "#postal_street_tr" ).attr("style","display:none;");
				$( "#postal_suburb_tr" ).attr("style","display:none;");
				$( "#postal_state_tr" ).attr("style","display:none;");
				$( "#postal_postcode_tr" ).attr("style","display:none;");
				$( "#postal_input_tr" ).attr("style","display:none;");
				$( "#postal_type_tr" ).attr("style","display:none;");
				$( "#postal_input_tr" ).removeAttr("style");
				$( "#postal_building_type option" ).remove();
				$( "#postal_building_number" ).val("");
				$( "#postal_building_name" ).val("");
				$( "#postal_street_number" ).val("");
				$( "#postal_street_name" ).val("");
				$( "#postal_street_type" ).val("");
				$( "#postal_suburb" ).val("");
				$( "#postal_state" ).val("");
				$( "#postal_postcode" ).val("");
				$('input[name=postal_type]:checked').removeAttr("checked");
			}
		}
	});
});

$(function() {
	$( "#postal_input" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf/",
				dataType: "json",
				data: {
					type : "input",
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 3,
		select: function (event, ui) {
			$( "#postal_locality_pid" ).val(ui.item.id);
			$.get(BASEURL+"sales/gnaf/?type=input_check", { l_pid: ui.item.id }, function(res) {
				var data = res.data;
				$( "#postal_suburb" ).val(data.locality_name);
				$( "#postal_state" ).val(data.primary_postcode);
				$( "#postal_postcode" ).val(data.state_abbreviation);
				$( "#postal_input_tr" ).attr("style","display:none;");
				$( "#postal_type_tr" ).removeAttr("style");
			});
		}
	});
});

$(function() {
	$( "#postal_input2" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf/",
				dataType: "json",
				data: {
					type : "input2",
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 2,
		select: function (event, ui) {
			$( "#postal_locality_pid" ).val(ui.item.id);
			$.get(BASEURL+"sales/gnaf/?type=input_check", { l_pid: ui.item.id }, function(res) {
				var data2= res.data;
				$( "#postal_suburb" ).val(data2['locality_name']);
				$( "#postal_state" ).val(data2['state_abbreviation']);
				$( "#postal_postcode" ).val(data2['primary_postcode']);
				$( "#postal_input_tr" ).attr("style","display:none;");
				$( "#postal_type_tr" ).removeAttr("style");
			});
		}
	});
});

function FS_Postal()
{
	$( "#postal_building_type option" ).remove();
	$( "#postal_building_type" ).append(new Option('', '', true, true));
	$( "#postal_street_number_tr" ).removeAttr("style");
	$( "#postal_street_tr" ).removeAttr("style");
	$( "#postal_suburb_tr" ).removeAttr("style");
	$( "#postal_state_tr" ).removeAttr("style");
	$( "#postal_postcode_tr" ).removeAttr("style");
	$( "#postal_building_type_tr" ).attr("style","display:none;");
	$( "#postal_building_number_tr" ).attr("style","display:none;");
	$( "#postal_building_name_tr" ).attr("style","display:none;");
}

function OB_Postal()
{
	$( "#postal_building_type option" ).remove();
	$( "#postal_building_type" ).append(new Option('LEVEL', 'LEVEL', true, true));
	$( "#postal_building_number_span" ).html("Level Number ");
	$( "#postal_building_number_tr" ).removeAttr("style");
	$( "#postal_street_number_tr" ).removeAttr("style");
	$( "#postal_street_tr" ).removeAttr("style");
	$( "#postal_suburb_tr" ).removeAttr("style");
	$( "#postal_state_tr" ).removeAttr("style");
	$( "#postal_postcode_tr" ).removeAttr("style");
	$( "#postal_building_type_tr" ).attr("style","display:none;");
	$( "#postal_building_name_tr" ).attr("style","display:none;");
}

function BU_Postal()
{
	var newOptions = {
		'' : '',
		'APARTMENT' : 'APARTMENT',
		'DUPLEX' : 'DUPLEX',
		'FACTORY' : 'FACTORY',
		'FLAT' : 'FLAT',
		'HALL' : 'HALL',
		'OFFICE' : 'OFFICE',
		'PENTHOUSE' : 'PENTHOUSE',
		'ROOM' : 'ROOM',
		'SECTION' : 'SECTION',
		'SHOP' : 'SHOP',
		'SITE' : 'SITE',
		'STORE' : 'STORE',
		'STUDIO' : 'STUDIO',
		'SUITE' : 'SUITE',
		'TOWNHOUSE' : 'TOWNHOUSE',
		'UNIT' : 'UNIT',
		'VILLA' : 'VILLA'
	};
	var selectedOption = '';

	var select = $('#postal_building_type');
	if(select.prop) {
	  var options = select.prop('options');
	}
	else {
	  var options = select.attr('options');
	}
	$( "#postal_building_type option" ).remove();

	$.each(newOptions, function(val, text) {
		options[options.length] = new Option(text, val);
	});
	select.val(selectedOption);
	$( "#postal_building_type_tr" ).removeAttr("style");
	$( "#postal_building_number_span" ).html("Building Number ");
	$( "#postal_building_number_tr" ).removeAttr("style");
	$( "#postal_street_number_tr" ).removeAttr("style");
	$( "#postal_street_tr" ).removeAttr("style");
	$( "#postal_suburb_tr" ).removeAttr("style");
	$( "#postal_state_tr" ).removeAttr("style");
	$( "#postal_postcode_tr" ).removeAttr("style");
	$( "#postal_building_name_tr" ).attr("style","display:none;");
}

function LOT_Postal()
{
	$( "#postal_building_type option" ).remove();
	$( "#postal_building_type" ).append(new Option('LOT', 'LOT', true, true));
	$( "#postal_building_number_span" ).html("Lot Number ");
	$( "#postal_building_number_tr" ).removeAttr("style");
	$( "#postal_street_tr" ).removeAttr("style");
	$( "#postal_suburb_tr" ).removeAttr("style");
	$( "#postal_state_tr" ).removeAttr("style");
	$( "#postal_postcode_tr" ).removeAttr("style");
	$( "#postal_street_number_tr" ).attr("style","display:none;");
	$( "#postal_building_type_tr" ).attr("style","display:none;");
	$( "#postal_building_name_tr" ).attr("style","display:none;");
}

$(function() {
	$( "#postal_street_name" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "street_name",
					l_pid : $('#postal_locality_pid').val(),
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 1
	});
});

$(function() {
	$( "#postal_street_type" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "street_type",
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 1
	});
});


$(function() {
	$( "#dialog:ui-dialog_postal_manual" ).dialog( "destroy" );

	var tips = $( ".validateTipsPostalManual" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	$( "#dialog-confirm_postal_manual" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width: 400,
		height:300,
		modal: true,
		buttons: {
			"Submit": function() {
				var building_type = $( "#postal_manual_building_type" ),
					building_number = $( "#postal_manual_building_number" ),
					building_name = $( "#postal_manual_building_name" ),
					street_number = $( "#postal_manual_street_number" ),
					street_name = $( "#postal_manual_street_name" ),
					street_type = $( "#postal_manual_street_type" ),
					l_pid = $('#postal_locality_pid');

					$.get(BASEURL+"sales/gnaf/?type=check", { address_type: "MA", l_pid: l_pid.val(), building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(res) {
						if (res.data == "valid")
						{
							$.get(BASEURL+"sales/gnaf/?type=manual", { l_pid: l_pid.val(), building_type: building_type.val(), building_number: building_number.val(), building_name: building_name.val(), street_number: street_number.val(), street_name: street_name.val(), street_type: street_type.val() }, function(res) {
								var sId = res.data[0];
								$( "#postal" ).val(sId);
								$.get(BASEURL+"sales/gnaf/?type=display", { id: sId }, function(res) {
									var data2 = res.data;
									var n = data2[0].split("}");
									$( "#display_postal1" ).val(n[0]);
									$( "#display_postal2" ).val(n[1]);
									$( "#display_postal3" ).val(n[2]);
									$( "#display_postal4" ).val(n[3]);
									$( "#dialog-confirm_postal_manual" ).dialog( "close" );
									$( "#dialog-confirm_postal3" ).dialog( "close" );
									$( "#dialog-confirm_postal2" ).dialog( "close" );
									$( "#dialog-confirm_postal" ).dialog( "close" );
								});
							});
						} else {
						updateTips(data0);
						}
					});
			},
			"Cancel": function() {
				$( "#dialog-confirm_postal_manual" ).dialog( "close" );
			}
		}
	});
});

$(function() {
	$( "#postal_manual_street_name" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "street_name",
					l_pid : $('#postal_locality_pid').val(),
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 1
	});
});

$(function() {
	$( "#postal_manual_street_type" ).autocomplete({
		source: function(request, response) {
			$.ajax({
				url: BASEURL+"sales/gnaf",
				dataType: "json",
				data: {
					type : "street_type",
					term : request.term
				},
				success: function(res) {
					response(res.data);
				}
			});
		},
		minLength: 1
	});
});

function Manual_Postal()
{
	var newOptions = {
		'' : '',
		'APARTMENT' : 'APARTMENT',
		'BLOCK' : 'BLOCK',
		'BUILDING' : 'BUILDING',
		'DUPLEX' : 'DUPLEX',
		'FACTORY' : 'FACTORY',
		'FLAT' : 'FLAT',
		'HALL' : 'HALL',
		'LEVEL' : 'LEVEL',
		'LOT' : 'LOT',
		'OFFICE' : 'OFFICE',
		'PENTHOUSE' : 'PENTHOUSE',
		'ROOM' : 'ROOM',
		'SECTION' : 'SECTION',
		'SHOP' : 'SHOP',
		'SITE' : 'SITE',
		'STORE' : 'STORE',
		'STUDIO' : 'STUDIO',
		'SUITE' : 'SUITE',
		'TOWNHOUSE' : 'TOWNHOUSE',
		'UNIT' : 'UNIT',
		'VILLA' : 'VILLA'
	};
	var selectedOption = $( "#postal_building_type" ).val();

	var select = $('#postal_manual_building_type');
	if(select.prop) {
	  var options = select.prop('options');
	}
	else {
	  var options = select.attr('options');
	}
	$( "#postal_manual_building_type option" ).remove();


	$.each(newOptions, function(val, text) {
		options[options.length] = new Option(text, val);
	});
	select.val(selectedOption);
	$( "#postal_manual_building_number" ).val($( "#postal_building_number" ).val());
	$( "#postal_manual_building_name" ).val("");
	$( "#postal_manual_street_number" ).val($( "#postal_street_number" ).val());
	$( "#postal_manual_street_name" ).val($( "#postal_street_name" ).val());
	$( "#postal_manual_street_type" ).val($( "#postal_street_type" ).val());
	$( "#postal_manual_suburb" ).val($( "#postal_suburb" ).val());
	$( "#postal_manual_state" ).val($( "#postal_state" ).val());
	$( "#postal_manual_postcode" ).val($( "#postal_postcode" ).val());
	$( "#dialog-confirm_postal_manual" ).dialog( "open" );
}


function Postal_Same()
{
	if ($('#postal_same').is(':checked'))
	{
		$( "#display_postal1" ).val("SAME AS PHYSICAL");
		$( "#display_postal2" ).val("");
		$( "#display_postal3" ).val("");
		$( "#display_postal4" ).val("");
		$( "#display_postal1" ).attr("disabled","disabled");
		$( "#display_postal2" ).attr("disabled","disabled");
		$( "#display_postal3" ).attr("disabled","disabled");
		$( "#display_postal4" ).attr("disabled","disabled");
		$( "#postal_link" ).attr("disabled","disabled");
		$( "#postal_link" ).removeAttr("onclick");
	}
	else
	{
		$( "#display_postal1" ).val("");
		$( "#display_postal2" ).val("");
		$( "#display_postal3" ).val("");
		$( "#display_postal4" ).val("");
		$( "#display_postal1" ).removeAttr("disabled");
		$( "#display_postal2" ).removeAttr("disabled");
		$( "#display_postal3" ).removeAttr("disabled");
		$( "#display_postal4" ).removeAttr("disabled");
		$( "#postal" ).val("");
		$( "#postal_link" ).removeAttr("disabled");
		$( "#postal_link" ).attr("onclick", "Postal()");
	}
}



function Submit_Details()
{
	var sId =  $("#id").val(),
		sTitle = $("#title").val(),
		sFirstName = $("#first").val(),
		sMiddleName = $("#middle").val(),
		sLastName = $("#last").val(),
		sDob = $("#datepicker").val(),
		sEmail = $("#email").val(),
		sMobile = $("#mobile").val(),
		sPhysical = $("#physical").val(),
		sPostal = $("#postal").val(),
		sOngoingCredit = $("#ongoing_credit").val(),
		sOnceoffCredit = $("#onceoff_credit").val(),
		sPromoCode = $("#promo_code").val(),
		sPromoCli = $("#promo_cli").val(),
		sPayway = $("#payway").val(),
		sDdType = $("#dd_type").val();

	var sSaleType = $("#sale_type").val();

	if(sSaleType=='Business'){
		var	sIdType = '',
			sIdNum = '',
			sAbn = $("#abn").val(),
			sAbnStatus = $(".abn_status").html(),
			sPosition = $("#position").val();
	} else {
		var sIdType = $("#id_type").val(),
			sIdNum = $("#id_num").val(),
			sAbn = '',
			sAbnStatus = '',
			sPosition ='';
	}

	if ($('#postal_same').attr('checked')){
		sPostal = $("#physical").val();
	}

	$.ajax({
		url: BASEURL+"sales/save_submited_sales",
		dataType: "json",
		type: "post",
		data: {
			method : "SUBMIT_DETAILS",
			id: sId,
			title: sTitle,
			firstname: sFirstName,
			middlename: sMiddleName,
			lastname: sLastName,
			dob: sDob,
			email: sEmail,
			mobile: sMobile,
			physical: sPhysical,
			postal: sPostal,
			id_type: sIdType,
			id_num: sIdNum,
			abn: sAbn,
			abn_status: sAbnStatus,
			position: sPosition,
			ongoing_credit: sOngoingCredit,
			onceoff_credit: sOnceoffCredit,
			promo_code: sPromoCode,
			promo_cli: sPromoCli,
			payway: sPayway,
			dd_type: sDdType
		},
		success: function(res) {
			if (res.data.success){
				$( ".validateTips4" ).html(res.data.message);
				$( "#dialog-form4" ).dialog( "open" );
			} else {
				$( ".validateTips4" ).html(res.data.message);
				$( "#dialog-form4" ).dialog( "open" );
			}
		}
	});

}




$(function() {
	$( "#dialog:ui-dialog4" ).dialog( "destroy" );
	$( "#dialog-form4" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width:250,
		height:100,
		modal: true,
		show: "blind",
		hide: "blind"
	});
});


function outsidedp() {
	$( "#datepicker2" ).datepicker( {
		showOn: "button",
		buttonImage: BASEURL+"/assets/images/calendar.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		altField: "#datepicker2",
		altFormat: "dd/mm/yy",
		changeMonth: true,
		changeYear: true,
		maxDate: "-216M",
		yearRange: "-100Y:-18Y"
	});
	//$('#datepicker2').datepicker('show');
}



