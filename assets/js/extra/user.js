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

function search_opt(field_id) {
	var val = $("#"+field_id).val();	
	if(val !== null && val !== 'undefined' && val !== '') {		
		$("#"+field_id+"Search").val(field_id+":"+val);
		$("#selected"+field_id+"Search").html(" "+val+' &nbsp;<a href="javascript:void(0)" onclick="remove_serachopt(\''+ field_id + '\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>');
		search_redirect();
	}
}

function remove_serachopt(field_id) {
	$("#"+field_id+"Search").val('');
	$("#selected"+field_id+"Search").html("");
	search_redirect();
}

function search_redirect() {
	var searchInput = $('input[name="search[]"]').map(function () {
   		return this.value; // $(this).val()
	}).get();
	var serachOpt = '';
	$.each(searchInput, function( index, value ) {		
  		if(value != "" && value != 'undefined') {
  			if(serachOpt === '') {
  				serachOpt = value;
  			} else {
  				serachOpt += "@" + value;
  			}
  		}
	});

	var loc = window.location;
	var withoutQuery = loc.hostname + loc.pathname;
	var currentUrl = loc.protocol + "//" + loc.hostname + '/user';	
	var options =  getUrlVars(); 
	var oldParam = '';
	$.each(options, function( index, value ) {
		if(index != 'srh' && typeof index === 'string' && value != '') {

			if(oldParam === '') {
				oldParam = index + "=" + value;
			} else {
				oldParam += "&"+index + "=" + value;
			}
		}
	});	
	if(serachOpt !== '' ) {
		currentUrl += "?srh=" + encodeURI(serachOpt) + "&" + oldParam; 
	} else {
		currentUrl += "?" + oldParam;
	}
	window.location.href = currentUrl;	
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



$( document ).ready(function() {
    $('.dropdown-toggle').dropdown()
});


