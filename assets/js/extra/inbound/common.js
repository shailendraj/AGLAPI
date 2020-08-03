$(document).ready(function(){
	var oWindow = $( "<div id='windowBox'></div>" );
	$( "body" ).append(oWindow);
	$("#windowBox").kendoWindow({
		width: 300,
		height: 30,
		title: "Notification Message!!",
		visible: false,
		close: onClose,
	}).data("kendoWindow");
});

function manual_lead()
{
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Add Manual Lead");
	$.ajax({
		type: "POST",
		cache:false,
		url: BASEURL+"inbound/manual_lead",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': save_manual_lead,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 480 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function save_manual_lead()
{
	$("#firstName").removeClass( "ui-state-error" );
	$("#lastName").removeClass( "ui-state-error" );
	$("#contactEmail").removeClass( "ui-state-error" );
	$("#contactMobile").removeClass( "ui-state-error" );
	$("#campaign").removeClass( "ui-state-error" );
	$("#sourceType").removeClass( "ui-state-error" );
	var valid = true;
	valid = chkManualLeadLength();
	if(valid) {
		var values = $("#manualLeadForm").serialize();
		$.ajax({
			url: BASEURL+"inbound/save_manual_lead",
			type: "POST",
			data: values,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$("#dialogbox").dialog('destroy').remove();
					$("#windowBox").html(res.data.message);
					var win = $("#windowBox").data("kendoWindow");
					win.center().open();
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

 function onClose(e) {
	window.location = BASEURL+"inbound/lead_summary";
}

function get_source_list() {
	var cId = $('#campaign').val();
	$('#sourceType').empty();
	$('#sourceType').append(
		$('<option></option>').val('').html('Select Source Type')
	);
	$.ajax({
			url: BASEURL+"inbound/source_type_list",
			type: "post",
			data: {cid:cId} ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$.each(res.data.list, function(i,obj) {
						$('#sourceType').append(
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

function chkManualLeadLength()
{
	if ($("#firstName").val().length <= 0 || $("#lastName").val().length <= 0 || $("#contactEmail").val().length <= 0 || $("#contactMobile").val().length <= 0 || $("#campaign").val().length <= 0 || $("#sourceType").val().length <= 0) {
		$("#manualLeadForm :input").addClass("ui-state-error");
		$("#manualLeadForm :select").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}