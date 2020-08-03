function go_back(iModuleID) {
  var sRedirectUrl = BASEURL+"leads";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}

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
		altFormat: "mm/dd/yy",
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
	var dDate =  $( "#datepicker2" ).val();
	$.ajax({
		url: BASEURL+"leads/salesreport",
		type: "post",
		data: { date:dDate} ,
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

function Export() {
	var date = $( "#datepicker2" ).val();

	window.location = BASEURL+"leads/export_sales/" + date ;
}

$(document).ready(function() {
	view_display_block();
});