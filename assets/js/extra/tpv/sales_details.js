$(function() {
	$( "#datepicker" ).datepicker( {
		showOn: "button",
		buttonImage: BASEURL+"assets/images/calendar.png",
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
});

$(document).ready(function (){
	var iSaleId = $("#id").val();
	if ($("#abn").length > 0) {
		getABN();
	}
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
});


function refershGrid(){
	$("#packagesGrid").data("kendoGrid").dataSource.read();
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
	valid = checkLength();
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
					refershGrid();
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

function checkLength() {
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

function updateTips( t ) {
		$( ".validateTipsMain" ).text( t ).addClass( "ui-state-highlight" );
		setTimeout(function() {
			$( ".validateTipsMain" ).removeClass( "ui-state-highlight", 1500 );
		}, 500 );
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
				refershGrid();
			}else{
				updateTips(res.data.message);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
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
			if( data['organisationName'] !== null) {
				$(".bus_name").html( data['organisationName'] );
			}
			else if (data['tradingName'] !== null) {
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


function Done()
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

	var sSaleType = $("#saleType").val();

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
		url: BASEURL+"tpv/process",
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
				window.location = BASEURL + "tpv";
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


$( document ).ready(function() {
	if($("#abn").length && $("#abn").val().length){
		getABN();
	}
});
