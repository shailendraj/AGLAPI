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
			<input type="submit" class="btn btn-primary" name="importSubmit" value="IMPORT">			
		  </div>		  
		</form>
		<hr>		
		
		<?php if(!empty($agldata)){ ?>
		<form action="<?php echo base_url('/validatetoken'); ?>" class="md-form" method="post">
		  <div>						
			<input type="submit" class="btn btn-primary" name="validateSubmit" value="Push to AGL API">		
		  </div>		  
		</form>
		<?php } ?>
	  </div>
	  <!-- Display status message -->
	    <?php //echo $fileerror; ?>
		<br/>
		<?php if(!empty($success_msg)){ ?>
			<div class="col-xs-12">
				<div class="alert alert-success"><?php echo $success_msg; ?></div>
			</div>
			<?php if(!empty($error_msg)){ ?>
				<div class="col-xs-12">
					<div class="alert alert-danger"><?php echo $error_msg; ?></div>
				</div>
			<?php } 
		} ?>
		<hr/>
		<!-- Data list table -->
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>#ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php if(!empty($agldata)){ foreach($agldata as $row){ ?>
                <tr>
                    <td><?php echo $row['LEAD_ID']; ?></td>
                    <td><?php echo $row['NAME_FIRST']; ?></td>
                    <td><?php echo $row['EMAIL']; ?></td>
                    <td><?php echo $row['PHONE_MOBILE']; ?></td>
                    <td><?php echo $row['AGL_STATUS']; ?></td>
                </tr>
                <?php } }else{ ?>
                <tr><td colspan="5">No records(s) found...</td></tr>
                <?php } ?>
            </tbody>
        </table>
	  <hr>
</div>