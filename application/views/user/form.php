<?php 
   $alias = (!empty($user->alias)) ?  $user->alias : ''; 
   $fname = (!empty($user->firstname)) ?  $user->firstname : ''; 
   $lname = (!empty($user->lastname)) ?  $user->lastname : ''; 
   $username = (!empty($user->username)) ?  $user->username : ''; 
   $required = (!empty($user->username)) ? '' : 'required';

?>


<form class="form-horizontal" id="userform" method="post" enctype="multipart/form-data" action="<?= base_url('user/submitted') ?>">
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">Name Alias:</label>
	  <div class="col-sm-6">
		  <select name="alias" id="">
		  		<option value="Mr" <?php if($alias == 'MR') echo 'selected' ?> > Mr </option>
		  		<option value="Miss" <?php if($alias == 'Miss') echo 'selected' ?> > Miss </option>
		  </select>
	  </div>
	</div>
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">First Name:</label>
	  <div class="col-sm-6">
		<input type="text" class="form-control" id="firstname" name="firstname" required placeholder="Enter First Name" 
			value="<?php echo $fname ?>" />
	  </div>
	</div>
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">Last Name:</label>
	  <div class="col-sm-6">
		<input type="text" class="form-control" id="lastname" name= "lastname" value="<?php echo $lname ?>" required placeholder="Enter Last Name">
	  </div>
	</div>
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">Username:</label>
	  <div class="col-sm-6">
		<input type="text" class="form-control" id="username" name="username" value="<?php echo $username; ?>" required placeholder="Enter Username">
		<input type="hidden" name="old_username" value="<?php echo $username; ?>"
	  </div>
	</div>
	<div class="form-group">
	  <label class="control-label col-sm-4" for="pwd">Password:</label>
	  <div class="col-sm-6">
		<input type="password" class="form-control" <?= $required ?> id="pwd" name="password" placeholder="Enter password">
	  </div>
	</div>
	<div class="form-group">
	  <label class="control-label col-sm-4" for="pwd">Confim Password:</label>
	  <div class="col-sm-6">
		<input type="password" class="form-control" <?= $required ?> id="confirmpwd" name="confirmpassword" placeholder="Enter Confirm password">
	  </div>
	</div>
	 <input type="submit" value="Submit" id="formsubmit" style="display:none">
</form> 