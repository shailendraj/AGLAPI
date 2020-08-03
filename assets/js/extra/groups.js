function AddEditPopUp(id, name, grpID)
{
	var tag = $("<div id=\"dialogbox\"></div>");
	if(id == 0){
		$(tag).attr("title", "Add New Group");
	} else {
		$(tag).attr("title", "Edit Group");
	}
	$.ajax({
		type: "POST",
		data:{groupID: id},
		cache:false,
		url: "/admin/addForm",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					"Save": addGroup,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewGroup")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 350 );
			$(tag).html(result).dialog().dialog('open');
			$("#name").val(name);
			$("#groupID").val(grpID);
		}
	});
};

function checkLength()
{
	if ($("#name").val().length <= 0 || $("#groupID").val().length <= 0) {
		$("#addNewGroup :input").addClass("ui-state-error");
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

function addGroup() {
	$("#name").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		$.ajax({
			type:"POST",
			data:{id:$("#ID").val(),gid: $("#groupID").val(), name:$("#name").val()},
			url:"/admin/save",
			success:function(response) {
				if(response == 0) {
					$("#addNewGroup :input").addClass("ui-state-error");
					$(".validateTips").html('Please enter *required fields.');
				} else if(response == -1) {
					$("#groupID").addClass("ui-state-error");
					$(".validateTips").html('Already exists.Please try a different GroupID.');
				} else {
					//window.location = "/admin/group";
					var iId = $('#ID').val();
					if(iId == 0) {
						$("#error").html("Group added successfully.");
					} else {
						$("#error").html("Group Update successfully.");
					}
					$("#dialogbox").dialog('destroy').remove();
					refershGrid();
				}
			}
		})
	}
}

function setGroupStatus(ID, status)
{
	$.ajax({
		type:"POST",
		cache:false,
		data:{id:ID, status:status},
		url:"/admin/setStatus",
		success: function(res) {
			$("#error").html(res);
			refershGrid();
		}
	})
}

function viewCampaign(id) {
 window.location = "/admin/campaign/"+id;
}

function GroupList(moduleID) {
	var sRedirectUrl = BASEURL+"admin";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+moduleID+'"></form>').appendTo('body').submit();
}

$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/jgroup/",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						ID: { type: "number" },
						groupID: { type: "string" },
						name: { type: "string" },
						creation_datetime: { type: "date" },
						modified_datetime: { type: "date" },
						status: { type: "number" }
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
			width: "10%",
			template: "<span class='row-number'></span>",
			filterable: false
		},{
			field: "groupID",
			title: "Group ID",
			width: "14%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "name",
			title: "Group Name",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "creation_datetime",
			title: "Created Date",
			format: "{0:yyyy-MM-dd}",
			width: "14%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "modified_datetime",
			title: "Update Date",
			width: "14%",
			format: "{0:yyyy-MM-dd}",
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
			field: "ID",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(ID, groupID, name, status)#',
			width: "14%",
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


function createLink(id, groupID, name, status) {
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onClick="javascript:AddEditPopUp( '+id+', \''+name+'\', \''+groupID+'\')"><img src="/assets/images/icon/edit.png" title="Edit '+name+' "></a>&nbsp';
	if(status == 1){
		sHtmlContent += "<a href=\"javascript:void(0)\"><img src='/assets/images/icon/no.png' title='click here to disable "+name+"' onClick='javascript:setGroupStatus("+id+", 0)'></a>";
	}else{
		sHtmlContent += "<a href=\"javascript:void(0)\"><img src='/assets/images/icon/yes.png' title='click here to disable "+name+"'' onClick='javascript:setGroupStatus("+id+", 1)'></a>";
	}

	sHtmlContent +='&nbsp;<a href="javascript:void(0)" onClick="javascript:viewCampaign('+id+')"><img src="/assets/images/icon/campaign.png" width="24px" title="view campaigns associated with '+name+'">';
	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

function getValue(val){
	if(val==1){
		return "Enable";
	} else{
		return "Disable";
	}
}
setInterval(function(){ $("#error").html(''); }, 5000);
