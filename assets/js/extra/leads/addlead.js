$(document).ready(function (){

	$("#busi").click(function(){
		$("#company_name").removeClass("hide_element");
	});
	$("#resi").click(function(){
		$("#company_name").addClass("hide_element");
	});

	$(function(){
		$("#callbackdatetime").appendDtpicker({
			"autodateOnStart": false,
			"futureOnly": true
		});
	});

	$.ajax({ // STREET TYPES //
		url: '/leads/streetypes',
		dataType:'json',
		async: 'false',
		cache: 'TRUE',
		success: function(response) {
			$.each(response.aaData, function(i, item) {
				$("#street_type").append("<option value=\'" + item.id + "\'>" + item.name + "</option>");
			});
		}
	});

	$.ajax({ // Get States //
		url: '/leads/states',
		dataType:'json',
		async: 'false',
		cache: 'TRUE',
		success: function(response) {
			$.each(response.aaData, function(i, item) {
				$("#state").append("<option value=\'" + item.id + "\'>" + item.name + "</option>");
			});
		}
	});

	$.ajax({ // Get Retailers //
		url: '/leads/retailers',
		dataType:'json',
		async: 'false',
		cache: 'TRUE',
		success: function(response) {
			$.each(response.aaData, function(i, item) {
				$("#current_elec_retailer").append("<option value=\'" + item.id + "\'>" + item.name + "</option>");
			});
		}
	});
});

function submitLead()
{
	$("#validate-cage").html('');
	$("#validate-nmi").html('');
	$("#validate-phone").html('');
	$("#validate-postcode").html('');
	$("#validate-mrin").html('');
	var mLeadTypeChecked = $('#busi').prop('checked');
	var age = $("#cage").val();
	var nmi = $("#nmi").val().length;
	var phone = $("#pnumber").val();
	var postcode = $("#postcode").val();
	var mrin = $("#mrin").val().length;
	if(mLeadTypeChecked) {
		$('#cname').prop('required', true);
		return false;
	}

	if(isNaN(age) || age < 18) {
		$("#cage").val('');
		$("#cage").prop('required', true);
		$("#validate-cage").html('');
		$("#validate-cage").html('Age should be numeric and more than 18 yrs.');
	}

	if(nmi != 11 && nmi != 10) {
		$("#nmi").val('');
		$("#nmi").prop('required', true);
		$("#validate-nmi").html('');
		$("#validate-nmi").html('Please enter the 10 or 11 characters NMI.');
	}

	if(phone!='' && phone.length<10) {
		$("#pnumber").val('');
		$("#validate-phone").html('');
		$("#validate-phone").html('Please enter 10 digits phone number.');
	}
	if(isNaN(postcode)) {
		$("#postcode").val('');
		$("#postcode").prop('required', true);
		$("#validate-postcode").html('');
		$("#validate-postcode").html('Postcode should be numeric.');
	}
	if(mrin > 0) {
		if(mrin != 10 && mrin != 11) {
			$("#mrin").val('');
			$("#validate-mrin").html('');
			$("#validate-mrin").html('Please enter 10 or 11 digits mrin.');
		}
	}
	//$("#leadForm").submit();
}

function submitFollowUp()
{
	var mobile = $("#mobile").val();
	if(mobile!='' && mobile.length<10) {
		$("#mobile").val('');
		$("#validate-mobile").html('');
		$("#validate-mobile").html('Please enter 10 digits phone number.');
		return false;
	}
}