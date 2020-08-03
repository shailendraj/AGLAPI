$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/getJsonUsers/",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						firstname: { type: "string" },
						lastname: { type: "string" },
						username: { type: "string" },
						alias: { type: "string" },
						created: { type: "date" },
						status: { type: "number" },
						bCenterOperationAction: { type: "number" }
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
			field: "firstname",
			title: "First Name",
			width: "15%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "lastname",
			title: "Last Name",
			width: "15%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "username",
			title: "Username",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "alias",
			title: "Alias",
			filterable: {
					cell: {
						showOperators: false
					}
			}
		},{
			field: "created",
			title: "Created Date",
			format: "{0:yyyy-MM-dd}",
			width: "14%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "status",
			title: "Status",
			template: '#=getValue(status)#',
			width: "8%",
			filterable: false
		},{
			field: "username",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(username, status, bCenterOperationAction)#',
			width: "18%",
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


function createLink(id, status, bCenterOperationAction){
	var sHtmlContent = '';
	sHtmlContent +='<a href="'+BASEURL+'admin/updateuser/'+id+'"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	if(status == 1){
		sHtmlContent += '<a href="javascript:setStatus(\''+id+'\') " onclick="return confirm(\'Are you sure you want to disable this page data?\')"><img src="'+BASEURL+'assets/images/icon/no.png"  alt="DISABLE" title="DISABLE"  ></a>&nbsp;';
	}else{
		sHtmlContent += '<a href="javascript:setStatus(\''+id+'\')" onclick="return confirm(\'Are you sure you want to enable this page data?\')" ><img src="'+BASEURL+'assets/images/icon/yes.png" alt="ENABLE" title="ENABLE"  ></a>&nbsp;';
	}
	sHtmlContent +='<a href="javascript:AddEditRolesPopUp(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/role.png" alt="SET USER ROLES" title="SET USER ROLES" ></a>';
	//sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:addCenters(\''+id+'\')"><img src="'+BASEURL+'assets/images/icon/addfeature.png" alt="ADD RETAILER" title="ADD CENTERS" ></a>';

	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

function getModuleName(val){
	if(val=='' || val == null){
		return "N/A";
	} else{
		return val;
	}
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


function setStatus(ID)
{
	$.ajax({
		type:"GET",
		cache:false,
		url:BASEURL+"admin/statususer/"+ID,
		success: function(res) {
			$("#error").html(res);
			refershGrid();
		}
	})
}



function AddEditRolesPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Set User Role");
	$.ajax({
		type: "POST",
		data:{username: iId},
		cache:false,
		url: BASEURL+"admin/userroleform",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': saveRoles,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewUserRole")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}
function AddUserOperationsPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Set User Operations");
	$.ajax({
		type: "POST",
		data:{username: iId},
		cache:false,
		url: BASEURL+"admin/useroperationform",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': saveOperations,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewUserOperation")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}
function saveRoles(){
	$("#addNewUserRole :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var sUsername = $("#idusername").val();
		var sRolesid = $("#rolesid").val();
		$.ajax({
			url: BASEURL+"admin/usersaverole",
			type: "post",
			data: {username: sUsername, roles:sRolesid} ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					//window.location = "{$sRedirctUrl }";
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

function addCenters(id) {
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Add Center/s To User " + id);
	$.ajax({
		type: "POST",
		data:{id: id},
		cache:false,
		url: "/admin/addCenterForm",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					"Save": saveUserCenters,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},

				close: function() {
					$("#addNewGroup-Campaign")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
			$("#name").val(name);
		}
	});
}


function saveUserCenters(){
	$("#addNewUserRole :input").removeClass( "ui-state-error" );
	$.ajax({
		url: BASEURL+"admin/saveUserCenters",
		type: "post",
		data: {id: $("#uname").val(), centers: $("#centersid").val()} ,
		dataType  : 'json',
		success: function (response) {
			if(response == 0) {
				$("#addNewUserRole :input").addClass("ui-state-error");
				$(".validateTips").html('Please select atleast one retailer.');
			} else {
				$("#addNewUserRole :input").removeClass("ui-state-error");
				$(".validateTips").html('');
				$("#error").html("Centers added to user " + $("#uname").val());
			}
			$("#dialogbox").dialog('destroy').remove();
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});

}

function checkLength() {
	if ($("#rolesid").val() == null || $("#rolesid").val().length <= 0) {
		$("#addNewUserRole :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}
