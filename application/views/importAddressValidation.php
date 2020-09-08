<?php
defined('BASEPATH') OR exit('No direct script access allowed');
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
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="hidden" name="addVal" value="1"/>
					<label class=""><input type="checkbox" name="siteaddress" value="1">&nbsp;&nbsp;Site Address</label>
					<label class=""><input type="checkbox" name="mailingaddress" value="1">&nbsp;&nbsp;Mailing Address</label>
					&nbsp;&nbsp;
					<input type="submit" class="btn btn-primary" name="importSubmit" value="IMPORT">			
				  </div>		  
				</form>
				<hr>						
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
		  <hr>
		</div>
	</div>
</div>