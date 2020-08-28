
<div class="content-fluid pt-2">	 
	<div class="container-fluid breadcrumb-container lite-grey-gradient">
		<ul id="breadcrumb">
			<li><a href="/" title="Dashboard">Home &nbsp;</a></li>
			<li><a href="/" title="Dashboard">Dashboard&nbsp;</a></li>
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
												<th scope="col" width="5%"> Id</th>
												<th scope="col" > Name </th>
												<th scope="col" width="15%"> IP Start </th>
												<th scope="col" width="15%"> IP End </th>
												<th scope="col" width="15%"> Host Name </th>
												<th scope="col" width="8%"> status </th>
												<th scope="col" width="18%"> Action</th>
											</tr>
										</thead>
										<tbody>						 
											<?php foreach ($data as $index => $row): ?>
												<tr>
													<td><?= $row->ipID ?></td>
													<td><?= $row->name ?></td>
													<td><?= long2ip($row->ipStart)  ?></td>
													<td><?= long2ip($row->ipEnd) ?></td>
													<td><?= $row->hostname ?></td>
													<td><?= $row->vstatus ?></td>
													<td align="center">                                	
														<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="AddEditPopUp('<?= $row->ipID  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i> <span><strong>Edit</strong></span>   
														</button>	    							
														</button>
														<?php $option = ($row->status === '1' ) ? 'Disable' : 'Enable'; ?>
														<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="updatestatus('<?= $row->ipID  ?>')" > <i class="fa fa-exchange" aria-hidden="true" ></i><span><strong>  <?=$option ?></strong></span>   
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
