<div class="content-fluid pt-2">
	<nav aria-label="breadcrumb">
		<ol class="breadcrumb">
			<li class="breadcrumb-item active" aria-current="page">Home</li>        
			<li class="breadcrumb-item active" aria-current="page">Dashboard</li>
		</ol>
	</nav>
	<h3 style="color: #007bff;"> <i class="fa fa-file-text" aria-hidden="true"></i> Dashboard </h3>
	<div class="container-fluid pt-5">
		<?php 
		  if(count($modules) > 0) {
		  	$colCount = 0;
		  	foreach ($modules as $key => $row) {
		  		if($colCount === 0 ) {
		  			echo '<div class="row">';
		  		}
		  		echo '<div class="col-sm-2"> <a href="'.base_url($row->page_url_path).'"><div class="jumbotron"> <h5 class="text-center" style="text-transform: uppercase;">'.$row->name.'</h5></div></a> </div>';
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