
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
		</div>	
		<div class="col-lg-12 ">
			<?php echo validation_errors(); ?>
			<?php echo $this->session->flashdata('message'); ?>
			<div id="wrap ">			          
				<table cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered">
					<thead>
						<tr>
							<th width="5%"> Sr. No</th>
							<th> Name </th>
							<th> Username</th>
							<th width="12%"> Created Date </th>
							<th width="8%"> status </th>
							<th width="20%"> Action</th>
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
	    							<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="AddEditPopUp('<?= $user->username  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i><span><strong> Set Roles</strong></span>   
	    							</button>
	    							<?php $option = ($user->status === '1' ) ? 'Disable' : 'Enable'; ?>
	    							<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="updatestatus('<?= $user->username  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i><span><strong>  <?=$option ?></strong></span>   
	    							</button>
                                </td>
                            </tr>
                        <?php endforeach; ?>							
					</tbody>
					<tfoot>
						<tr>
							<th colspan="5"> 
								<p><?php echo $links; ?></p>
							</th>							 
						</tr>
					</tfoot>
				</table>			
			</div>	
		</div>	
	</div>	
</div>	
