<?php
class Roles_Model extends CI_Model
{

	/**
	* Get  by his is
	* @param string $id
	* @return array
	*/
	public function get_role_by_id($id)
	{
		$this->db->select('*');
		$this->db->from('roles');
		$this->db->where('role_id', $id);
		$query = $this->db->get();
		return $query->row_array();
	}

	public function getObj_role_by_id($id)
	{
		$this->db->select('*');
		$this->db->from('roles');
		$this->db->where('role_id', $id);
		$query = $this->db->get();
		return $query->row();
	}

	protected function store_role($data) {
		$this->db->insert('roles', $data);
		return $this->db->insert_id();
	}

	public function add_role($form_data) {
		$response = new stdClass();
		$role_name = (is_array($form_data) && array_key_exists('role_name', $form_data)) ? trim($form_data['role_name']) : '';
		$role_description = (is_array($form_data) && array_key_exists('role_description', $form_data)) ? trim($form_data['role_description']) : '';
		$pages = (is_array($form_data) && array_key_exists('pages', $form_data)) ? $form_data['pages'] : array();

		$page_permissions = (is_array($pages) && count($pages)>0) ? json_encode($pages) : '';
		 
		$data = [
			'role_name' => $role_name,
			'role_description' => $role_description,	
			'page_permissions' => $page_permissions,		 
			'status' => '1'
		];			
		try {
			$this->store_role($data);
			$response->error = 1;
			$response->message = 'Role data added successfully.';
		} catch(Exception $error){
			$response->error = 0;
			$response->message =  $error->getMessage();
		}		
		return $response;
	}	


	function update_role($id, $form_data, $previous_data){
		$response = new stdClass();				
		$id = (is_array($previous_data) && array_key_exists('role_id', $previous_data)) ? $previous_data['role_id']  : '';
		if(!empty($id)) {
			$role_name = (is_array($form_data) && array_key_exists('role_name', $form_data)) ? trim($form_data['role_name']) : '';
			$role_description = (is_array($form_data) && array_key_exists('role_description', $form_data)) ? trim($form_data['role_description']) : '';
			$pages = (is_array($form_data) && array_key_exists('pages', $form_data)) ? $form_data['pages'] : array();

			$page_permissions = (is_array($pages) && count($pages)>0) ? json_encode($pages) : '';					
			try {
				$this->db->where('role_id', $id);
				$data = array();
				if(!empty($role_name))
					$data['role_name'] = $role_name;
				if(!empty($role_description))
					$data['role_description'] = $role_description;
				if(!empty($page_permissions))
					$data['page_permissions'] = $page_permissions;
				 		
				if(count($data)>0)
					$this->db->update('roles', $data);
				$response->error = 1;
				$response->message = 'Role updated successfully.';
			} catch(Exception $error){
				$response->error = 0;
				$response->message =  $error->getMessage();
			}			
		} else {
			$response->error = 0;
			$response->message = 'ID not found.';
		}
		return $response;
	}
	
	public function count_roles($search_string=null, $order=null) {
		$this->db->select('count(*) as row_count ');
		$this->db->from('roles');
		$ignore = array(1, 2);
		$this->db->where_not_in('role_id', $ignore);
		if ($search_string){				
			$arrayOpt = explode('@', $search_string) ;	
			$searchOpt = array();
			foreach($arrayOpt as $opt) {
				$field =  explode(':', $opt);
				$fieldName = trim($field[0]);		
				$fieldVal = trim($field[1]);
				if(!empty($fieldVal)) {
					//$searchOpt[$fieldName] = trim($field[1]); 
					$this->db->like($fieldName, $fieldVal);					
				}
			}
		}	
		$query = $this->db->get();
		$rowObj = $query->row();
		return $rowObj->row_count;
	}

	public function get_all($search_string=null, $order=null, $order_type='Asc', $limit_start, $limit_end) {		
		$this->db->select("role_id, role_name, role_description, page_permissions, status, (IF(status = '1','Enable','Disable')) as vstatus");
		$this->db->from('roles');	
		$ignore = array(1, 2);
		$this->db->where_not_in('role_id', $ignore);

		if ($search_string){				
			$arrayOpt = explode('@', $search_string) ;	
			$searchOpt = array();
			foreach($arrayOpt as $opt) {
				$field =  explode(':', $opt);
				$fieldName = trim($field[0]);		
				$fieldVal = trim($field[1]);
				if(!empty($fieldVal)) {
					//$searchOpt[$fieldName] = trim($field[1]); 
					$this->db->like($fieldName, $fieldVal);					
				}
			}
		}		
		if($order){
			$this->db->order_by($order, $order_type);
		}else{
			$this->db->order_by('role_id', $order_type);
		}

		$this->db->limit($limit_start, $limit_end);
		
		$query = $this->db->get();
		return $query->result();
	}

	function update_status($id, $role) {
		$response = new stdClass();
		try {
			$status = ($role['status'] == '1') ? '0' : '1';
			$this->db->where('role_id', $id);
			$data = array(
				'status' => $status
			);
			$this->db->update('roles', $data);
			$response->error = 1;
			$response->message = 'Role status updated successfully.';
		} catch(Exception $error){
			$response->error = 0;
			$response->message =  $error->getMessage();
		}
		return $response;
	}

	public function get_roles() {
		$this->db->select("role_id, role_name");
		$this->db->from('roles');	
		$ignore = array(1);
		$this->db->where_not_in('role_id', $ignore);
		$this->db->where('status', '1');
		$this->db->order_by('role_id', 'ASC');
		$query = $this->db->get();
		return $query->result();
	}

	public function get_allow_page_ids($roles) {
		$this->db->select("role_id, role_name, page_permissions");
		$this->db->from('roles');
		$this->db->where_in('role_id', $roles);
		$this->db->where('status', '1');
		$query = $this->db->get();
		$result = $query->result();
		$pageIds = array();
		foreach ($result as $row) {
			$pages = (!empty($row->page_permissions)) ? json_decode($row->page_permissions) : array();
			foreach ($pages as $pageid) {
				$pageIds[]  = $pageid;
			}
		}
		return array_unique($pageIds);
	}

}