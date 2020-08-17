<?php
class Auth_Hook
{
	public function __construct()
	{
		$this->CI =& get_instance();
		$this->CI->load->helper('url');
	}

	public function loggedIn()
	{ 
		if ($this->CI->input->method() == 'options')
			exit;
		$sClassName = $this->CI->router->class;
		$sMethodName = $this->CI->router->method;

		if($this->CI->input->is_cli_request()){

	    }

	    if(strtolower($sClassName)  === 'api' && strtolower($sMethodName) === 'callback') {
	    	return true;
	    }    

		$hash = $this->CI->input->cookie('hash');
		$loggedIn = false;

		if (isset($hash)) {
			$this->CI->db->select('users.username');
			$this->CI->db->select('users.firstName');
			$this->CI->db->select('users.lastName');			
			$this->CI->db->from('sessions, users');
			$this->CI->db->where('sessions.hash', $hash);
			$this->CI->db->where('users.username = sessions.username');
			$this->CI->db->order_by('sessions.lastActivity', 'desc');
        	$this->CI->db->limit(1);

			$query = $this->CI->db->get();

			if ($query->num_rows() > 0) {
				$userInfo = $query->row();

				$fullName = array(
					$userInfo->firstName,
					$userInfo->lastName
				);
				$fullName = implode(' ', $fullName);

				$this->CI->userInfo = (object) array(
					'hash' => $hash,
					'username' => $userInfo->username,					 
					'fullName' => preg_replace('!\s+!', ' ', $fullName)
				);

				$this->CI->db->set('lastActivity', date('Y-m-d H:i:s'));
				$this->CI->db->where('hash', $hash);
				$this->CI->db->limit(1);
				$this->CI->db->update('sessions');

				$loggedIn = true;
			}
		}

		if ($loggedIn) {
			//FOR FEW DAY REISTRICATION 
			$users = array('sys.adm', 'sys.adm1', 'sys.adm2', 'sys.adm3', 'sys.adm4');
			$cUsername = $this->CI->userInfo->username;
			$firstSegment = $this->CI->uri->segment(1);
			$bControllers = array('admin', 'roles', 'pages', 'user', 'ipaccess');
			if((in_array($firstSegment, $bControllers)) && (!in_array($cUsername, $users))) {
				redirect('/');
			}
		}	

		if ($this->CI->uri->segment(1) == 'login') {
			if ($loggedIn) {
				redirect('/');
			}
		} else {
			if (!$loggedIn && $this->CI->uri->segment(1) !== 'user') {
				unset($_COOKIE['hash']);
				setcookie('hash', null, -1, '/', $_SERVER['COOKIE_DOMAIN']);
				redirect('login');
			}
		}
	}
}