<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	function __construct() {
		parent::__construct();
		$this->load->helper('common');	
		$this->load->model('authentication_model');
		$this->load->model('pages_model');		
		$this->load->helper('url');
		$this->load->helper('cookie');
	}

	protected function common_view($page,  $data)
	{
		$this->load->view('templates/header', $data);
		$this->load->view($page, $data);
		$this->load->view('templates/footer', $data);
	}	

	public function roles()	{
	    $data = array();	 
	  	$this->common_view('roles', $data);	
	}


	public function pages()	{
	    $data = array();	 
	    $data['javascript'][] =  base_url('assets/js/extra/page.js');
	  	$this->common_view('pages', $data);	
	}

	public function page_form() {
		$aData = array();
		$oldUserName = $this->input->post('ID', '');
		$aData['page'] = $this->pages_model->getObj_page_by_id($oldUserName);		
		$this->load->view('page/form', $aData);
	}

	public function page_submitted() {
		if($this->input->server('REQUEST_METHOD') === 'POST'){
			$page_id = $this->input->post('page_id');						
			$this->load->library('form_validation');
			$this->form_validation->set_rules('page_name', 'Page Name', 'trim|required');
			$this->form_validation->set_rules('page_url_path', 'Page URL', 'trim|required');
			$this->form_validation->set_rules('menuStatus', 'Main Menu Status', 'trim|required');			 
			$this->form_validation->set_error_delimiters('<div class="alert alert-danger" role="alert"><a class="close" data-dismiss="alert">×</a><strong>', '</strong></div>');
			if ($this->form_validation->run()) {
				$form_data = $this->input->post();
				if(!empty($page_id)) {
					//UPDATE
					$page = $this->pages_model->get_page_id($page_id);	
					$resultData = $this->pages_model->update_page($page_id, $form_data, $page);
				} else {
					$resultData = $this->pages_model->add_page($form_data);	
				}
				$error = '<div class="alert alert-success" role="alert"><a class="close" data-dismiss="alert">×</a><strong>'.$resultData->message.'</strong></div>';
			} else {
				$error = validation_errors();				
			}
		}else{
			$error = " Invalid Method";
		}
		$this->session->set_flashdata('message', $error);
		redirect(base_url('pages'));
	}
}