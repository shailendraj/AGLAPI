<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Authentication extends CI_Controller {

	function __construct() {
		parent::__construct();
		$this->load->helper('common');	
		$this->load->model('authentication_model');
		$this->load->helper('url');
		$this->load->helper('cookie');
	}

	public function index()	{
	    $data = array();	 
	    $this->load->view('login', $data);
	}

	public function loginSubmit()
	{
		$username = trim($this->input->post('username'));
		$password = trim($this->input->post('password'));

		$result = $this->authentication_model->login($username, $password, $this->input->ip_address());

		if ($result->error) {
			http_response_code(403);
			echo json_encode(array('message' => $result->message));
		} else {
			//setcookie('hash', $result->hash, 0, '/', $_SERVER['COOKIE_DOMAIN']);
			setcookie('hash', $result->hash, 0, '/');
			echo json_encode(array('message' => 'success', 'hash' => $result->hash));
		}
	}	 

	public function logout()
	{
		$this->session->sess_destroy();
		setcookie('hash', '',  time()-3600, '/', $_SERVER['COOKIE_DOMAIN']);
		unset($_COOKIE['hash']);
		redirect('login');
	}
}