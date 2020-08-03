$(document).ready(function()
{
	$("#searchInput").click(function(){
		$("#searchInput").val('');
	})
})

function uploadCIS(fld)
{
	if(!/(\.pdf)$/i.test(fld.value)) {
		updateTips("*Please enter .pdf file only.");
		$("#addNewPlan:input[type=file]").addClass("ui-state-error");
		fld.form.reset();
		fld.focus();
		return false;
	}
	$("#addNewPlan:input[type=file]").removeClass("ui-state-error");
	var file_data = $('#cis').prop('files')[0];
	var form_data = new FormData();
	form_data.append('file', file_data);
	$.ajax({
		url: '/admin/upload_cis_file', // point to server-side PHP script
		dataType: 'text',  // what to expect back from the PHP script, if anything
		cache: false,
		contentType: false,
		processData: false,
		data: form_data,
		type: 'post',
		success: function(php_script_response) {
			updateTips(php_script_response); // display response from the PHP script, if any
			//$(".validateTips").show().delay(5000).fadeOut();
		}
	});
}

function AddEditPopUp(id, planID, tID, fID, name, type, price, contract, file, from, to)
{
	var tag = $("<div></div>");
	$(tag).attr("title", "Add New Plan");
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
				$("#addNewPlan")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 400 );
			$(tag).html(result).dialog().dialog('open');
			$("#planID").val(planID);
			$("#tID").val(tID);
			$("#fID").val(fID);
			$("#name").val(name);
			$("#type").val(type);
			$("#price").val(price);
			$("#contract").val(contract);
			$("#savedFile").html(file);
			$("#from").val(from);
			$("#to").val(to);
		}
	});
}

function checkLength()
{
	if ($("#planID").val().length <= 0 || $("#tID").val().length <= 0 || $("#fID").val().length <= 0 || $("#name").val().length <= 0 || $("#type").val().length <= 0 || $("#price").val().length <= 0 || $("#contract").val().length <= 0) {
		$("#addNewPlan :input[type=text]").addClass("ui-state-error");
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

function addPlan()
{
	$("#name").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		$.ajax({
			type:"POST",
			data:{id:$("#ID").val(),planID: $("#planID").val(), tID: $("#tID").val(), fID: $("#fID").val(), name: $("#name").val(), type: $("#type").val(), price: $("#price").val(), contract:$("#contract").val(), file: $("#cis").val(), from: $("#from").val(), to: $("#to").val()},
			url:"/admin/savePlan",
			success:function(response) {
				if(response == 0) {
					$("#addNewPlanForm :input").addClass("ui-state-error");
					$(".validateTips").html('Please enter *required fields.');
				} else if(response == -1) {
					$("#PlanID").addClass("ui-state-error");
					$(".validateTips").html('Already exists.Please try a different PlanID.');
				} else {
					window.location = "/admin/plan";
				}
			}
		})
	}
}

function disablePlan(id, statusfield)
{
	var tag = $("<div></div>");
	$(tag).attr("title", "Disable Plan-");
	$.ajax({
		type: "POST",
		data:{ID: id, status: statusfield},
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
			$(tag).dialog( "option", "width", 400 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function setEndDate()
{
	$.ajax({
		type:"POST",
		data:{id: $('#pID').val(), status: $('#pstatus').val(), endDate: $('#end').val()},
		url:"/admin/disablePlan",
		success:function(response) {
			if(response) {
				window.location = "/admin/plan";
			}
		}
	})
}

function disableNow(str)
{
	$("#end").val(str);
}

function Listing()
{
	window.location = "/admin/plan/";
}
