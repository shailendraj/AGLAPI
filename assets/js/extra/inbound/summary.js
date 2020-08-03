function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"inbound";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}

var panelBar = $("#panelbar").kendoPanelBar({
	expand: onExpand
}).data("kendoPanelBar");



function onExpand(e)
{
	var sItem = $(e.item).find("> .k-link").text();
	if( sItem =='Product Details'){
		panel_product_content();
	}
}

function callProductDetails()
{
	produtItem = panelBar.element.children("li").eq(1);
	produtItem.css({'display' : 'inline'});
	panelBar.expand(produtItem);
	panel_product_content();
}

$(document).ready(function (){
	status_bar_view();
	panel_lead_content();
	//panel_product_content();
	setInterval(status_bar_view, 30000);
})

function status_bar_view()
{
	$.ajax({
		url: BASEURL+"inbound/status_bar_view",
		type: "post",
		dataType  : 'html',
		success: function (res) {
			$( "#status-bar-container" ).html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

var autocomplete;

function panel_lead_content()
{
	var sSelectLeadId = $("#selectedLeadId").val();
	$.ajax({
		url: BASEURL+"inbound/panel_lead_content",
		type: "post",
		dataType  : 'html',
		data: {selectedLead : sSelectLeadId},
		success: function (res) {
			$( "#leadInfoId" ).html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function panel_product_content()
{
	var iId = $("#leadId").val();
	if (typeof iId === 'undefined') {
		$( "#product" ).html('');
	} else {
		$.ajax({
			url: BASEURL+"inbound/panel_product_content",
			type: "post",
			data:{iLeadId:iId},
			dataType  : 'html',
			success: function (res) {
				$( "#product" ).html(res);
			},
			complete: function(res){

				var defaultBounds = new google.maps.LatLngBounds(
										new google.maps.LatLng(-33.8902, 151.1759),
										new google.maps.LatLng(-33.8474, 151.2631)
									);
				var input = document.getElementById('address');
				var options = {
					bounds: defaultBounds,
					types: ['geocode']
				};
				autocomplete = new google.maps.places.Autocomplete(input, options);
				autocomplete.addListener('place_changed', fillInAddress);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
}


function fillInAddress() {
	// Get the place details from the autocomplete object.
	var place = autocomplete.getPlace();
	// The default properties
	var sAddressId = '';
	var sAddressStreet = '';
	var sAddressSuburb = '';
	var sAddressPostcode = '';
	var sAddressState = '';
	var sQualifierId = '';
	// Grab the selected place

	// Add the id
	sAddressId = place.id;
	// Loop over each of the components
	for (var i = 0; i < place.address_components.length; i++) {
		var addressType = place.address_components[i].types[0];
		if(addressType == 'subpremise') {
			sAddressStreet = place.address_components[i]['short_name'];
		}
		if(addressType == 'street_number') {
			if(sAddressStreet != '') {
				sAddressStreet = sAddressStreet + '/' + place.address_components[i]['short_name'];
			} else {
				sAddressStreet = place.address_components[i]['short_name'];
			}
		}
		if(addressType == 'route') {
			if(sAddressStreet != '') {
				sAddressStreet = sAddressStreet + ' ' + place.address_components[i]['long_name'];
			} else {
				sAddressStreet = place.address_components[i]['long_name'];
			}
		}
		if(addressType == 'locality') sAddressSuburb = place.address_components[i]['long_name'];
		if(addressType == 'administrative_area_level_1') sAddressState = place.address_components[i]['short_name'];
		if(addressType == 'postal_code') sAddressPostcode = place.address_components[i]['short_name'];
	}
	// Add to elements
	$('input[name=checker_address_id]').val(sAddressId);
	$('input[name=checker_address_street]').val(sAddressStreet);
	$('input[name=checker_address_suburb]').val(sAddressSuburb);
	$('input[name=checker_address_postcode]').val(sAddressPostcode);
	$('input[name=checker_address_state]').val(sAddressState);
	$('input[name=checker_qualifier_id]').val(sQualifierId);
	searchProductType()
}

function reset_product_section()
{
	$("#productType").hide();
	$("#customerType").hide();
	$("#planHeading").html('');
	$("#planSection").hide();
}

function searchProductType()
{
	var iId = $("#leadId").val();
	var sId = $('input[name=checker_address_id]').val();
	var sStreet =  $('input[name=checker_address_street]').val();
	var sSuburb =  $('input[name=checker_address_suburb]').val();
	var sPostCode = $('input[name=checker_address_postcode]').val();
	var sState =  $('input[name=checker_address_state]').val();
	var sQualifierId = $('input[name=checker_qualifier_id]').val();
	if (sId.length <= 0 || sPostCode.length <= 0 ){
		$("#window").html("Please enter the address location");
		var win = $("#window").data("kendoWindow");
		win.center().open();
	} else {
		$.ajax({
			beforeSend: function(){
			reset_product_section();
				$("#loader").show();
			},
			url: BASEURL+"inbound/chk_lead_address",
			type: "POST",
			data: {
				id:sId,
				street:sStreet,
				suburb:sSuburb,
				postcode:sPostCode,
				state:sState,
				qid:sQualifierId
			},
			dataType  : 'json',
			success: function (res) {
				$("#loader").hide();
				if(res.data.success) {
					var sHtmlBlock = '<div class="productBlock">';
					sHtmlBlock += '<label> <b>Available Services:</b></label>&nbsp;&nbsp;';
					var bflag = true;
					$.each(res.data.LIST, function(key, value) {
						sProductType = key;
						var sProductLabel = value;
						sHtmlBlock += '<input type="radio" name="ptype" Value="'+sProductType+'" onclick="showCustomerType()"> '+sProductLabel+'&nbsp;';
						bflag = false;
					});
					if(bflag) {
						sHtmlBlock += ' No Products Available. Please enter complete address.';
					}
					sHtmlBlock += '</div>';
					$("#productType").html(sHtmlBlock);
					$("#productType").show( "slow" );

				}else{
					$("#window").html("API ERROR: "+res.data.message);
					var win = $("#window").data("kendoWindow");
					win.center().open();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		})
	}
}

function showCustomerType()
{
	$("#planHeading").html('');
	$("#planSection").hide('slow');
	sHtmlBlock = '<div class="productBlock">';
	sHtmlBlock += '<label> <b>Are you residential customer or busness?</b></label>&nbsp;&nbsp;';
	sHtmlBlock += '<input type="radio" name="type" Value="Business" onclick="get_selected_plans()"> Business&nbsp;';
	sHtmlBlock += '<input type="radio" name="type" Value="Residential" onclick="get_selected_plans()"> Residential&nbsp;';
	sHtmlBlock += '</div>';
	$("#customerType").html(sHtmlBlock);
	$("#customerType").show( "slow" );
}

function get_selected_plans()
{
	var iId = $("#leadId").val();
	var sType = $( "input:radio[name=type]:checked" ).val();
	var sProductType = $( "input:radio[name=ptype]:checked" ).val();
	var sId = $('input[name=checker_address_id]').val();
	var sPostCode = $('input[name=checker_address_postcode]').val();
	if (typeof sType === 'undefined') {
		sType = "All";
	}

	if (sId.length <= 0 || sPostCode.length <= 0 ){
		$("#window").html("Please enter the address location.");
		var win = $("#window").data("kendoWindow");
		win.center().open();
	} else if(typeof sProductType === 'undefined' || sProductType.length <= 0 ) {
		$("#window").html("Please select the product type.");
		var win = $("#window").data("kendoWindow");
		win.center().open();
	} else {
		$("#planHeading").html("Choose Plan");
		$("#planSection").show("slow");
		var sSeleatedUrl = '';
		if (sProductType.indexOf("Bundle") !=-1) {
			var sRepProductType = sProductType.replace("Bundle", "");
			sRepProductType = sRepProductType.trim();
			sSeleatedUrl = BASEURL+"inbound/get_plans/bundle plan/"+iId+"/"+sRepProductType+"/"+sType;
		} else {
			sSeleatedUrl = BASEURL+"inbound/get_plans/plan/"+iId+"/"+sProductType+"/"+sType;
		}
		onSeletion(sSeleatedUrl, sProductType);
	}
}

function chkAddress()
{
	searchProductType()
	var sId = $('input[name=checker_address_id]').val();
	var sPostCode = $('input[name=checker_address_postcode]').val();
	if (sId.length <= 0 || sPostCode.length <= 0 ){
		$("#window").html("Please enter the valid address location.");
		var win = $("#window").data("kendoWindow");
		win.center().open();
	}
}

function onSeletion(sSelectedUrl, sSelectedTab)
{
	var jcarousel = $('.jcarousel').jcarousel();

		$('.jcarousel-control-prev')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				target: '-=1'
			});

		$('.jcarousel-control-next')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				target: '+=1'
			});


		sSelectedTab = sSelectedTab.replace(/\s/g, '');
		var setup = function(res) {
			var html = '<ul>';
			var sScriptDesc ='';
			if(res.data.success) {
				var iCount = 0;
				$.each(res.data.items, function() {
					html += '<li>';
					html += '<a href="javascript:void(0)" onclick="onSelectProduct('+iCount+', '+this.ID+')"> <div class="plan-box" id="planBox'+this.ID+'">';
					html += '<h4>' + this.name + '</h4>';
					html += '<h1>$' + this.price + '/<small>mo</small></h1>';
					if (typeof(this.script) != 'undefined' && this.script != null){
						sScriptDesc = this.script;
					} else {
						sScriptDesc = '';
					}
					html += '<div style="height:84px; color:#000; overflow: auto;">' + sScriptDesc + '</div>';
					html += '</div><input type="checkbox" id="plan'+sSelectedTab+iCount+'" name="plans" value="'+this.plan+'" style="display:none"></a>';
					html += '</li>';
					iCount ++;
				});
			}

			html += '</ul>';

			// Append items
			jcarousel
				.html(html);

			// Reload carousel
			jcarousel
				.jcarousel('reload');
		};

		$.getJSON(sSelectedUrl, setup);
}


var onActivate = function(e) {
	$("#tabstrip").find(".k-content").html("");
	var sSelected = $(e.item).find("> .k-link").text();
	var sSelectedUrl = $(e.item).find("> .k-link").data('content-url');
	var sDataContentId = $(e.item).attr('aria-controls');
	$.ajax({
		url: sSelectedUrl,
		type: "post",
		dataType  : 'html',
		success: function (res) {
			$("#"+sDataContentId).html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	}).done(function() {
		onSeletion(sSelectedUrl);
	});

}


function update_address()
{
	if($("#leadId").length>0){
		var iId = $("#leadId").val();
		var tag = $("<div id=\"dialogbox\"></div>");
		$(tag).attr("title", "Update Details");
		$.ajax({
			type: "POST",
			data:{ID: iId},
			cache:false,
			url: BASEURL+"inbound/update_address",
			success:function(result) {
				$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
				$(tag).dialog({
					autoOpen: false,
					resizable: false,
					height: "auto",
					width:"auto",
					modal: true,
					buttons: {
						'Save': save_lead_address,
						Cancel: function() {
							$(tag).dialog('destroy').remove();
						}
					},
					close: function() {
						$(tag).dialog('destroy').remove();
					}
				});
				$(tag).dialog( "option", "width", 480 );
				$(tag).html(result).dialog().dialog('open');
			}
		});
	} else {
		var win = $("#window").data("kendoWindow");
		win.center().open();
	}
}


function save_lead_address()
{
	$("#firstname").removeClass( "ui-state-error" );
	$("#lastname").removeClass( "ui-state-error" );
	$("#contactEmail").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var values = $("#leadAddressForm").serialize();
		$.ajax({
			url: BASEURL+"inbound/save_lead_address",
			type: "POST",
			data: values,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$("#dialogbox").dialog('destroy').remove();
					panel_lead_content();
				}else{
					$(".validateTips").html(res.data.message);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
}

function checkLength()
{
	if ($("#firstname").val().length <= 0 || $("#lastname").val().length <= 0 || $("#contactEmail").val().length <= 0) {
		$("#assignLead :input").addClass("ui-state-error");
		updateTips("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}

function updateTips( t )
{
	$(".validateTips").html(t);
}


function lead_end_call()
{
	if($("#leadId").length>0){
		var iId = $("#leadId").val();
		var tag = $("<div id=\"dialogbox\"></div>");
		$(tag).attr("title", "Update Status Details");
		$.ajax({
			type: "POST",
			data:{ID: iId},
			cache:false,
			url: BASEURL+"inbound/lead_end_call",
			success:function(result) {
				$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
				$(tag).dialog({
					autoOpen: false,
					resizable: false,
					height: "auto",
					width:"auto",
					modal: true,
					buttons: {
						'Save': save_end_call,
						Cancel: function() {
							$(tag).dialog('destroy').remove();
						}
					},
					close: function() {

						$(tag).dialog('destroy').remove();
					}
				});
				$(tag).dialog( "option", "width", 480 );
				$(tag).html(result).dialog().dialog('open');
			}
		});
	} else {
		$("#window").html("Error Message: New Lead Not Assigned.")
		var win = $("#window").data("kendoWindow");
		win.center().open();
	}
}

function save_end_call()
{
	$("#status").removeClass( "ui-state-error" );
	$("#note").removeClass( "ui-state-error" );
	var sStreet =  $('input[name=checker_address_street]').val();
	var sSuburb =  $('input[name=checker_address_suburb]').val();
	var sPostCode = $('input[name=checker_address_postcode]').val();
	var sState =  $('input[name=checker_address_state]').val();
	var sPlans = "";
	$("input[name='plans']:checked").each(function (i) {
		if(sPlans != ""){
			sPlans = sPlans + "#"
		}
		sPlans = sPlans+$(this).val();
	});
	var sTypes =$("input[name='ptype']:checked").val();
	var sCustomerType =$("input[name='type']:checked").val();
	var sOtherField = {
		'street': sStreet,
		'suburb':sSuburb,
		'state':sState,
		'postcode':sPostCode,
		'plans':sPlans,
		'types':sTypes,
		'ctype': sCustomerType
	};
	var valid = true;
	valid = checkEndCallForm();
	var sStatus = $("#status").val();
	if(sStatus=="WON" || sStatus == "WAITING PAYMENT"){
		if(sPlans.length <= 0){
			valid = false;
			$("#window").html("Error Message: Please select the products detail.");
			var win = $("#window").data("kendoWindow");
			win.center().open();
		}
	}

	if(valid) {
		var values = $("#leadEndCallForm").serialize()+'&'+$.param(sOtherField);
		var sStatus = $("#status").val();
		$.ajax({
			url: BASEURL+"inbound/save_end_call",
			type: "POST",
			data: values,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					if(sStatus=="WON"){
						window.location = BASEURL+"inbound/sales_form";
					} else {
						$("#dialogbox").dialog('destroy').remove();
						status_bar_view();
						panel_lead_content();
						produtItem = panelBar.element.children("li").eq(1);
						panelBar.collapse(produtItem);
						produtItem.css({'display' : 'none'});
					}
				}else{
					$(".validateTips").html(res.data.message);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
}

function checkEndCallForm()
{
	if ($("#status").val().length <= 0 || $("#note").val().length <= 0 ) {
		$("#leadEndCall :input").addClass("ui-state-error");
		updateTips("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}


$(document).ready(function(){
	$("#window").kendoWindow({
		width: 300,
		height: 30,
		title: "Notification Message!!",
		visible: false
	}).data("kendoWindow");
});

function onSelectProduct(iCount, ID)
{
	var sSelectedType = $( "input:radio[name=ptype]:checked" ).val();;
	sSelectedType = sSelectedType.replace(/\s/g, '');
	sSelectedType = 'plan'+sSelectedType+iCount;
	//REMOVE THE PLAN BOX
	$(".plan-box").removeClass("selected");
	$("input[name='plans']").removeAttr('checked'); // REMOVE THE PLANS

	$("#planBox"+ID).addClass("selected");
	$('#'+sSelectedType).attr('checked','checked');
	$('#'+sSelectedType).prop('checked','checked');
}