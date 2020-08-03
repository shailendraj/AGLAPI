$(function(){
	$("#display_loading" ).hide();
	$( "#dialog-form" ).hide();
	$( "#datepicker" ).datepicker( {
		showOn: "button",
		buttonImage:  BASEURL+"/assets/images/calendar.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		altField: "#datepicker2",
		altFormat: "dd/mm/yy",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		maxDate: "0d",
		minDate: "2012-03-01",
		onSelect: function(dateText, inst) {
			view_search_result();
		}});
});


function date_pick_display()
{
	$( "#datepicker" ).datepicker( {
		showOn: "button",
		buttonImage:  BASEURL+"/assets/images/calendar.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		altField: "#datepicker2",
		altFormat: "dd/mm/yy",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		maxDate: "0d",
		minDate: "2012-03-01",
		onSelect: function(dateText, inst) {
			view_search_result();
		}});
}

function view_search_result(intCAll=false)
{
	if(intCAll){
		var dDate = $("#store_date").val();
		var sView = "full";
	} else {
		var dDate = $("#datepicker").val();
		var sView = "basic";
	}
	$( "#store_date" ).val(dDate);
	$.ajax({
		url: BASEURL+"qa/sales",
		type: "post",
		data: { date:dDate, view:sView} ,
		dataType  : 'html',
		success: function (res) {
			if(sView == "full"){
				$("#salesContainer").html(res);
				var sStoreType =$('#store_type').val();
				View(sStoreType);
				date_pick_display();
			} else {
				$("#users-contain").html(res);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}



$(function() {
	$( "#dialog:ui-dialog_view_switch" ).dialog( "destroy" );
	$( "#dialog-confirm_view_switch" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width: 375,
		height: 100,
		modal: true,
		show: "blind",
		hide: "blind"
	});
});

function View(sType)
{
	var dDate = $( "#store_date" ).val(),
		sCentre = $( "#store_centre" ).val();
	$( "#store_type" ).val(sType);
	$( "#dialog-confirm_view_switch" ).dialog( "close" );

	$.ajax({
		url: BASEURL+"qa/sales_display",
		type: "post",
		data: { date:dDate, center:sCentre, type:sType} ,
		dataType  : 'html',
		success: function (res) {
			$("#display2").html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}

function View_Switch(centre)
{
	$( "#store_centre" ).val(centre);
	$( "#dialog-confirm_view_switch" ).dialog( "open" );
}

function View_Sale(sId)
{
	$.ajax({
		url: BASEURL+"qa/sales_display_sale_au",
		type: "post",
		data: { id:sId} ,
		dataType  : 'html',
		success: function (res) {
			$("#salesContainer").html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}

function view_inbound_sale(sId)
{
	$.ajax({
		url: BASEURL+"qa/view_inbound_sale",
		type: "post",
		data: { id:sId} ,
		dataType  : 'html',
		success: function (res) {
			$("#salesContainer").html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	}).done(function() {
		if($("#abn").length > 0)
			getABN();
		grid_packages();
	});
}


function upload_recording()
{
	var fd = new FormData(document.getElementById("files"));
	fd.append("label", "WEBUPLOAD");
	$.ajax({
		url: BASEURL + 'qa/qa_process',
		type: "post",
		data: fd,
		enctype: 'multipart/form-data',
		processData: false,  // tell jQuery not to process the data
		contentType: false,   // tell jQuery not to set contentType
		dataType: 'json',
		success: function (res) {
			if(res.data.success) {
				$(".validateTips").html(res.data.message);
				$( "#voicefile_icon" ).html('<img src="'+BASEURL+'assets/images/check_icon.png">');
			}else{
				$(".validateTips").html(res.data.message);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}

function updateTips( t ) {
	tips.text( t )
		.addClass( "ui-state-highlight" );
	setTimeout(function() {
		tips.removeClass( "ui-state-highlight", 1500 );
	}, 500 );
}

function Reject(iId)
{
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Reject Sale");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"qa/dialog_form_reject",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Reject Sale': save_rejected_sale,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function save_rejected_sale()
{
	var sId = $( "#sale_id" ).val(),
		sVerifier =  $( "#verifier" ).val(),
		sReason = $( "#reason" ).val(),
		sLeadChk = $( "#lead_check" ).val(),
		sRecordingChk = $("#recording_check").val(),
		sDetailsChk = $( "#details_check" ).val();
	$.ajax({
		type:"POST",
		cache:false,
		data:{method: "reject", id:sId, verifier:sVerifier, reason:sReason, leadChk:sLeadChk, recordingChk: sRecordingChk, detailsChk:sDetailsChk},
		url:BASEURL+"qa/qa_process",
		dataType: 'json',
		success: function(res) {
			if(res.data.success){
				$("#dialogbox").dialog('destroy').remove();
				view_search_result(true);
			} else {
				$( ".validateTips" ).html(res.data.message);
				$( "#dialog-form" ).dialog( "open" );
			}
		}
	})
}

function Approve()
{
	var sId = $( "#sale_id" ).val(),
		sVerifier =  $( "#verifier" ).val(),
		sLeadChk = $( "#lead_check" ).val(),
		sRecordingChk = $("#recording_check").val(),
		sDetailsChk = $( "#details_check" ).val();
		sBilling = $( "#billing_comments").val(),
		sOther = $( "#other_comments" ).val(),
		bInbound= $( "#inbound" ).val();

	$.ajax({
		type:"POST",
		cache:false,
		data:{
			method: "APPROVED",
			id:sId,
			verifier:sVerifier, leadChk:sLeadChk,
			recordingChk:
			sRecordingChk,
			detailsChk:sDetailsChk,
			billing:sBilling,
			other:sOther,
			inbound:bInbound
		},
		url:BASEURL+"qa/qa_process",
		dataType: 'json',
		success: function(res) {
			if(res.data.success){
				view_search_result(true);
			} else {
				$( ".validateTips" ).html(res.data.message);
				$( "#dialog-form" ).dialog( "open" );
			}
		}
	})
}

function Details()
{
	var sSaleId =  $( "#sale_id" ).val();
	var sUrl = BASEURL+"qa/sales_details/"+sSaleId ;
	window.open(sUrl,'Sales Details','menubar=no,scrollbars=yes,width=1000px,height=900px,left=1px,top=1px');
}

function Details_Check()
{
	$( "#details_icon" ).html('<img src="'+BASEURL+'assets/images/check_icon.png">');
	$( "#details_check" ).val('1');
}




function Load_Script()
{
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Load Questions Script");
	var iId = $("#sale_id") .val();
	var sPlanId = $("#plan").val();
	var sCampaign = $("#campaign").val();
	var sType = $("#sType").val();


	$.ajax({
		type: "POST",
		data:{
			method: 'new',
			in:0,
			id: iId,
			planId: sPlanId,
			campaign: sCampaign,
			type: sType
		},
		cache:false,
		url: BASEURL+"qa/script_questions",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					"Complete":  function() {
						$( "#recording_icon" ).html('<img src="'+BASEURL+'assets/images/check_icon.png">');
						$( "#recording_check" ).val('1');
						$(tag).dialog('destroy').remove();
					},
					"Incomplete": function() {
						$( "#recording_icon" ).html('<img src="'+BASEURL+'assets/images/delete_icon.png">');
						$( "#recording_check" ).val('0');
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 700 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

$(function() {
	$( "#dialog:ui-dialog" ).dialog( "destroy" );

	$( "#dialog-form" ).dialog({
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


$(function() {
	$( "#dialog:ui-dialog_lead" ).dialog( "destroy" );

	$( "#dialog-form_lead" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width:600,
		height:130,
		modal: true,
		show: "blind",
		hide: "blind",
		buttons: {
			"Validate": function() {
				$( "#lead_icon" ).html('<img src="'+BASEURL+'assets/images/check_icon.png">');
				$( "#lead_check" ).val('1');
				$( "#lead_btn" ).attr("disabled", "disabled");
				$( "#dialog-form_lead" ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});
})

function  Validate_Lead()
{
	$( "#dialog-form_lead" ).dialog( "open" );
}


$(document).ready(function() {
	view_search_result();
});


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


function qa_inbound_cancel(){
	view_search_result(true)
}
