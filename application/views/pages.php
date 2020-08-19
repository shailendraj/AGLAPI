
<div class="content-fluid pt-2">
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item active" aria-current="page">Home</li>
	    <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Manages Pages</li>
	  </ol>
	</nav>
	<h3 style="color: #007bff;"> <i class="fa fa-file-text" aria-hidden="true"></i> Manage Pages</h3>
	<div class="row pt-3">
		<div class="col-lg-12 pb-3">
			<div class="col-lg-12 pb-3">				 
				<button type="button" class="btn btn-success a-btn-slide-tex float-right btn-sm" onclick="AddEditPopUp(0)"> <i class="fa fa-plus" aria-hidden="true"></i><span><strong>Add</strong></span>   
    			</button>    			 
			</div>
		</div>	
		<div class="col-lg-12 ">
			<?php echo validation_errors(); ?>
			<?php echo $this->session->flashdata('message'); ?>
			<div id="wrap table-responsive">			          
				<table cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered">
					<thead class="table-primary">
						<tr>
							<th width="5%"> Sr. No</th>
							<th> Page Name </th>
							<th width="15%"> Page URL  </th>							
							<th width="15%"> Menu Status </th>
							<th width="8%"> status </th>
							<th width="18%"> Action</th>
						</tr>
					</thead>
					<tbody>						 
						<?php foreach ($data as $index => $row): ?>
							<tr>
								<td><?= $itemsPerPage *($currentPage-1)+ $index +1; ?></td>
								<td><?= $row->page_name ?></td>
								<td><?= $row->page_url_path ?></td>
								<td><?= $row->mstatus ?></td>
								<td><?= $row->vstatus ?></td>
								<td>                                	
									<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="AddEditPopUp('<?= $row->page_id  ?>')" > <i class="fa fa-edit" aria-hidden="true" ></i><span><strong>Edit</strong></span>   
									</button>	    							
									</button>
									<?php $option = ($row->status === '1' ) ? 'Disable' : 'Enable'; ?>
									<button type="button" class="btn btn-success a-btn-slide-text btn-sm" onclick="updatestatus('<?= $row->page_id  ?>')" > <i class="fa fa-exchange" aria-hidden="true" ></i><span><strong>  <?=$option ?></strong></span>   
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
