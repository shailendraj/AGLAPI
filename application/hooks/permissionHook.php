<?php
class Permission_Hook
{
	public function __construct() {
		$this->CI =& get_instance();
		$this->CI->load->helper('url');
		$this->CI->load->model('pages_model');
		$this->CI->load->model('roles_model');
	}

	public function chkUriPermission() {
		$currentUri = "/" . $this->findExistRequetUri();
		$allPage = $this->CI->pages_model->get_page_uri();		
		$currentRoles = (!empty( $this->CI->userInfo->roles)) ? json_decode( $this->CI->userInfo->roles) : array(2) ; 
		if(is_array($currentRoles) && in_array('1', $currentRoles)) { 
			//IS GOD THAN ALLOW ALLOW PAGES
			$allowPages = array_keys($allPage);
		} else {
			$allowPages = $this->CI->roles_model->get_allow_page_ids($currentRoles);
			if(in_array($currentUri,  $allPage)) {
				$currentUriPageId = array_search($currentUri,  $allPage);
				$aCommonUriPath = array('/login', '/logout', '/dashboard', '/permission');
				if(!in_array($currentUri, $aCommonUriPath) && !in_array($currentUriPageId, $allowPages)) {
					$this->CI->session->set_userdata('success_msg', "403 Error: Page access not allow!!");
					redirect('/');
				} 
			}
		}

		$this->CI->permissionInfo = (object) array(
			'currentUri' => $currentUri,
			'roleIds' => $currentRoles,					 
			'allowPages' => $allowPages,
			'allPageIdUri' => $allPage 
		);		 
	}

	protected function findExistRequetUri() {
		$sUrlString = trim($this->CI->uri->uri_string());
		$aRoutes =array();
		foreach ($this->CI->router->routes as $key => $value) {
			$aRoutes[] = trim($key);
		}

		if(in_array($sUrlString, $aRoutes)){
			return $sUrlString;
		} else  {
			//THIS BLOCK EXECUTED ON WILD CARD EXITS
			$aSelectUritoChk = array();
			$aUrlWildCards = array('(:any)', '(:num)', ':any', ':num');
			$aConvertMainUri = explode('/', $sUrlString);
			$iLenUri = count($aConvertMainUri);
			//SELECT URI  BASED IN LENGHT
			$sReturnUri = '';
			foreach ( $aRoutes as $key => $sRoute) {
				$aRouteMainUri = explode('/', $sRoute);
				$iRouteLenUri = count($aRouteMainUri);
				if($iLenUri === $iRouteLenUri){
					//ONLY ACCEPT WILD CARD URI IN SELECT ARRAY
					$bFlagWildCard = false;
					$aNewUri = array();
					foreach($aRouteMainUri as $sUriTok){
						if(in_array($sUriTok,$aUrlWildCards)){
							$bFlagWildCard = true;
						}else{
							$aNewUri[] = $sUriTok;
						}
					}
					if($bFlagWildCard)
					$aSelectUritoChk[] = $aNewUri;
				}
			}

			foreach($aSelectUritoChk as $aMainUri) {
				$aNewUri = array_uintersect($aConvertMainUri,$aMainUri, "strcasecmp");
				if(count($aMainUri) === count($aNewUri)){
					$sReturnUri = implode("/",  $aMainUri);
					break;
				}			
				return $sReturnUri;
			}
		}
	}
}	
