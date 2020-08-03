$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"upload/getwllog",
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
						wlDate : { type: "string" },
						fileName: { type: "string" },
						letterType: { type: "string" },
						saleDate: { type: "number" },
						group: { type: "string" },
						campaign: { type: "string" },
						type: { type: "string" },
						firstName: { type: "string" },
						lastName: { type: "string" },
						email: { type: "string" },
						packageType: { type: "string" }
					}
				},
				total: function(response) {
					return response.data.length;
				}
			},
			pageSize: 10
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
			title: "Customer ID",
			width: "15%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "firstName",
			title: "First Name",
			width: "15%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "lastName",
			title: "Last Name",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "packageType",
			title: "Package Type",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "wlDate",
			title: "Genrate Date",
			width: "16%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{ command: [{ text: "click here", click: downloadDetails }], title: "Download Letter", width: "13%" }]
	});
});

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
	console.log('grid');
}



function downloadDetails(e) {
   e.preventDefault();
   var oDataItem = this.dataItem($(e.currentTarget).closest("tr"));
   var sFileName= oDataItem.fileName;
   var sUrl = BASEURL+"upload/fdownload/"+sFileName;
   //var xhr = new XMLHttpRequest();
   //xhr.open("GET", sUrl);
   //xhr.send();
   window.location = sUrl;
   /*
   var oDataItem = this.dataItem($(e.currentTarget).closest("tr"));
   var sCenterCode= oDataItem.center_code;
   var url = BASEURL+"centers/form/"+sCenterCode;
	var options = {
		url: url,
		title:'Edit Centers',
		data:{ID: sCenterCode},
		buttons: [
			{text: 'Submit', style: 'info',   close: true, click: submit },
			{text: 'Cancel', style: 'danger', close: true, click: cancel }
		],
	};
	eModal.ajax(options);
	*/
}

