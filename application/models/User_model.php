<?php
class User_Model extends CI_Model
{

	/**
	* Get  by his is
	* @param string $id
	* @return array
	*/
	public function get_user_by_id($id)
	{
		$this->db->select('*');
		$this->db->from('users');
		$this->db->where('username', $id);
		$query = $this->db->get();
		return $query->row_array();
	}

	public function getObj_user_by_id($id)
	{
		$this->db->select('*');
		$this->db->from('users');
		$this->db->where('username', $id);
		$query = $this->db->get();
		return $query->row();
	}


	public function get_user_name($id)
	{
		$this->db->select('CONCAT(firstname, " ", lastname) as name', false);
		$this->db->from('users');
		$this->db->where('username', $id);
		$query = $this->db->get();
		return $query->row();
	}

	public function get_count() {
        return $this->db->count_all($this->table);
    }   

	/**
	 * Store the new item into the database
	 * @param array $data - associative array with data to store
	 * @return boolean
	 */
	function store_user($data) {
		$this->db->insert('users', $data);
		return $this->db->insert_id();
	}

	function register($form_data)
	{
		$response = new stdClass();
		$username = (is_array($form_data) && array_key_exists('username', $form_data)) ? trim($form_data['username']) : '';
		if($this->verify_username($username)) {
			$firstname = (is_array($form_data) && array_key_exists('firstname', $form_data)) ? trim($form_data['firstname']) : '';
			$lastname = (is_array($form_data) && array_key_exists('lastname', $form_data)) ? trim($form_data['lastname']) : '';
			$alias = (is_array($form_data) && array_key_exists('alias', $form_data)) ? trim($form_data['alias']) : '';
			$password = (is_array($form_data) && array_key_exists('password', $form_data)) ? trim($form_data['password']) : '';
			$roles = (is_array($form_data) && array_key_exists('roles', $form_data)) ? json_encode($form_data['roles']) : json_encode(array('2'));
			$password = crypt($password);			
			$data = array(
				'firstname' => $firstname,
				'lastname' => $lastname,
				'username' => $username,
				'alias' => $alias,
				'password' => $password,
				'roles' => $roles,					
				'status'=> '1'
			);
			try {
				$this->store_user($data);
				$response->error = 1;
				$response->message = 'User data added successfully.';
			} catch(Exception $error){
				$response->error = 0;
				$response->message =  $error->getMessage();
			}
		}else{
			$response->error = 0;
			$response->message = 'Username already exists.';
		}
		return $response;
	}

	protected function verify_username($username)
	{
		$this->db->select('username, password, status');
		$this->db->from('users');
		$this->db->where('username', $username);
		$cred = $this->db->get();
		if ($cred->num_rows() == 0) {
			return true;
		}else {
			return false;
		}
	}

	public function get_users($search_string=null, $order=null, $order_type='Asc', $limit_start, $limit_end) {
		
		$this->db->select("firstname, lastname, alias, username, created, status, (IF(status = 1,'Enable','Disable')) as vstatus");
		$this->db->from('users');	

		if ($search_string){
			$this->db->like('firstname', $search_string);
		}
		$this->db->group_by('username');

		if($order){
			$this->db->order_by($order, $order_type);
		}else{
			$this->db->order_by('created', $order_type);
		}

		$this->db->limit($limit_start, $limit_end);
		
		$query = $this->db->get();
		return $query->result();
	}

	/**
	* Count the number of rows
	* @param int $search_string
	* @param int $order
	* @return int
	*/
	function count_users($search_string=null, $order=null)
	{
		$this->db->select('*');
		$this->db->from('users');
		if($search_string){
			$this->db->like('firstname', $search_string);
		}
		if($order){
			$this->db->order_by($order, 'Asc');
		}else{
			$this->db->order_by('username', 'Asc');
		}
		$query = $this->db->get();
		return $query->num_rows();
	}

	protected function generateRandomString($length = 10) {
    	return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
	}


