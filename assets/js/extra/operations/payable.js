function Centre()
{
	var centre = $( "#centre" ),
		centres = $("#centres").val(),
		date = $( "#datepicker" );

	$( "#display" ).hide( 'blind', '', 'slow', function() {
		$( "#display" ).load('/operations/view_payable?centre=' + centre.val() + '&centres=' + centres + '&date=' + date.val(), function(){
			$( "#display" ).show( 'blind', '', 'slow');
			$( "#datepicker" ).datepicker( {
				showOn: "button",
				buttonImage: "/assets/images/calendar.gif",
				buttonImageOnly: true,
				dateFormat: "yy-mm-dd",
				firstDay: 1,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeMonth: true,
				changeYear: true,
				maxDate: $("#maxDate").val(),
				onSelect: function(dateText, inst) {
					var centre = $("#centre"),
						centres = $("#centres").val();
					$( "#display" ).hide( 'blind', '', 'slow', function() {
						$( "#display" ).load('/operations/view_payable?centre=' + centre.val() + '&centres=' + centres + '&date=' + dateText, function(){
							$( "#display" ).show( 'blind', '', 'slow');
						});
					});
				}
			});
		});
	});
}
function Edit_View()
{
	var centre = $( "#centre" ),
		centres = "<?php echo $centres_link; ?>",
		date = $( "#datepicker" );

	$( "#display" ).hide( 'blind', '', 'slow', function() {
		$( "#display" ).load('payable_edit.php?centre=' + centre.val() + '&centres=' + centres + '&date=' + date.val(), function(){
			$( "#display" ).show( 'blind', '', 'slow');
		});
	});
}
function Done()
{
	var centre = $( "#centre" ),
		centres = "<?php echo $centres_link; ?>",
		date = $( "#datepicker" );

	$( "#display" ).hide( 'blind', '', 'slow', function() {
		$( "#display" ).load('payable_display.php?centre=' + centre.val() + '&centres=' + centres + '&date=' + date.val(), function(){
			$( "#display" ).show( 'blind', '', 'slow');
		});
	});
}
function Hours(user)
{
	var field = "#" + user + "_hours",
		field2 = "#" + user + "_cps",
		hours = $( field ),
		date = $( "#datepicker" );

	function checkRegexp( o, regexp, n ) {
		if ( !( regexp.test( o.val() ) ) ) {
			alert( n );
			o.val("");
			return false;
		}
		else {
			return true;
		}
	}

	bValid = checkRegexp( hours, /^([0-9.])+$/, "'" + hours.val() + "' is not a valid input" );

	if (bValid)
	{
		$.get("payable_process.php", { method: "hours", date: date.val(), user: user, hours: hours.val() }, function (data) {
			$( field2 ).html(data);
		});
	}
}
function Bonus(user)
{
	var field = "#" + user + "_bonus",
		field2 = "#" + user + "_cps",
		bonus = $( field ),
		date = $( "#datepicker" );

	function checkRegexp( o, regexp, n ) {
		if ( !( regexp.test( o.val() ) ) ) {
			alert( n );
			o.val("");
			return false;
		}
		else {
			return true;
		}
	}

	bValid = checkRegexp( bonus, /^([0-9.])+$/, "'" + bonus.val() + "' is not a valid input" );

	if (bValid)
	{
		$.get("payable_process.php", { method: "bonus", date: date.val(), user: user, bonus: bonus.val() }, function (data) {
			$( field2 ).html(data);
		});
	}
}
$( "#display" ).load('/operations/view_payable?centre=Centre&centres='+$("#centres").val()+'&date='+$("#date_store").val(),
function() {
	$( "#display" ).show('blind', '', 'slow');
	$( "#datepicker" ).datepicker( {
		showOn: "button",
		buttonImage: "/assets/images/calendar.gif",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		maxDate: $("#maxDate").val(),
		onSelect: function(dateText, inst) {
			var centre = $("#centre"),
				centres = $("#centres").val();

			$( "#display" ).hide( 'blind', '', 'slow', function() {
				$( "#display" ).load('/operations/view_payable?centre=' + centre.val() + '&centres=' + centres + '&date=' + dateText, function(){
					$( "#display" ).show( 'blind', '', 'slow');
				});
			});
		}
	});
});