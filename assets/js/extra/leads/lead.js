$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"leads/getLeadsListing",
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
						qastatus: { type: "string" },
						qacomment: { type: "string" },
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
			field: "qastatus",
			title: "QA Status",
			width: "14%",
			filterable: true
		},{
			field: "qacomment",
			title: "QA Comment",
			width: "15%",
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
});

function createLink(id){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/details_icon.png" alt="VIEW" title="VIEW" ></a>&nbsp;';
	return sHtmlContent;
}

function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "VIEW LEAD: " + iId);
	$.ajax({
		type: "POST",
		data:{lead_id: iId},
		cache:false,
		url: BASEURL+"leads/viewleadform",
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
			$(tag).dialog( "option", "width", 600 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}