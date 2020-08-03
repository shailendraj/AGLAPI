$(function() {
	$( "#datepicker" ).datepicker( {
		showOn: "button",
		buttonImage: BASEURL+"/assets/images/calendar.png",
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
		}});
});

$(function() {
	$( "#datepicker3" ).datepicker( {
		showOn: "button",
		buttonImage:  BASEURL+"/assets/images/calendar.png",
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
		}});
});


function view_result(){
	var sCenters = $("#centers").val();
	var dFormDate = $("#datepicker").val();
	var dToDate = $("#datepicker3").val();
	$.ajax({
		url: BASEURL+"qa",
		type: "post",
		data: {center:sCenters, formDate:dFormDate, toDate:dToDate} ,
		dataType  : 'html',
		success: function (res) {
			$("#users-contain").html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}


$(document).ready(function() {
	view_result();
});