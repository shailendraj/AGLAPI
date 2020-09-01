<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {
	function __construct()
	{
		parent::__construct();	
	}	

	protected function common_view($page,  $data)
	{
		$this->load->view('templates/header', $data);
		$this->load->view($page, $data);
		$this->load->view('templates/footer', $data);
	}
	public function index()
	{
	    $data = array();
		// Get messages from the session
        if($this->session->userdata('success_msg')){
            $data['success_msg'] = $this->session->userdata('success_msg');
            $this->session->unset_userdata('success_msg');
        }
        if($this->session->userdata('error_msg')){
            $data['error_msg'] = $this->session->userdata('error_msg');
            $this->session->unset_userdata('error_msg');
        }					
		
		if($this->session->userdata('file_exists_msg')){
            $data['file_exists_msg'] = $this->session->userdata('file_exists_msg');
			$this->session->unset_userdata('file_exists_msg');
        }
		
		if($this->session->userdata('api_process_msg')){
            $data['api_process_msg'] = $this->session->userdata('api_process_msg'); 
            $this->session->unset_userdata('api_process_msg');			
        }
        $this->load->model('modules_model');
        $allowedIds = (!empty($this->permissionInfo->allowPages)) ? $this->permissionInfo->allowPages : array();        
        $data['modules'] = $this->modules_model->get_dashboard_modules($allowedIds);        
        $this->common_view('dashboard', $data);
    }    
}	