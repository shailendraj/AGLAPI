<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	function __construct() {
		parent::__construct();
		$this->load->helper('common');	
		$this->load->model('authentication_model');
		$this->load->helper('url');
		$this->load->helper('cookie');
		$this->load->library("pagination");
		$this->load->library('form_validation');
		$this->load->library('session');
		$this->load->model('user_model');
	}

	protected function common_view($page,  $data)
	{
		$this->load->view('templates/header', $data);
		$this->load->view($page, $data);
		$this->load->view('templates/footer', $data);
	}	

	public function index()	{
	    $srh = $this->input->get('srh', '');
        $sort = $this->input->get('sort', '');        
        if(!empty($sort)) {
        	$field =  explode(':', $sort);
			$order = trim($field[0]);		
			$order_type = strtoupper(trim($field[1]));    	
			if(!(!empty($order) &&  in_array($order_type, array('DESC', 'ASC')))) {
				$order = '';
        		$order_type = 'DESC';
			} else {
				if($order == 'name') {
					$order = 'firstname';
				}
			}  
        } else {
        	$order = '';
        	$order_type = 'DESC';
        }

	    $config = array();
	    $config['full_tag_open'] = '<nav aria-label="Page navigation example"><ul class="pagination">';
		$config['full_tag_close'] = '</ul></nav>';
		$config['num_tag_open'] = '<li class="page-item">';
		$config['num_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="page-item active"><a class="page-link" href="#">';
        $config['cur_tag_close'] = '</a></li>';
		$config['attributes'] = array('class' => 'page-link');
        $config["base_url"] = base_url() . "user";
        $config["total_rows"] = $this->user_model->count_users($srh);
        $config["use_page_numbers"] = TRUE;   
        $config["reuse_query_string"] = TRUE;                
        $config["per_page"] = 10;
        $config["uri_segment"] = 2;
        
        $data['itemsPerPage'] = $config["per_page"];

        $this->pagination->initialize($config);
        $page = ($this->uri->segment(2)) ? $this->uri->segment(2) : 0;

        $data['currentUrl'] = current_url();
        $data['srh'] = urldecode($srh);
        $data['sort'] = $sort;
        $data['currentPage'] =  empty($page) ? 1 : $page ;
        $data["links"] = $this->pagination->create_links();
        $data['users'] = $this->user_model->get_users($srh, $order, $order_type, $config["per_page"], $page);
        $data['javascript'][] =  base_url('assets/js/extra/user.js');
	  	$this->common_view('user/home', $data);	
	}

	public function form() {
		$this->load->model('roles_model');
		$aData = array();
		$oldUserName = $this->input->post('ID', '');
		$aData['roles'] = $this->roles_model->get_roles();
		$aData['user'] = $this->user_model->getObj_user_by_id($oldUserName);		
		$this->load->view('user/form', $aData);
	}

	public function submitted() {
		if($this->input->server('REQUEST_METHOD') === 'POST'){
			$oldUsername = $this->input->post('old_username');
			$password = $this->input->post('password');			
			$this->load->library('form_validation');
			$this->form_validation->set_rules('firstname', 'First Name', 'trim|required');
			$this->form_validation->set_rules('lastname', 'Last Name', 'trim|required');
			$this->form_validation->set_rules('username', 'Username', 'trim|required');
			if(empty($oldUsername) || (!empty($password))) {
				$this->form_validation->set_rules('password', 'Password', 'trim|required');
				$this->form_validation->set_rules('confirmpassword', 'Confrim Password', 'trim|required|matches[password]');
			}
			$this->form_validation->set_error_delimiters('<div class="alert alert-danger" role="alert"><a class="close" data-dismiss="alert">×</a><strong>', '</strong></div>');
			if ($this->form_validation->run()) {
				$form_data = $this->input->post();
				if(!empty($oldUsername)) {
					//UPDATE
					$preUser = $this->user_model->get_user_by_id($form_data['old_username']);	
					$resultData = $this->user_model->update_user($oldUsername, $form_data, $preUser);
				} else {
					$resultData = $this->user_model->register($form_data);	
				}
				$error = '<div class="alert alert-success" role="alert"><a class="close" data-dismiss="alert">×</a><strong>'.$resultData->message.'</strong></div>';
			} else {
				$error = validation_errors();				
			}
		}else{
			$error = " Invalid Method";
		}
		$this->session->set_flashdata('message', $error);
		redirect(base_url('user'));
	}

	public function update_status() {
		$username = $this->input->post('ID');
		$status = false;
		$message = "";
		if($this->input->server('REQUEST_METHOD') === 'POST' && !empty($username)){				
			$user = $this->user_model->get_user_by_id($username);	
			$res = $this->user_model->update_status($username, $user);
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