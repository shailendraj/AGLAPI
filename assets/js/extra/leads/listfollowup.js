$(document).ready(function () {
	$("#allfollowupgrid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"leads/getFollowupListing",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						id: { type: "number" },
						callback_date: { type: "string" },
						callback_time: { type: "string" },
						fullname: { type: "string" },
						comments: {type: "string"},
					}
				},
				total: function(response) {
					return response.data.length;
				}
			},
			pageSize: 10,
		},
		sortable: true,
		pageable: false,
		scrollable: true,
		autoBind: true,
		resizable: true,
		messages: {
				noRecords: "No results found."
		},
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
			field: "callback_date",
			title: "CallBack Date",
			format:"{0:dd/MM/yyyy}",
			width: "15%",
			filterable: true
		},{
			field: "callback_time",
			title: "CallBack Time",
			format:"{0:dd/MM/yyyy}",
			width: "14%",
			filterable: true
		},{
			field: "fullname",
			title: "Full Name",
			width: "14%",
			filterable: true
		},{
			field: "comments",
			title: "Comment",
			width: "15%",
			filterable: true
		},{
			field: "id",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(id)#',
			width: "12%",
			filterable: false
		}]
	});

	$("#todaysfollowupgrid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"leads/getTodaysFollowupListing",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						id: { type: "number" },
						callback_date: { type: "string" },
						callback_time: { type: "string" },
						fullname: { type: "string" },
						comments: {type: "string"},
					}
				},
				total: function(response) {
					return response.data.length;
				}
			},
			pageSize: 10,
		},
		sortable: true,
		pageable: false,
		scrollable: true,
		autoBind: true,
		resizable: true,
		messages: {
				noRecords: "No results found."
		},
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
			field: "callback_date",
			title: "CallBack Date",
			format:"{0:dd/MM/yyyy}",
			width: "15%",
			filterable: true
		},{
			field: "callback_time",
			title: "CallBack Time",
			format:"{0:dd/MM/yyyy}",
			width: "14%",
			filterable: true
		},{
			field: "fullname",
			title: "Full Name",
			width: "14%",
			filterable: true
		},{
			field: "comments",
			title: "Comment",
			width: "15%",
			filterable: true
		},{
			field: "id",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(id)#',
			width: "12%",
			filterable: false
		}]
	});
});

function createLink(id){
	var sHtmlContent = '';
	//sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/details_icon.png" alt="View FollowUp" title="View FollowUp" ></a>&nbsp;&nbsp;';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/edit_icon.png" alt="Edit FollowUp" title="Edit FollowUp" ></a>&nbsp;';
	return sHtmlContent;
}

function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "EDIT Followup:");
	$.ajax({
		type: "POST",
		data:{id: iId},
		cache:false,
		url: BASEURL+"leads/viewfollowupform",
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