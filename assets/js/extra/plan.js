function togglePlan(id, statusfield)
{
	var tag = $("<div id=\"dialog\" style=\"position:unset\"></div>");
	var sTitle = "";
	var iPassStatus = 0;
	if(statusfield == 1){
		sTitle  = "Disable Plan";
		iPassStatus = 0;
	} else {
		sTitle  = "Enable Plan";
		iPassStatus = 1;
	}
	$(tag).attr("title", sTitle);
	$.ajax({
		type: "POST",
		data:{ID: id, status: iPassStatus},
		cache:false,
		url: "/admin/disableform",
		success:function(result) {
		$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
		$(tag).dialog({
			autoOpen: false,
			resizable: false,
			height: "auto",
			width:"auto",
			modal: true,
			buttons: {
				"Save": setEndDate,
				Cancel: function() {
					$(tag).dialog('destroy').remove();
				}
			},
			close: function() {
				$("#disablePlan")[0].reset();
				$(tag).dialog('destroy').remove();
			}
		});
		$(tag).dialog( "option", "width", 450 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function setEndDate()
{

	if($('#end').val().length ===0){
		$(".validateTips").html('Please enter the valid end date field value.');
	}else{
		$.ajax({
			type:"POST",
			data:{id: $('#pID').val(), status: $('#pstatus').val(), endDate: $('#end').val()},
			url:"/admin/disablePlan",
			success:function(response) {
				if(response) {
					$("#dialog").dialog('destroy').remove();
					refershGrid();
				}
			}
		})
	}
}

function disableNow(str)
{
	$("#end").val(str);
}

function AddEditPopUp(id)
{
	var tag = $("<div id=\"dialog\" style=\"position:unset\"></div>");
	$(tag).attr("title", "Add/Edit Plan");
	$.ajax({
		type: "POST",
			data:{ID: id},
			cache:false,
			url: "/admin/addPlanForm",
			success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					"Save": addPlan,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewPlanForm")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 400 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function checkLength()
{
	if ($("#planID").val().length <= 0 || $("#fID").val().length <= 0 || $("#name").val().length <= 0 || $("#type").val().length <= 0 || $("#price").val().length <= 0 || $("#contract").val().length <= 0 || $("#from").val().length <= 0 || $("#to").val().length <= 0  || $("#bundleOnly").val().length <= 0) {
		$("#addNewPlanForm :input[type=text]").addClass("ui-state-error");
		$("#targetCustomer").addClass("ui-state-error");
		$("#type").addClass("ui-state-error");
		$("#tID").removeClass("ui-state-error");
		updateTips("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}

function updateTips( t )
{
	$(".validateTips").html(t);
}

function addPlan() {
	$("#name").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var fd = new FormData(document.getElementById("addNewPlanForm"));
		fd.append("label", "WEBUPLOAD");
		$.ajax({
			url:BASEURL+"admin/savePlan",
			type: "POST",
			data: fd,
			enctype: 'multipart/form-data',
			processData: false,  // tell jQuery not to process the data
			contentType: false,   // tell jQuery not to set contentType
			dataType: 'json',
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

function setPlanStatus(ID, status)
{
	$.ajax({
		type:"POST",
		cache:false,
		data:{id:ID, status:status},
		url:"/admin/setPlanStatus",
		success: function(res) {
			//alert(res);
			$("#dialog").dialog('destroy').remove();
			$("#error").html(res);
			refershGrid();
		}
	})
}

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
					url : BASEURL+"admin/jplan/"+iCampaignId,
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
						planID : { type: "string" },
						tID: { type: "string" },
						fID: { type: "string" },
						name: { type: "string" },
						targetCustomer: { type: "string" },
						type: { type: "string" },
						price: { type: "string" },
						contract: { type: "string" },
						start_datetime: { type: "date" },
						end_datetime: { type: "date" },
						status: { type: "number" },
						file: { type: "string" }
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
			field: "planID",
			title: "Plan ID",
			width: "15%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "name",
			title: "Plan Name",
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
			field: "type",
			title: "Type",
			width: "9%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "start_datetime",
			title: "Form Date",
			format: "{0:yyyy-MM-dd}",
			width: "10%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "end_datetime",
			title: "To Date",
			width: "10%",
			format: "{0:yyyy-MM-dd}",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "status",
			title: "Status",
			template: '#=getValue(status)#',
			width: "6%",
			filterable: false
		},{
			field: "ID",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(ID, status, targetCustomer)#',
			width: "18%",
			filterable: false
		}]
	});
});


function createLink(id, status, targetCustomer)
{
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp('+id+')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	if(status == 1){
		sHtmlContent += '<a href="javascript:togglePlan('+id+', '+status+') "><img src="'+BASEURL+'assets/images/icon/no.png"  alt="DISABLE" title="DISABLE"  ></a>&nbsp;';
	}else{
		sHtmlContent += '<a href="javascript:togglePlan('+id+', '+status+')"><img src="'+BASEURL+'assets/images/icon/yes.png" alt="ENABLE" title="ENABLE"  ></a>&nbsp;';
	}
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:showDetails('+id+')"><img src="'+BASEURL+'assets/images/icon/viewpdf.png" alt="VIEW CIS PDF" title="VIEW CIS PDF" ></a>';
	if (targetCustomer == "Residential") {
		sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:loadManageScript(' + id + ',\'Residential\')"><img src="'+BASEURL+'assets/images/icon/script-icon.png" width="24px" alt="Manage Residential Script" title="Manage Residential Script" ></a>';
	} else if (targetCustomer == "Business") {
		sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:loadManageScript(' + id + ',\'Business\')"><img src="'+BASEURL+'assets/images/icon/bscript-icon.png" width="24px" alt="Manage Business Script" title="Manage Business Script" ></a>';
	} else {
		sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:loadManageScript(' + id + ',\'Residential\')"><img src="'+BASEURL+'assets/images/icon/script-icon.png" width="24px" alt="Manage Residential Script" title="Manage Residential Script" ></a>';
		sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:loadManageScript(' + id + ',\'Business\')"><img src="'+BASEURL+'assets/images/icon/bscript-icon.png" width="24px" alt="Manage Business Script" title="Manage Business Script" ></a>';
	}

	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

function getValue(val){
	if(val==1){
		return "Enable";
	} else{
		return "Disable";
	}
}

function showDetails(iID) {
	if(iID>0) {
		var sViewUrl = BASEURL+'admin/vcis/'+iID
		window.open(sViewUrl, "View CIS File", "width=600,height=400,menubar=0,resizable=1");
	}
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
		url: "/admin/manageVerificationScript",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: 755,
				width:"auto",
				modal: true,
				buttons: {
					"Save": saveVerificationScript,
					Cancel: function() {
						businessQuestions = [];
						resiQuestions = [];
						resetTinymceEditor();
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					//MANAGE EDITOR
					resetTinymceEditor();

					businessQuestions = [];
					resiQuestions = [];
					$("#plan_rates").val('');
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 970 );
			$(tag).html(result).dialog().dialog('open');
		}
	}).done(function() {

		tinymce.init({
			selector: '#plan_rates',
			height: 60,
			menubar: false,
			plugins: [
				'advlist autolink lists link image charmap print preview anchor',
				'searchreplace visualblocks code fullscreen',
				'insertdatetime textcolor colorpicker media table contextmenu paste code'
			],
			toolbar: 'undo redo | forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ',
			init_instance_callback: function() {
				// event after dialog effect, and after tinymce init, get focus!
				tinymce.execCommand('mceFocus',false,'insidewysiwyg');
			}
		});
	});
}

function resetTinymceEditor()
{
	//MANAGE EDITOR
	var initiator = $('#dialog textarea').attr( 'rel' );
	$( initiator ).val(tinyMCE.activeEditor.getContent() );
	$( initiator ).focus();
	tinyMCE.remove( '#dialog textarea');
}

function saveVerificationScript() {
	var sPlanRates = tinyMCE.activeEditor.getContent();
	var valid = true;
	if (sPlanRates.length <= 0) {
		$("#plan_rates").addClass("ui-state-error");
		updateTips("*Please enter *required fields.");
		valied = false;
	} else if (resiQuestions.length == 0 && businessQuestions.length == 0) {
		updateTips("Please add TPV Questions");
		valid = false;
	} else {
			valid = true;
	}
	businessQuestions = [];
	resiQuestions = [];
	if(valid) {
		var data = {
			planId:  $("#verification_plan_id").val(),
			script_order: $("#sortable").sortable("toArray"),
			plan_rates: sPlanRates,
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
					resetTinymceEditor();
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
setInterval(function(){ $("#error").html(''); }, 5000);
