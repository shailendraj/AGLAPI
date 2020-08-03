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

function view_result()
{
	var dFormDate = $("#datepicker").val();
	var dToDate = $("#datepicker3").val();
	var sCenter = $("#center").val();
	$.ajax({
		url: BASEURL+"sales/sales_report",
		type: "post",
		data: {center:sCenter, formDate:dFormDate, toDate:dToDate} ,
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

function Export()
{
	var dFormDate = $("#datepicker").val();
	var dToDate = $("#datepicker3").val();
	var sCenter = $("#center").val();
	window.location = BASEURL+"sales/sales_report_export/"+sCenter+"/"+dFormDate+"/"+dToDate
}
