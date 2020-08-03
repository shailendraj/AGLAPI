$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"admin/getJsonPages/",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						page_id: { type: "number" },
						page_name: { type: "string" },
						page_url_path: { type: "string" },
						module: { type: "string" },
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
			width: "8%",
			template: "<span class='row-number'></span>",
			filterable: false
		},{
			field: "page_name",
			title: "Page/Module Name",
			width: "18%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "page_url_path",
			title: "Page URL",
			filterable: {
				cell: {
					showOperators: false
				}
			}
		},{
			field: "module",
			title: "Module",
			width: "14%",
			template: '#=getModuleName(module)#',
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
			field: "page_id",
			title: "Action",
			attributes: { style: "text-align:center;" } ,
			template: '#=createLink(page_id,page_name, status)#',
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


function createLink(id, page_name, status){
	var sHtmlContent = '';
	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:AddEditPopUp('+id+')"><img src="'+BASEURL+'assets/images/icon/edit.png" alt="EDIT" title="EDIT" ></a>';
	if(status == 1){
		sHtmlContent += '<a href="javascript:setStatus('+id+') " onclick="return confirm(\'Are you sure you want to disable this page data?\')"><img src="'+BASEURL+'assets/images/icon/no.png"  alt="DISABLE" title="DISABLE"  ></a>';
	}else{
		sHtmlContent += '<a href="javascript:setStatus('+id+')" onclick="return confirm(\'Are you sure you want to enable this page data?\')" ><img src="'+BASEURL+'assets/images/icon/yes.png" alt="ENABLE" title="ENABLE"  ></a>';
	}

	sHtmlContent +='<a href="javascript:void(0)" onclick="javascript:addFeatures('+id+')"><img src="'+BASEURL+'assets/images/icon/addfeature.png" alt="ADD FEATURE" title="ADD FEATURE" ></a>';

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
		url:BASEURL+"admin/statuspage/"+ID,
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
		$(tag).attr("title", "Edit Page");
	else
		$(tag).attr("title", "Add New Page");
	$.ajax({
		type: "POST",
		data:{ID: iId},
		cache:false,
		url: BASEURL+"admin/pageform",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
				$(tag).dialog({
					autoOpen: false,
					resizable: false,
					height: "auto",
					width:"auto",
					modal: true,
					buttons: {
						'Save': savePage,
						Cancel: function() {
							$(tag).dialog('destroy').remove();
						}
					},
					close: function() {
						$("#addNewPage")[0].reset();
						$("#name").removeClass( "ui-state-error" );
						$(tag).dialog('destroy').remove();
					}
				});
			$(tag).dialog( "option", "width", 580 );
			$(tag).html(result).dialog().dialog('open');
		}
	});
}

function savePage(){
	$("#addNewPage :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = checkLength();
	if(valid) {
		var values = $("#addNewPage").serialize();
		$.ajax({
			url: BASEURL+"admin/savepage",
			type: "post",
			data: values ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					//window.location = BASEURL+"admin/pages";
					var iId = $('#pageid').val();
					if(iId == 0) {
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
	if ($("#pagename").val().length <= 0 || $("#pageurlpath").val().length <= 0) {
		$("#addNewPage :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}

//FEATURE
function addFeatures(iPaged) {
	var tag = $("<div></div>");
	$(tag).attr("title", "Manages Page Features");
	$.ajax({
		type: "POST",
		data:{pageID: iPaged},
		cache:false,
		url: BASEURL+"admin/page/features",
		success:function(result) {
			$( "div" ).remove( ".ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable" );
			$(tag).dialog({
				autoOpen: false,
				resizable: false,
				height: "auto",
				width:"auto",
				modal: true,
				success: function(){
				},
				close: function() {
					$("#addPageFeature")[0].reset();
					$("#name").removeClass( "ui-state-error" );
					$(tag).dialog('destroy').remove();
				}
			});
			$(tag).dialog( "option", "width", 780 );
			$(tag).html(result).dialog().dialog('open');
			featureList(iPaged);
		}
	});
}


function saveFeature(){
	$("#addPageFeature :input").removeClass( "ui-state-error" );
	var valid = true;
	valid = fcheckLength();
	if(valid) {
		var values = $("#addPageFeature").serialize();
		$.ajax({
			url: BASEURL+"admin/page/savefeature",
			type: "post",
			data: values ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$(".validateTips").html(res.data.message);
					$('#addPageFeature').trigger("reset");
					featureList();
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

function fcheckLength() {
	if ($("#featuretitle").val().length <= 0 ) {
		$("#addPageFeature :input").addClass("ui-state-error");
		$(".validateTips").html("*Please enter *required fields.");
		return false;
	} else {
		return true;
	}
}

function featureList(iPageId){
	$.ajax({
		url: BASEURL+"admin/page/featurelist",
		type: "post",
		data: {pageID:iPageId} ,
		dataType  : 'html',
		success: function (res) {
			$("#gridcontainer").html(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}

function EditPopUp(iFeatureId) {
	$.ajax({
		url: BASEURL+"admin/page/editfeature",
		type: "post",
		data: {fID:iFeatureId} ,
		dataType  : 'json',
		success: function (res) {
			if(res.data.success) {
				$("#addPageFeature :input").addClass("ui-state-highlight");
				$("#featuretitle").val( res.data.result.featureTitle);
				$("#featuredescription").val(res.data.result.featureDescription);
				$("#status").val(res.data.result.status);
				$("#featureid").val(res.data.result.id);
				$("#btnadd").val('Edit Feature');
			}else{
				$(".validateTips").html(res.data.message);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		   console.log(textStatus, errorThrown);
		}
	});
}

function getJPageList() {
	var selected = $('#moduleid').val();
	$('#parentPageId').empty();
	$('#parentPageId').append(
		$('<option></option>').val('').html('Select Parent Page')
	);
	$.ajax({
			url: BASEURL+"admin/getJPageList",
			type: "post",
			data: {mid: selected} ,
			dataType  : 'json',
			success: function (res) {
				if(res.data.success) {
					$.each(res.data.list, function(i,obj) {
						$('#parentPageId').append(
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