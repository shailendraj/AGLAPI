function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"leads";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}

var leadId = "";
$(document).ready(function (){
	leadId = $("#lead_id").val();

	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"leads/ghistory",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json',
					data: {leadId: leadId}
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						cli: { type: "number" },
						centreCode: { type: "string" },
						issueDate: { type: "date" },
						expiryDate: { type: "date" },
						packetExpiry: { type: "date" }
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
			title: "Lead ID",
			filterable: false
		}, {
			field: "centreCode",
			title: "Centre"
		}, {
			field: "expiryDate",
			title: "Expiry Date",
			format: "{0:MM/dd/yyyy}"
		}, {
			field: "packetExpiry",
			title: "Packet Expiry",
			format: "{0:MM/dd/yyyy}"
		}],
		dataBound: function () {
			var rows = this.items();
			$(rows).each(function () {
				var index = $(this).index() + 1
				+ ($("#grid").data("kendoGrid").dataSource.pageSize() * ($("#grid").data("kendoGrid").dataSource.page() - 1));;
				var rowLabel = $(this).find(".row-number");
				$(rowLabel).html(index);
			});
		}
	});
});
function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read({leadId: $("#lead_id").val()});
}