
$(document).ready(function (){
	var iPendingCoolOff = ($("#CoolOffFlag").is(":checked")? 1 : 0);
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL + "care/load_customers/" + iPendingCoolOff,
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
						sfId : { type: "string" },
						customerName : { type: "string" },
						leadId: { type: "string" },
						type: { type: "string" },
						campaign: { type: "string" },
						packageType: { type: "string" }, 
						status: { type: "string" },
						agent: { type: "string" },
						centre: { type: "string" },
						canCoolOff: {type: "integer"}
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
			field: "id",
			title: "Sale ID",
			width: "12%",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "sfId",
			title: "Billing ID",
			width: "12%",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		},{
			field: "customerName",
			title: "Customer",
			width: "12%",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		},{
			field: "leadId",
			title: "Lead ID",
			width: "12%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "type",
			title: "Category",
			width: "10%",
			filterable: false
		},{
			field: "packageType",
			title: "Sale Type",
			width: "10%",
			filterable: false
		},{
			field: "campaign",
			title: "Campaign",
			width: "15%",
			filterable: false
		},{
			field: "status",
			title: "Status",
			width: "10%",
			filterable: true
		},{
			field: "",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(id, canCoolOff)#',
			width: "10%",
			filterable: false
		}]
	});
});


function createLink(id, canCoolOff) {
	var sHtmlContent = '';
	var url= BASEURL + 'care/customer_details/' + id;
	sHtmlContent += '<input type = "button" onclick="window.location=\'' + url + '\'" value = "View" />';
	if (canCoolOff == 1) {
		sHtmlContent += '<input type = "button" onclick="javascript:LoadCoolOff('+id+')" value="Cool Off" />';
	}
	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

function LoadCoolOff(customerId)
{
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Customer Cool Off");
	$.ajax({
		type: "POST",
		data:{id:customerId},
		cache:false,
		url: BASEURL + "care/load_cooloff",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					Confirm: function(){
						var id = $("#customerId")
							reason = $( "#reason" ),
							note = $( "#cooloff_note" );
						$.ajax({
							type:"POST",
							cache:false,
							data:{ method:'cool_off', id: id.val(), reason: reason.val(), note: note.val()},
							url: BASEURL+"care/process",
							success: function(res) {
								if(res.data.success){
									window.location = BASEURL+"care/customers";
								} else {
									$(".validateTips").html(res.data.message);
								}
							}
						})
					},
					Cancel: function() {
						$(tag).dialog('destroy').remove();
						$("#coolOffForm")[0].reset();
					}
				},
				close: function() {
					$("#coolOffForm")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 480 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}


