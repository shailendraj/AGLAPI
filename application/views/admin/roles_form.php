<?php 	   
   $role_id = 	(!empty($role->role_id)) ?  $role->role_id : ''; 
   $role_name = 	(!empty($role->role_name)) ?  $role->role_name : ''; 
   $role_description = (!empty($role->role_description)) ?  $role->role_description : ''; 
   $ePages = (!empty($role->page_permissions)) ?  json_decode($role->page_permissions) :  array(); 
  
?>
<div class="container" style="padding: 0px; padding-top: 35px;"> 
	<div class="card" style="padding: 15px; border:1px solid #000; " >	
		<form class="form-horizontal" id="ipform" method="post" enctype="multipart/form-data" action="<?= base_url('roles/submitted') ?>">
			<div class="form-group">
			  <label class="control-label col-sm-4" for="email">Role Name:</label>
			  <div class="col-sm-6">
				<input type="text" class="form-control" id="role_name" name="role_name" required placeholder="Enter Role Name" 
					value="<?php echo $role_name ?>" />
			  </div>
			</div>	 
			<div class="form-group">
			  <label class="control-label col-sm-4" for="email">Description: </label>
			  <div class="col-sm-6">
				 <textarea id="role_description" name="role_description" rows="2" cols="50"><?=$role_description ?></textarea>
			  </div>
			</div>
			<div class="form-group">
			  <label class="control-label col-sm-6" for="email">Select Page Permissions:</label>
			  <div class="col-sm-11">
				 <div class="container">
					<div class="just-padding" id="inner-right">				
						<div class="list-group list-group-root well">  
							<?php 
								foreach($pages as $page) {
									$pageId = $page['page_id'];
									$checked = in_array($pageId ,$ePages) ? 'checked' : '';
									$disIcon =  empty($page['submenu']) ? 'fa fa-caret-right' : 'fa fa-caret-down';
									echo '<a href="javascript:void(0);" class="list-group-item"> <i class="'.$disIcon .'"></i> &nbsp;<input type="checkbox" name="pages[]" value="'.$page['page_id'].'" '.$checked.' > '.$page['page_name'].'</a>';
									if(!empty($page['submenu'])) {
										$firstLevel = $page['submenu'];
										echo '<div class="list-group">';
										foreach($firstLevel as $firstRow) {
											$pageId = $firstRow['page_id'];
											$checked = in_array($pageId ,$ePages) ? 'checked' : '';
											$disIcon =  empty($firstRow['submenu']) ? 'fa fa-caret-right' : 'fa fa-caret-down';
											echo '<a href="javascript:void(0);" class="list-group-item"> <i class="'.$disIcon .'"></i> &nbsp; <input type="checkbox" name="pages[]" value="'.$firstRow['page_id'].'" '.$checked.' /> '.$firstRow['page_name'].'</a>';
											if(!empty($firstRow['submenu'])) {
												$secondLevel = $firstRow['submenu'];
												echo '<div class="list-group">';
												foreach($firstLevel as $secondRow) {		
													$pageId = $secondRow['page_id'];
													$checked = in_array($pageId ,$ePages) ? 'checked' : '';									
													echo '<a href="javascript:void(0);" class="list-group-item"> <i class="fa fa-caret-right"></i> &nbsp; <input type="checkbox" name="pages[]" value="'.$secondRow['page_id'].'" '.$checked .' /> '.$secondRow['page_name'].'</a>';
												}
												echo '</div>';		
											}	
										}
										echo '</div>';
									}		
								}
							 ?>
							<?php /*
							<a href="#" class="list-group-item">Item 1</a>
						  	<div class="list-group">    
								<a href="#" class="list-group-item">Item 1.1</a>
									<div class="list-group">
							  			<a href="#" class="list-group-item">Item 1.1.1</a>
							  			<a href="#" class="list-group-item">Item 1.1.2</a>
							  			<a href="#" class="list-group-item">Item 1.1.3</a>
									</div>
						  	</div>  
						  	<a href="#" class="list-group-item">Item 2</a>
						  		<div class="list-group">    
									<a href="#" class="list-group-item">Item 2.1</a>
									<div class="list-group">
								  		<a href="#" class="list-group-item">Item 2.1.1</a>
								  		<a href="#" class="list-group-item">Item 2.1.2</a>
								  		<a href="#" class="list-group-item">Item 2.1.3</a>
									</div>
						  		</div>
						  	*/ ?>	
						</div>  
					</div>
				 </div>
				<input type="hidden" name="role_id" value="<?=$role_id ?>" />
			  </div>
			</div>	
		  
			<input type="submit" value="Submit" id="formsubmit" style="display:none">
		</form> 
	</div>
</div>						
<style>
	.just-padding {
	  padding: 1px;
	  border: 1px solid #000;
	}

	.list-group.list-group-root {
	  padding: 0;
	  overflow: hidden;
	}

	.list-group.list-group-root .list-group {
	  margin-bottom: 0;
	}

	.list-group.list-group-root .list-group-item {
	  border-radius: 0;
	  border-width: 1px 0 0 0;
	}

	.list-group.list-group-root > .list-group-item:first-child {
	  border-top-width: 0;
	}

	.list-group.list-group-root > .list-group > .list-group-item {
	  padding-left: 40px;
	}

	.list-group.list-group-root > .list-group > .list-group > .list-group-item {
	  padding-left: 65px;
	}

	#inner-right {
	    height: 300px;
	    max-height: 300px;
	    overflow-y: scroll;
	    background: ivory;
	}
</style>	