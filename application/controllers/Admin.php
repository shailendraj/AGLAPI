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

	public function ipaccess()	{
		$this->load->model('ip_allow_model');	

	    $data = array();	 	    
	    $config = array();

	    $config['full_tag_open'] = '<nav aria-label="Page navigation example"><ul class="pagination">';
		$config['full_tag_close'] = '</ul></nav>';
		$config['num_tag_open'] = '<li class="page-item">';
		$config['num_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="page-item active"><a class="page-link" href="#">';
        $config['cur_tag_close'] = '</a></li>';
		$config['attributes'] = array('class' => 'page-link');
        $config["base_url"] = base_url() . "ipaccess";
        $config["total_rows"] = $this->ip_allow_model->count_ip_allow();
        $config["use_page_numbers"] = TRUE;        
        $config["per_page"] = 10;
        $config["uri_segment"] = 2;
        
        $data['itemsPerPage'] = $config["per_page"];

        $this->pagination->initialize($config);
        $page = ($this->uri->segment(2)) ? $this->uri->segment(2) : 0;
        $data['currentPage'] =  empty($page) ? 1 : $page ;
        $data["links"] = $this->pagination->create_links();
        $data['data'] = $this->ip_allow_model->get_all('','', 'DESC', $config["per_page"], $page);
	    $data['javascript'][] =  base_url('assets/js/extra/ipaccess.js');
	  	$this->common_view('admin/ipaccess', $data);	
	}

	public function ipaccess_form() {
		$this->load->model('ip_allow_model');	

		$aData = array();
		$oldUserName = $this->input->post('ID', '');
		$aData['ipaccess'] = $this->ip_allow_model->getObj_ip_by_id($oldUserName);		
		$this->load->view('admin/ipaccess_form', $aData);
	}

	 

	public function ipaccess_submitted() {
		$this->load->model('ip_allow_model');	
		if($this->input->server('REQUEST_METHOD') === 'POST'){
			$ipID = $this->input->post('ipID');
			
			$this->load->library('form_validation');
			$this->form_validation->set_rules('name', 'Name', 'trim|required');
			$this->form_validation->set_rules('hostname', 'Host Name', 'trim|required');
			$this->form_validation->set_rules('ipstart', 'IP Start', 'trim|required');
			$this->form_validation->set_rules('ipend', 'IP End', 'trim|required');			 
			$this->form_validation->set_error_delimiters('<div class="alert alert-danger" role="alert"><a class="close" data-dismiss="alert">×</a><strong>', '</strong></div>');
			if ($this->form_validation->run()) {
				$ipstart = $this->input->post('ipstart');
				$ipend = $this->input->post('ipend');				
				if(ip2long($ipstart) <= ip2long($ipend)) { 
					$form_data = $this->input->post();
					if(!empty($ipID)) {
						//UPDATE
						$ipaccess = $this->ip_allow_model->get_for_id($ipID);	
						$resultData = $this->ip_allow_model->update_ipaccess($ipID, $form_data, $ipaccess);
					} else {
						$resultData = $this->ip_allow_model->add_ipaccess($form_data);	
					}
					$error = '<div class="alert alert-success" role="alert"><a class="close" data-dismiss="alert">×</a><strong>'.$resultData->message.'</strong></div>';
				} else {
					$error = '<div class="alert alert-success" role="alert"><a class="close" data-dismiss="alert">×</a><strong> End IP address should be greater than start ip address</strong></div>';
				}	
			} else {
				$error = validation_errors();				
			}
		}else{
			$error = " Invalid Method";
		}
		$this->session->set_flashdata('message', $error);
		redirect(base_url('ipaccess'));
	}

	public function ipaccess_update_status() {	
		$this->load->model('ip_allow_model');	 
		$ipID = $this->input->post('ID');
		$status = false;
		$message = "";
		if($this->input->server('REQUEST_METHOD') === 'POST' && !empty($ipID)){				
			$ipaccess = $this->ip_allow_model->get_for_id($ipID);	
			$res = $this->ip_allow_model->update_status($ipID, $ipaccess);
			$status = $res->error;
			$message = $res->message;
			$error = '<div class="alert alert-success" role="alert"><a class="close" data-dismiss="alert">×</a><strong>'.$res->message.'</strong></div>';
			$this->session->set_flashdata('message', $error);
		}
		return $this->output
		            ->set_content_type('application/json')
		            ->set_status_header(200)
		            ->set_output(json_encode(array(
		                    'status' => $status,
		                    'message' => $message
		            )));
	}
}