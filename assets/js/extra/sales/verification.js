function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"leads";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}


function Get_Sale(){
	var values = $("#salesForm").serialize();
	$.ajax({
		url: BASEURL+"sales/verfsub",
		type: "post",
		data: values,
		dataType  : 'json',
		success: function (res) {
			if( res.data !=null && res.data.success) {
				verification_form_step_one(values);
			}else if(res.data !=null){
				$("#error").html(res.data.error);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}





function verification_form_step_one(values){
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Verify Sale Details");
	$.ajax({
		type: "POST",
		data:values,
		cache:false,
		url: BASEURL+"sales/vfsf",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': verify_sale_country,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addSaleForm1")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 480 );
			$(tag).html(result).dialog().dialog('open');
		}
	});

}

function verify_sale_country()
{
	$("#addSaleForm1 :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var values = $("#addSaleForm1").serialize();
		$.ajax({
			url: BASEURL+"sales/vsc",
			type: "post",
			data: values ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					//$("#dialogbox").dialog('destroy').remove();
					var sRedirectUrl = BASEURL+"sales/vsdau";
					window.location = sRedirectUrl;
				}else{
					$(".validateTips").html(res.data.message);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
}

function checkLength()
{
	if ($("#type").val().length <= 0 || $("#campaignId").val().length <= 0) {
		$("#addSaleForm1 :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}


$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"sales/verfsaleshis",
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
						leadId: { type: "string" },
						status: { type: "string" },
						timestamp: { type: "date" },
						firstname: { type: "string" },
						lastname: { type: "string" },
						bCanVerify: { type: "integer" }
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
			field:"id",
			title: "Sales Id",
			filterable: false
		},{
			field: "leadId",
			title: "Lead Id",
			filterable: false
		},{
			field: "name",
			title: "Customer Name",
			template: '#=firstname+" "+lastname #',
			filterable: false
		},{
			field: "status",
			title: "Status",
			filterable: false
		},{
			field: "timestamp",
			title: "Date/Time",
			format: "{0:MM/dd/yyyy}",
			filterable: false
		},{
			field: "id",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(id, leadId,  status, bCanVerify)#',
			width: "12%",
			filterable: false,
			sortable: false,
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

function createLink(id, leadId, status, bCanVerify){
	var sHtmlContent = '';
	if(status=="Approved"){
		sHtmlContent +='<img src="'+BASEURL+'assets/images/icon/verified.png" alt="verified" title="verified" >';
	} else if (bCanVerify === 1) {
		sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:verfiy(\''+id+'\', \''+leadId+'\')"><img src="'+BASEURL+'assets/images/icon/verification.png" alt="Verification" title="Verification" ></a>&nbsp;';
	}  else {
		sHtmlContent +='<input type="button" value="View" onclick="window.location=\''+ BASEURL +'sales/details/'+ id+ '\'"/>&nbsp;';
	}
	return sHtmlContent;
}

function verfiy(saleId, leadId){
	$.ajax({
		url: BASEURL+"sales/verfsub",
		type: "post",
		data: {
			method: 'get',
			sId :saleId,
			id:leadId
		},
		dataType  : 'json',
		success: function (res) {
			if( res.data !=null && res.data.success) {
				var values = {
					sId :saleId,
					id:leadId
				};
				verification_form_step_one(values);
			}else if(res.data !=null){
				$("#error").html(res.data.error);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}


