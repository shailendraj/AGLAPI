function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"inbound";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}

$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"inbound/get_inbound_status_data",
					contentType: 'application/json; charset=utf-8',
					type: 'get',
					dataType: 'json',
					data:{SID: '', STATUS: {"1":'NEW',"2":'CALLBACK',"3":'ATTEMPTING CONTACT',"4":'PROSPECT',"5":'WAITING PAYMENT'}},
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						supplierId: { type: "string" },
						firstName: { type: "string" },
						lastName: { type: "string" },
						contactMobile: { type: "string" },
						contactEmail: { type: "string" },
						assignedToTeamMember: { type: "string" },
						status: { type: "string" }
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
			field:"supplierId",
			title: "Supplier ID",
			width: "10%"
		}, {
			field: "contactMobile",
			title: "Mobile",
			width: "10%"
		}, {
			field: "firstName",
			title: "Name",
			template: '#=getValue(firstName, lastName)#',
			width: "15%",
			filterable: false
		},{
			field: "contactEmail",
			title: "Email"
		},{
			field: "assignedToTeamMember",
			title: "Assign To",
			width: "12%"
		},{
			field: "status",
			title: "Status",
			template: '#=capitalize(status)#',
			width: "14%"
		},{
			field: "id",
			title: "&nbsp&nbsp<input type='checkbox' class='chkSelectAll' title='Select All' alt='Select All'/>",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(id)#',
			width: "5%",
			filterable: false,
			sortable:false
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

	$('#grid').on('click', '.chkSelectAll', function () {
		var checked = $(this).is(':checked');
		if($("input[name='leadId[]']").length>0){
			$("input[name='leadId[]']").each(function( i ) {
				if ( checked) {
					this.checked = "checked";
				} else {
					this.checked = "";
				}
			});
		}
	});
});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getValue(fname, lname){
	return fname+" "+lname;
}

function createLink(sId){
	return '<input type="checkbox" name="leadId[]" class="checkbox" value="'+sId+'" />';
}


function assign_lead()
{
	if($("input[name='leadId[]']:checked").length>0){
		var iId = '';
		$("input[name='leadId[]']:checked").each(function() {
			if(iId == ''){
				iId = $(this).val();
			} else {
				iId = iId +", "+$(this).val();
			}
		});

		var tag = $("<div id=\"dialogbox\"></div>");
		$(tag).attr("title", "Assign Lead");
		$.ajax({
			type: "POST",
			data:{ID: iId},
			cache:false,
			url: BASEURL+"inbound/assign_lead",
			success:function(result) {
				$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
				$(tag).dialog({
					autoOpen: false,
					resizable: false,
					height: "auto",
					width:"auto",
					modal: true,
					buttons: {
						'Assign & Exit': save_assign_lead,
						Cancel: function() {
							$(tag).dialog('destroy').remove();
						}
					},
					close: function() {
						$(tag).dialog('destroy').remove();
					}
				});
				$(tag).dialog( "option", "width", 380 );
				$(tag).html(result).dialog().dialog('open');
			}
		});
	} else {
		var win = $("#window").data("kendoWindow");
		win.center().open();
	}
}

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}


function save_assign_lead()
{
	$("#center").removeClass( "ui-state-error" );
	$("#agent").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var values = $("#assignLeadForm").serialize();
		$.ajax({
			url: BASEURL+"inbound/update_assign_leads",
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
	if ($("#center").val().length <= 0) {
		$("#assignLead :input").addClass("ui-state-error");
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


function get_agent_list() {
	var cId = $('#center').val();
	$('#agent').empty();
	$('#agent').append(
		$('<option></option>').val('').html('----Select Agent----')
	);
	$.ajax({
			url: BASEURL+"inbound/user_list",
			type: "post",
			data: {cid:cId} ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$.each(res.data.list, function(i,obj) {
						$('#agent').append(
							$('<option></option>').val(i).html(obj)
						);
					});
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
	});
}


$(document).ready(function(){
	$("#window").kendoWindow({
		width: 300,
		height: 30,
		title: "Notification Message!!",
		visible: false
	}).data("kendoWindow");
});
