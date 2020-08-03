
$(function() {
	$( "#datepicker" ).datepicker( {
		showOn: "button",
		buttonImage: BASEURL+"/assets/images/calendar.png",
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
			view_result();
		}});
});

$(function() {
	$( "#datepicker3" ).datepicker( {
		showOn: "button",
		buttonImage:  BASEURL+"/assets/images/calendar.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		altField: "#datepicker4",
		altFormat: "dd/mm/yy",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		maxDate: "0d",
		minDate: "2012-03-01",
		onSelect: function(dateText, inst) {
			view_result();
		}});
});
$(document).ready(function (){
	$("#customers-grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL + "winback/get_cooled_off_customer_list/",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						customerId: { type: "string" },
						customerName : { type: "string" },
						type: { type: "string" },
						groupCode: { type: "string" },
						campaign: { type: "string" },
						campaignId: { type: "integer" },
						totalServices: { type: "integer" },
						packageTypes: { type: "string" }
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
			field: "customerId",
			title: "Vericon Id",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "customerName",
			title: "Customer",
			width: "12%",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "type",
			title: "Category",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "groupCode",
			title: "Group",
			width: "10%",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "campaign",
			title: "Campaign",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "totalServices",
			title: "Total Services",
			filterable: false
		}, {
			field: "packageTypes",
			title: "Sale Type",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(customerId)#',
			width: "10%",
			filterable: false
		}]
	});

	$("#services-grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL + "winback/get_cooled_off_service_list/",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						customerId: { type: "string" },
						customerName : { type: "string" },
						type: { type: "string" },
						groupCode: { type: "string" },
						campaign: { type: "string" },
						campaignId: { type: "integer" },
						cli: { type: "string" },
						plan: { type: "string" },
						packageType: { type: "string" }
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
			field: "customerId",
			title: "Vericon Id",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "customerName",
			title: "Customer",
			width: "12%",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "type",
			title: "Category",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "groupCode",
			title: "Group",
			width: "10%",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "campaign",
			title: "Campaign",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "cli",
			title: "FNN",
			width: "10%",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "plan",
			title: "Plan",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "packageType",
			title: "Sale Type",
			filterable: {
				cell: {
					showOperators: true
				}
			}
		}, {
			field: "",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(customerId)#',
			width: "10%",
			filterable: false
		}]
	});
});


function createLink(id) {
	var sHtmlContent = '';
	var url= BASEURL + 'winback/customer_details/' + id;
	sHtmlContent += '<input type = "button" onclick="window.location=\'' + url + '\'" value = "View" />';
	return sHtmlContent;
}

function refershCustomerGrid(){
	$("#customer-grid").data("kendoGrid").dataSource.read();
}