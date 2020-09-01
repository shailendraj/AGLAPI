<?php 
   $alias = (!empty($user->alias)) ?  $user->alias : ''; 
   $fname = (!empty($user->firstname)) ?  $user->firstname : ''; 
   $lname = (!empty($user->lastname)) ?  $user->lastname : ''; 
   $username = (!empty($user->username)) ?  $user->username : ''; 
   $required = (!empty($user->username)) ? '' : 'required';
   $eroles = (!empty($user->roles)) ?  json_decode($user->roles) : array('2');
?>

<div class="container" style="padding: 0px; padding-top: 35px;"> 
	<div class="card" style="padding: 15px; border:1px solid #000; " >	
		<form class="form-horizontal" id="userform" method="post" enctype="multipart/form-data" action="<?= base_url('user/submitted') ?>">
			<div class="form-group row">
			  <label class="col-sm-3 col-form-label" for="email">Name Alias:</label>
			  <div class="col-sm-9">
				  <select name="alias" id="">
				  		<option value="Mr" <?php if($alias == 'MR') echo 'selected' ?> > Mr </option>
				  		<option value="Miss" <?php if($alias == 'Miss') echo 'selected' ?> > Miss </option>
				  </select>
			  </div>
			</div>
			<div class="form-group row">
			  <label class="col-sm-3 col-form-label" for="email">First Name:</label>
			  <div class="col-sm-9">
				<input type="text" class="form-control" id="firstname" name="firstname" required placeholder="Enter First Name" 
					value="<?php echo $fname ?>" />
			  </div>
			</div>
			<div class="form-group row">
			  <label class="col-sm-3 col-form-label" for="email">Last Name:</label>
			  <div class="col-sm-9">
				<input type="text" class="form-control" id="lastname" name= "lastname" value="<?php echo $lname ?>" required placeholder="Enter Last Name">
			  </div>
			</div>
			<div class="form-group row">
			  <label class="col-sm-3 col-form-label" for="email">Username:</label>
			  <div class="col-sm-9">
					<input type="text" class="form-control" id="username" name="username" value="<?php echo $username; ?>" required placeholder="Enter Username">
					<input type="hidden" name="old_username" value="<?php echo $username; ?>" />		
			  </div>
			</div>
			<div class="form-group row">
			  <label class="col-sm-3 col-form-label" for="pwd">Password:</label>
			  <div class="col-sm-9">
				<input type="password" class="form-control" <?= $required ?> id="pwd" name="password" placeholder="Enter password">
			  </div>
			</div>
			<div class="form-group row">
			  <label class="col-sm-3 col-form-label" for="pwd">Confim Password:</label>
			  <div class="col-sm-9">
				<input type="password" class="form-control" <?= $required ?> id="confirmpwd" name="confirmpassword" placeholder="Enter Confirm password">
			  </div>
			</div>
			<div class="form-group row">
			  <label class="col-sm-3 col-form-label" for="pwd">Select Roles:</label>
			  <div class="col-sm-9">		  
					<div class="just-padding" id="inner-right">				
						<div class="list-group list-group-root well">  
							<?php 
								foreach($roles as $key=> $role) {
									$readOnly = '';
									$roleId = $role->role_id;
									$checked = in_array($roleId ,$eroles) ? 'checked' : '';
									if($key == 0) {
									 	$readOnly = 'readOnly';							 
									 	$checked = 'checked';
									} 
									echo '<a href="javascript:void(0);" class="list-group-item"> <input type="checkbox" name="roles[]" value="'.$roleId.'" '.$checked.'  '.$readOnly.'   > '. $role->role_name.'</a>';
								}
							?>
						</div>
					</div>		 		
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

	#inner-right {
	    height: 300px;
	    max-height: 200px;
	    overflow-y: scroll;
	    background: ivory;
	}
</style>