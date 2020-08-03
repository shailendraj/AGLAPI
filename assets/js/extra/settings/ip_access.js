$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"settings/ip_access/get_all",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						ipID: { type: "string" },
						name: { type: "string" },
						status: { type: "number" },
						ipStart: { type: "string" },
						ipEnd: { type: "string" },
						hostname: { type: "string" }
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
			field: "name",
			title: "Name",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "ipStart",
			title: "IP Start",
			width: "15%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "ipEnd",
			title: "IP End",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "hostname",
			title: "Hostname",
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
			template: '#=createLink(ipID,status)#',
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


function createLink(ipID,status){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:AddEditPopUp(\''+ipID+'\') "><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>&nbsp;';
	if(status == 1){
		sHtmlContent += '<a href="javascript:setStatus(\''+ipID+'\') " onclick="return confirm(\'Are you sure you want to disable this ip access entry?\')"><img src="'+BASEURL+'assets/images/icon/no.png"  alt="DISABLE" title="DISABLE"  ></a>&nbsp;';
	}else{
		sHtmlContent += '<a href="javascript:setStatus(\''+ipID+'\')" onclick="return confirm(\'Are you sure you want to enable this ip access entry?\')" ><img src="'+BASEURL+'assets/images/icon/yes.png" alt="ENABLE" title="ENABLE"  ></a>&nbsp;';
	}
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


function setStatus(ID) {
	$.ajax({
		type:"GET",
		cache:false,
		url:BASEURL+"settings/ip_access/toggle/"+ID,
		success: function(res) {
			$("#error").html(res);
			refershGrid();
		}
	})
}

//PAGES SECTION
function AddEditPopUp(iId) {
	var tag = $("<div id=\"dialogbox\"></div>");
	if(iId!=0)
		$(tag).attr("title", "Edit IP Access Entry");
	else
		$(tag).attr("title", "Add IP Access Entry");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"settings/ip_access_form",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
				$(tag).dialog({
					autoOpen: false,
					resizable: false,
					height: "auto",
					width:"auto",
					modal: true,
					buttons: {
						'Save': saveIPAccess,
						Cancel: function() {
							$(tag).dialog('destroy').remove();
						}
					},
					close: function() {
						$("#addNewIPAccess")[0].reset();
						$("#name").removeClass( "ui-state-error" );
						$(tag).dialog('destroy').remove();
					}
				});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function saveIPAccess(){
	$("#addNewIPAccess :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var values = $("#addNewIPAccess").serialize();
		$.ajax({
			url: BASEURL+"settings/save_ip_access",
			type: "post",
			data: values ,
			dataType : 'json',
			success: function (res) {
				if(res.data.success) {
					var iId = $('#ipID').val();
					if(iId === 0) {
						$("#error").html("Page added successfully.");
					} else {
						$("#error").html("Page Update successfully.");
					}
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
	if ($("#name").val().length <= 0) {
		$("#addNewPage :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}