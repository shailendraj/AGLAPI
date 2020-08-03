function AddEditPopUp(id, cid, strName, strDescription,)
{
	var tag = $("<div id=\"dialogbox\"></div>");
	if(id==0)
		$(tag).attr("title", "Add New Campaign");
	else
		$(tag).attr("title", "Edit Campaign");
	$.ajax({
		type: "POST",
		data:{ID: id, campaignID: cid},
		cache:false,
		url: "/admin/addCampaignForm",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					"Save": addCampaign,
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
	if ($("#name").val().length <= 0 || $("#campaignID").val().length <= 0 || $("#description").val().length <= 0) {
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

function addCampaign() {
	$("#addNewGroup-Campaign :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		$.ajax({
			type:"POST",
			data:{ID:$('#ID').val(),cid: $('#campaignID').val(), name: $("#name").val(), description: $("#description").val()},
			url:"/admin/saveCampaign",
			success:function(response) {
				if(response == 0) {
					$("#addNewGroup-Campaign :input").addClass("ui-state-error");
					$(".validateTips").html('Please enter *required fields.');
				} else if(response == -1) {
					$("#campaignID").addClass("ui-state-error");
					$(".validateTips").html('Already exists.Please try a different campaignID.');
				} else {
					var iId = $('#ID').val();
					if(iId == 0) {
						$("#error").html("Campaign added successfully.");
					} else {
						$("#error").html("Campaign Update successfully.");
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
		url:"/admin/setCampaignStatus",
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
					url : BASEURL+"admin/getJsonCampaigns",
					type: 'POST',
					dataType: 'json'
				}
			},
			schema: {
				data: "aaData",
				model: {
					fields: {
						ID: { type: "number" },
						campaignID : { type: "string" },
						name: { type: "string" },
						description: { type: "string" },
						creation_datetime: { type: "date" },
						modified_datetime: { type: "date" },
						status: { type: "number" }
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
			field: "campaignID",
			title: "Campaign ID",
			width: "14%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "name",
			title: "Campaign Name",
			width: "15%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "description",
			title: "Description",
			width: "25%",
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
			template: '#=createLink(ID, campaignID, name, description, status)#',
			width: "25%",
			filterable: false
		}]
	});
});


function createLink(id, cid, strName, strDescription, status) {
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onClick="javascript:AddEditPopUp( '+id+', \''+cid+'\', \''+strName+'\', \''+strDescription+'\')"><img src="/assets/images/icon/edit.png" title="Edit '+strName+' "></a>&nbsp';
	if(status == 1){
		sHtmlContent += "<a href=\"javascript:void(0)\"><img src='/assets/images/icon/no.png' title='click here to Disable "+strName+"' onClick='javascript:setStatus("+id+", 0)'></a>";
	}else{
		sHtmlContent += "<a href=\"javascript:void(0)\"><img src='/assets/images/icon/yes.png' title='click here to Enable "+strName+"'' onClick='javascript:setStatus("+id+", 1 )'></a>";
	}
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:addRetailers(\''+strName+'\',\''+cid+'\')"><img src="'+BASEURL+'assets/images/icon/addfeature.png" alt="ADD RETAILER" title="ADD RETAILER" ></a>';
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

//RETAILER
function addRetailers(name, cid) {
	var tag = $("<div id=\"dialogbox\"></div>");
	$(tag).attr("title", "Add Retailer To Campaign " + name);
	$.ajax({
		type: "POST",
		data:{id: cid},
		cache:false,
		url: "/admin/addCampaignRetailerForm",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				buttons: {
					"Save": saveCampaignRetailers,
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


function saveCampaignRetailers(){
	$("#addPageFeature :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = fcheckLength();
	if(valid) {
		$.ajax({
			url: BASEURL+"admin/saveCampaignRetailers",
			type: "post",
			data: {id: $("#id").val(), ret: $("#campaign_retailers").val()} ,
			dataType  : 'json',
			success: function (response) {
				if(response == 0) {
					$("#addNewGroup-Campaign :input").addClass("ui-state-error");
					$(".validateTips").html('Please select atleast one retailer.');
				} else {
					$("#addNewGroup-Campaign :input").removeClass("ui-state-error");
					$(".validateTips").html('');
					$("#error").html("Retailers added to campaign successfully.");
				}
				$("#dialogbox").dialog('destroy').remove();
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
}


function fcheckLength() {
	if ($("#campaign_retailers").val() == null || $('#campaign_retailers > option').length <= 0 ) {
		$("#addPageFeature :input").addClass("ui-state-error");
		$(".validateTips").html("*Please select atleast one retailer.");
		return false;
	} else {
		return true;
	}
}

setInterval(function(){ $("#error").html(''); }, 5000);