function viewSales(centre)
{
	var date = $( "#datepickerSales" ).val();
	$( "#detailsSalesSearch" ).hide('blind', '' , 'slow', function() {
		$( "#detailsSalesSearch" ).load('/operations/viewsales?centre=' + centre + '&date=' + date, function() {
			$( "#detailsSalesSearch" ).show('blind', '' , 'slow');
		});
	});
}
$(function() {
	$( "#dialog:ui-dialog_search" ).dialog( "destroy" );
	$( "#dialog-form_search" ).dialog({
		autoOpen: false,
		height: 160,
		width: 225,
		modal: true,
		resizable: false,
		draggable: false,
		show: 'blind',
		hide: 'blind',
		buttons: {
			"Search": function() {
				var method = $( "#method" ),
					query = $( "#query" ),
					centre = $("#centres");

				$( "#results" ).html("<center><br><br><img src='../assets/images/ajax-loader.gif'> Searching...");
				$( "#results" ).load("/operations/salesresult?method=" +  method.val() + "&query=" + query.val() + "&centre=" + centre.val());
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

function Search()
{
	$( "#query" ).val("");
	$( "#dialog-form_search" ).dialog( "open" );
}

function viewSearch(id)
{
	$( "#defaultSalesSearch" ).hide();
	$( "#centerSalesSearch" ).hide();
	$( "#detailsSalesSearch" ).hide();
	$.get('/operations/salessubmit', { id: id }, function(data) {
		$( "#countrySales" ).hide('blind', '', 'slow', function() {
			$( "#countrySales" ).load('/operations/salesviewcountry?id=' + id, function() {
				$( "#countrySales" ).show('blind', '', 'slow');
			var iSaleId = id;
			$("#salespackgesGrid").kendoGrid({
				type: "json",
				dataSource: {
					transport: {
						read:{
							url : BASEURL+"sales/gjpva/"+iSaleId,
							contentType: 'application/json; charset=utf-8',
							type: 'GET',
							dataType: 'json'
						}
					},
					schema: {
						data: "data",
						model: {
							fields: {
								cli: { type: "string" },
								name: { type: "string" },
								fclass: { type: "string" },
								sclass: { type: "string" }
							}
						},
						total: function(response) {
							return response.data.length;
						}
					},
					pageSize: 10,
					serverPaging: true,
					serverFiltering: true,
					serverSorting: true
				},
				sortable: true,
				autoBind: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Starts with",
							eq: "Is equal to",
						},
						number: {
							startswith: "Starts with",
							eq: "Is equal to",
						},
						date: {
							eq: "Is equal to",
						},
					}
				},
				pageable: {
					refresh: true,
					pageSizes: true
				},
				columns: [{
					field: "rowNumber",
					title: "Sr. No",
					width: "6%",
					template: "<span class='row-number'></span>",
					filterable: false
				},{
					field:"cli",
					title: "CLI"
				}, {
					field: "name",
					title: "Name"
				}],
				dataBound: function () {
					var rows = this.items();
					$(rows).each(function () {
						var index = $(this).index() + 1
						+ ($("#salespackgesGrid").data("kendoGrid").dataSource.pageSize() * ($("#salespackgesGrid").data("kendoGrid").dataSource.page() - 1));;
						var rowLabel = $(this).find(".row-number");
						$(rowLabel).html(index);
					});
				}
			});
			if($("#mobile").val() == "N/A") {
				$("#no_mobile").prop("checked", true);
			}

			if($("#email").val() == "N/A" ) {
				$("#no_email").prop("checked", true);
			}
			$.get("/sales/gnaf/?type=display", { id: $("#physicalAdd").val() }, function(data) {
				var n = data;
				if(n.data[0] != null) {
					var strPhysicalAddress = n.data[0].split("}");
					$( "#display_physical1" ).val(strPhysicalAddress[0]);
					$( "#display_physical2" ).val(strPhysicalAddress[1]);
					$( "#display_physical3" ).val(strPhysicalAddress[2]);
					$( "#display_physical4" ).val(strPhysicalAddress[3]);
				}
			});
			if ($("#physicalAdd").val() == $("#postalAdd").val()) {
				$("#display_postal1").val("SAME AS ABOVE");
				$("#postal_same").prop("checked", true);
			} else {
				if($("#postalAdd").val() == "PH@SAME") {
					$("#display_postal1").val("SAME AS ABOVE");
					$("#postal_same").prop("checked", true);
				} else {
					$.get("/sales/gnaf/?type=display", { id: $("#postalAdd").val() }, function(data) {
						var n = data;
						if(n.data[0] != null) {
							var strPostalAddress = n.data[0].split("}");
							$( "#display_postal1" ).val(strPostalAddress[0]);
							$( "#display_postal2" ).val(strPostalAddress[1]);
							$( "#display_postal3" ).val(strPostalAddress[2]);
							$( "#display_postal4" ).val(strPostalAddress[3]);
						}
					});
				}
			}
		});
	});
	});
}
function cancelSalesViewAuSearch()
{
	$( "#countrySales" ).hide();
	var method = $( "#method" ),
		query = $( "#query" ),
		centre = $("#centres").val(),
		date = $( "#date_store" );
	$( "#defaultSalesSearch" ).hide('blind', '', 'slow', function() {
		$( "#display_loading" ).show();
		$( "#defaultSalesSearch" ).load('/operations/salessearchform?centres=' + centre + '&date=' + date.val(), function() {
			$( "#centerSalesSearch" ).load('/operations/centresales?centres=' + centre + '&date=' + date.val(), function() {
				$( "#results" ).load("/operations/salesresult?method=" +  method.val() + "&query=" + query.val() + "&centre=" + centre, function() {
					$( "#display_loading2" ).hide();
					$( "#display_loading" ).hide();
					$( "#defaultSalesSearch" ).show('blind', '', 'slow');
				});
				$( "#datepickerSales" ).datepicker( {
				showOn: "button",
				buttonImage: "/assets/images/calendar.png",
				buttonImageOnly: true,
				dateFormat: "yy-mm-dd",
				altField: "#datepickerSales",
				altFormat: "dd-mm-yy",
				firstDay: 1,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeMonth: true,
				changeYear: true,
				maxDate: "0d",
				minDate: "2012-03-01",
				onSelect: function(dateText, inst) {
					$( "#date_store" ).val(dateText);
					var centre = $("#centres").val();
					$( "#centerSalesSearch" ).hide('blind', '' , 'slow', function() {
						$( "#display_loading2" ).show();
						$( "#centerSalesSearch" ).load('/operations/centresales/?centres='+centre+'&date=' + dateText,
						function() {
							$( "#display_loading2" ).hide();
							$("#detailsSalesSearch").hide();
							$( "#centerSalesSearch" ).show('blind', '' , 'slow');
						});
					});
				}});
			});
		});
	});

}

function saleNotes(id)
{
	$.get("/operations/salessubmit", { method: "notes", id: id }, function(data) {
		$( "#sale_notes" ).val(data);
	});
	$( "#dialog-form_sale_notes" ).dialog( "open" );
}
function salesViewAuNotes() // from salesview_au.php page //
{
	var id = $("#id").val();
	$.get("/operations/salessubmit", { method: "notes", id: id }, function(data) {
		$( "#notes_display" ).val(data);
	});
	$( "#dialog-form_notes" ).dialog( "open" );
}
$(document).ready(function (){
	var centre = $("#centres").val();
	$( "#defaultSalesSearch" ).hide();
	$( "#defaultSalesSearch" ).load('/operations/salessearchform/?centres=' + centre,
	function() {
		$( "#display_loading2" ).hide();
		$( "#centerSalesSearch" ).load('/operations/centresales/?centres=' + centre, function() {
			$( "#display_loading" ).hide();
			$( "#defaultSalesSearch" ).show('blind', '' , 'slow');
		});
	$( "#datepickerSales" ).datepicker( {
		showOn: "button",
		buttonImage: "/assets/images/calendar.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		altField: "#datepickerSales",
		altFormat: "dd-mm-yy",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		maxDate: "0d",
		minDate: "2012-03-01",
		onSelect: function(dateText, inst) {
			$( "#date_store" ).val(dateText);
			var centre = $("#centres").val();
			$( "#centerSalesSearch" ).hide('blind', '' , 'slow', function() {
				$( "#display_loading2" ).show();
				$( "#centerSalesSearch" ).load('/operations/centresales/?centres='+centre+'&date=' + dateText,
				function() {
					$( "#display_loading2" ).hide();
					$("#detailsSalesSearch").hide();
					$( "#centerSalesSearch" ).show('blind', '' , 'slow');
				});
			});
		}});
	});
	$( "#dialog:ui-dialog_sale_notes" ).dialog( "destroy" );
	$( "#dialog-form_sale_notes" ).dialog({
		autoOpen: false,
		height: 200,
		width: 425,
		modal: true,
		resizable: false,
		draggable: false,
		show: 'blind',
		hide: 'blind'
	});
	$( "#dialog:ui-dialog_notes" ).dialog( "destroy" );
	$( "#dialog-form_notes" ).dialog({
		autoOpen: false,
		height: 200,
		width: 425,
		modal: true,
		resizable: false,
		draggable: false,
		show: "blind",
		hide: "blind"
	});
})