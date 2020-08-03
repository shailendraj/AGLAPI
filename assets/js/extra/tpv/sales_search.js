$(function() {
	$( "#dialog:ui-dialog_edit_status" ).dialog( "destroy" );
	
	var tips = $( ".validateTipsStatus" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}
	
	$( "#dialog-form_edit_status" ).dialog({
		autoOpen: false,
		height: 250,
		width: 425,
		modal: true,
		resizable: false,
		draggable: false,
		show: 'blind',
		hide: 'blind',
		buttons: {
			"Submit": function() {
				var id = $( "#id_store" ),
					status = $( "#edit_status" ),
					note = $( "#edit_status_note" ),
					method = $( "#method" ),
					query = $( "#query" );
				
				$.post(BASEURL + "tpv/process", { method: "edit_status", id: id.val(), status: status.val(), note: note.val() }, function(res) {
					if (res.data !== null && res.data.success) {
						$( "#dialog-form_edit_status" ).dialog( "close" );
						$( "#results" ).html("<tr><td colspan=7><center><img src='" + BASEURL + "assets/images/ajax-loader.gif'> Searching...</center></td></tr>");
						$.post(BASEURL+"tpv/process", {method: "search", search_by: method.val(), query: query.val()}, function (res) {
							if (res.data !== null && res.data.success) {
								$( "#results" ).html("");
								var result = res.data.aSearchResult;
								var appendStr = "";
								for (var i = 0; i < result.length; i++) {
									appendStr = "<tr>";
									appendStr += "<td>" + result[i].id + "</td>";
									appendStr += "<td>" + result[i].status + "</td>";
									appendStr += "<td>" + result[i].centre + "</td>";
									appendStr += "<td>" + result[i].agent + "</td>";
									appendStr += "<td>" + result[i].campaign + "</td>";
									appendStr += "<td>" + result[i].id + "</td>";
									appendStr += "<td><button onclick='View_Search(\"" + result[i].id + "\")' class='icon_view'></button>";
									if(result[i].canEdit === true) {
										appendStr += "<button onclick='Edit_Sale(\"" + result[i].id + "\", \"" + result[i].status + "\")' class='icon_edit'></button></td></tr>";
									} else {
										appendStr += "</td></tr>";
									}
									$( "#results" ).append(appendStr);
								}
							} else if(res.data !== null){
								$("#error").html(res.data.message);
							}
						});
					} else {
						updateTips(res.data.message);
					}
				});
			},
			"Cancel": function() {
				$( this ).dialog( "close" );
			}
		}
	});
	$( "#dialog:ui-dialog_edit_error" ).dialog( "destroy" );

	$( "#dialog-form_edit_error" ).dialog({
		autoOpen: false,
		width:250,
		height:100,
		modal: true,
		resizable: false,
		draggable: false,
		show: 'blind',
		hide: 'blind'
	});

	$( "#dialog:ui-dialog_edit_switch" ).dialog( "destroy" );

	$( "#dialog-form_edit_switch" ).dialog({
		autoOpen: false,
		width: 275,
		height: 100,
		modal: true,
		resizable: false,
		draggable: false,
		show: 'blind',
		hide: 'blind'
	});

	$( "#dialog:ui-dialog_search" ).dialog( "destroy" );

	$( "#dialog-form_search" ).dialog({
		autoOpen: true,
		height: 180,
		width: 225,
		modal: true,
		resizable: false,
		draggable: false,
		show: 'blind',
		hide: 'blind',
		buttons: {
			"Search": function() {
				var search_by = $( "#method" ).val(),
					query = $( "#query" ).val();
				$( "#results" ).html("<tr><td colspan=7><center><img src='" + BASEURL + "assets/images/ajax-loader.gif'> Searching...</center></td></tr>");
				$.post(BASEURL+"tpv/process", {method: "search", search_by: search_by, query: query}, function (res) {
					if (res.data !== null && res.data.success) {
						$( "#results" ).html("");
						var result = res.data.aSearchResult;
						var appendStr = "";
						for (var i = 0; i < result.length; i++) {
							appendStr = "<tr>";
							appendStr += "<td>" + result[i].id + "</td>";
							appendStr += "<td>" + result[i].status + "</td>";
							appendStr += "<td>" + result[i].centre + "</td>";
							appendStr += "<td>" + result[i].agent + "</td>";
							appendStr += "<td>" + result[i].campaign + "</td>";
							appendStr += "<td>" + result[i].id + "</td>";
							appendStr += "<td><button onclick='View_Search(\"" + result[i].id + "\")' class='icon_view'></button>";
							if(result[i].canEdit === true) {
								appendStr += "<button onclick='Edit_Sale(\"" + result[i].id + "\", \"" + result[i].status + "\")' class='icon_edit'></button></td></tr>";
							} else {
								appendStr += "</td></tr>";
							}
							$( "#results" ).append(appendStr);
						}
					} else if(res.data !== null){
						$("#error").html(res.data.message);
					}
				});
				$( "#dialog-form_search" ).dialog( "close" );
			},
			"Cancel": function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
		}
	});
});

function Edit_Sale(id, status) {
	$( "#dialog-form_edit_switch" ).dialog( "open" );
	$( "#id_store" ).val(id);
	$( "#edit_status" ).val(status);
}

function View_Search(id) {
	window.location = BASEURL + "tpv/sales_details/" + id;
}

function Cancel_Search()
{
	var method = $( "#method" ),
		query = $( "#query" );
		
	$( "#display" ).hide('blind', '', 'slow', function() {
		$( "#display" ).load('search_display.php', function() {
			$( "#results" ).load("search_results.php?method=" +  method.val() + "&query=" + query.val(), function() {
				$( "#display" ).show('blind', '', 'slow');
			});
		});
	});
	
}

function Edit_Status(){
	var id = $( "#id_store" );
	
	$( "#edit_status_note" ).val("");
	$( "#dialog-form_edit_switch" ).dialog( "close" );
	$( ".validateTipsStatus" ).text("All fields are required");
	$( "#dialog-form_edit_status" ).dialog( "open" );
}

function Search()
{
	$( "#query" ).val("");
	$( "#dialog-form_search" ).dialog( "open" );
}

function Edit_Details()
{
	var id = $( "#id_store" ).val();
	
	window.location = BASEURL + "tpv/sales_details/" + id + "/edit";
}