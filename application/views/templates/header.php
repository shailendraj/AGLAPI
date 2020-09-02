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
			<img src="../assets/images/agl_logo_primary.png" class="logo" width="24px"> 
			AGL
		</a>
		<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="container">
			  &nbsp;
		</div>	
		<?php /*
		<input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">	   
		*/ ?>
		<ul class="navbar-nav px-3">
			<li class="nav-item text-nowrap">
				<a class="nav-link" href="<?php echo base_url(''); ?>" style="color: white;">	
					<i class="fa fa-user " aria-hidden="true"></i> Welcome
					<?php 
					   echo (!empty($this->userInfo->fullName)) ? $this->userInfo->fullName : '';
					?>
				</a>
			</li>
		</ul>		
		<ul class="navbar-nav px-3">	  	 
			<li class="nav-item text-nowrap">
				<a class="nav-link" href="<?php echo base_url('logout'); ?>" style="color: white;">
					<i class="fa fa-sign-out " aria-hidden="true"></i> Sign out
				</a>
			</li>
		</ul>
	</nav>
	</header>
	<div class="container-fluid">
	  <div class="row">
	  	<?php 
	  		$ldapUrl = (!empty($this->permissionInfo->ldapUrl)) ? $this->permissionInfo->ldapUrl : '/';
	  		$currentUri = (!empty($this->permissionInfo->currentUri)) ? $this->permissionInfo->currentUri : '';
			$allowPagesId = (!empty($this->permissionInfo->allowPages)) ? $this->permissionInfo->allowPages : array();
			$allPagesUriWithId = (!empty($this->permissionInfo->allPageIdUri)) ? $this->permissionInfo->allPageIdUri : array();
			$currentPageId = array_search($currentUri, $allPagesUriWithId);

		?>
		<?php if(!$this->isHome): ?>
		<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
		  <div class="sidebar-sticky pt-3">
			<ul class="nav flex-column">
				<li class="nav-item">
					<a class="nav-link active" href="<?=$ldapUrl ?>">
						<i class="fa fa-home" aria-hidden="true"></i>
						Dashboard <span class="sr-only">(current)</span>
					</a>
				</li>
				<?php 
					$mainMenu = $this->mainMenu;
					if(!empty($mainMenu)) {
						foreach($mainMenu as $topMenu) {
							$module = $topMenu['module'];	
							if(isset($module) && !empty($module->id)) {
								echo '<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-3 mb-1 text-muted"><span>'. $module->name. '</span></h3>';
							}
							$pages = $topMenu['pages'];
							foreach($pages as $row) {
								$pageId = $row->page_id;
								if(in_array($pageId, $allowPagesId)) {
									echo '<li class="nav-item">
											<a class="nav-link" href=" ' .base_url($row->page_url_path ).'">
												<i class="fa fa-info-circle" aria-hidden="true"></i>
												'.$row->page_name.' <span class="sr-only"></span>
											</a>
										</li>';
								}
							}
						}
					}					
				?>

				<?php /* ?>
				
				<li class="nav-item">
					<a class="nav-link" href="/agl">
						<i class="fa fa-info-circle" aria-hidden="true"></i>
						AGL <span class="sr-only">(current)</span>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="<?php echo base_url('importaddressvalidation'); ?>">
						<i class="fa fa-info-circle" aria-hidden="true"></i>
						Address Validation <span class="sr-only"></span>
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
				<?php  
					$pageId = array_search('/user', $allPagesUriWithId);
					if(in_array($pageId, $allowPagesId)) {
				?>
				<li class="nav-item">
					<a class="nav-link" href="<?php echo base_url('user'); ?>">              
						<i class="fa fa-users" aria-hidden="true"></i>
						Manage Users
					</a>
				</li>
				<?php } 
					$pageId = array_search('/roles', $allPagesUriWithId);
					if(in_array($pageId, $allowPagesId)) {
				?>
				<li class="nav-item">
					<a class="nav-link" href="<?php echo base_url('roles'); ?>">              
						<i class="fa fa-universal-access " aria-hidden="true"></i>
						Manage Roles & Permissions
					</a>
				</li>
				<?php } 
					$pageId = array_search('/pages', $allPagesUriWithId);
					if(in_array($pageId, $allowPagesId)) {
				?>
				<li class="nav-item">
					<a class="nav-link" href="<?php echo base_url('pages'); ?>">              
						<i class="fa fa-file-text" aria-hidden="true"></i>
						Manage Page 
					</a>
				</li>
				<?php } 
					$pageId = array_search('/ipaccess', $allPagesUriWithId);
					if(in_array($pageId, $allowPagesId)) {
				?>
				<li class="nav-item">
					<a class="nav-link" href="<?php echo base_url('ipaccess'); ?>">              
						<i class="fa fa-file-text" aria-hidden="true"></i>
						Manage IP Access 
					</a>
				</li>
				<?php } ?>
				<?php */ ?>
			</ul>
			<?php //} ?>
		  </div>
		</nav>
		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
		<?php else: ?>	
			<main role="main" class="col-md-12 ml-sm-auto col-lg-12">
		<?php endif ;?>
		