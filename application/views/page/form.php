<?php 
   $id = 	(!empty($page->page_id)) ?  $page->page_id : ''; 
   $page_name = (!empty($page->page_name)) ?  $page->page_name : ''; 
   $parent_page = (!empty($page->parent_page)) ?  $page->parent_page : ''; 
   $page_url_path = (!empty($page->page_url_path)) ?  $page->page_url_path : ''; 
   $menuStatus = (!empty($page->menuStatus)) ?  $page->menuStatus : '';  
?>
<div class="container" style="padding: 0px; padding-top: 35px;"> 
	<div class="card" style="padding: 15px; border:1px solid #000; " >	
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
				  <select name="parentPageId" id="parentPageId">	
				  		<option value="0"> Default Main Page </option> 	 		  		
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
	</div>
</div>	