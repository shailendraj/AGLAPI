function Listing() {
	window.location = BASEURL+"admin/group";
}
function AddEditPopUp(id, cid, strName, strDescription,)
{
	var tag = $("<div id=\"dialogbox\"></div>");
	if(id==0)
		$(tag).attr("title", "Add New Role To " + strName);
	else
		$(tag).attr("title", "Edit Campaign");
	$.ajax({
		type: "POST",
		data:{cname: strName, campaignID: cid},
		cache:false,
		url: "/admin/addRolesToCampaignForm",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					"Save": addCampaignRoles,
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
			$("#campaignID").val(cid);
			$("#name").val(strName);
			$("#description").val(strDescription);
		}
	});
};

function checkLength()
{
	alert($("#rolesid").val().length);
	if ($("#rolesid").val().length < 0) {
		$("#addNewUserRole :input[type=text]").addClass("ui-state-error");
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

function addCampaignRoles() {
	$("#addNewUserRole :input").removeClass( "ui-state-error" );
	$.ajax({
		type:"POST",
		data:{cid: $('#campaignID').val(), roleId: $("#rolesid").val()},
		url:"/admin/saveCampaignRoles",
		success:function(response) {
			if(response == 0) {
				$("#addNewUserRole :input").addClass("ui-state-error");
				$(".validateTips").html('Please enter *required fields.');
			} else {
				$("#error").html("Campaign Roles added successfully.");
				$("#dialogbox").dialog('destroy').remove();
				refershGrid();
			}
		}
	})
}

function setStatus(cid, roleid, status) {
	$.ajax({
		type:"POST",
		cache:false,
		data:{cid:cid, roleid:roleid, status:status},
		url:"/admin/setCampaignRoleStatus",
		success: function(res) {
			$("#error").html(res);
			refershGrid();
		}
	})
}


$(document).ready(function (){
	var campaignId = $("#cId").val();
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/getJsonCampaignsRoles",
					type: 'POST',
					data: {cid: campaignId},
					dataType: 'json'
				}
			},
			schema: {
				data: "aaData",
				model: {
					fields: {
						role_name: { type: "string" },
						role_description : { type: "string" },
						status: { type: "number" },
						campaignId: { type: "number" },
						role_id: { type: "number" }
					}
				},
				total: function(response) {
					//return response.data.length;
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
			field: "role_name",
			title: "Role Name",
			width: "14%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "role_description",
			title: "Role Description",
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
			width: "14%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "username",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(campaignId, role_id, role_name, status)#',
			width: "18%",
			filterable: false
		}]
	});
});


function createLink(cid, roleid, strName, status) {
	var sHtmlContent = '';
	if(status == 1){
		sHtmlContent += "<a href=\"javascript:void(0)\"><img src='/assets/images/icon/no.png' title='click here to Disable "+strName+"' onClick='javascript:setStatus("+cid+","+roleid+", 0)'></a>";
	}else{
		sHtmlContent += "<a href=\"javascript:void(0)\"><img src='/assets/images/icon/yes.png' title='click here to Enable "+strName+"'' onClick='javascript:setStatus("+cid+","+roleid+", 1 )'></a>";
	}
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:addModules(\''+cid+'\', \''+roleid+'\')"><img src="'+BASEURL+'assets/images/icon/addfeature.png" alt="ADD MODULES" title="ADD MODULES" ></a>';
	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
	console.log('grid');
}

function getValue(val){
	if(val==1){
		return "Enable";
	} else{
		return "Disable";
	}
}
function addModules(cid, roleid)
{
	return false;
}
setInterval(function(){ $("#error").html(''); }, 5000);