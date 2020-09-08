<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$pos = strrpos($currentUrl, "?");
if ($pos === false) { 
	$currentUrl .= "?"; 
}
if(!empty($srh)) {
	$currentUrl .= "&srh=".$srh; 	
	$arrayOpt = explode('@', $srh) ;	
	$searchOpt = array();	
	foreach($arrayOpt as $opt) {
		$field =  explode(':', $opt);
		$key = trim($field[0]);		
		$val = trim($field[1]);
		if(!empty($field[1]))
			$searchOpt[$key] = trim($field[1]); 
	}    
	$srhFileName = (!empty($searchOpt['filename'])) ? $searchOpt['filename'] : '';
	$srhImportedDate = (!empty($searchOpt['imported_date'])) ? $searchOpt['imported_date'] : '';
    $srhImportedDateTo = (!empty($searchOpt['imported_date_to'])) ? $searchOpt['imported_date_to'] : '';	
} else {
	$srhFileName = '';
	$srhImportedDate =  '';	
	$srhImportedDateTo = '';
}
$sortOpt = array();
if(!empty($sort)) {
	$field =  explode(':', $sort);
	$key = trim($field[0]);		
	$val = trim($field[1]);    
	$sortOpt[$key] = $val;
}
?> 
<div class="content-fluid pt-2">	 
	<div class="container-fluid breadcrumb-container lite-grey-gradient">
		<ul id="breadcrumb">
			<li><a href="/" title="Home">Home &nbsp;</a></li>
			<li><a href="/" title="AGL">AGL&nbsp;</a></li>			 
		</ul>
		<div class="clearfix"></div>
	</div>
	
	<div class="container-fluid pt-2" style="padding:0px;">
		<div class="card block-border lite-grey-gradient">
			<div class="card-body card-body-extra">
				<fieldset>    	
					<legend class="w-auto"><i class="fa fa-bandcamp" aria-hidden="true"></i> AGL </legend>				
					<div class="container-fluid pt-2 main-card-block lite-grey-gradient main-table-block">	 
						<div class="row">
							<div class="col-sm-12">            
								  <div id="uploadagl">	   
									<form action="<?php echo base_url('/import'); ?>" class="md-form" method="post" enctype="multipart/form-data">
									  <div class="file-field">
										<div class="btn btn-primary btn-sm float-left pr-5">
										  <span>Choose file</span>
										  <input type="file" name="file" />			 
										</div>
										&nbsp;&nbsp;
										<input type="submit" class="btn btn-primary" name="importSubmit" value="IMPORT">			
									  </div>		  
									</form>
									<hr>		
									
									
									<!--<form action="<?php //echo base_url('/validatetoken'); ?>" class="md-form" method="post">
									  <div>						
										<input type="submit" class="btn btn-primary" name="validateSubmit" value="Push to AGL API">		
									  </div>		  
									</form>-->
									
								  </div>
								  <!-- Display status message -->
									<?php //echo $fileerror; ?>
									<br/>
								<?php if(!empty($file_exists_msg)) {
									echo "<div class='alert alert-success'>".$file_exists_msg."</div>";
								}?>
								<?php if(!empty($success_msg)){ ?>
									<div class="col-xs-12">
										<div class="alert alert-success"><?php echo $success_msg; ?></div>
									</div>
								<?php } ?>
								<?php if(!empty($error_msg)){ ?>
										<div class="col-xs-12">
											<div class="alert alert-success"><?php echo $error_msg; ?></div>
										</div>

								<?php } ?>
								<hr/> 	 												
							</div>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	</div>				
</div>