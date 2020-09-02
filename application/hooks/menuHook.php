<?php
class Menu_Hook
{
	public function __construct() {
		$this->CI =& get_instance();
		$this->CI->load->helper('url');
		$this->CI->load->helper('cookie');		
		$this->CI->load->model('modules_model');
		$this->CI->load->model('pages_model');		
	}

	public function set_main_menu()  {

		if(isset($this->CI->userInfo) && !empty($this->CI->userInfo) && (!$this->CI->input->is_ajax_request())) {
			$cClass = $this->CI->router->fetch_class();
			$defController = $this->CI->router->default_controller;
			$cMethod = $this->CI->router->fetch_method(); 
			$isHome = (strtolower($cClass ) ===  $defController && $cMethod === 'index') ? true : false;
			$currentUri = $this->CI->permissionInfo->currentUri;
			if(!empty($currentUri) && $isHome === false) {
				$page = $this->CI->pages_model->get_page_by_uri($currentUri);
				if(!empty($page->module)) {
					$sModule = $page->module;
					set_cookie('module',$sModule,'3600'); 
				} else {
					$module = get_cookie('module');
					if(!empty($module)) {
						$sModule = $module;
						set_cookie('module',$sModule,'3600'); 
					}
				}	
			}

			if($isHome) {
				$sModule = 0;
				delete_cookie('module');
			}
			
			$mainMenu = array();
			$module = $this->CI->modules_model->get_active_module($sModule);
			foreach($module as $row) {
				$mid = $row->id;
				$mainMenu[$mid]['module'] = $row;
				$pages = $this->CI->pages_model->get_active_menus($mid);				
				$mainMenu[$mid]['pages'] = $pages;
			}			 
			$this->CI->mainMenu = $mainMenu;
			$this->CI->isHome = $isHome;
		}
	}
}	