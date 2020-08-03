function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"admin";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}


function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	if(iId!=0)
		$(tag).attr("title", "Edit Supplier");
	else
		$(tag).attr("title", "Add New Supplier");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"admin/addsupplier",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': saveSupplier,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewSupplier")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function saveSupplier(){
	$("#addNewSupplier :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var values = $("#addNewSupplier").serialize();
		$.ajax({
			url: BASEURL+"admin/savesupplier",
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
	if ($("#supplierID").val().length <= 0 || $("#name").val().length <= 0 || $("#environment").val().length <= 0) {
		$("#addNewSupplier :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}


$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/gsuppliers",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						supplierID: { type: "string" },
						name: { type: "string" },
						environment: { type: "string" }
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
			field:"supplierID",
			title: "Supplier ID"
		}, {
			field: "name",
			title: "Supplier Name"
		}, {
			field: "environment",
			title: "Environment"
		},{
			field: "supplierID",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(supplierID)#',
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


function createLink(id){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:assign_promotion(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/assignment.png" alt="Assign" title="Assign" ></a>&nbsp;';
	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

function getValue(val)
{
	if(val==1){
		return "Enable";
	} else{
		return "Disable";
	}
}

setInterval(function(){ $("#error").html(''); }, 5000);

function assign_promotion(iId)
{
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Assign Promotion");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"admin/assign_promotion",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': save_assigned_promotions,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	}).done(function() {
		treeViewDisplay();
	});
}

function treeViewDisplay()
{
	var oBrandData ;
	var iId = $("#supplierID").val();
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"admin/get_promo_code",
		success:function(result) {
			oBrandData = result.data;
		}
	}).done(function() {
		$("#treeview").kendoTreeView({
			checkboxes: true,
			dataSource: {
				data: oBrandData,
				change: function (e) {
					if (e.field == "checked") {
						var item = e.items[0];
						if (item.checked && item.parentNode()) {
							item.parentNode().set("checked", true);
						}
						if (!item.checked && item.hasChildren) {
							item.children.data().forEach(function (child) {
								child.set("checked", false);
							});
						}
					}
				}
			},
			check: onCheck,
		});
		initCheckNodes();
	});
}

function initCheckNodes(){
	var nodes = treeView = $("#treeview").data("kendoTreeView").dataSource.view();
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].checked) {
			nodes[i].parentNode().set("checked", true);
		}
	}
}
function checkedNodeIds(nodes, checkedNodes) {
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].checked) {
			if (!nodes[i].hasChildren)
			checkedNodes.push(nodes[i].id);
		}
		if (nodes[i].hasChildren) {
			checkedNodeIds(nodes[i].children.view(), checkedNodes);
		}
	}
}

// show checked node IDs on datasource change
function onCheck() {
	var checkedNodes = [],
		treeView = $("#treeview").data("kendoTreeView"),
		message;
	checkedNodeIds(treeView.dataSource.view(), checkedNodes);
	if (checkedNodes.length > 0) {
		message = checkedNodes.join(",");
	} else {
		message = '';
	}
	$("#promoCodes").val(message);
}

function save_assigned_promotions()
{
	$("#assignPromotionForm :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkPromotionForm();
	if(valid) {
		var values = $("#assignPromotionForm").serialize();
		$.ajax({
			url: BASEURL+"admin/save_assigned_promotions",
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

function checkPromotionForm()
{
	if ($("#promoCodes").val().length <= 0) {
		$("#assignPromotionForm :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}

