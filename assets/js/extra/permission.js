$(document).ready(function (){
	$(function() {
		$("#hierarchy").accordion();
	});
	$('#hierarchy input[type="checkbox"]').click(function(e) {
	    e.stopPropagation();
	});
});

function createLink(iRoleId, iPageId, bStatus){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp('+iRoleId+', '+iPageId+')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	if(bStatus == 1){
		sHtmlContent += '<a href="javascript:setStatus('+iRoleId+', '+iPageId+')" onclick="return confirm(\'Are you sure you want to disable this permission data?\')"><img src="'+BASEURL+'assets/images/icon/no.png"  alt="DISABLE" title="DISABLE"  ></a>&nbsp;';
	}else{
		sHtmlContent += '<a href="javascript:setStatus('+iRoleId+', '+iPageId+')" onclick="return confirm(\'Are you sure you want to enable this permission data?\')" ><img src="'+BASEURL+'assets/images/icon/yes.png" alt="ENABLE" title="ENABLE"  ></a>&nbsp;';
	}
	return sHtmlContent;
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}

function get_full_access(val)
{
	if(val==1){
		return "YES";
	} else{
		return "NO";
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

function setStatus(iRoleId, iPageId)
{
	$.ajax({
		type:"GET",
		cache:false,
		url:BASEURL+"admin/role/statuspermission/"+iRoleId+"/"+iPageId,
		success: function(res) {
			$("#error").html(res);
			refershGrid();
		}
	})
}


function AddEditPopUp(iRoleId, iPageId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	if(iRoleId!=0 &&iPageId!=0)
		$(tag).attr("title", "Edit Permission");
	else
		$(tag).attr("title", "Add New Permission");
	$.ajax({
		type: "POST",
		data:{RoleID: iRoleId, PageID:iPageId },
		cache:false,
		url: BASEURL+"admin/permissionform",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					'Save': savePermission,
					Cancel: function() {
						$(tag).dialog('destroy').remove();
					}
				},
				close: function() {
					$("#addNewPermission")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function savePermission(){
	$("#addNewPermission :input").removeClass( "ui-state-error" );
	var valid = true;
	//valid = checkLength();
	if(valid) {
		var values = $("#addNewPermission").serialize()+ '&commapagefeaturelist=' + $('#pagefeaturelist').val();
		$.ajax({
			url: BASEURL+"admin/role/savepermission",
			type: "post",
			data: values ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$("#error").html(res.data.message);
					$("#dialogbox").dialog('destroy').remove();
					refershGrid();
				}else{
					$("#addNewPermission :input").addClass("ui-state-error");
					$(".validateTips").html(res.data.message);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
}

function saveRolePermissions(){
	var valid = true;
	if(valid) {
		var obj = {};
	    obj.pages = $('input[name=pages]:checked').map(function(){
			return this.value;
		}).get();
		obj.pagefeatures =  $('input[name=pagefeatures]:checked').map(function(){
			return this.value;
		}).get();
		var values = 'pages=' + obj.pages + '&pagefeatures=' + obj.pagefeatures + '&role_id=' + $('#role_id').val();
		$.ajax({
			url: BASEURL+"admin/savepermission",
			type: "post",
			data: values ,
			dataType  : 'json',
			success: function (res) {
				if (res.data.success) {
					$("#error").html(res.data.message);
					location.reload();
				} else {
					alert(res.data.message);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
}

function checkLength() {
	if ($("#pageid").val().length <= 0 ) {
		$("#addNewCenter :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}

function getFeatureList() {
	var selected = $('#pageid').val();
	$.ajax({
		url: BASEURL+"admin/get_feature_list",
		type: "post",
		data: {PageID: selected} ,
		dataType  : 'json',
		success: function (res) {
			if(res.data.success) {
				$('#pagefeaturelist').empty();
				$.each(res.data.list, function(i,obj) {
					$('#pagefeaturelist').append(
						 $('<option></option>')
								.val(i)
								.html(obj));
				});
			}else{
				$("#addNewPermission :input").addClass("ui-state-error");
				$(".validateTips").html(res.data.message);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}
