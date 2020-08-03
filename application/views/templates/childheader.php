<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="ModuLinks">
	<link rel="icon" href="/favicon.ico">

	<title>Lead My Way</title>

	<link href="/assets/css/global.css" rel="stylesheet">
	<?php
		if (isset($css) && !empty($css)) {
			if (is_array($css)) {
				foreach ($css as $src) {
					echo '  <link rel="stylesheet" href="'.$src.'">';
				}
			} else {
				echo '<link rel="stylesheet" href="'.$css.'">';
			}
		}
	?>
	<script type="text/javascript">
	  var BASEURL = "<?php echo base_url(); ?>";
	</script>
</head>

<body class="inPage">
	<div id="wrapper">
		<div id="header_inner">
			<div class="rightSide">
				<ul style="width:130px;float:left;color:#FFFFFF">
					<li>Welcome <b><?php echo $this->userInfo->username;?></b></li>
				</ul>
				<ul style="padding-right:60px;">
					<li>
						<a href="/logout/">Logout</a>
					</li>
					<li><img src="/assets/images/next.jpg" style="margin-top:2px;"></li>
					<li><img src="/assets/images/top.jpg"></li>
					<li><img src="/assets/images/agency.jpg" style="margin-top:2px;"></li>
				</ul>
			</div>
		</div>
		<div id="ncv">
			<ul>
				<li>
					<a href="<?php echo base_url('/'); ?>"><img src="/assets/images/home.png" border="0"></a>
				</li>
			</ul>
		</div>
		<div id="contents_inner">
			<?php if(isset($this->aBreadcrumbPage) && !empty($this->aBreadcrumbPage) && count($this->aBreadcrumbPage)>1): ?>
			<div id="breadcrumb2">
				<ul class="breadcrumb">
					<?php
					$iCount = count($this->aBreadcrumbPage)-1;
					foreach ($this->aBreadcrumbPage as $key => $value) {
						if($iCount==0){
							echo '<li>'.ucfirst($value['page']).'</li>';
						} else {
							echo '<li><a href="'.base_url().$value['url'].'">'.ucfirst($value['page']).'</a></li>';
						}
						$iCount--;
					}
					?>
				</ul>
			</div>
			<?php endif; ?>
