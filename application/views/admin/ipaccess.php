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
	$srhIpStart = (!empty($searchOpt['ipStart'])) ? $searchOpt['ipStart'] : '';	 
	$srhIpEnd = (!empty($searchOpt['ipEnd'])) ? $searchOpt['ipEnd'] : '';	 
	$srhHostName = (!empty($searchOpt['hostname'])) ? $searchOpt['hostname'] : '';	 
} else {
	$srhName = '';	
	$srhIpStart = ''; 
	$srhIpEnd = '';
	$srhHostName = '';
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
			<li><a href="javascript:void(0)" title="Dashboard">Manages IP access </a></li>
		</ul>
		<div class="clearfix"></div>
	</div>
	<div class="container-fluid pt-2" style="padding:0px;">
		<div class="card block-border lite-grey-gradient">
			<div class="card-body card-body-extra">
				<fieldset>    	
					<legend class="w-auto"><i class="fa fa-blind " aria-hidden="true"></i> Manages IP access</legend>				
					<div class="container-fluid pt-2 main-card-block lite-grey-gradient main-table-block">	
						<div class="row">
							<div class="col-lg-12 pb-2">				 
									<button type="button" class="btn btn-success a-btn-slide-tex float-right btn-sm" onclick="AddEditPopUp(0)"> <i class="fa fa-plus" aria-hidden="true"></i> <span><strong>Add</strong></span>   
									</button>    
									<button type="button" class="btn btn-info a-btn-slide-tex btn-sm" onclick="window.location.href='<?= base_url() .'ipaccess' ?>' "> <i class="fa fa-refresh" aria-hidden="true"></i><span><strong> Reset filter & Sort</strong></span>   
								</button>			 
							</div>	
							<div class="col-lg-12 ">
								<?php echo validation_errors(); ?>
								<?php echo $this->session->flashdata('message'); ?>
								<div id="wrap table-responsive">			          
									<table cellpadding="0" cellspacing="0" border="0" class="datatable table table-sm table-striped table-bordered table-hover">
										<thead class="table-primary">
											<tr>
												<th scope="col" width="5%"> Id</th>
												<th scope="col" > 
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
																		<label class="col-sm-4 col-form-label label-small" for="exampleDropdownFormEmail1"> Name: </label>
																		<div class="col-sm-8">
																		<input type="text" class="form-control form-control-sm" id="name" name="field_name" placeholder="Enter Name">
																		</div>
																	</div>
																	<button type="button" class="btn btn-info btn-sm" onclick="search_opt('name')">  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
																</form>
															</div>
													  </div>								  
													</div>
													<input type="hidden" name="search[]" id="nameSearch" value="<?= (!empty($srheName)) ? 'name:'.$srhName : ''; ?>">
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
												<th scope="col" width="15%"> 
													IP Start 
													<div class="btn-group">								 
													<a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
													   &nbsp;<i class="fa fa-search" aria-hidden="true"></i>
													  </a>
													  &nbsp;&nbsp;<span id="selectedipStartSearch">
														<?php 
															if(!empty($srhIpStart)) {
																echo $srhIpStart .'&nbsp<a href="javascript:void(0)" onclick="remove_serachopt(\'ipStart\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>' ;
															}
														?>
													  </span>
													  <div class="dropdown-menu" style="width: 276px;">
															<div class="container">
																<form class="form-horizontal">
																	<div class="form-group row">
																		<label class="col-sm-4 col-form-label label-small" for="exampleDropdownFormEmail1"> IP start: </label>
																		<div class="col-sm-8">
																		<input type="text" class="form-control form-control-sm" id="ipStart" name="field_name" placeholder="Enter Name">
																		</div>
																	</div>
																	<button type="button" class="btn btn-info btn-sm" onclick="search_opt('ipStart')">  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
																</form>
															</div>
													  </div>								  
													</div>
													<input type="hidden" name="search[]" id="ipStartSearch" value="<?= (!empty($srhIpStart)) ? 'ipStart:'.$srhIpStart : ''; ?>">
													<?php 
														$sort = 'DESC';
														$css = 'down';
														if(!empty($sortOpt['ipStart'])) {
															if(strtoupper($sortOpt['ipStart']) == 'DESC') {
																$sort = 'ASC';
																$css = 'down';
															} else {
																$sort = 'DESC';
																$css = 'up';
															}	
														}
													?>	
													<a href="<?= $currentUrl.'&sort=ipStart:'.$sort ?>" class="float-right"> 
														<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
													</a>
												</th>
												<th scope="col" width="15%"> 
													IP End 
													<div class="btn-group">								 
													<a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
													   &nbsp;<i class="fa fa-search" aria-hidden="true"></i>
													  </a>
													  &nbsp;&nbsp;<span id="selectedipEndSearch">
														<?php 
															if(!empty($srhIpEnd)) {
																echo $srhIpEnd .'&nbsp<a href="javascript:void(0)" onclick="remove_serachopt(\'ipEnd\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>' ;
															}
														?>
													  </span>
													  <div class="dropdown-menu" style="width: 276px;">
															<div class="container">
																<form class="form-horizontal">
																	<div class="form-group row">
																		<label class="col-sm-4 col-form-label label-small" for="exampleDropdownFormEmail1"> Name: </label>
																		<div class="col-sm-8">
																		<input type="text" class="form-control form-control-sm" id="ipEnd" name="field_name" placeholder="Enter Name">
																		</div>
																	</div>
																	<button type="button" class="btn btn-info btn-sm" onclick="search_opt('ipEnd')">  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
																</form>
															</div>
													  </div>								  
													</div>
													<input type="hidden" name="search[]" id="ipEndSearch" value="<?= (!empty($srhIpEnd)) ? 'page_name:'.$srhIpEnd : ''; ?>">
													<?php 
														$sort = 'DESC';
														$css = 'down';
														if(!empty($sortOpt['ipEnd'])) {
															if(strtoupper($sortOpt['ipEnd']) == 'DESC') {
																$sort = 'ASC';
																$css = 'down';
															} else {
																$sort = 'DESC';
																$css = 'up';
															}	
														}
													?>	
													<a href="<?= $currentUrl.'&sort=ipEnd:'.$sort ?>" class="float-right"> 
														<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
													</a>
												</th>
												<th scope="col" width="15%"> 
													Host Name 
													<div class="btn-group">								 
													<a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
													   &nbsp;<i class="fa fa-search" aria-hidden="true"></i>
													  </a>
													  &nbsp;&nbsp;<span id="selectedhostnameSearch">
														<?php 
															if(!empty($srhHostName)) {
																echo $srhHostName .'&nbsp<a href="javascript:void(0)" onclick="remove_serachopt(\'hostname\')" ><i class="fa fa-trash" aria-hidden="true"></i></a>' ;
															}
														?>
													  </span>
													  <div class="dropdown-menu" style="width: 276px;">
															<div class="container">
																<form class="form-horizontal">
																	<div class="form-group row">
																		<label class="col-sm-4 col-form-label label-small" for="exampleDropdownFormEmail1"> Name: </label>
																		<div class="col-sm-8">
																		<input type="text" class="form-control form-control-sm" id="hostname" name="field_name" placeholder="Enter Name">
																		</div>
																	</div>
																	<button type="button" class="btn btn-info btn-sm" onclick="search_opt('hostname')">  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
																</form>
															</div>
													  </div>								  
													</div>
													<input type="hidden" name="search[]" id="hostnameSearch" value="<?= (!empty($srhHostName)) ? 'hostname:'.$srhHostName : ''; ?>">
													<?php 
														$sort = 'DESC';
														$css = 'down';
														if(!empty($sortOpt['hostname'])) {
															if(strtoupper($sortOpt['hostname']) == 'DESC') {
																$sort = 'ASC';
																$css = 'down';
															} else {
																$sort = 'DESC';
																$css = 'up';
															}	
														}
													?>	
													<a href="<?= $currentUrl.'&sort=hostname:'.$sort ?>" class="float-right"> 
														<i class="fa fa-arrow-<?=$css ?>" aria-hidden="true"></i>
													</a>
												</th>
												<th scope="col" width="8%"> 
													Status 
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
												<th scope="col" width="18%"> Action</th>
											</tr>
										</thead>
										<tbody>						 
											<?php foreach ($data as $index => $row): ?>
												<tr>
													<td class="align-middle" ><?= $row->ipID ?></td>
													<td class="align-middle" ><?= $row->name ?></td>
													<td class="align-middle" ><?= long2ip($row->ipStart)  ?></td>
													<td class="align-middle" ><?= long2ip($row->ipEnd) ?></td>
													<td class="align-middle" ><?= $row->hostname ?></td>
													<td class="align-middle" ><?= $row->vstatus ?></td>
													<td align="center">                                	
														<button type="button" class="btn btn-info a-btn-slide-text btn-sm" onclick="AddEditPopUp('<?= $row->ipID  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i> <span><strong>Edit</strong></span>   
														</button>	    							
														</button>
														<?php $option = ($row->status === '1' ) ? 'Disable' : 'Enable'; ?>
														<button type="button" class="btn btn-info a-btn-slide-text btn-sm" onclick="updatestatus('<?= $row->ipID  ?>')" > <i class="fa fa-exchange" aria-hidden="true" ></i><span><strong>  <?=$option ?></strong></span>   
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
												<th colspan="7"> 
													<p><?php echo $links; ?></p>
												</th>							 
											</tr>
										</tfoot>
									</table>			
								</div>	
							</div>	
						</div>	
					</div>
				</div>
			</div>
		</div>
</div>	
