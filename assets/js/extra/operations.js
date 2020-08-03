$(document).ready(function (){
	$(function() {
		$( "#datepickerFrom" ).datepicker({
			showOn: "button",
			buttonImage: "../assets/images/calendar.png",
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
				var date2 = $( "#datepickerTo" );
				$( "#salesView" ).hide('blind', '', 'slow',
				function() {
					$( "#salesView" ).load('/operations/salescustomersearch/?formDate=' + dateText + '&toDate=' + date2.val(),
					function() {
						$( "#salesView" ).show('blind', '' , 'slow');
					});
				});
			}
		});
		$( "#datepickerTo" ).datepicker({
			showOn: "button",
			buttonImage: "../assets/images/calendar.png",
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
				var date1 = $( "#datepickerFrom" );
				$( "#salesView" ).hide('blind', '', 'slow',
				function() {
					$( "#salesView" ).load('operations/salescustomersearch/?formDate=' + dateText + '&toDate=' + date1.val(),
					function() {
						$( "#salesView" ).show('blind', '' , 'slow');
					});
				});
			}
		});
	});
});