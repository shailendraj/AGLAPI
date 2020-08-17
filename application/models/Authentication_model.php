<?php 
class Authentication_Model extends CI_Model
{
	function login($username, $password, $ipAddress)
	{
		$response = new stdClass();

		$this->db->select('username, password, status');
		$this->db->from('users');
		$this->db->where('username', $username);

		$cred = $this->db->get();

		if ($cred->num_rows() == 0) {
			$response->error = 1;
			$response->message = 'Invalid username or password.';
			return $response;
		}
		
		if (!$this->ipAllowed($ipAddress)) {
			$response->error = 1;
			$response->message = 'Access from this location is not allowed.';
			return $response;
		}
		
		$userCred = $cred->row();

		if (!password_verify($password, $userCred->password)) {
			$response->error = 1;
			$response->message = 'Invalid username or password.';
			return $response;
		}

		if (!$userCred->status) {
			$response->error = 1;
			$response->message = 'Account is disabled. Please contact your system administrator.';
			return $response;
		}

		$this->db->select('hash');
		$this->db->from('sessions');
		$this->db->where('username', $userCred->username);

		$sessions = $this->db->get();

		$hash = openssl_random_pseudo_bytes(20);
		$hash = bin2hex($hash);

		$this->db->set('hash', $hash);

		if ($sessions->num_rows() > 0) {
			$this->db->where('username', $username);
			$this->db->update('sessions');
		} else {
			$this->db->set('username', $username);
			$this->db->insert('sessions');
		}

		$response->error = 0;
		$response->hash = $hash;
		return $response;
	}

	function ipAllowed($ipAddress) {
		$this->db->select('ipID')->from('ip_allow')->where(ip2long($ipAddress).' BETWEEN `ipStart` AND `ipEnd`', null, false)->where('status', '1');
		$ip = $this->db->get();

		if ($ip->num_rows() > 0)
			return true;

		$this->db->select('hostname')->from('ip_allow')->where('status', 1)->where('hostname != \'\'');
		$q_hostnames = $this->db->get();		
		foreach ($q_hostnames->result() as $row) {			
			if ($ipAddress == gethostbyname($row->hostname))
				return true;
		}

		return false;
	}

	function logOutAll() {
		$this->db->truncate('sessions');
	}
}