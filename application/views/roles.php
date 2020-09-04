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
	$srhName = (!empty($searchOpt['role_name'])) ? $searchOpt['role_name'] : '';	 
} else {
	$srhName = '';	 
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
	<div class="container-fluid breadcrumb-container lite-grey-gradient">
		<ul id="breadcrumb">
			<li><a href="/" title="Dashboard">Home &nbsp;</a></li>			
			<li><a href="javascript:void(0)" title="Dashboard">Manages Roles </a></li>
		</ul>
		<div class="clearfix"></div>
	</div>	
	<div class="container-fluid pt-2" style="padding:0px;">
		<div class="card block-border lite-grey-gradient">
			<div class="card-body card-body-extra">
				<fieldset>    	
					<legend  class="w-auto"><i class="fa fa-universal-access" aria-hidden="true"></i> Manage Roles & Permissions</legend>				
					<div class="container-fluid pt-2 main-card-block lite-grey-gradient main-table-block">	
						<div class="row">
							<div class="col-lg-12 pb-2">	
									<button type="button" class="btn btn-success a-btn-slide-tex float-right btn-sm" onclick="AddEditPopUp(0)"> <i class="fa fa-plus" aria-hidden="true"></i> <span><strong>Add</strong></span>   
									</button>
									<button type="button" class="btn btn-info a-btn-slide-tex btn-sm" onclick="window.location.href='<?= base_url() .'roles' ?>' "> <i class="fa fa-refresh" aria-hidden="true"></i><span><strong> Reset filter & Sort</strong></span>   
									</button>
							</div>	
							 <div class="col-lg-12 ">
								<?php echo validation_errors(); ?>
								<?php echo $this->session->flashdata('message'); ?>
								<div id="wrap table-responsive">			          
									<table cellpadding="0" cellspacing="0" border="0" class="datatable table table-sm table-striped table-bordered table-hover">
										<thead class="table-primary">
											<tr>
												<th width="5%"> S.N.</th>
												<th>  Role Name 
													<div class="btn-group">								 
														  <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
														   &nbsp;<i class="fa fa-search" aria-hidden="true"></i>
														  </a>
														  &nbsp;&nbsp;<span id="selectedrole_nameSearch">
															<?php 
																if(!empty($srhName)) {
																	echo $srhName .'&nbsp<a href="javascript:void(0)" onclick="remove_serachopt(\'role_name\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>' ;
																}
															?>
														  </span>
														  <div class="dropdown-menu" style="width: 276px;">
																<div class="container">
																	<form class="form-horizontal">
																		<div class="form-group row">
																			<label class="col-sm-4 col-form-label label-small" for="exampleDropdownFormEmail1"> Name: </label>
																			<div class="col-sm-8">
																			<input type="text" class="form-control form-control-sm" id="role_name" name="field_name" placeholder="Enter Name">
																			</div>
																		</div>
																		<button type="button" class="btn btn-info btn-sm" onclick="search_opt('role_name')">  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
																	</form>
																</div>
														  </div>								  
														</div>
														<input type="hidden" name="search[]" id="role_nameSearch" value="<?= (!empty($srhName)) ? 'role_name:'.$srhName : ''; ?>">
														<?php 
															$sort = 'DESC';
															$css = 'down';
															if(!empty($sortOpt['role_name'])) {
																if(strtoupper($sortOpt['role_name']) == 'DESC') {
																	$sort = 'ASC';
																	$css = 'down';
																} else {
																	$sort = 'DESC';
																	$css = 'up';
																}	
															}
														?>	
														<a href="<?= $currentUrl.'&sort=role_name:'.$sort ?>" class="float-right"> 
															<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
														</a>
												</th>							 
												<th width="8%"> 
													status 
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
											<?php foreach ($data as $index => $row): ?>
												<tr>
													<td class="align-middle"><?= ($currentPage + 1)+ $index; ?></td>
													<td class="align-middle"><?= $row->role_name ?></td>							
													<td class="align-middle"><?= $row->vstatus ?></td>
													<td align="center" class="align-middle">                                	
														<button type="button" class="btn btn-info a-btn-slide-text btn-sm" onclick="AddEditPopUp('<?= $row->role_id  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i> <span><strong>Edit</strong></span>   
														</button>	    							
														<?php $option = ($row->status === '1' ) ? 'Disable' : 'Enable'; ?>
														<button type="button" class="btn btn-info a-btn-slide-text btn-sm" onclick="updatestatus('<?= $row->role_id  ?>')" > <i class="fa fa-exchange" aria-hidden="true" ></i><span><strong>  <?=$option ?></strong></span>   
														</button>
													</td>
												</tr>
											<?php endforeach; ?>
											<?php 
												if(count($data) === 0) {
													echo '<tr><td colspan="7"> Record not found </td></tr>';
												}
											?>							
										</tbody>
										<tfoot class="table-secondary">
											<tr>
												<th colspan="4"> 
													<p><?php echo $links; ?></p>
												</th>							 
											</tr>
										</tfoot>
									</table>			
								</div>	
							</div>	
						</div>	
					</div>
				</fieldset>
			</div>
		</div>
	</div>					
</div>	
