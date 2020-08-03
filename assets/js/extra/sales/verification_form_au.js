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
	var oId = $( "#id" );
	$.ajax({
		url: BASEURL+"sales/verfsub",
		type: "post",
		data: { method:'delete_au', id: oId.val(), cli: sCli},
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






//submit error
$(function() {
	$( "#dialog:ui-dialog_submit" ).dialog( "destroy" );

	$( "#dialog-form_submit" ).dialog({
		autoOpen: false,
		width:250,
		height:100,
		modal: true,
		resizable: false,
		draggable: false,
		show: 'blind',
		hide: 'blind'
	});
});

function Submit_Error(data)
{
	$( ".submit_error" ).html(data);
	$( "#dialog-form_submit" ).dialog( "open" );
}

 //load script
function LoadScript()
{
	var id = $( "#id" );
	$.post(BASEURL+"sales/verfsub", {method:'script_check', id: id.val()}, function(res) {
		if (res.data.success){
			window.location= BASEURL+"sales/vsau/"+id.val();
		} else {
			Submit_Error(res.data.message);
		}
	});
}

function Cancel()
{
	var id = $( "#id" ).val();
	var verifier =  $("#verifier").val();
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Cancel Verification");
	$.ajax({
		type: "POST",
		data:{sId:id, verifier:verifier},
		cache:false,
		url: BASEURL+"sales/vcancel",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					Save: function(){
						var id = $( "#id" ),
						verifier =  $("#verifier").val(),
						status = $( "#status" ),
						note = $( "#cancel_note" );
						$.post(BASEURL+"sales/verfsub", {method:'cancel', id: id.val(), verifier:verifier, status: status.val(), note: note.val() }, function(res){
							if (res.data.success) {
								//$( "#dialog-form4" ).dialog( "close" );
								window.location = BASEURL+"sales/verf";
							} else {
								$(".validateTips").html(res.data.message);
							}
						});
					},
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#cancelVerificationForm1")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 480 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}



/** PACKAGES GRID  **/

$(document).ready(function (){
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
		}, {
			field: "cli",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(cli)#',
			width: "12%",
			filterable: false,
			sortable: false,
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

function createLink(id){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:Delete_Package(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/delete.png" alt="DELETE" title="DELETE" ></a>&nbsp;';
	return sHtmlContent;
}

function refershGrid(){
	$("#packagesGrid").data("kendoGrid").dataSource.read();
}
