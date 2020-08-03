function go_back(iModuleID)
{
  var sRedirectUrl = BASEURL+"leads";
	$('<form method="post" action="'+sRedirectUrl+'"><input type="hidden" name="moduleID" value="'+iModuleID+'"></form>').appendTo('body').submit();
}

$(function() {
   $('.datepick').datepicker();
});
