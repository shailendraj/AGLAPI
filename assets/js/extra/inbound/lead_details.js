function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"inbound";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}



var oGridAssigned = $("#grid-assigned").kendoGrid({
	type: "json",
	dataSource: {
		transport: {
			read:{
				url : BASEURL+"inbound/get_agent_lead_data",
				contentType: 'application/json; charset=utf-8',
				type: 'get',
				dataType: 'json',
				data:{STATUS: 'ASSIGNED'},
			}
		},
		schema: {
			data: "data",
			model: {
				fields: {
					supplierId: { type: "string" },
					firstName: { type: "string" },
					lastName: { type: "string" },
					contactMobile: { type: "string" },
					contactEmail: { type: "string" },
					assignedToTeamMember: { type: "string" },
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
		filterable: false,
		sortable: false,
	},{
		field:"supplierId",
		title: "Supplier ID",
		width: "10%",
		filterable: false,
		sortable: false,
	}, {
		field: "contactMobile",
		title: "CLI",
		width: "10%",
		sortable: false,
	},{
		field: "firstName",
		title: "First Name",
		width: "13%",
		sortable: false,
	}, {
		field: "lastName",
		title: "Last Name",
		width: "13%",
		sortable: false,
	},{
		field: "contactEmail",
		title: "Email",
		width: "15%",
		sortable: false,
	},{
		field: "comments",
		title: "Comment",
		filterable: false
	},{
		field: "id",
		title: "Action",
		attributes: { style: "text-align:center;" } ,
		template: '#=createLink(id)#',
		width: "8%",
		filterable: false
	}],
	dataBound: function () {
		var rows = this.items();
		$(rows).each(function () {
			var index = $(this).index() + 1
			+ ($("#grid-assigned").data("kendoGrid").dataSource.pageSize() * ($("#grid-assigned").data("kendoGrid").dataSource.page() - 1));;
			var rowLabel = $(this).find(".row-number");
			$(rowLabel).html(index);
		});
	}
}).data("kendoGrid");


function createLink(id){
	var sHtmlContent = '';
	sHtmlContent +='<a href="'+BASEURL+'inbound/lead_summary/'+id+'"  ><img src="'+BASEURL+'assets/images/icon/assignment.png" alt="View Lead" title="View Lead" ></a>&nbsp;';
	return sHtmlContent;
}

var oGridCallback = $("#grid-callback").kendoGrid({
	type: "json",
	dataSource: {
		transport: {
			read:{
				url : BASEURL+"inbound/get_agent_lead_data",
				contentType: 'application/json; charset=utf-8',
				type: 'get',
				dataType: 'json',
				data:{STATUS: 'CALLBACK'},
			}
		},
		schema: {
			data: "data",
			model: {
				fields: {
					supplierId: { type: "string" },
					firstName: { type: "string" },
					lastName: { type: "string" },
					contactMobile: { type: "string" },
					contactEmail: { type: "string" },
					agentId: { type: "string" },
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
		filterable: false,
		sortable: false,
	},{
		field:"supplierId",
		title: "Supplier ID",
		filterable: false,
		width: "8%",
	}, {
		field: "contactMobile",
		title: "CLI",
		width: "12%",
	}, {
		field: "firstName",
		title: "First Name",
		filterable: false,
		width: "13%",
	}, {
		field: "lastName",
		title: "Last Name",
		filterable: false,
		width: "13%",
	},{
		field: "comments",
		title: "Comment",
		filterable: false
	},{
		field: "id",
		title: "Action",
		attributes: { style: "text-align:center;" } ,
		template: '#=createReassignLink(id)#',
		width: "8%",
		filterable: false
	}],
	dataBound: function () {
		var rows = this.items();
		$(rows).each(function () {
			var index = $(this).index() + 1
			+ ($("#grid-callback").data("kendoGrid").dataSource.pageSize() * ($("#grid-callback").data("kendoGrid").dataSource.page() - 1));;
			var rowLabel = $(this).find(".row-number");
			$(rowLabel).html(index);
		});
	}
}).data("kendoGrid");

var oGridProspect = $("#grid-prospect").kendoGrid({
	type: "json",
	dataSource: {
		transport: {
			read:{
				url : BASEURL+"inbound/get_agent_lead_data",
				contentType: 'application/json; charset=utf-8',
				type: 'get',
				dataType: 'json',
				data:{STATUS: 'PROSPECT'},
			}
		},
		schema: {
			data: "data",
			model: {
				fields: {
					supplierId: { type: "string" },
					firstName: { type: "string" },
					lastName: { type: "string" },
					contactMobile: { type: "string" },
					contactEmail: { type: "string" },
					agentId: { type: "string" },
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
		filterable: false,
		sortable: false,
	},{
		field:"supplierId",
		title: "Supplier ID",
		filterable: false,
		width: "8%",
	}, {
		field: "contactMobile",
		title: "CLI",
		width: "12%",
	}, {
		field: "firstName",
		title: "First Name",
		filterable: false,
		width: "13%",
	}, {
		field: "lastName",
		title: "Last Name",
		filterable: false,
		width: "13%",
	},{
		field: "comments",
		title: "Comment",
		filterable: false
	},{
		field: "id",
		title: "Action",
		attributes: { style: "text-align:center;" } ,
		template: '#=createReassignLink(id)#',
		width: "8%",
		filterable: false
	}],
	dataBound: function () {
		var rows = this.items();
		$(rows).each(function () {
			var index = $(this).index() + 1
			+ ($("#grid-prospect").data("kendoGrid").dataSource.pageSize() * ($("#grid-prospect").data("kendoGrid").dataSource.page() - 1));;
			var rowLabel = $(this).find(".row-number");
			$(rowLabel).html(index);
		});
	}
}).data("kendoGrid");


var oGridWaitingPayment = $("#grid-waiting-payment").kendoGrid({
	type: "json",
	dataSource: {
		transport: {
			read:{
				url : BASEURL+"inbound/get_agent_lead_data",
				contentType: 'application/json; charset=utf-8',
				type: 'get',
				dataType: 'json',
				data:{STATUS: 'WAITING PAYMENT'},
			}
		},
		schema: {
			data: "data",
			model: {
				fields: {
					supplierId: { type: "string" },
					firstName: { type: "string" },
					lastName: { type: "string" },
					contactMobile: { type: "string" },
					contactEmail: { type: "string" },
					agentId: { type: "string" },
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
		filterable: false,
		sortable: false,
	},{
		field:"supplierId",
		title: "Supplier ID",
		filterable: false,
		width: "8%",
	}, {
		field: "contactMobile",
		title: "CLI",
		width: "12%",
	}, {
		field: "firstName",
		title: "First Name",
		filterable: false,
		width: "13%",
	}, {
		field: "lastName",
		title: "Last Name",
		filterable: false,
		width: "13%",
	},{
		field: "comments",
		title: "Comment",
		filterable: false
	},{
		field: "id",
		title: "Action",
		attributes: { style: "text-align:center;" } ,
		template: '#=createReassignLink(id)#',
		width: "8%",
		filterable: false
	}],
	dataBound: function () {
		var rows = this.items();
		$(rows).each(function () {
			var index = $(this).index() + 1
			+ ($("#grid-waiting-payment").data("kendoGrid").dataSource.pageSize() * ($("#grid-waiting-payment").data("kendoGrid").dataSource.page() - 1));;
			var rowLabel = $(this).find(".row-number");
			$(rowLabel).html(index);
		});
	}
}).data("kendoGrid");

var oGridAttemptingContact = $("#grid-attempting-contact").kendoGrid({
	type: "json",
	dataSource: {
		transport: {
			read:{
				url : BASEURL+"inbound/get_agent_lead_data",
				contentType: 'application/json; charset=utf-8',
				type: 'get',
				dataType: 'json',
				data:{STATUS: 'ATTEMPTING CONTACT'},
			}
		},
		schema: {
			data: "data",
			model: {
				fields: {
					supplierId: { type: "string" },
					firstName: { type: "string" },
					lastName: { type: "string" },
					contactMobile: { type: "string" },
					contactEmail: { type: "string" },
					agentId: { type: "string" },
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
		filterable: false,
		sortable: false,
	},{
		field:"supplierId",
		title: "Supplier ID",
		filterable: false,
		width: "8%",
	}, {
		field: "contactMobile",
		title: "CLI",
		width: "12%",
	}, {
		field: "firstName",
		title: "First Name",
		filterable: false,
		width: "13%",
	}, {
		field: "lastName",
		title: "Last Name",
		filterable: false,
		width: "13%",
	},{
		field: "comments",
		title: "Comment",
		filterable: false
	},{
		field: "id",
		title: "Action",
		attributes: { style: "text-align:center;" } ,
		template: '#=createReassignLink(id)#',
		width: "8%",
		filterable: false
	}],
	dataBound: function () {
		var rows = this.items();
		$(rows).each(function () {
			var index = $(this).index() + 1
			+ ($("#grid-attempting-contact").data("kendoGrid").dataSource.pageSize() * ($("#grid-attempting-contact").data("kendoGrid").dataSource.page() - 1));;
			var rowLabel = $(this).find(".row-number");
			$(rowLabel).html(index);
		});
	}
}).data("kendoGrid");


function createReassignLink(id){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:reassignment(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/assignment.png" alt="Assign" title="Assign" ></a>&nbsp;';
	return sHtmlContent;
}

function reassignment(leadId)
{
	var sCenter = $("#center").val();
	var sAgent = $("#agent").val();
	var sNoteReason = "Inbound lead reassigned.";
	$.ajax({
		url: BASEURL+"inbound/update_assign_leads",
		type: "post",
		data: {leads:leadId, center:sCenter , agent:sAgent , noteReason:sNoteReason},
		dataType  : 'json',
		success: function (res) {
			if(res.data.success) {
				window.location = BASEURL+'inbound/lead_summary/'+leadId;
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}




$(document).ready(function() {
	$("#tabstrip").kendoTabStrip({
		activate: onActivate,
		animation:  {
			open: {
				effects: "fadeIn"
			}
		}
	});
});


function onActivate(e)
{
	var sSelected  = ($(e.item).find("> .k-link").text());
	sSelected = sSelected.trim();
	if(sSelected == "Callback"){
		$("#grid-callback").data("kendoGrid").dataSource.read();
	}

	if(sSelected=="Assigned"){
		$("#grid-assigned").data("kendoGrid").dataSource.read();
	}


}
