<!DOCTYPE html>
<html lang="en">
<head>
  	<title>AGL:: API Portal</title>
  	<meta charset="utf-8">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   <link rel="stylesheet" href="../assets/css/jquery-ui.css">
  	<link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
  	<link rel="stylesheet" href="../assets/css/global.css">  
  	<script>
  		 var BASEURL = '<?= base_url(); ?>';
  	</script>	
</head>
<body>
	<header>
	<nav class="navbar navbar-dark sticky-top bg-violet flex-md-nowrap p-0 shadow">
	 	 <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">
	  		<img src="../assets/images/icon/form2.png" class="logo" width="24px"> 
	  		AGL
	  	</a>
	  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	  </button>
	  <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
	  <ul class="navbar-nav px-3">
		<li class="nav-item text-nowrap">
		  	<a class="nav-link" href="<?php echo base_url('logout'); ?>">
		  		<i class="fa fa-sign-out " aria-hidden="true"></i>
		  	Sign out
		  	</a>
		</li>
	  </ul>
	</nav>
	</header>
	<div class="container-fluid">
	  <div class="row">
		<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
		  <div class="sidebar-sticky pt-3">
			<ul class="nav flex-column">
				<li class="nav-item">
					<a class="nav-link active" href="/">
						<i class="fa fa-home" aria-hidden="true"></i>
						Dashboard <span class="sr-only">(current)</span>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">
						<i class="fa fa-eye" aria-hidden="true"></i>
						View Uploads
					</a>
				</li>		  
				<li class="nav-item">
					<a class="nav-link" href="#">
						<i class="fa fa-archive" aria-hidden="true"></i>
						Archived Uploads
					</a>
				</li>	
			</ul>

			<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			  <span>Admin & reports</span>
			  <a class="d-flex align-items-center text-muted" href="#" aria-label="Admin& reports">            
				<i class="fa fa-plus-circle" aria-hidden="true"></i>
			  </a>
			</h6>
			<ul class="nav flex-column mb-2">
				<li class="nav-item">
					<a class="nav-link" href="<?php echo base_url('user'); ?>">              
					  	<i class="fa fa-users" aria-hidden="true"></i>
					  	Manage Users
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="<?php echo base_url('roles'); ?>">              
					  	<i class="fa fa-universal-access " aria-hidden="true"></i>
					  	Manage Roles & Permissions
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="<?php echo base_url('pages'); ?>">              
					  	<i class="fa fa-file-text" aria-hidden="true"></i>
					  	Manage Page 
					</a>
				</li>
			</ul>
		  </div>
		</nav>
		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">


<?php /*  
<div class="container-fluid">
  <div class="row content">
	<div class="col-sm-3 sidenav">
	  <h4>AGL</h4>
	  <ul class="nav nav-pills nav-stacked">
		<li class="active"><a href="#section1">Home</a></li>        
		<li><a href="#section3">View Uploads</a></li>
		<li><a href="#section3">Archived Uploads</a></li>
		<li><a href="#section3"><i class="fa fa-sign-out" aria-hidden="true"></i>
Log Out</a></li>
	  </ul><br>
	  <div class="input-group">
		<input type="text" class="form-control" placeholder="Search..">
		<span class="input-group-btn">
		  <button class="btn btn-default" type="button">
			<span class="glyphicon glyphicon-search"></span>
		  </button>
		</span>
	  </div>
	</div>    

*/
?>