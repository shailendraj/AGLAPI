<?php 
class Apiauth {

	var $CI;

	function __construct(){        
		$this->CI =& get_instance();
	}

	public function check_status() {
		$this->CI->load->helper('url');
		if(isset($_SERVER['CI_API_ENV']) && !empty($_SERVER['CI_API_ENV']) && $_SERVER['CI_API_ENV'] === 'API') {
			$base_url = base_url();
			$currentURL = current_url();
			$params = trim($_SERVER['QUERY_STRING']);
			if($base_url === $currentURL && empty($params)) {              
				$data = [
					'message' => "I'm so much online",
					'environment' => ENVIRONMENT
				];
				header('Content-type: application/json');
				echo json_encode( $data );            
				exit();            
			} else {
				$apiClass = $this->CI->router->class;
				if(strtolower($apiClass) !== 'api') {
					redirect(base_url('api'));
				}
			}
		} 
	}
}