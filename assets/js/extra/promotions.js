function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"admin";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}


$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/get_promotions",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						promotionID: { type: "string" },
						brand: { type: "string" },
						name: { type: "string" },
						type: { type: "string" },
						status: { status: "string" },
						start: { start: "date" },
						end: { end: "date" },
					}
				},
				total: function(response) {
					return response.length;
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
			filterable: false,
			sortable: false,
		},{
			field:"promotionID",
			title: "Promotion ID"
		}, {
			field: "brand",
			title: "Brand"
		}, {
			field: "name",
			title: "Name"
		},{
			field: "start",
			title: "Start Date"
		},{
			field: "end",
			title: "End Date"
		},{
			field: "promotionID",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(promotionID, status)#',
			width: "12%",
			filterable: false,
			sortable: false,
		}],
		dataBound: function () {
			var rows = this.items();
			$(rows).each(function () {
				var index = $(this).index() + 1
				+ ($("#grid").data("kendoGrid").dataSource.pageSize() * ($("#grid").data("kendoGrid").dataSource.page() - 1));;
				var rowLabel = $(this).find(".row-number");
				$(rowLabel).html(index);
			});
		}
	});
});

function createLink(id, status){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>';
	if(status == 1){
		sHtmlContent += '<a href="javascript:setStatus(\''+id+'\') " onclick="return confirm(\'Are you sure you want to disable this page data?\')"><img src="'+BASEURL+'assets/images/icon/no.png"  alt="DISABLE" title="DISABLE"  ></a>';
	}else{
		sHtmlContent += '<a href="javascript:setStatus(\''+id+'\')" onclick="return confirm(\'Are you sure you want to enable this page data?\')" ><img src="'+BASEURL+'assets/images/icon/yes.png" alt="ENABLE" title="ENABLE"  ></a>';
	}
	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

function setStatus(iId)
{
	$.ajax({
		type:"POST",
		data:{ID: iId},
		cache:false,
		url:BASEURL+"admin/status_promotion",
		success: function(res) {
			$("#error").html(res);
			refershGrid();
		}
	})
}


function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	if(iId!=0)
		$(tag).attr("title", "Edit Promotion");
	else
		$(tag).attr("title", "Add New Promotion");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"admin/add_edit_promotion",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': save_promotion,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addPromotionForm")[0].reset();
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	}).done(function() {
		$("#start").kendoDatePicker();
		$("#end").kendoDatePicker();
		changeBrand();
	});



}

function save_promotion(){
	$("#addPromotionForm :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var values = $("#addPromotionForm").serialize();
		$.ajax({
			url: BASEURL+"admin/save_promotion",
			type: "post",
			data: values ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$("#error").html(res.data.message);
					$("#dialogbox").dialog('destroy').remove();
					refershGrid();
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

function checkLength() {
	if ($("#brand").val().length <= 0 || $("#name").val().length <= 0 || $("#start").val().length <= 0 || $("#end").val().length <= 0) {
		$("#addPromotionForm :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} if(CompareDate()){
		return false;
	}else {
		return true;
	}
}

function CompareDate() {
	var sStartDate = $("#start").val();
	var sEndDate = $("#end").val();
	var aFirstValue =sStartDate.split('/');
	var aSecondValue = sEndDate.split('/');

	var dFirstDate = new Date();
	dFirstDate.setFullYear(aFirstValue[2],(aFirstValue[0] - 1 ),aFirstValue[1]);
	var dSecondDate = new Date();
	dSecondDate.setFullYear(aSecondValue[2],(aSecondValue[0] - 1 ),aSecondValue[1]);
	if (dFirstDate > dSecondDate){
		$(".validateTips").html("*The end date should be  greater than start date.");
		return true;
	} else{
		return false;
	}
}


function changeBrand() {
	var sBrand = $('#brand').val();
	var sSelected =  $("#optSelected").val();
	$('#name').empty();
	$('#name').append(
		$('<option></option>').val('').html('----Select Promotion----')
	);
	$.ajax({
			url: BASEURL+"admin/get_promotions_name",
			type: "post",
			data: {ID:sBrand} ,
			dataType  : 'json',
			success: function (res) {
				$.each(res.data, function(i,obj) {
					if(sSelected == i){
						$('#name').append(
							$('<option selected></option>').val(i).html(obj)
						);
					} else {
						$('#name').append(
							$('<option></option>').val(i).html(obj)
						);
					}
				});
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
	});
}
