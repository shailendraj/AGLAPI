<?php 

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
	$srhName = (!empty($searchOpt['name'])) ? $searchOpt['name'] : '';
	$srhUsername = (!empty($searchOpt['username'])) ? $searchOpt['username'] : '';
	$srhStatus = (!empty($searchOpt['status'])) ? $searchOpt['status'] : '';    
} else {
	$srhName = '';
	$srhUsername =  '';
	$srhStatus = '';	
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
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
		<li class="breadcrumb-item active" aria-current="page">Home</li>
		<li class="breadcrumb-item"><a href="/">Dashboard</a></li>
		<li class="breadcrumb-item active" aria-current="page">Manages Users</li>
	  </ol>
	</nav>
	<h3 style="color: #007bff;"> <i class="fa fa-users" aria-hidden="true"></i> Manage Users</h3>
	<div class="row pt-3">
		<div class="col-lg-12 pb-3">				 
				<button type="button" class="btn btn-success a-btn-slide-tex float-right btn-sm" onclick="AddEditPopUp(0)"> <i class="fa fa-plus" aria-hidden="true"></i><span><strong>Add</strong></span>   
				</button> 
				&nbsp;
				<button type="button" class="btn btn-info a-btn-slide-tex btn-sm" onclick="window.location.href='<?= base_url() .'user' ?>' "> <i class="fa fa-refresh" aria-hidden="true"></i><span><strong> Reset filter & Sort</strong></span>   
				</button>    			 
		</div>	
		<div class="col-lg-12 ">
			<?php echo validation_errors(); ?>
			<?php echo $this->session->flashdata('message'); ?>
			<div id="wrap table-responsive">			          
				<table cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered">
					<thead class="table-primary">
						<tr>
							<th width="8%"> Sr. No</th>
							<th> 
								Name 
								<div class="btn-group">								 
								  <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
								   &nbsp;<i class="fa fa-search" aria-hidden="true"></i>
								  </a>
								  &nbsp;&nbsp;<span id="selectednameSearch">
								  	<?php 
										if(!empty($srhName)) {
											echo $srhName .'&nbsp<a href="javascript:void(0)" onclick="remove_serachopt(\'name\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>' ;
										}
									?>
								  </span>
								  <div class="dropdown-menu" style="width: 276px;">
										<div class="container">
											<form class="form-horizontal">
												<div class="form-group row">
													<label class="col-sm-3 col-form-label" for="exampleDropdownFormEmail1"> Name: </label>
													<div class="col-sm-9">
													<input type="text" class="form-control" id="name" name="field_name" placeholder="Enter Name">
													</div>
												</div>
												<button type="button" class="btn btn-primary btn-sm" onclick="search_opt('name')">  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
											</form>
										</div>
								  </div>								  
								</div>
								<input type="hidden" name="search[]" id="nameSearch" value="<?= (!empty($srhName)) ? 'name:'.$srhName : ''; ?>">
								<?php 
									$sort = 'DESC';
									$css = 'down';
									if(!empty($sortOpt['name'])) {
										if(strtoupper($sortOpt['name']) == 'DESC') {
											$sort = 'ASC';
											$css = 'down';
										} else {
											$sort = 'DESC';
											$css = 'up';
										}	
									}
								?>	
								<a href="<?= $currentUrl.'&sort=name:'.$sort ?>" class="float-right"> 
									<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
							    </a>
							</th>
							<th width="16%">
								Username
								<div class="btn-group">								 
								  <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
								   &nbsp;<i class="fa fa-search" aria-hidden="true"></i>
								  </a>
								  &nbsp;&nbsp;<span id="selectedusernameSearch">
									<?php 
										if(!empty($srhUsername)) {
											echo $srhUsername .'&nbsp;<a href="javascript:void(0)" onclick="remove_serachopt(\'username\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>';
										}
									?>
								  </span>
								  <div class="dropdown-menu" style="width: 376px;">
										<div class="container">
											<form class="form-horizontal">
												<div class="form-group row">
													<label class="col-sm-3 col-form-label" for="Name"> Username: </label>
													<div class="col-sm-9">
													<input type="text" class="form-control" id="username" name="field_username" placeholder="Enter Username">
													</div>
												</div>
												<button type="button" class="btn btn-primary btn-sm" onclick="search_opt('username')">  
													<i class="fa fa-search" aria-hidden="true"></i> Search
												</button>
											</form>
										</div>
								  </div>								  
								</div>
								<input type="hidden" name="search[]" id="usernameSearch" value="<?= (!empty($srhUsername)) ? 'username:'.$srhUsername : ''; ?>"> 
								<?php 
									$sort = 'DESC';
									$css = 'down';
									if(!empty($sortOpt['username'])) {
										if(strtoupper($sortOpt['username']) == 'DESC') {
											$sort = 'ASC';
											$css = 'down';
										} else {
											$sort = 'DESC';
											$css = 'up';
										}	
									}
								?>
								<a href="<?= $currentUrl.'&sort=username:'.$sort ?>" class="float-right"> 
									<i class="fa fa-arrow-<?=$css?>" aria-hidden="true"></i>
							    </a>
							</th>
							<th width="16%"> Created Date </th>
							<th width="8%"> 
								status 
								<div class="btn-group">								 
								  <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
								   &nbsp;<i class="fa fa-search" aria-hidden="true"></i>
								  </a>
								  &nbsp;&nbsp;<span id="selectedstatusSearch">
									<?php 
										if(!empty($srhStatus)) {
											echo $srhStatus .'&nbsp;<a href="javascript:void(0)" onclick="remove_serachopt(\'status\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>';
										}
									?>
								  </span>
								  <div class="dropdown-menu" style="width: 230px;">
										<div class="container">
											<form class="form-horizontal">
												<div class="form-group row">
													<label class="col-sm-3 col-form-label" for="Name"> Status: </label>
													<div class="col-sm-9">
														<div class="input-group">
														  	<div class="input-group-prepend">
															    <div class="input-group-text">
															      <input type="radio" name="status1" value="1" onclick="$('#status').val('Enable'); return 0; " >
															    </div>
														  	</div>
														   	 Enable
														</div>  	
														<div class="input-group">
														  	<div class="input-group-prepend">
															    <div class="input-group-text">
															      <input type="radio" name="status1" value="0" onclick="$('#status').val('Disable');" >
															    </div>
														  	</div>
														  	 Disable
														</div>
													</div>
												</div>
												<input type="hidden" id="status" name="status" />
												<button type="button" class="btn btn-primary btn-sm" onclick="search_opt('status')">  
													<i class="fa fa-search" aria-hidden="true"></i> Search
												</button>
											</form>
										</div>
								  </div>								  
								</div>
								<input type="hidden" name="search[]" id="statusSearch" value="<?= (!empty($srhStatus)) ? 'status:'.$srhStatus : ''; ?>"> 
								<?php 
									$sort = 'DESC';
									$css = 'down';
									if(!empty($sortOpt['status'])) {
										if(strtoupper($sortOpt['status']) == 'DESC') {
											$sort = 'ASC';
											$css = 'down';
										} else {
											$sort = 'DESC';
											$css = 'up';
										}	
									}
								?>
								<a href="<?= $currentUrl.'&sort=status:'.$sort ?>" class="float-right"> 
									<i class="fa fa-arrow-<?=$css?>" aria-hidden="true"></i>
							    </a>
							</th>
							<th width="18%"> Action</th>
						</tr>
					</thead>
					<tbody>						 
						<?php foreach ($users as $index => $user): ?>
							<tr>
								<td><?= $itemsPerPage *($currentPage-1)+ $index +1; ?></td>
								<td><?= $user->firstname . " " . $user->lastname ?></td>
								<td><?= $user->username  ?></td>
								<td><?= $user->created ?></td>
								<td><?= $user->vstatus ?></td>
								<td>                                	
									<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="AddEditPopUp('<?= $user->username  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i><span><strong>Edit</strong></span>   
									</button>	    							
									<?php $option = ($user->status === '1' ) ? 'Disable' : 'Enable'; ?>
									<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="updatestatus('<?= $user->username  ?>')" > <i class="fa fa-exchange" aria-hidden="true" ></i><span><strong>  <?=$option ?></strong></span>   
									</button>
								</td>
							</tr>
						<?php endforeach; ?>							
					</tbody>
					<tfoot>
						<tr class="table-secondary"  >
							<th colspan="6"style="padding:0px 5px;"> 
								<p><?php echo $links; ?></p>
							</th>							 
						</tr>
					</tfoot>
				</table>			
			</div>	
		</div>	
	</div>	
</div>	
