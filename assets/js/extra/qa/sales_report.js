$(function() {
	dataPick();
});


function dataPick(){
	$("#datepicker" ).datepicker({
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
			view_display_block();
		}
	});
}



function view_display_block()
{
	var sCentre = $( "#centre" ).val();
	var dDate =  $( "#datepicker2" ).val();
	$.ajax({
		url: BASEURL+"qa/sales_report",
		type: "post",
		data: { date:dDate, center:sCentre } ,
		dataType  : 'html',
		success: function (res) {
			$("#main-block").html(res);
			dataPick();
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}

$(document).ready(function() {
	view_display_block();
});


$(document).ready(function() {
	$( "#dialog:ui-dialog" ).dialog( "destroy" );

	$( "#dialog-form" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		width:550,
		height:160,
		modal: true,
		show: "blind",
		hide: "blind",
		buttons: {
			"Yes": function() {
				$( "#display2" ).html("The DSR generation process has begun. Please refresh this page in 2 minutes.");

				var sCentre = $( "#centre" ).val();
				var dDate =  $( "#datepicker2" ).val();
				$.ajax({
					url: BASEURL+"qa/sales_report_process",
					type: "post",
					data: { date:dDate, center:sCentre } ,
					dataType  : 'json',
					success: function (res) {
						$( "#dialog-form" ).dialog( "close" );
					},
					error: function(jqXHR, textStatus, errorThrown) {
					   console.log(textStatus, errorThrown);
					}
				});
			},
			"No": function() {
				$( "#dialog-form" ).dialog( "close" );
			}
		}
	});
});

function Generate()
{
	$( "#dialog-form" ).dialog( "open" );
}


function Export(folder,file)
{
	var date = $( "#datepicker" ).val();
	window.location = BASEURL+"qa/export_dsr/" + date+ "/" + folder + "/" + file;
}