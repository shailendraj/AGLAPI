function refresh()
{
	window.location = "/dm/leads/fetch/";
}

function back()
{
	window.location = "/dm/leads/";
}

function toggle()
{
	var dispo = $("#disposition").val();
	if (dispo == "CB") {
		$("#cbDateL").removeAttr("hidden");
		$("#cbDate").removeAttr("hidden");
		$("#cbTimeL").removeAttr("hidden");
		$("#cbTime").removeAttr("hidden");
	} else {
		$("#cbDateL").attr("hidden", "");
		$("#cbDate").attr("hidden", "");
		$("#cbTimeL").attr("hidden", "");
		$("#cbTime").attr("hidden", "");
	}
}

function submit(tokenName)
{
	var request = $.ajax({
		url: '/dm/leads/submit/',
		type: 'POST',
		data: {
			tokenName: $("#"+tokenName).val(),
			leadID: $("#leadID").val(),
			callType: $("#callType").val(),
			disposition: $("#disposition").val(),
			comment: $("#comment").val(),
			cbDate: $("#cbDate").val(),
			cbTime: $("#cbTime").val()
		},
		datatype: 'json'
	});
	request.done(function(response) {
		var obj = jQuery.parseJSON(response);

		if (obj.result == 'success') {
			window.location = '/dm/leads/';
		} else {
			alert(obj.message);
		}
	});
}