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
} else {
	$srhFileName = '';
	$srhImportedDate =  '';	
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
							<!-- Data list table -->
							<?php if(!empty($filedata)) { ?>							 
							<table cellpadding="0" cellspacing="0" border="0" class="datatable table table-sm table-striped table-bordered table-hover">
								<thead class="table-primary">
									<tr>
										<th>
											#ID
											<?php 
												$sort = 'Asc';
												$css = 'down';
												if(!empty($sortOpt['id'])) {
													if(strtoupper($sortOpt['id']) == 'ASC') {
														$sort = 'ASC';
														$css = 'down';
													} else {
														$sort = 'DESC';
														$css = 'up';
													}	
												}
											?>	
											<a href="<?= $currentUrl.'&sort=id:'.$sort ?>" class="float-right"> 
												<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
											</a>
										</th>
										<th>
										   FILE NAME
										   <?php 
												$sort = 'DESC';
												$css = 'down';
												if(!empty($sortOpt['filename'])) {
													if(strtoupper($sortOpt['filename']) == 'DESC') {
														$sort = 'ASC';
														$css = 'down';
													} else {
														$sort = 'DESC';
														$css = 'up';
													}	
												}
											?>	
											<a href="<?= $currentUrl.'&sort=filename:'.$sort ?>" class="float-right"> 
												<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
											</a>
										</th>
										<th>
											DATE UPLOADED
											<?php 
												$sort = 'Asc';
												$css = 'down';
												if(!empty($sortOpt['imported_date'])) {
													if(strtoupper($sortOpt['imported_date']) == 'Desc') {
														$sort = 'ASC';
														$css = 'down';
													} else {
														$sort = 'DESC';
														$css = 'up';
													}	
												}
											?>	
											<a href="<?= $currentUrl.'&sort=imported_date:'.$sort ?>" class="float-right"> 
												<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
											</a>
										</th>
										<th>NO OF RECORDS</th>
										<th>EXPORT FILE</th>
										<th>EXPORT SUBMISSION RESPONSE</th>
										<th>EXPORT CALLBACK RESPONSE</th>
									</tr>
								</thead>
								<tbody>
									<?php if(!empty($filedata))	{						
											foreach($filedata as $row)	{						
											if(array_key_exists('recordsCount', $row)) {
											//print_r($row);
											if($row['addressnotfound'] == '1004') {
												$cssclass = "style=background-color:#FFBABA !important";
											} else {
												$cssclass = "";
											}
											?>
										<tr <?php echo $cssclass;?> <?php echo $row['addressnotfound'];?>>
											<td><?php echo $row['id']; ?></td>
											<td><?php echo $row['filename']; ?></td>
											<td><?php echo $row['date_uploaded']; ?></td>
											<td><?php echo $row['recordsCount']->reccount; ?></td>
											<form method="post" action="<?php echo base_url('/exportall'); ?>" />
												<input type="hidden" name="fileid" value="<?php echo $row['id']; ?>"/>
												<input type="hidden" name="filename" value="<?php echo $row['filename']; ?>"/>
												<td align="center"><input type="submit" class="btn btn-primary a-btn-slide-text btn-sm" name="exportfile" id="exportfile" value="Export Uploaded CAF"/></td>						
											</form>
											<form method="post" action="<?php echo base_url('/exportcafres'); ?>">
												<input type="hidden" name="fileidres" value="<?php echo $row['id']; ?>"/>
												<input type="hidden" name="filename" value="<?php echo $row['filename']; ?>"/>
												<td align="center" ><input type="submit" class="btn btn-primary a-btn-slide-text btn-sm" name="exportcaffile" id="exportcaffile" value="Export CAF Response"/></td>
											</form>
											<form method="post" action="<?php echo base_url('/exportcafcallres'); ?>">
												<input type="hidden" name="fileidcafres" value="<?php echo $row['id']; ?>"/>
												<input type="hidden" name="filename" value="<?php echo $row['filename']; ?>"/>
												<td align="center" ><input type="submit" class="btn btn-primary a-btn-slide-text btn-sm" name="exportcafresfile" id="exportcafresfile" value="Export AGL Response"/></td>
											</form>
											</tr>
										<?php }  }
											} else 
										{ ?>
											<tr><td colspan="7">No records(s) found...</td></tr>
										<?php 
										} ?>
									</tbody>	
									<tfoot class="table-secondary">
										<tr>
											<td colspan="7"> 
											 	<p><?php echo $links; ?></p>
											</td>							 
										</tr>
									</tfoot>			 
								</table>								 
								<?php } ?>							  
							</div>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	</div>				
</div>