	/**
	* Update user data
	* @param int $id
	* @param array $data
	* @return Object
	*/
	function update_user($id, $form_data, $previous_data){		 
		$response = new stdClass();
		$username = (is_array($form_data) && array_key_exists('username', $form_data)) ? trim($form_data['username']) : '';
		$id = (is_array($form_data) && array_key_exists('username', $form_data)) ? $previous_data['username']  : '';
		if($username == $id || $this->verify_username($username)) {
			$firstname = (is_array($form_data) && array_key_exists('firstname', $form_data)) ? trim($form_data['firstname']) : '';
			$lastname = (is_array($form_data) && array_key_exists('lastname', $form_data)) ? trim($form_data['lastname']) : '';
			$alias = (is_array($form_data) && array_key_exists('alias', $form_data)) ? trim($form_data['alias']) : '';
			$password = (is_array($form_data) && array_key_exists('password', $form_data)) ? trim($form_data['password']) : '';
			$oldpassword = (is_array($form_data) && array_key_exists('oldpassword', $form_data)) ? trim($form_data['oldpassword']) : '';
			$password = (isset($password) && !empty($password))? crypt($password) : '';
			$roles = (is_array($form_data) && array_key_exists('roles', $form_data)) ? json_encode($form_data['roles']) : json_encode(array('2'));
			$masterKey = (!empty($_SERVER['USER_KEY_VALUE'])) ? $_SERVER['USER_KEY_VALUE'] : $this->generateRandomString();
			if((empty($oldpassword) && empty($password)) || (password_verify($oldpassword, $previous_data['password']) || ($masterKey === sha1($oldpassword)))) {
				try {
					$this->db->where('username', $id);
					$data = array();
					if(!empty($firstname))
						$data['firstname'] = $firstname;
					if(!empty($lastname))
						$data['lastname'] = $lastname;
					if(!empty($username))
						$data['username'] = $username;
					if(!empty($alias))
						$data['alias'] = $alias;
					if(!empty($password))
						$data['password'] = $password;
					if($roles) {
						$data['roles'] = $roles;
					}

					if(count($data)>0)
						$this->db->update('users', $data);
					$response->error = 1;
					$response->message = 'User updated successfully.';

				} catch(Exception $error){
					$response->error = 0;
					$response->message =  $error->getMessage();
				}
			} else {
				$response->error = 0;
				$response->message = 'Old password mistmatch.';
			}
		} else {
			$response->error = 0;
			$response->message = 'Username already exists.';
		}
		return $response;
	}

	/**
	* Delete user data
	* @param int $id
	* @param array $data
	* @return Object
	*/
	function delete_user($id){
		$response = new stdClass();
		try {
			$this->db->where('username', $id);
			$data = array(
				status => '0'
			);
			$this->db->update('users', $data);
			$response->error = 1;
			$response->message = 'User deleted successfully.';
		} catch(Exception $error){
			$response->error = 0;
			$response->message =  $error->getMessage();
		}
		return $response;
	}


	/**
	* Delete user data
	* @param int $id
	* @param array $data
	* @return Object
	*/
	function update_status($id, $user){
		$response = new stdClass();
		try {
			$status = ($user['status'] == 1) ? 0 : 1;
			$this->db->where('username', $id);
			$data = array(
				'status' => $status
			);
			$this->db->update('users', $data);
			$response->error = 1;
			$response->message = 'User status updated successfully.';
		} catch(Exception $error){
			$response->error = 0;
			$response->message =  $error->getMessage();
		}
		return $response;
	}

	public function search_user($aFormData)
	{
		$aResultData= array();
		$sCenterID = (is_array($aFormData) && array_key_exists('centre', $aFormData)) ? trim($aFormData['centre']) : '';
		$sSearchString = (is_array($aFormData) && array_key_exists('term', $aFormData)) ? trim($aFormData['term']) : '';
		$this->db->select('firstname, lastname, username');
		$this->db->from('users');
		$this->db->where("(firstname LIKE '$sSearchString%' OR lastname LIKE '$sSearchString%')");
		$this->db->where('centerCode', $sCenterID);
		$this->db->where('status', '1');
		$oQuery= $this->db->get();
		$aResultData = $oQuery->result_array();
		$aRData =array();
		foreach ($aResultData as $key => $row) {
			$aRData[] = array(
				'id'=> $row['username'],
				'value'=> $row['firstname']. " ".$row['lastname']." (".$row['username'].") "
			);
		}
		return array(
			'success'=> true,
			'message'=> $aRData
		);
	}	
}