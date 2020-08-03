$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"/agl/getAllData",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						ID: { type: "string" },
						Name: { type: "string" },
						Email: { type: "string" },
						Phone: { type: "number" },
						Status: {type: "string"},
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
			field: "LEAD_ID",
			title: "Lead Id",
			width: "15%",
			filterable: true
		},{
			field: "NAME",
			title: "Name",
			format:"{0:dd/MM/yyyy}",
			width: "14%",
			filterable: true
		},{
			field: "EMAIL",
			title: "Email",
			width: "14%",
			filterable: true
		},{
			field: "PHONE_MOBILE",
			title: "Mobile"
			width: "15%",
			filterable: true
		},{
			field: "AGL_API_RESPONSE_CODE",
			title: "API Response",
			width: "15%",
			filterable: true
		}]
	});
});
