
<div class="content-fluid pt-2">
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item active" aria-current="page">Home</li>
	    <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Manages IP access</li>
	  </ol>
	</nav>
	<h3 style="color: #007bff;"> <i class="fa fa-blind " aria-hidden="true"></i> Manages IP access</h3>
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
							<th width="5%"> Id</th>
							<th> Name </th>
							<th width="15%"> IP Start </th>
							<th width="15%"> IP End </th>
							<th width="15%"> Host Name </th>
							<th width="8%"> status </th>
							<th width="20%"> Action</th>
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
                                <td>                                	
	                                <button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="AddEditPopUp('<?= $row->ipID  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i><span><strong>Edit</strong></span>   
	    							</button>	    							
	    							</button>
	    							<?php $option = ($row->status === '1' ) ? 'Disable' : 'Enable'; ?>
	    							<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="updatestatus('<?= $row->ipID  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i><span><strong>  <?=$option ?></strong></span>   
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
					<tfoot>
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
