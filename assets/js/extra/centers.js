$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/getJsonCenters",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						centerCode: { type: "string" },
						centerName: { type: "string" },
						status: { type: "number" },
						campaignID: { type: "string" },
						name: {type: "string"},
						verification_type: {type: "string"}
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
			field: "rowNumber",
			title: "Sr. No",
			width: "6%",
			template: "<span class='row-number'></span>",
			filterable: false
		},{
			field: "centerCode",
			title: "Center Code",
			width: "14%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "centerName",
			title: "Center Name",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "campaignID",
			title: "Campaign",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "name",
			title: "Campaign Name",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "verification_type",
			title: "Verification Type",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "status",
			title: "Status",
			template: '#=getValue(status)#',
			width: "7%",
			filterable: false
		},{
			field: "centerCode",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(centerCode, status)#',
			width: "12%",
			filterable: false
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

function popUpRetailer(val)
{
	if(val === 'self') {
		$("#trRetailer").show();
	} else {
		$("#center_retailers > option").attr("selected",false);
		$("#trRetailer").hide();
	}
}
function createLink(id, status){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	if(status == 1){
		sHtmlContent += '<a href="javascript:setStatus(\''+id+'\') " onclick="return confirm(\'Are you sure you want to disable this center data?\')"><img src="'+BASEURL+'assets/images/icon/no.png"  alt="DISABLE" title="DISABLE"  ></a>&nbsp;';
	}else{
		sHtmlContent += '<a href="javascript:setStatus(\''+id+'\')" onclick="return confirm(\'Are you sure you want to enable this center data?\')" ><img src="'+BASEURL+'assets/images/icon/yes.png" alt="ENABLE" title="ENABLE"  ></a>&nbsp;';
	}
	//sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:addSuppliers(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/addfeature.png" alt="ADD SUPPLIER" title="ADD SUPPLIER" ></a>';
	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

function getValue(val)
{
	if(val==1){
		return "Enable";
	} else{
		return "Disable";
	}
}

setInterval(function(){ $("#error").html(''); }, 5000);

function setStatus(ID)
{
	$.ajax({
		type:"GET",
		cache:false,
		url:BASEURL+"admin/statuscenter/"+ID,
		success: function(res) {
			$("#error").html(res);
			refershGrid();
		}
	})
}

function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	if(iId!=0)
		$(tag).attr("title", "Edit Center");
	else
		$(tag).attr("title", "Add New Center");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"admin/centerform",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': saveCenter,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewCenter")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function saveCenter(){
	$("#addNewCenter :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var values = $("#addNewCenter").serialize();
		$.ajax({
			url: BASEURL+"admin/savecenter",
			type: "post",
			data: values ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$("#error").html(res.data.message);
					$("#dialogbox").dialog('destroy').remove();
					refershGrid();
				} else {
					$(".validateTips").html(res.data.message);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
}

function checkLength() {
	var flag = 0;
	var verificationType = $("#verification").val();
	if ($("#centerCode").val().length <= 0) {
		$("#centerCode").addClass("ui-state-error");
		flag = 1;
	} else if($("#centerName").val().length <= 0) {
		$("#centerName").addClass("ui-state-error");
		flag = 1;
	} else if($("#campaignId").val().length <= 0) {
		$("#campaignId").addClass("ui-state-error");
		flag = 1;
	} else if(verificationType.length <= 0) {
		$("#verification").addClass("ui-state-error");
		flag = 1;
	} /*else {
		if(verificationType === 'self') {
			if($("#center_retailers[] > option").length <= 0) {
				alert("hereee");
				///$("#center_retailers").addClass("ui-state-error");
				flag = 1;
			}
		}
	}*/
	if(flag == 1) {
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}

function EditPopUp(id) {
	$.ajax({
		url: BASEURL+"admin/center/editsupplier",
		type: "post",
		data: {ID:id},
		dataType  : 'json',
		success: function (res) {
			if(res.data.success) {
				$("#addCenterSupplier :input").addClass("ui-state-highlight");
				$("#supplierid").val(res.data.result.supplierID);
				$("#status").val(res.data.result.status);
				$("#old_cs_id").val(res.data.result.id);
				$("#btnadd").val('Edit Supplier');
			}else{
				$(".validateTips").html(res.data.message);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}


