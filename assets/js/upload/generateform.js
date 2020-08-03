
$(function () {
	'use strict';

	function confirmDialog(title, message, success) {
		var confirmdialog = $('<div></div>').appendTo('body')
			.html('<div><h3>' + message + '</h3></div>')
			.dialog({
				modal: true,
				title: title,
				zIndex: 10000,
				autoOpen: false,
				width: 'auto',
				resizable: false,
				buttons: {
					Yes: function () {
						success();
						$(this).dialog("close");
					},
					No: function () {
						$(this).dialog("close");
					}
				},
				close: function() {
					$(this).remove();
				}
			});

		return confirmdialog.dialog("open");
	}

	$('#generateForm').on('submit', function (e) {
		e.preventDefault();
		var form = this;

		if($('#idcustomer').val().length == 0){
			$("#error").html("Please enter the valid customer ID field value.");
		} else{
			var sID = $('#idcustomer').val();
			$.ajax({
				type:"POST",
				cache:false,
				data:{CID:sID},
				url:BASEURL+"upload/chkcuststatus",
				success: function(res) {
					if(res.data.success) {
						if(res.data.status == 0){
							confirmDialog('Confirm', 'Are you sure regenerate Welcome letter PDF file?', function () {
								form.submit();
							});
						} else {
							form.submit();
						}
					} else {
						$("#error").html("Please enter the valid customer ID field value.");
					}
				}
			})
			/*
			confirmDialog('Confirm', 'Are you sure regenerate Welcome letter PDF file?', function () {
				form.submit();
			});*/
		}
	});
});

function submitBack(){
	$('#btnbackform').submit();
}