$(function() {
	$( "#dialog:ui-dialog_notes" ).dialog( "destroy" );
	$( "#dialog-form_notes" ).dialog({
		autoOpen: false,
		height: 250,
		width: 425,
		modal: true,
		resizable: false,
		draggable: false,
		show: "blind",
		hide: "blind"
	});
});
function View(sCentre)
{
	$.ajax({
		url: BASEURL+"operations/view_rejection_by_centre",
		type: "post",
		data: { dateTo:$("#datepickersalesreject").val() ,center:sCentre } ,
		dataType  : 'html',
		success: function (res) {
			//$( "#dialog-form" ).dialog( "close" );
			$( "#display3" ).html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}
function Notes(iId)
{

	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "View Notes");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"operations/rejectionssubmit",
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
$( "#display" ).load('/operations/view_rejections?centres='+$("#centres").val() + '&date' + '',
function() {
	$( "#display_loading" ).hide();
	$( "#display" ).show('blind', '', 'slow');
	$("#datepickersalesreject").datepicker( {
		showOn: "button",
		buttonImage: "/assets/images/calendar.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		altField: "#datepickersalesreject",
		altFormat: "yy-mm-dd",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		maxDate: "0d",
		minDate: "2012-03-01",
		onSelect: function(dateText, inst) {
			$("#initialDate").val($("#datepickersalesreject").val());
			var centre = $("#centres").val();
			$("#display").hide('blind', '' , 'slow');
			$( "#display2" ).hide('blind', '' , 'slow', function() {
				$( "#display_loading2" ).show();
				$.ajax({url: "/operations/get_date/?date="+dateText, success: function(result){
				}});
				$( "#display2" ).load('/operations/view_rejections/?centres='+centre+'&date=' + dateText,
				function() {
					$( "#display_loading2" ).hide();
					$( "#display2" ).show('blind', '' , 'slow');
				});
			});
		}
	});
});