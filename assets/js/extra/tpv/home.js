function Get_Sale(){
	var values = $("#salesForm").serialize();
	$.ajax({
		url: BASEURL+"tpv/process",
		type: "post",
		data: values,
		dataType: 'json',
		success: function (res) {
			if( res.data !== null && res.data.success) {
				window.location = BASEURL + 'tpv/start/' + res.data.saleId;
			}else if(res.data !== null){
				$("#error").html(res.data.message);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}