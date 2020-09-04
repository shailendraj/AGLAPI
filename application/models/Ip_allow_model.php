<?php
class Ip_allow_Model extends CI_Model {
	
	function store_allowed_ip($data) {
		$this->db->insert('ip_allow', $data);
		return $this->db->insert_id();
	}

	function update_allowed_ip($data, $id) {
		$this->db->where("ipID", $id);
		$this->db->update("ip_allow", $data);
	}

	public function getObj_ip_by_id($id) {
		$this->db->select('*');
		$this->db->from('ip_allow');
		$this->db->where('ipID', $id);
		$query = $this->db->get();
		return $query->row();
	}

	 
	public function get_all($search_string=null, $order=null, $order_type='Asc', $limit_start, $limit_end) {		
		$this->db->select("ipID, name, status, ipStart, ipEnd, hostname, (IF(status = 1,'Enable','Disable')) as vstatus");
		$this->db->from('ip_allow');	

		if ($search_string){				
			$arrayOpt = explode('@', $search_string) ;	
			$searchOpt = array();
			foreach($arrayOpt as $opt) {
				$field =  explode(':', $opt);
				$fieldName = trim($field[0]);		
				$fieldVal = trim($field[1]);
				if(!empty($fieldVal)) {
					//$searchOpt[$fieldName] = trim($field[1]); 
					if(strtolower($fieldName) === 'ipstart') {
						$fieldVal = ip2long($fieldVal);
						$this->db->like($fieldName, $fieldVal);
					} elseif(strtolower($fieldName) === 'ipend') {
						$fieldVal = ip2long($fieldVal);
						$this->db->like($fieldName, $fieldVal);
					} else {	
						$this->db->like($fieldName, $fieldVal);					
					}	
				}
			}
		}		

		if($order){
			$this->db->order_by($order, $order_type);
		}else{
			$this->db->order_by('ipID', $order_type);
		}

		$this->db->limit($limit_start, $limit_end);
		
		$query = $this->db->get();
		return $query->result();
	}

	function count_ip_allow($search_string=null, $order=null) {
		$this->db->select('count(*) as row_count ');
		$this->db->from('ip_allow');

		if ($search_string){				
			$arrayOpt = explode('@', $search_string) ;	
			$searchOpt = array();
			foreach($arrayOpt as $opt) {
				$field =  explode(':', $opt);
				$fieldName = trim($field[0]);		
				$fieldVal = trim($field[1]);
				if(!empty($fieldVal)) {
					//$searchOpt[$fieldName] = trim($field[1]); 
					if(strtolower($fieldName) === 'ipstart') {
						$fieldVal = ip2long($fieldVal);
						$this->db->like($fieldName, $fieldVal);
					} elseif(strtolower($fieldName) === 'ipstart') {
						$fieldVal = ip2long($fieldVal);
						$this->db->like($fieldName, $fieldVal);
					} else {	
						$this->db->like($fieldName, $fieldVal);					
					}	
				}
			}
		}

		$query = $this->db->get();
		$rowObj = $query->row();
		return $rowObj->row_count;
	}


	function update_status($id, $ipaccess) {
		$response = new stdClass();
		try {
			$status = ($ipaccess['status'] == 1) ? 0 : 1;
			$this->db->where('ipID', $id);
			$data = array(
				'status' => $status
			);
			$this->db->update('ip_allow', $data);
			$response->error = 1;
			$response->message = 'IP access status updated successfully.';
		} catch(Exception $error){
			$response->error = 0;
			$response->message =  $error->getMessage();
		}
		return $response;
	}

	public function get_for_id($ipID) {
		$this->db->select('*');
		$this->db->from('ip_allow');
		$this->db->where('ipID', $ipID);
		$query = $this->db->get();
		return $query->row_array();
	}

	public function add_ipaccess($form_data){
		$response = new stdClass();
		$name = (is_array($form_data) && array_key_exists('name', $form_data)) ? trim($form_data['name']) : '';
		$hostname = (is_array($form_data) && array_key_exists('hostname', $form_data)) ? trim($form_data['hostname']) : '';
		$ipstart = (is_array($form_data) && array_key_exists('ipstart', $form_data)) ? ip2long($form_data['ipstart']) : '0';
		$ipend = (is_array($form_data) && array_key_exists('ipend', $form_data)) ? ip2long($form_data['ipend']) : '0';
		$menuStatus = (is_array($form_data) && array_key_exists('menuStatus', $form_data)) ? trim($form_data['menuStatus']) : '1';
		$data = [
			'name' => $name,
			'hostname' => $hostname,
			'ipStart' => $ipstart,
			'ipEnd' => $ipend,			
			'status' => $menuStatus
		];			
		try {
			$this->store_allowed_ip($data);
			$response->error = 1;
			$response->message = 'Ip access data added successfully.';
		} catch(Exception $error){
			$response->error = 0;
			$response->message =  $error->getMessage();
		}		
		return $response;
	}

	function update_ipaccess($id, $form_data, $previous_data){
		$response = new stdClass();				
		$id = (is_array($form_data) && array_key_exists('ipID', $form_data)) ? $previous_data['ipID']  : '';
		if(!empty($id)) {
			$name = (is_array($form_data) && array_key_exists('name', $form_data)) ? trim($form_data['name']) : '';
			$hostname = (is_array($form_data) && array_key_exists('hostname', $form_data)) ? trim($form_data['hostname']) : '';
			$ipstart = (is_array($form_data) && array_key_exists('ipstart', $form_data)) ? ip2long($form_data['ipstart']) : '0';
			$ipend = (is_array($form_data) && array_key_exists('ipend', $form_data)) ? ip2long($form_data['ipend']) : '0';					
			try {
				$this->db->where('ipId', $id);
				$data = array();
				if(!empty($name))
					$data['name'] = $name;
				if(!empty($hostname))
					$data['hostname'] = $hostname;
				if(!empty($ipstart))
					$data['ipStart'] = $ipstart;
				if(!empty($ipend))
					$data['ipEnd'] = $ipend;			
				if(count($data)>0)
					$this->db->update('ip_allow', $data);
				$response->error = 1;
				$response->message = 'IP access updated successfully.';
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
}