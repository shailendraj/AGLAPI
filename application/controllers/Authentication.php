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
	    $ldapUrl = Config_Model::get_config_val('LDAP_URL');
	    if(!empty($ldapUrl)) {
	    	redirect($ldapUrl);	
	    } else {
	    	$this->load->view('login', $data);
		}
	}

	protected function _registerLdapUser() {
		$ldapUrl = Config_Model::get_config_val('LDAP_URL');
		$ldapSyncConfig = Config_Model::get_config_val('LDAP_USER_SYNC');

		$username = trim($this->input->post('username'));
		$password = trim($this->input->post('password'));

		$ucount = $this->authentication_model->chkUserName($username);

		if($ldapSyncConfig && $ucount == 0 && !empty($username) && !empty($password) ) {
			//NOT FOUND LDAP USER FIRST REGISTER USER
			$callback = (!empty($this->input->post('callback'))) ? $this->input->post('callback') : ''; 
			$parse = @parse_url($callback);
			$domain =  @$parse['host'];			
			if(strpos($ldapUrl, $domain) !== false) {
				$postData = array();
				$postData['firstname'] = (!empty($this->input->post('ldapfirstname'))) ? $this->input->post('ldapfirstname') : '';
				$postData['lastname'] = (!empty($this->input->post('ldaplastname'))) ? $this->input->post('ldaplastname') : '';
				$utype = (!empty($this->input->post('utype'))) ?$this->input->post('utype') : 'guest';							
				$utype =  strtolower($utype);
				$postData['roles'] = ($utype !== 'admins') ? [2] : [1, 2];				
				$postData['username'] = $username;
				$postData['password'] = $password;
				$this->load->model('user_model');
				$responseObj = $this->user_model->register($postData);
			}
		} 
	}

	public function loginSubmit() {
		$ldapUrl = Config_Model::get_config_val('LDAP_URL');
		$ldapSyncConfig = Config_Model::get_config_val('LDAP_USER_SYNC');
		if($ldapSyncConfig) {
			$this->_registerLdapUser();
		}

		$username = trim($this->input->post('username'));
		$password = trim($this->input->post('password'));

		$result = $this->authentication_model->login($username, $password, $this->input->ip_address());

		if ($result->error) {
			http_response_code(403);
			echo json_encode(array('message' => $result->message));
		} else {
			
			//setcookie('hash', $result->hash, 0, '/', $_SERVER['COOKIE_DOMAIN']);
			setcookie('hash', $result->hash, 0, '/');
			if(!empty($ldapUrl) && !$this->input->is_ajax_request()) {				
				redirect(base_url());	
			} else {	
				echo json_encode(array('message' => 'success', 'hash' => $result->hash));
			}
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