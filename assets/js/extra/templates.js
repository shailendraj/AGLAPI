var BaseUrl = "";
function AddEditPopUp(iId, sBaseUrl) {
	BaseUrl = sBaseUrl;
	var tag = $("<div id=\"dialog\"></div>");
	if(iId!=0)
		$(tag).attr("title", "Edit Template");
	else
		$(tag).attr("title", "Add New Template");
	$.ajax({
		type: "POST",
		data:{id: iId},
		cache:false,
		url: BaseUrl + 'upload/addtemplate',
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': saveTemplate,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewTemplate")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}



function chkForm(){
	var sPDFType = $("#pdftype").val();
	if ($("#campaignId").val().length <= 0 || $("#pdftype").val().length <= 0) {
		$("#addNewTemplate :input").addClass("ui-state-error");
		updateTips("*Please enter *required fields.");
		return false;
	} else if(sPDFType == 'WL') {
		if ($("#lettertype").val().length <= 0){
			$("#addNewTemplate :input").addClass("ui-state-error");
			updateTips("*Please enter *required fields.");
		} else {
			return true;
		}

	}else {
		return true;
	}
}

function updateTips( t )
{
	$(".validateTips").html(t);
}


function saveTemplate(){
	$("#addNewTemplate :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = chkForm();
	if(valid) {
		var fd = new FormData(document.getElementById("addNewTemplate"));
		fd.append("label", "WEBUPLOAD");
		$.ajax({
			url: BaseUrl + 'upload/savetemplate',
			type: "post",
			data: fd,
			enctype: 'multipart/form-data',
			processData: false,  // tell jQuery not to process the data
			contentType: false,   // tell jQuery not to set contentType
			dataType: 'json',
			success: function (res) {
				if(res.data.success) {
					//window.location = BaseUrl +"upload/templates";
					$("#error").html(res.data.message);
					refershGrid();
					$("#dialog").dialog('destroy').remove();
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

function submitBack(){
	$('#btnbackform').submit();
}

$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"upload/jsontemplates",
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
						groupId : { type: "string" },
						campaignId: { type: "string" },
						pdfType: { type: "string" },
						fileName: { type: "string" },
						status: { type: "number" }
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
			width: "7%",
			template: "<span class='row-number'></span>",
			filterable: false
		},{
			field: "groupId",
			title: "Group ID",
			width: "15%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "campaignId",
			title: "Campaign Id",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "pdfType",
			title: "PDF Type",
			width: "16%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "status",
			title: "Status",
			template: '#=getValue(status)#',
			width: "8%",
			filterable: false
		},{
			field: "id",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(id, status)#',
			width: "15%",
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

function createLink(id, status){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:editDetails('+id+')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT TEMPLATE" title="EDIT TEMPLATE" ></a>&nbsp;';
	if(status == 1){
		sHtmlContent += '<a href="javascript:updateStatus('+id+') " onclick="return confirm(\'Are you sure you want to disable this template data?\')"><img src="'+BASEURL+'assets/images/icon/no.png"  alt="DISABLE" title="DISABLE"  ></a>&nbsp;';
	}else{
		sHtmlContent += '<a href="javascript:updateStatus('+id+')" onclick="return confirm(\'Are you sure you want to enable this template data?\')" ><img src="'+BASEURL+'assets/images/icon/yes.png" alt="ENABLE" title="ENABLE"  ></a>&nbsp;';
	}
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:viewDetails('+id+')"><img src="'+BASEURL+'assets/images/icon/viewpdf.png" alt="VIEW TEMPLATE PDF" title="VIEW TEMPLATE PDF" ></a>&nbsp;';
	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

function  editDetails(iID) {
   AddEditPopUp(iID, BASEURL);
}


function updateStatus(iID) {
	$.ajax({url: BASEURL+"upload/statustemplate/"+iID, success: function(result) {
		$("#error").html(result.data.message);
		refershGrid();
	}});
}

function getValue(val){
	if(val==1){
		return "Enable";
	} else{
		return "Disable";
	}
}

setInterval(function(){ $("#error").html(''); }, 5000);

function  viewDetails(iID) {
	if(iID>0) {
		var sViewUrl = BASEURL+'upload/vwtp/'+iID
		window.open(sViewUrl,"View Template File","menubar=0,resizable=1,width=600,height=400");
	}
}