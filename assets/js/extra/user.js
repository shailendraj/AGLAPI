function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	if(iId!=0)
		$(tag).attr("title", "Edit User");
	else
		$(tag).attr("title", "Add New User");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"user/form",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': saveUser,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 680 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function saveUser() {
	$( "#formsubmit" ).click();
	//$( "#userform" ).submit();
}

function updatestatus(userId) {	
	$.ajax({
		type: "POST",
		data:{ID: userId},
		cache:false,
		url: BASEURL+"user/update_status",
		success:function(result) {
			window.location.reload()	 
		}
	});
}


