$(document).ready(function (){
	$("#leadsGrid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"leads/getLeadsListingForSelfVerification",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						leadid: { type: "string" },
						datecreated: { type: "string" },
						leadstatus: { type: "string" },
						lead_disposition: { type: "string"},
						elec_retailer: { type : "string"},
						gas_retailer: { type : "string"},
						leadtype: {type: "string"},
					}
				},
				total: function(response) {
					return response.data.length;
				}
			},
			pageSize: 10,
		},
		sortable: true,
		autoBind: true,
		filterable: {
			extra: false,
			operators: {
				string: {
					startswith: "Starts with",
					eq: "Is equal to",
					neq: "Is not equal to"
				}
			}
		},
		pageable: {
			refresh: true,
			pageSizes: true
		},
		columns: [{
			field: "leadid",
			title: "Lead Id",
			width: "15%",
			filterable: true
		},{
			field: "datecreated",
			title: "Date Created",
			format:"{0:dd/MM/yyyy}",
			width: "14%",
			filterable: true
		},{
			field: "leadstatus",
			title: "Lead Status",
			width: "14%",
			filterable: true
		},{
			field: "lead_disposition",
			title: "Lead Disposition",
			width: "14%",
			filterable: true
		},{
			field: "elec_retailer",
			title: "Electricity Retailer",
			width: "14%",
			filterable: true
		},{
			field: "gas_retailer",
			title: "Gas Retailer",
			width: "14%",
			filterable: true
		},{
			field: "leadtype",
			title: "Lead Type",
			width: "15%",
			filterable: true
		},{
			field: "leadid",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(leadid)#',
			width: "12%",
			filterable: false
		}]
	});

	$("#allcallbackgrid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"leads/getLeadsListingForCallBackVerification",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						leadid: { type: "string" },
						datecreated: { type: "string" },
						leadstatus: { type: "string" },
						leadtype: {type: "string"},
						callbackdate: {type: "string"},
					}
				},
				total: function(response) {
					return response.data.length;
				}
			},
			pageSize: 10,
		},
		sortable: true,
		autoBind: true,
		filterable: {
			extra: false,
			operators: {
				string: {
					startswith: "Starts with",
					eq: "Is equal to",
					neq: "Is not equal to"
				}
			}
		},
		pageable: {
			refresh: true,
			pageSizes: true
		},
		columns: [{
			field: "leadid",
			title: "Lead Id",
			width: "15%",
			filterable: true
		},{
			field: "datecreated",
			title: "Date Created",
			format:"{0:dd/MM/yyyy}",
			width: "14%",
			filterable: true
		},{
			field: "leadstatus",
			title: "Lead Status",
			width: "14%",
			filterable: true
		},{
			field: "leadtype",
			title: "Lead Type",
			width: "15%",
			filterable: true
		},{
			field: "callbackdate",
			title: "Specialist CallBack",
			width: "14%",
			filterable: true
		},{
			field: "leadid",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(leadid)#',
			width: "12%",
			filterable: false
		}]
	});

	$("#todayscallbackgrid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"leads/todaysCallBackVerification",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						leadid: { type: "string" },
						datecreated: { type: "string" },
						leadstatus: { type: "string" },
						leadtype: {type: "string"},
						callbackdate: {type: "string"},
					}
				},
				total: function(response) {
					return response.data.length;
				}
			},
			pageSize: 10,
		},
		sortable: true,
		autoBind: true,
		filterable: {
			extra: false,
			operators: {
				string: {
					startswith: "Starts with",
					eq: "Is equal to",
					neq: "Is not equal to"
				}
			}
		},
		pageable: {
			refresh: true,
			pageSizes: true
		},
		columns: [{
			field: "leadid",
			title: "Lead Id",
			width: "15%",
			filterable: true
		},{
			field: "datecreated",
			title: "Date Created",
			format:"{0:dd/MM/yyyy}",
			width: "14%",
			filterable: true
		},{
			field: "leadstatus",
			title: "Lead Status",
			width: "14%",
			filterable: true
		},{
			field: "leadtype",
			title: "Lead Type",
			width: "15%",
			filterable: true
		},{
			field: "callbackdate",
			title: "Specialist CallBack",
			width: "14%",
			filterable: true
		},{
			field: "leadid",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(leadid)#',
			width: "12%",
			filterable: false
		}]
	});
});

function createLink(id){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/verification.png" alt="Verification" title="Verify '+ id +'"></a>&nbsp;';
	return sHtmlContent;
}

function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "VERIFY LEAD: " + iId);
	$.ajax({
		type: "POST",
		data:{lead_id: iId},
		cache:false,
		url: BASEURL + "leads/viewleadverificationform",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "650",
				width:"auto",
				modal: true,
				buttons: {
						'Save': saveVerification,
						Cancel: function() {
							$(tag).dialog('destroy').remove();
						}
					},
					close: function() {
						$("#addNewIPAccess")[0].reset();
						$("#name").removeClass( "ui-state-error" );
						$(tag).dialog('destroy').remove();
					}
			});
			$(tag).dialog( "option", "width", 600 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function saveVerification()
{
	leadId = $("#lead_id").val();
	leadStatus = $("#leadstatus").val();
	specialistComment = $("#scomment").val();
	specialistFile = $("#svoicerecording").prop("files")[0];
	callBackDateTime = $("#callbackdatetime").val();
	retailer = $("#retailer").val();
	salesType = $("#saledisposition").val();
	retailerGas = $("#retailerGas").val();

	form_data = new FormData();
	form_data.append("specialistFile", specialistFile);
	form_data.append("leadId", leadId);
	form_data.append("leadStatus", leadStatus);
	form_data.append("specialistComment", specialistComment);
	form_data.append("callBackDateTime", callBackDateTime);
	form_data.append("salesType", salesType);
	form_data.append("retailer", retailer);
	form_data.append("retailerGas", retailerGas);

	if(leadStatus == 2) {
		if(!callBackDateTime || callBackDateTime.length == 1) {
			$("#callbackdatetime").addClass("inputrequired");
			$("#retailer").removeClass("inputrequired");
			return false;
		}
	} else if(leadStatus == 5) {
		if(salesType === '') {
			$("#callbackdatetime").removeClass("inputrequired");
			$("#saledisposition").addClass("inputrequired");
			return false;
		} else if(salesType != '') {
			if(retailer === '') {
				$("#saledisposition").removeClass("inputrequired");
				$("#retailer").addClass("inputrequired");
				if(salesType == 7) {
					$("#retailerGas").addClass("inputrequired");
					return false;
				}
				return false;
			}
			if(salesType == 7 && retailerGas === '') {
				$("#retailerGas").addClass("inputrequired");
				return false;
			}
			if(retailer === retailerGas) {
				$("#trError").show();
				$("#errorMsgRetailer").html("Retailers should be different.");
				$("#retailer").addClass("inputrequired");
				$("#retailerGas").addClass("inputrequired");
				return false;
			} else {
				$("#trError").hide();
			}
		}
	} else {
		$("input").removeClass("inputrequired");
	}

	$.ajax({
		type: "POST",
		dataType:'json',
		data: form_data,
		cache: false,
		url: BASEURL + "leads/verifyLead",
		contentType: false,
		processData: false,
		success: function(response) {
			if(response['iMsg'] == 1) {
				location.reload();
			} else if(response['iMsg'] == -1) {
				$("#errorMess").html("File already exists! Please try another one.");
			} else if(response['iMsg'] == 0) {
				$("#errorMess").html("Please enter required fields.");
			}
		}
	})
}