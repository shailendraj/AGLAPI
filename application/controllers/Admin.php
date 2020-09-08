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
	

	public function pages()	{

		$data = array();	 			 	    
		$config = array();

		$srh = $this->input->get('srh', '');
		$sort = $this->input->get('sort', '');        
		if(!empty($sort)) {
			$field =  explode(':', $sort);
			$order = trim($field[0]);		
			$order_type = strtoupper(trim($field[1]));    	
			if(!(!empty($order) &&  in_array($order_type, array('DESC', 'ASC')))) {
				$order = '';
				$order_type = 'DESC';
			}  
		} else {
			$order = '';
			$order_type = 'DESC';
		}

		$config['full_tag_open'] = '<nav aria-label="Page navigation example"><ul class="pagination">';
		$config['full_tag_close'] = '</ul></nav>';
		$config['num_tag_open'] = '<li class="page-item">';
		$config['num_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="page-item active"><a class="page-link" href="#">';
		$config['cur_tag_close'] = '</a></li>';
		$config['attributes'] = array('class' => 'page-link');
		$config["base_url"] = base_url() . "ipaccess";
		$config["total_rows"] = $this->pages_model->count_pages($srh, $order);
		$config["use_page_numbers"] = TRUE;        
		$config["per_page"] = 10;
		$config["uri_segment"] = 2;
		
		$data['itemsPerPage'] = $config["per_page"];

		$this->pagination->initialize($config);
		$offset = ($this->uri->segment(2)) ? ($this->uri->segment(2)-1) * $config["per_page"] : 0;
		$data['currentPage'] =  empty($offset) ? 0 : $offset ;
		$data['currentUrl'] = current_url();
        $data['srh'] = urldecode($srh);
        $data['sort'] = $sort;
		$data["links"] = $this->pagination->create_links();
		$data['data'] = $this->pages_model->get_all($srh, $order, $order_type,  $config["per_page"], $offset);
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
					$page = $this->pages_model->get_page_by_id($page_id);	
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

	public function page_update_status() {
		$page_id = $this->input->post('ID');
		$status = false;
		$message = "";
		if($this->input->server('REQUEST_METHOD') === 'POST' && !empty($page_id)){				
			$page = $this->pages_model->get_page_by_id($page_id);		 
			$res = $this->pages_model->update_status($page_id, $page);
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

	public function ipaccess()	{
		$this->load->model('ip_allow_model');	

		$data = array();	 	    
		$config = array();

		$srh = $this->input->get('srh', '');
		$sort = $this->input->get('sort', '');        
		if(!empty($sort)) {
			$field =  explode(':', $sort);
			$order = trim($field[0]);		
			$order_type = strtoupper(trim($field[1]));    	
			if(!(!empty($order) &&  in_array($order_type, array('DESC', 'ASC')))) {
				$order = '';
				$order_type = 'DESC';
			}  
		} else {
			$order = '';
			$order_type = 'DESC';
		}

		$config['full_tag_open'] = '<nav aria-label="Page navigation example"><ul class="pagination">';
		$config['full_tag_close'] = '</ul></nav>';
		$config['num_tag_open'] = '<li class="page-item">';
		$config['num_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="page-item active"><a class="page-link" href="#">';
		$config['cur_tag_close'] = '</a></li>';
		$config['attributes'] = array('class' => 'page-link');
		$config["base_url"] = base_url() . "ipaccess";
		$config["total_rows"] = $this->ip_allow_model->count_ip_allow($srh, $order);
		$config["use_page_numbers"] = TRUE;        
		$config["per_page"] = 10;
		$config["uri_segment"] = 2;
		
		$data['itemsPerPage'] = $config["per_page"];

		$this->pagination->initialize($config);
		$offset = ($this->uri->segment(2)) ? ($this->uri->segment(2)-1) * $config["per_page"] : 0;
		$data['currentPage'] =  empty($offset) ? 0 : $offset ;
		$data['currentUrl'] = current_url();
        $data['srh'] = urldecode($srh);
        $data['sort'] = $sort;
		$data["links"] = $this->pagination->create_links();
		$data['data'] = $this->ip_allow_model->get_all($srh, $order, $order_type, $config["per_page"], $offset);
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

	public function roles()	{

		$this->load->model('roles_model');
		$data = array();	 	    
		$config = array();

		$srh = $this->input->get('srh', '');
		$sort = $this->input->get('sort', '');        
		if(!empty($sort)) {
			$field =  explode(':', $sort);
			$order = trim($field[0]);		
			$order_type = strtoupper(trim($field[1]));    	
			if(!(!empty($order) &&  in_array($order_type, array('DESC', 'ASC')))) {
				$order = '';
				$order_type = 'DESC';
			}
		} else {
			$order = '';
			$order_type = 'DESC';
		}

		$config['full_tag_open'] = '<nav aria-label="Page navigation example"><ul class="pagination">';
		$config['full_tag_close'] = '</ul></nav>';
		$config['num_tag_open'] = '<li class="page-item">';
		$config['num_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="page-item active"><a class="page-link" href="#">';
		$config['cur_tag_close'] = '</a></li>';
		$config['attributes'] = array('class' => 'page-link');
		$config["base_url"] = base_url() . "ipaccess";
		$config["total_rows"] = $this->roles_model->count_roles($srh, $order);
		$config["use_page_numbers"] = TRUE;        
		$config["per_page"] = 10;
		$config["uri_segment"] = 2;
		
		$data['itemsPerPage'] = $config["per_page"];

		$this->pagination->initialize($config);
		$offset = ($this->uri->segment(2)) ? ($this->uri->segment(2)-1) * $config["per_page"] : 0;
		$data['currentPage'] =  empty($offset) ? 0 : $offset ;
		$data['currentUrl'] = current_url();
		$data['srh'] = urldecode($srh);
		$data['sort'] = $sort;
		$data["links"] = $this->pagination->create_links();
		$data['data'] = $this->roles_model->get_all($srh, $order, $order_type, $config["per_page"], $offset); 		 
		$data['javascript'][] =  base_url('assets/js/extra/roles.js');
		$this->common_view('roles', $data);	
	}


	public function roles_form() {
		$this->load->model('roles_model');
		$aData = array();
		$roleId = $this->input->post('ID', '');
		$aData['pages'] = $this->pages_model->get_main_list();		 
		$aData['role'] = $this->roles_model->getObj_role_by_id($roleId);	
		$this->load->view('admin/roles_form', $aData);
	}

	public function roles_submitted() {
		$this->load->model('roles_model');	
		if($this->input->server('REQUEST_METHOD') === 'POST'){
			$role_id = $this->input->post('role_id');			
			$this->load->library('form_validation');
			$this->form_validation->set_rules('role_name', 'Role Name', 'trim|required');			 	 
			$this->form_validation->set_error_delimiters('<div class="alert alert-danger" role="alert"><a class="close" data-dismiss="alert">×</a><strong>', '</strong></div>');
			if ($this->form_validation->run()) {				 
				$form_data = $this->input->post();
				if(!empty($role_id)) {
					//UPDATE
					$role = $this->roles_model->get_role_by_id($role_id);	
					$resultData = $this->roles_model->update_role($role_id, $form_data, $role);
				} else {
					$resultData = $this->roles_model->add_role($form_data);	
				}
				$error = '<div class="alert alert-success" role="alert"><a class="close" data-dismiss="alert">×</a><strong>'.$resultData->message.'</strong></div>';				
			} else {
				$error = validation_errors();				
			}
		}else{
			$error = " Invalid Method";
		}
		$this->session->set_flashdata('message', $error);
		redirect(base_url('roles'));
	}

	public function roles_update_status() {	
		$this->load->model('roles_model');		 
		$roldId = $this->input->post('ID');
		$status = false;
		$message = "";
		if($this->input->server('REQUEST_METHOD') === 'POST' && !empty($roldId)){				
			$role = $this->roles_model->get_role_by_id($roldId);	
			$res = $this->roles_model->update_status($roldId, $role);
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