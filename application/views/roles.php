<div class="content-fluid pt-2">
	<div class="container-fluid breadcrumb-container lite-grey-gradient">
		<ul id="breadcrumb">
			<li><a href="/" title="Dashboard">Home &nbsp;</a></li>
			<li><a href="/" title="Dashboard">Dashboard&nbsp;</a></li>
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
									<button type="button" class="btn btn-success a-btn-slide-tex float-right btn-sm" onclick="AddEditPopUp(0)"> <i class="fa fa-plus" aria-hidden="true"></i><span><strong>Add</strong></span>   
					    			</button>
							</div>	
							 <div class="col-lg-12 ">
								<?php echo validation_errors(); ?>
								<?php echo $this->session->flashdata('message'); ?>
								<div id="wrap table-responsive">			          
									<table cellpadding="0" cellspacing="0" border="0" class="datatable table table-sm table-striped table-bordered table-hover">
										<thead class="table-primary">
											<tr>
												<th width="5%"> Sr. No</th>
												<th>  Role Name </th>							 
												<th width="8%"> status </th>
												<th width="18%"> Action</th>
											</tr>
										</thead>
										<tbody>						 
											<?php foreach ($data as $index => $row): ?>
												<tr>
													<td><?= ($currentPage + 1)+ $index; ?></td>
													<td><?= $row->role_name ?></td>								
													<td><?= $row->vstatus ?></td>
													<td align="center">                                	
														<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="AddEditPopUp('<?= $row->role_id  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i> <span><strong>Edit</strong></span>   
														</button>	    							
														<?php $option = ($row->status === '1' ) ? 'Disable' : 'Enable'; ?>
														<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="updatestatus('<?= $row->role_id  ?>')" > <i class="fa fa-exchange" aria-hidden="true" ></i><span><strong>  <?=$option ?></strong></span>   
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
