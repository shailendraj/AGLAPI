function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"leads";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}


$(document).ready(function (){
	var rid = $("#retailerId").val();
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"sales/salesformdetails/"+rid,
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						id: {type: "number"},
						lead_id: { type: "string" },
						lead_agent: { type: "string" },
						centre: { type: "string" },
						qa_agent: { type: "string" },
						retailerid: {type: "number"},
						retailer_name: {type: "string"},
						retailerType: {type: "string"}
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
			field: "lead_id",
			title: "Lead Id",
			filterable: false
		},{
			field: "lead_agent",
			title: "Lead Agent",
			filterable: false
		},{
			field: "centre",
			title: "Centre",
			filterable: false
		},{
			field: "qa_agent",
			title: "QA Agent",
			filterable: false
		},{
			field: "id",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(id, retailerid, retailer_name, lead_id, retailerType)#',
			width: "12%",
			filterable: false,
			sortable: false,
		}]
	});
});

function createLink(id, rid, retailer_name, lead_id, retailerType){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\', \''+rid+'\', \''+retailer_name+'\', \''+lead_id+'\', \'' +retailerType+ '\')"><img src="'+BASEURL+'assets/images/icon/form3.jpg" height="30px" alt="SalesForm" title="SalesForm" ></a>&nbsp;';
	return sHtmlContent;
}

function AddEditPopUp(id, iId, retailer_name, lead_id, retailerType) {
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Sales Form: " + retailer_name);
	$.ajax({
		type: "POST",
		data:{id: id, retailer: iId, lead_id: lead_id, retailerType: retailerType},
		cache:false,
		url: BASEURL+"sales/viewsalesform",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "600",
				width:"auto",
				modal: true,
				close: function() {
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 1000 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}
function cancel()
{
	$(".ui-dialog").hide();
	$(".ui-widget-overlay").hide();
	return false;
}