<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<div class="col-sm-9">
      
      <br><br>
	  <div id="uploadagl">	   
		<form action="<?php echo base_url('/import'); ?>" class="md-form" method="post" enctype="multipart/form-data">
		  <div class="file-field">
			<div class="btn btn-primary btn-sm float-left">
			  <span>Choose file</span>
			  <input type="file" name="file" />			 
			</div>
			<input type="submit" class="btn btn-primary" name="importSubmit" value="PUSH TO AGL">			
		  </div>		  
		</form>
		<hr>		
		
		<!--<?php //if(!empty($filedata) && !isset($api_process_msg) && !isset($file_exists_msg) && !isset($error_msg)){ ?>
		<form action="<?php //echo base_url('/validatetoken'); ?>" class="md-form" method="post">
		  <div>					/	
			<input type="submit" class="btn btn-primary" name="validateSubmit" value="Push to AGL API">		
		  </div>		  
		</form>
		<?php //} ?>-->
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
					<div class="alert alert-danger"><?php echo $error_msg; ?></div>
				</div>
		<?php } ?>
		<hr/>
		<!-- Data list table -->
		<?php if(!empty($filedata)) { ?>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>#ID</th>
					<th>FILE NAME</th>
                    <th>DATE UPLOADED</th>
                    <th>NO OF RECORDS</th>
                    <th>EXPORT FILE</th>
                    <th>EXPORT SUBMISSION RESPONSE</th>					
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
							<td><input type="submit" class="btn btn-primary" name="exportfile" id="exportfile" value="Export Uploaded CAF"/></td>						
						</form>
						<form method="post" action="<?php echo base_url('/exportcafres'); ?>">
							<input type="hidden" name="fileidres" value="<?php echo $row['id']; ?>"/>
							<td><input type="submit" class="btn btn-primary" name="exportcaffile" id="exportcaffile" value="Export CAF Response"/></td>
						</form>
					</tr>
                <?php }  }
					} else 
				{ ?>
					<tr><td colspan="6">No records(s) found...</td></tr>
                <?php 
				} ?>
            </tbody>
        </table>
		<?php } ?>
	  <hr>
</div>