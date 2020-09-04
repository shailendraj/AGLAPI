function search_opt(field_id, field_id2 = '') {    
	var val = $("#"+field_id).val(); 
	if(field_id2 != '') {
		var val2 = $("#"+field_id2).val(); 
	}
	if(val !== null && val !== 'undefined' && val !== '') {
        if(val2 !== null && val2 !== 'undefined' && val2 !== '') {
			$("#"+field_id2+"Search").val(field_id2+":"+val2);
			$("#selected"+field_id2+"Search").html(" "+val2+' &nbsp;<a href="javascript:void(0)" onclick="remove_serachopt(\''+ field_id2 + '\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>');
		}	
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
	
	var searchInput2 = $('input[name="search2[]"]').map(function () {
   		return this.value; // $(this).val()
	}).get();
	    
	var serachOpt = '';
	var serachOpt2 = '';
	$.each(searchInput, function( index, value ) {    
  		if(value != "" && value != 'undefined') {
  			if(serachOpt === '') {
  				serachOpt = value;
  			} else {
  				serachOpt += "@" + value;
  			}
  		}
	});  

    $.each(searchInput2, function( index, value ) {    
  		if(value != "" && value != 'undefined') {
  			if(serachOpt2 === '') {
  				serachOpt2 = value;
  			} else {
  				serachOpt2 += "@" + value;
  			}
  		}
	});	
	var loc = window.location;
	var withoutQuery = loc.hostname + loc.pathname;
	var currentUrl = loc.protocol + "//" + loc.hostname + '/cafImports';	
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
	if(serachOpt !== '' && serachOpt2 != '') {
		currentUrl += "?srh=" + encodeURI(serachOpt + "@" + serachOpt2) + "&" + oldParam; 
	} else if(serachOpt !== '' && serachOpt2 == '') {
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


