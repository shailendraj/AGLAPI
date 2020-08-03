$(function() {
	$("#end").datepicker({
	defaultDate: "+1w",
	changeMonth: true,
	numberOfMonths: 1,
	dateFormat: "yy-mm-dd",
	onClose: function( selectedDate ) {
		$("#to").datepicker("option", "minDate", selectedDate);
		}
	});
});