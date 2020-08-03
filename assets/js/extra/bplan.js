function Listing(grId)
{
	 window.location = BASEURL+ "admin/campaign/"+grId;;
}

$(document).ready(function (){
	var iCampaignId = $("#cId").val();
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/jbplan/"+iCampaignId,
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
						campaignId : { type: "string" },
						bundlePlanID: { type: "string" },
						qualifierPlanID: { type: "string" },
						bundleDescription: { type: "string" },
						targetCustomer: { type: "string" },
						minimumCost: { type: "number" },
						status: { type: "number" },
						bundleCISPDF: { type: "string" }
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
			field: "bundlePlanID",
			title: "Bundle Plan ID",
			width: "16%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "qualifierPlanID",
			title: "Qualifier Plan ID",
			width: "16%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "bundleDescription",
			title: "Plan Description",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "targetCustomer",
			title: "Rating",
			width: "12%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "minimumCost",
			title: "Minimum Cost",
			width: "14%",
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
			template: '#=createLink(id, status, targetCustomer)#',
			width: "20%",
			filterable: false
		}]
	});

});

function createLink(id, status, targetCustomer){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	if(status == 1){
		sHtmlContent += '<a href="javascript:setStatus(\''+id+'\') " onclick="return confirm(\'Are you sure you want to disable this center data?\')"><img src="'+BASEURL+'assets/images/icon/no.png"  alt="DISABLE" title="DISABLE"  ></a>&nbsp;';
	}else{
		sHtmlContent += '<a href="javascript:setStatus(\''+id+'\')" onclick="return confirm(\'Are you sure you want to enable this center data?\')" ><img src="'+BASEURL+'assets/images/icon/yes.png" alt="ENABLE" title="ENABLE"  ></a>&nbsp;';
	}
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:view_cis_pdf('+id+')"><img src="'+BASEURL+'assets/images/icon/viewpdf.png" alt="VIEW CIS PDF" title="VIEW CIS PDF" ></a>&nbsp;';
	if (targetCustomer == "Residential") {
		sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:loadManageScript(' + id + ',' + targetCustomer + ')"><img src="'+BASEURL+'assets/images/icon/script-icon.png" width="24px" alt="Manage Residential Script" title="Manage Residential Script" ></a>';
	} else if (targetCustomer == "Business") {
		sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:loadManageScript(' + id + ',' + targetCustomer + ')"><img src="'+BASEURL+'assets/images/icon/bscript-icon.png" width="24px" alt="Manage Business Script" title="Manage Business Script" ></a>';
	} else {
		sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:loadManageScript(' + id + ',\'Residential\')"><img src="'+BASEURL+'assets/images/icon/script-icon.png" width="24px" alt="Manage Residential Script" title="Manage Residential Script" ></a>';
		sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:loadManageScript(' + id + ',\'Business\')"><img src="'+BASEURL+'assets/images/icon/bscript-icon.png" width="24px" alt="Manage Business Script" title="Manage Business Script" ></a>';
	}
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
		url:BASEURL+"admin/statusbplan/"+ID,
		success: function(res) {
			$("#error").html(res);
			refershGrid();
		}
	})
}

function  editDetails(e) {
   e.preventDefault();
   var oDataItem = this.dataItem($(e.currentTarget).closest("tr"));
}

function  updateStatus(e) {
   e.preventDefault();
   var oDataItem = this.dataItem($(e.currentTarget).closest("tr"));
}

function view_cis_pdf(iId)
{
	if(iId>0) {
		var sViewUrl = BASEURL+'admin/vbcis/'+iId
		window.open(sViewUrl,"View CIS File","menubar=0,resizable=1,width=600,height=400");
	}
}


function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	if(iId!=0)
		$(tag).attr("title", "Edit Bundle Plan");
	else
		$(tag).attr("title", "Add New Bundle Plan");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"admin/bplanform",
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
					$("#addNewBundlePlan")[0].reset();
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
	$("#addNewBundlePlan :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var fd = new FormData(document.getElementById('addNewBundlePlan'));
		fd.append("label", "WEBUPLOAD");
		$.ajax({
			url: BASEURL + 'admin/savebplan',
			type: "post",
			data: fd,
			enctype: 'multipart/form-data',
			processData: false,  // tell jQuery not to process the data
			contentType: false,   // tell jQuery not to set contentType
			dataType: 'json',
			success: function (res) {
				if(res.data.success) {
					$("#error").html(res.data.message);
					$("#dialogbox").dialog('destroy').remove();
					refershGrid();
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

function checkLength() {
	if ($("#bundlePlanID").val().length <= 0 || $("#qualifierPlanID").val().length <= 0 || $("#bundleDescription").val().length <= 0) {
		$("#addNewBundlePlan :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}


function getJPlanList() {
	var cId = $('#cId').val();
	var selected = $('#bundlePlanID').val();
	$('#qualifierPlanID').empty();
	$('#qualifierPlanID').append(
		$('<option></option>').val('').html('Select Qualifier Plan')
	);
	$.ajax({
			url: BASEURL+"admin/jplanlist",
			type: "post",
			data: {cid: cId, pid: selected} ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$.each(res.data.list, function(i,obj) {
						$('#qualifierPlanID').append(
							$('<option></option>').val(i).html(obj)
						);
					});
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
	});
}
var resiQuestions = [];
var businessQuestions = [];
function loadManageScript(id, targetCustomer) {
	var tag = $("<div id=\"dialog\" style=\"position:unset\"></div>");
	$(tag).attr("title", "Manage Verification Script");
	$.ajax({
		type: "POST",
			data:{planId: id, targetCustomer: targetCustomer},
			cache:false,
			url: "/admin/manageBundleVerificationScript",
			success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: 700,
				width:"auto",
				modal: true,
				buttons: {
					"Save": saveVerificationScript,
					Cancel: function() {
						businessQuestions = [];
						resiQuestions = [];
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					businessQuestions = [];
					resiQuestions = [];
					$("#ManageVerificationScript")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 960 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function saveVerificationScript() {
	var valid = true;
	if ($("#plan_rates").val().length <= 0) {
		$("#plan_rates").addClass("ui-state-error");
		updateTips("*Please enter *required fields.");
		valied = false;
	} else if (resiQuestions.length == 0 && businessQuestions.length == 0) {
		updateTips("Please add TPV Questions");
		valid = false;
	} else {
			valid = true;
	}
	if(valid) {
		var data = {
			planId:  $("#verification_plan_id").val(), 
			script_order: $("#sortable").sortable("toArray"), 
			plan_rates: $("#plan_rates").val(),
			campaignId: $("#campaignId").val(),
			targetCustomer: $("#targetCustomer").val()
		};
		$.ajax({
			type: "POST",
			data: data,
			cache:false,
			url: BASEURL+"admin/saveVerificationScript",
			success:function(res) {
				if(res.data.success) {
					$("#error").html(res.data.message);
					refershGrid();
					$("#dialog").dialog('destroy').remove();
				}else{
					$(".validateTips").html(res.data.message);
				}
			}
		})
	}
}