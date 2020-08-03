$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/getJsonRoles" ,
					contentType: 'application/json; charset=utf-8',
					dataType: 'json',
					type: "GET"
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						role_id: { type: "number" },
						role_name: { type: "string" },
						role_description: { type: "string" },
					}
				},
				total: function(response) {
					return response.data.length;
				}
			},
			pageSize: 10,
		},
		sortable: true,
		autoBind: true,
		filterable: {
			extra: false,
			operators: {
				string: {
					startswith: "Starts with",
					eq: "Is equal to",
					neq: "Is not equal to"
				}
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
			field: "role_name",
			title: "Role Name",
			width: "20%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "role_description",
			title: "Description",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "role_id",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(role_id)#',
			width: "12%",
			filterable: false
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


function createLink(iRoleId){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp('+iRoleId+')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	sHtmlContent +='<a href="'+BASEURL+'admin/permissions/'+iRoleId+'" ><img src="'+BASEURL+'assets/images/icon/access.png" alt="Set Role Permissions" title="Set Role Permissions" ></a>';
	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

setInterval(function(){ $("#error").html(''); }, 5000);

function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	if(iId!=0)
		$(tag).attr("title", "Edit Role");
	else
		$(tag).attr("title", "Add New Role");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"admin/roleform",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': saveRole,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewRole")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function saveRole()
{
	$("#addNewRole :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var values = $("#addNewRole").serialize();
		$.ajax({
			url: BASEURL+"admin/saverole",
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

function checkLength()
{
	if ($("#rolename").val().length <= 0 || $("#roledescription").val().length <= 0) {
		$("#addNewRole :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
			return false;
	} else {
		return true;
	}
}