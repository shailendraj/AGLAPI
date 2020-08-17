<?php 	
   $id = 	(!empty($ipaccess->ipID)) ?  $ipaccess->ipID : ''; 
   $name = 	(!empty($ipaccess->name)) ?  $ipaccess->name : ''; 
   $ipstart = (!empty($ipaccess->ipStart)) ?  long2ip($ipaccess->ipStart) : long2ip(0); 
   $ipend = (!empty($ipaccess->ipEnd)) ?  long2ip($ipaccess->ipEnd) :  long2ip(0); 
   $hostname = (!empty($ipaccess->hostname)) ?  $ipaccess->hostname : '';   
?>
<form class="form-horizontal" id="ipform" method="post" enctype="multipart/form-data" action="<?= base_url('ipaccess/submitted') ?>">
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">Name:</label>
	  <div class="col-sm-6">
		<input type="text" class="form-control" id="name" name="name" required placeholder="Enter Name" 
			value="<?php echo $name ?>" />
	  </div>
	</div>	 
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">Host Name: </label>
	  <div class="col-sm-6">
		 <input type="text" class="form-control" id="hostname" name="hostname" required placeholder="Enter Host Name" 
			value="<?php echo $hostname ?>" />
	  </div>
	</div>
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">IP Start:</label>
	  <div class="col-sm-6">
		<input type="text" class="form-control" id="ipstart" name="ipstart" value="<?= $ipstart ?>" required pattern="((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$" placeholder="Enter IP start">
		<input type="hidden" name="ipID" value="<?=$id ?>" />
	  </div>
	</div>	
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">IP End: </label>
	  <div class="col-sm-6">
		 <input type="text" class="form-control" id="ipend" name="ipend" required  pattern="((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$" placeholder="Enter IP End" 
			value="<?php echo $ipend ?>" />
	  </div>
	</div> 
	<input type="submit" value="Submit" id="formsubmit" style="display:none">
</form> 