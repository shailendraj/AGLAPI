<?php 
   $id = 	(!empty($page->page_id)) ?  $page->page_id : ''; 
   $page_name = (!empty($page->page_name)) ?  $page->page_name : ''; 
   $parent_page = (!empty($page->parent_page)) ?  $page->parent_page : ''; 
   $page_url_path = (!empty($user->page_url_path)) ?  $user->page_url_path : ''; 
   $menuStatus = (!empty($user->menuStatus)) ?  $user->menuStatus : '';  
?>
<form class="form-horizontal" id="userform" method="post" enctype="multipart/form-data" action="<?= base_url('page/submitted') ?>">
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">Page Name:</label>
	  <div class="col-sm-6">
		<input type="text" class="form-control" id="page_name" name="page_name" required placeholder="Enter Page Name" 
			value="<?php echo $page_name ?>" />
	  </div>
	</div>	 
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">Parent Page:</label>
	  <div class="col-sm-6">
		  <select name="parent_page" id="parent_page">		  		 
		  </select>
	  </div>
	</div>
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">Page URL:</label>
	  <div class="col-sm-6">
		<input type="text" class="form-control" id="pageUrlPath" name="page_url_path" value="<?= $page_url_path ?>" required placeholder="Enter Page URL">
		<input type="hidden" name="page_id" value="<?=$id ?>" />
	  </div>
	</div>
	<div class="form-group">
	  <label class="control-label col-sm-4" for="email">Main Menu Status:</label>
	  <div class="col-sm-6">
		  <select name="menuStatus" id="menuStatus">		
		  		<option value="1"> YES </option>
		  		<option value="0"> NO </option>  		 
		  </select>
	  </div>
	</div>	 
	<input type="submit" value="Submit" id="formsubmit" style="display:none">
</form> 