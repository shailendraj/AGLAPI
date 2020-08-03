function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"inbound";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}

var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
var sSupId = $("#supplierId").val();
var oGridNew = $("#grid-new").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: sSupId, STATUS: 'NEW'},
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
			title: "Supplier ID"
		}, {
			field: "contactMobile",
			title: "Contact Mobile"
		}, {
			field: "firstName",
			title: "First Name"
		}, {
			field: "lastName",
			title: "Last Name"
		},{
			field: "contactEmail",
			title: "Email"
		}],
		dataBound: function () {
			var rows = this.items();
			$(rows).each(function () {
				var index = $(this).index() + 1
				+ ($("#grid-new").data("kendoGrid").dataSource.pageSize() * ($("#grid-new").data("kendoGrid").dataSource.page() - 1));;
				var rowLabel = $(this).find(".row-number");
				$(rowLabel).html(index);
			});
		}
	}).data("kendoGrid");

var oGridAssigned = $("#grid-assigned").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: sSupId, STATUS: 'ASSIGNED'},
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
			title: "Supplier ID"
		}, {
			field: "contactMobile",
			title: "CLI"
		}, {
			field: "assignedToTeamMember",
			title: "Assign To"
		}, {
			field: "firstName",
			title: "First Name"
		}, {
			field: "lastName",
			title: "Last Name"
		},{
			field: "contactEmail",
			title: "Email"
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


var oGridAttemptingContact = $("#grid-attempting-contact").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: sSupId, STATUS: 'ATTEMPTING CONTACT'},
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
			title: "Supplier ID"
		}, {
			field: "contactMobile",
			title: "CLI"
		}, {
			field: "assignedToTeamMember",
			title: "Assign To"
		}, {
			field: "firstName",
			title: "First Name"
		}, {
			field: "lastName",
			title: "Last Name"
		},{
			field: "contactEmail",
			title: "Email"
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

var oGridProspect = $("#grid-prospect").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: sSupId, STATUS: 'PROSPECT'},
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
			title: "Supplier ID"
		}, {
			field: "contactMobile",
			title: "CLI"
		}, {
			field: "assignedToTeamMember",
			title: "Assign To"
		}, {
			field: "firstName",
			title: "First Name"
		}, {
			field: "lastName",
			title: "Last Name"
		},{
			field: "contactEmail",
			title: "Email"
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
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: sSupId, STATUS: 'WAITING PAYMENT'},
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
			title: "Supplier ID"
		}, {
			field: "contactMobile",
			title: "CLI"
		}, {
			field: "assignedToTeamMember",
			title: "Assign To"
		}, {
			field: "firstName",
			title: "First Name"
		}, {
			field: "lastName",
			title: "Last Name"
		},{
			field: "contactEmail",
			title: "Email"
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

var oGridCallback = $("#grid-callback").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: sSupId, STATUS: 'CALLBACK'},
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
			field: "assignedToTeamMember",
			title: "Assign To",
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
			template: '#=createLink(id)#',
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


function createLink(id){
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
			$("#notificationBox").html("Record Lead reassigned to login user.");
			var win = $("#notificationBox").data("kendoWindow");
			win.center().open();
			if(res.data.success) {
				$("#grid-callback").data("kendoGrid").dataSource.read();
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}

var oGridWon = $("#grid-won").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: sSupId, STATUS: 'WON'},
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
			title: "Supplier ID"
		}, {
			field: "contactMobile",
			title: "CLI"
		}, {
			field: "assignedToTeamMember",
			title: "Assign To"
		}, {
			field: "firstName",
			title: "First Name"
		}, {
			field: "lastName",
			title: "Last Name"
		},{
			field: "contactEmail",
			title: "Email"
		}],
		dataBound: function () {
			var rows = this.items();
			$(rows).each(function () {
				var index = $(this).index() + 1
				+ ($("#grid-won").data("kendoGrid").dataSource.pageSize() * ($("#grid-won").data("kendoGrid").dataSource.page() - 1));;
				var rowLabel = $(this).find(".row-number");
				$(rowLabel).html(index);
			});
		}
	}).data("kendoGrid");

var oGridWon = $("#grid-won").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: sSupId, STATUS: 'WON'},
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
			title: "Supplier ID"
		}, {
			field: "contactMobile",
			title: "CLI"
		}, {
			field: "assignedToTeamMember",
			title: "Assign To"
		}, {
			field: "firstName",
			title: "First Name"
		}, {
			field: "lastName",
			title: "Last Name"
		},{
			field: "contactEmail",
			title: "Email"
		}],
		dataBound: function () {
			var rows = this.items();
			$(rows).each(function () {
				var index = $(this).index() + 1
				+ ($("#grid-won").data("kendoGrid").dataSource.pageSize() * ($("#grid-won").data("kendoGrid").dataSource.page() - 1));;
				var rowLabel = $(this).find(".row-number");
				$(rowLabel).html(index);
			});
		}
	}).data("kendoGrid");

var oGridLost = $("#grid-lost").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: sSupId, STATUS: 'LOST'},
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
			title: "Supplier ID"
		}, {
			field: "contactMobile",
			title: "CLI"
		}, {
			field: "assignedToTeamMember",
			title: "Assign To"
		}, {
			field: "firstName",
			title: "First Name"
		}, {
			field: "lastName",
			title: "Last Name"
		},{
			field: "contactEmail",
			title: "Email"
		}],
		dataBound: function () {
			var rows = this.items();
			$(rows).each(function () {
				var index = $(this).index() + 1
				+ ($("#grid-lost").data("kendoGrid").dataSource.pageSize() * ($("#grid-lost").data("kendoGrid").dataSource.page() - 1));;
				var rowLabel = $(this).find(".row-number");
				$(rowLabel).html(index);
			});
		}
	}).data("kendoGrid");



//apply the activate event, which is thrown only after the animation is played out
tabstrip.one("activate", function() {
	oGridNew.resize();
	oGridAssigned.resize();
	oGridProspect.resize();
	oGridWaitingPayment.resize();
	oGridCallback.resize();
	oGridWon.resize();
	oGridLost.resize();
});

$("#openBtn").click(function(e) {
	tabstrip.activateTab($("#tab-new"));
	tabstrip.activateTab($("#tab-assigned"));
	tabstrip.activateTab($("#tab-attempting-contact"));
	tabstrip.activateTab($("#tab-prospect"));
	tabstrip.activateTab($("#tab-waiting-payment"));
	tabstrip.activateTab($("#tab-callback"));
	tabstrip.activateTab($("#tab-won"));
	tabstrip.activateTab($("#tab-lost"));
});

$(document).ready(function(){
	var oWindow = $( "<div id='notificationBox'></div>" );
	$( "body" ).append(oWindow);
	$("#notificationBox").kendoWindow({
		width: 300,
		height: 30,
		title: "Notification Message!!",
		visible: false,
	}).data("kendoWindow");
});