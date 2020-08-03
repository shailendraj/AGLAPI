function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"leads";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}

function updateTips( t )
{
	$("#error").html(t);
}

function upload(fld)
{
	if(!/(\.csv)$/i.test(fld.value)) {
		updateTips("*Please upload .csv file only.");
		$("#UploadForm:input[type=file]").addClass("ui-state-error");
		fld.focus();
		return false;
	}
	$("#UploadForm:input[type=file]").removeClass("ui-state-error");
	var file_data = $('#imageInput').prop('files')[0];
	var form_data = new FormData();
	form_data.append('image_file', file_data);
	$.ajax({
		url: BASEURL+'leads/processupload/upload', // point to server-side PHP script
		dataType: 'json',  // what to expect back from the PHP script, if anything
		cache: false,
		contentType: false,
		processData: false,
		data: form_data,
		type: 'post',
		success: function(oRes) {
			if(oRes.data.error) {
				$("#error").html(oRes.data.message);
				file_process();
			}
		}
	});
}


function file_process()
{
	$.ajax({
		type:"POST",
		cache:false,
		url: BASEURL+'leads/processupload/begin',
		success: function(oRes) {
			if(oRes.data.error) {
				$("#error").html(oRes.data.message);
			}
			Upload_View();
		}
	})
}




$(document).ready(function (){
	$("#grid").kendoGrid({
		type: "json",
		dataSource: {
			transport: {
				read:{
					url : BASEURL+"leads/uhistory",
					contentType: 'application/json; charset=utf-8',
					type: 'GET',
					dataType: 'json'
				}
			},
			schema: {
				data: "data",
				model: {
					fields: {
						fileName: { type: "string" },
						modifyDate: { type: "string" },
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
			field: "fileName",
			title: "File Name",

			filterable: {
				cell: {
					showOperators: false
				}
			}
		}, {
			field: "modifyDate",
			title: "Modify Date",
			width: "20%",
			filterable: {
				cell: {
					showOperators: false
				}
			}
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

function refershGrid(){
	$("#grid").data("kendoGrid").dataSource.read();
}
setInterval(function(){ $("#error").html(''); }, 5000);

function Upload_View()
{
	var refreshIntervalId = setInterval(function Check() {
		$.ajax({url: BASEURL+'leads/processupload/check', async: false, dataType: 'json', success: function(oRes) {
			if (oRes.data.error == 0)
			{
				clearInterval(refreshIntervalId);
				$("#imageInput").prop('disabled', false);
				$("#loading-img").css('display', 'none');
				$("#output").html('');
				$.get(BASEURL+'leads/processupload/complete', function (data) {
					refershGrid();
					$("#error").html("File uploaded successfully.");
				});
			} else {
				$("#imageInput").prop('disabled', true);
				$("#loading-img").css('display', 'inline-block');
				$("#output").html(oRes.data.message);
			}
		}});
	},1000);
}

function get_progress_status()
{
	$.ajax({
		type:"GET",
		cache:false,
		async: false,
		url: BASEURL+'leads/fcount',
		success: function(oRes) {
			if(oRes.data.error) {
				var iProgressCount = oRes.data.ProcessRecordCount;
				var iTotalCount = oRes.data.TotalRecordCount;
				$("#output").html('Leads CSV file upload record updated status is '+iProgressCount+'/'+iTotalCount+' . Please <a href="javascript:upload_cancel()">click here</a> to cancel CSV upload process .');
			}
			Upload_View();
		}
	})
}

function upload_cancel()
{
	$.ajax({
		type:"POST",
		cache:false,
		url: BASEURL+'leads/processupload/cancel',
		success: function(oRes) {
			if(oRes.data.error) {
			}
			Upload_View();
		}
	})
}

