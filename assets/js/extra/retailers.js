function AddEditPopUp(id, strName, strDescription,)
{
	var tag = $("<div id=\"dialogbox\"></div>");
	if(id==0)
		$(tag).attr("title", "Add New Retailer");
	else
		$(tag).attr("title", "Edit Retailer");
	$.ajax({
		type: "POST",
		data:{id: id},
		cache:false,
		url: "/admin/addRetailerForm",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					"Save": addRetailer,
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
			$("#name").val(strName);
			$("#description").val(strDescription);
		}
	});
};

function checkLength()
{
	if ($("#name").val().length <= 0 || $("#description").val().length <= 0) {
		$("#addNewGroup-Campaign :input[type=text]").addClass("ui-state-error");
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

function addRetailer() {
	$("#addNewGroup-Campaign :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		$.ajax({
			type:"POST",
			data:{ID:$('#id').val(), name: $("#name").val(), description: $("#description").val()},
			url:"/admin/saveRetailer",
			success:function(response) {
				if(response == 0) {
					$("#addNewGroup-Campaign :input").addClass("ui-state-error");
					$(".validateTips").html('Please enter *required fields.');
				} else if(response == -1) {
					$("#campaignID").addClass("ui-state-error");
					$(".validateTips").html('Already exists.Please try a different retailer.');
				} else {
					var iId = $('#ID').val();
					if(iId == 0) {
						$("#error").html("Retailer added successfully.");
					} else {
						$("#error").html("Retailer Update successfully.");
					}
					$("#dialogbox").dialog('destroy').remove();
					refershGrid();
				}
			}
		})
	}
}

function setStatus(ID, status, grId) {
	$.ajax({
		type:"POST",
		cache:false,
		data:{ID:ID, status:status},
		url:"/admin/setRetailerStatus",
		success: function(res) {
			//alert(res);
			//window.location = "/admin/campaign/"+grId;
			$("#error").html(res);
			refershGrid();
		}
	})
}


$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/getJsonRetailers",
					contentType: 'application/json; charset=utf-8',
					type: 'POST',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						id: {type: "number"},
						retailer_name: { type: "string" },
						description : { type: "string" },
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
			field: "retailer_name",
			title: "Retailer",
			width: "25%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "description",
			title: "Description",
			width: "35%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "status",
			title: "Status",
			width: "10%",
			template: '#=getValue(status)#',
			width: "8%",
			filterable: false
		},{
			field: "id",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(id, retailer_name, description, status)#',
			width: "16%",
			filterable: false
		}]
	});
});


function createLink(id, strName, strDescription, status) {
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onClick="javascript:AddEditPopUp( '+id+', \''+strName+'\', \''+strDescription+'\')"><img src="/assets/images/icon/edit.png" title="Edit '+strName+' "></a>&nbsp';
	if(status == 1){
		sHtmlContent += "<a href=\"javascript:void(0)\"><img src='/assets/images/icon/no.png' title='click here to Disable "+strName+"' onClick='javascript:setStatus("+id+", 0)'></a>";
	}else{
		sHtmlContent += "<a href=\"javascript:void(0)\"><img src='/assets/images/icon/yes.png' title='click here to Enable "+strName+"'' onClick='javascript:setStatus("+id+", 1 )'></a>";
	}
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
setInterval(function(){ $("#error").html(''); }, 5000);