$(function() {
	$( "#datepicker" ).datepicker( {
		showOn: "button",
		buttonImage: BASEURL+"assets/images/calendar.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		altField: "#datepicker2",
		altFormat: "dd/mm/yy",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		maxDate: "0d",
		minDate: "2012-03-01",
		onSelect: function(dateText, inst) {
			view_result();
		}
	});
});

$(function() {
	$( "#datepicker3" ).datepicker( {
		showOn: "button",
		buttonImage: BASEURL+"assets/images/calendar.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		altField: "#datepicker4",
		altFormat: "dd/mm/yy",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		maxDate: "0d",
		minDate: "2012-03-01",
		onSelect: function(dateText, inst) {
			view_result();
		}
	});
});

function view_result(){
	var dFormDate = $("#datepicker").val();
	var dToDate = $("#datepicker3").val();
	$.ajax({
		url: BASEURL+"qa/rejections",
		type: "post",
		data: {formDate:dFormDate, toDate:dToDate} ,
		dataType  : 'html',
		success: function (res) {
			$("#users-contain").html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}


$( document ).ready(function() {
  // Handler for .ready() called.
  view_result();
});


$(function() {
	$( "#dialog:ui-dialog" ).dialog( "destroy" );
	$( "#dialog-confirm" ).dialog({
		autoOpen: false,
		width: 275,
		height: 100,
		modal: true,
		resizable: false,
		draggable: false,
		show: "blind",
		hide: "blind"
	});
});

function Export()
{
	$( "#dialog-confirm" ).dialog( "open" );
}



function View(sCentre)
{
	var dFormDate = $( "#datepicker" ).val(),
		dToDate = $( "#datepicker3" ).val();

	$.ajax({
		url: BASEURL+"qa/rejection_view",
		type: "post",
		data: { formDate:dFormDate, toDate:dToDate ,center:sCentre } ,
		dataType  : 'html',
		success: function (res) {
			//$( "#dialog-form" ).dialog( "close" );
			$( "#display2" ).html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}


function Export_All()
{
	var date1 = $( "#datepicker" ),
		date2 = $( "#datepicker3" );
	window.location = BASEURL+"qa/rejetions_submit/export/All/" + date1.val() + "/" + date2.val();
}

function Export_Centre()
{
	var date1 = $( "#datepicker" ),
		date2 = $( "#datepicker3" ),
		centre = $( "#centre_store" );

	if (!centre.val())
	{
		alert("No centre selected");
	}
	else
	{
		window.location = BASEURL+"qa/rejetions_submit/export/All/" + date1.val() + "/" + date2.val();
	}
}

$(function() {
	$( "#dialog:ui-dialog_notes" ).dialog( "destroy" );

	$( "#dialog-form_notes" ).dialog({
		autoOpen: false,
		height: 200,
		width: 425,
		modal: true,
		resizable: false,
		draggable: false,
		show: "blind",
		hide: "blind"
	});
});

function Notes(iId)
{

	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "View Notes");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"qa/notes",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				close: function() {
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 440, "height",100);
			$(tag).html(result).dialog().dialog('open');
		}
	});
}



