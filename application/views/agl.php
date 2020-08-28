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
<div class="container-fluid pt-5">
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
		<div style="float:right;">
			<p><?php echo $links; ?></p>
		</div>
        <table id="example" class="table table-striped table-bordered dt-responsive nowrap" style="width:100%">
            <thead class="thead-dark">
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
							$cssclass = "style=background-color:white";
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
							<td><input type="submit" class="btn btn-primary" name="exportfile" id="exportfile" value="Export Uploaded CAF"/></td>						
						</form>
						<form method="post" action="<?php echo base_url('/exportcafres'); ?>">
							<input type="hidden" name="fileidres" value="<?php echo $row['id']; ?>"/>
							<input type="hidden" name="filename" value="<?php echo $row['filename']; ?>"/>
							<td><input type="submit" class="btn btn-primary" name="exportcaffile" id="exportcaffile" value="Export CAF Response"/></td>
						</form>
						<form method="post" action="<?php echo base_url('/exportcafcallres'); ?>">
							<input type="hidden" name="fileidcafres" value="<?php echo $row['id']; ?>"/>
							<input type="hidden" name="filename" value="<?php echo $row['filename']; ?>"/>
							<td><input type="submit" class="btn btn-primary" name="exportcafresfile" id="exportcafresfile" value="Export AGL Response"/></td>
						</form>
						</tr>
	                <?php }  }
						} else 
					{ ?>
						<tr><td colspan="7">No records(s) found...</td></tr>
	                <?php 
					} ?>
	            </tbody>
				<!--<tfoot>
					<tr class="table-secondary"  >
						<th colspan="7"style="padding:0px 5px;"> 
							<p><?php //echo $links; ?></p>
						</th>							 
					</tr>
				</tfoot>-->
	        </table>
			<div style="float:right;">
				<p><?php echo $links; ?></p>
			</div>
			<?php } ?>
		  <hr>
		</div>
	</div>
</div>