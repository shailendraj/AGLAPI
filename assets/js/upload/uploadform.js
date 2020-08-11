jQuery(document).ready(function() {

				$('#uploadForm').validate();
			});
$(function() {
	/*
    $('#file_upload').uploadify({
		'checkExisting' : 'chkexists',
		'fileSizeLimit' : '20MB',
		'fileTypeDesc' : 'CSV',
        'fileTypeExts' : '*.csv',
		'multi' : false,
		'progressData' : 'speed',
		'swf' : '../assets/js/upload/uploadify.swf',
		'upload_url' : 'submit',
        'uploader' : '/upload/submit',
		'buttonText' : 'UPLOAD',
		'buttonClass' : 'btn',
		'width' : 102,
		'onFallback' : function() {
			alert('Flash was not detected');
		},
		'onUploadSuccess' : function(file, data, response) {

			$.get("letters_process.php", { type: $( "#type" ).val(), file: file }, function (data) {
				$( "#output" ).html(data);
			});

		}
    });
	*/
	/*
	$("#file_upload").uploadify({
		height        : 30,
		swf           : '../assets/js/upload/uploadify.swf',
		uploader      : 'http://abhijeetj.vericon.sbt-dev/upload/submit',
		width         : 120
	});
*/
});
function submitBack(){
	$('#btnbackform').submit();
}