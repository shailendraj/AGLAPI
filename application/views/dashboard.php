<div class="content-fluid pt-2"> 
	<div class="container-fluid breadcrumb-container lite-grey-gradient">
		<ul id="breadcrumb">
			<li><a href="/" title="Home">Home</a></li>
			<li><a href="/" title="Dashboard">Dashboard</a></li>
		</ul>
		<div class="clearfix"></div>
	</div>
	<div class="container-fluid pt-2" style="padding:0px;">
		<div class="card block-border lite-grey-gradient">
  			<div class="card-body card-body-extra">
  				<fieldset>    	
					<legend class="w-auto">Dashboard</legend>					
					<div class="container-fluid pt-3 pb-2 main-card-block">						
							<?php 
							  if(count($modules) > 0) {
							  	$colCount = 0;
							  	foreach ($modules as $key => $row) {
							  		if($colCount === 0 ) {
							  			echo '<div class="row">';
							  		}
							  		echo '<div class="col-sm-2"> <a href="'.base_url($row->page_url_path).'"><div class="card text-white bg-danger mb-3"> <div class="card-body"><h5 class="card-title text-center">'.$row->name.'</h5></div></div></a> </div>';
							  		$colCount++;
							  		if($colCount === 5) {
							  			echo '</div>';
							  			$colCount = 0;
							  		}
							  	}
							  	if($colCount !== 0) {
							  		echo '</div>';
							  	}
							  } else {
							  	echo '<div class="row"><div class="col-sm-12"> No Any Modules Founds </div></div>';
							  }
							?>
						
					</div>		
			</div>
		</div>
	</div>	
</div>  