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
	$srhPageName= (!empty($searchOpt['page_name'])) ? $searchOpt['page_name'] : '';	 
	$srhPageUrlPath= (!empty($searchOpt['page_url_path'])) ? $searchOpt['page_url_path'] : '';	 
} else {
	$srhPageName = '';	 
	$srhPageUrlPath= '';
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
			<li><a href="javascript:void(0)" title="Dashboard">Manages Pages </a></li>
		</ul>
		<div class="clearfix"></div>
	</div>		
	<div class="container-fluid pt-2" style="padding:0px;">
		<div class="card block-border lite-grey-gradient">
			<div class="card-body card-body-extra">
				<fieldset>    	
					<legend  class="w-auto"><i class="fa fa-file-text" aria-hidden="true"></i> Manage Pages</legend>				
					<div class="container-fluid pt-2 main-card-block lite-grey-gradient main-table-block">	
						<div class="row">
							<div class="col-lg-12 pb-2">										
								<button type="button" class="btn btn-success a-btn-slide-tex float-right btn-sm" onclick="AddEditPopUp(0)"> <i class="fa fa-plus" aria-hidden="true"></i> <span><strong>Add</strong></span></button> 
								<button type="button" class="btn btn-info a-btn-slide-tex btn-sm" onclick="window.location.href='<?= base_url() .'pages' ?>' "> <i class="fa fa-refresh" aria-hidden="true"></i><span><strong> Reset filter & Sort</strong></span>   
								</button>
							</div>	
							<div class="col-lg-12 ">
								<?php echo validation_errors(); ?>
								<?php echo $this->session->flashdata('message'); ?>
								<div id="wrap table-responsive">			          
									<table cellpadding="0" cellspacing="0" border="0" class="datatable table table-sm table-striped table-bordered table-hover">
										<thead class="table-primary">
											<tr>
												<th width="5%"> S.N </th>
												<th> 
													Page Name 
													<div class="btn-group">								 
													<a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
													   &nbsp;<i class="fa fa-search" aria-hidden="true"></i>
													  </a>
													  &nbsp;&nbsp;<span id="selectedpage_nameSearch">
														<?php 
															if(!empty($srhPageName)) {
																echo $srhPageName .'&nbsp<a href="javascript:void(0)" onclick="remove_serachopt(\'page_name\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>' ;
															}
														?>
													  </span>
													  <div class="dropdown-menu" style="width: 276px;">
															<div class="container">
																<form class="form-horizontal">
																	<div class="form-group row">
																		<label class="col-sm-4 col-form-label label-small" for="exampleDropdownFormEmail1"> Name: </label>
																		<div class="col-sm-8">
																		<input type="text" class="form-control form-control-sm" id="page_name" name="field_name" placeholder="Enter Name">
																		</div>
																	</div>
																	<button type="button" class="btn btn-info btn-sm" onclick="search_opt('page_name')">  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
																</form>
															</div>
													  </div>								  
													</div>
													<input type="hidden" name="search[]" id="page_nameSearch" value="<?= (!empty($srhPageName)) ? 'page_name:'.$srhPageName : ''; ?>">
													<?php 
														$sort = 'DESC';
														$css = 'down';
														if(!empty($sortOpt['page_name'])) {
															if(strtoupper($sortOpt['page_name']) == 'DESC') {
																$sort = 'ASC';
																$css = 'down';
															} else {
																$sort = 'DESC';
																$css = 'up';
															}	
														}
													?>	
													<a href="<?= $currentUrl.'&sort=page_name:'.$sort ?>" class="float-right"> 
														<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
													</a>
												</th>
												<th width="15%"> 
													Page URL  
													<div class="btn-group">								 
													<a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
													   &nbsp;<i class="fa fa-search" aria-hidden="true"></i>
													  </a>
													  &nbsp;&nbsp;<span id="selectedpage_url_pathSearch">
														<?php 
															if(!empty($srhPageUrlPath)) {
																echo $srhPageUrlPath .'&nbsp<a href="javascript:void(0)" onclick="remove_serachopt(\'page_url_path\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>' ;
															}
														?>
													  </span>
													  <div class="dropdown-menu" style="width: 276px;">
															<div class="container">
																<form class="form-horizontal">
																	<div class="form-group row">
																		<label class="col-sm-4 col-form-label label-small" for="exampleDropdownFormEmail1"> URI: </label>
																		<div class="col-sm-8">
																		<input type="text" class="form-control form-control-sm" id="page_url_path" name="field_name" placeholder="Enter Name">
																		</div>
																	</div>
																	<button type="button" class="btn btn-info btn-sm" onclick="search_opt('page_url_path')">  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
																</form>
															</div>
													  </div>								  
													</div>
													<input type="hidden" name="search[]" id="page_url_pathSearch" value="<?= (!empty($srhPageUrlPath)) ? 'page_url_path:'.$srhPageUrlPath : ''; ?>">
													<?php 
														$sort = 'DESC';
														$css = 'down';
														if(!empty($sortOpt['page_url_path'])) {
															if(strtoupper($sortOpt['page_url_path']) == 'DESC') {
																$sort = 'ASC';
																$css = 'down';
															} else {
																$sort = 'DESC';
																$css = 'up';
															}	
														}
													?>	
													<a href="<?= $currentUrl.'&sort=page_url_path:'.$sort ?>" class="float-right"> 
														<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
													</a>
												</th>							
												<th width="15%"> Menu Status </th>
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
													<td class="align-middle"><?= $row->page_name ?></td>
													<td class="align-middle"><?= $row->page_url_path ?></td>
													<td class="align-middle"><?= $row->mstatus ?></td>
													<td class="align-middle"><?= $row->vstatus ?></td>
													<td align="center" class="align-middle">                                	
														<button type="button" class="btn btn-info a-btn-slide-text btn-sm" onclick="AddEditPopUp('<?= $row->page_id  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i> <span><strong>Edit</strong></span>   
														</button>
														<?php $option = ($row->status === '1' ) ? 'Disable' : 'Enable'; ?>
														<button type="button" class="btn btn-info a-btn-slide-text btn-sm" onclick="updatestatus('<?= $row->page_id  ?>')" > <i class="fa fa-exchange" aria-hidden="true" ></i><span><strong>  <?=$option ?></strong></span>   
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
												<th colspan="6"> 
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
