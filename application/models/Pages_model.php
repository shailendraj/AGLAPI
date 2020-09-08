<?php
class Pages_Model extends CI_Model
{

	/**
	* Get  by his is
	* @param string $id
	* @return array
	*/
	public function get_page_by_id($id)
	{
		$this->db->select('*');
		$this->db->from('pages');
		$this->db->where('page_id', $id);
		$query = $this->db->get();
		return $query->row_array();
	}

	public function getObj_page_by_id($id)
	{
		$this->db->select('*');
		$this->db->from('pages');
		$this->db->where('page_id', $id);
		$query = $this->db->get();
		return $query->row();
	}


	public function get_page_by_uri($page_url_path)
	{
		$this->db->select('*');
		$this->db->from('pages');
		$this->db->where('page_url_path', $page_url_path);
		$query = $this->db->get();
		return $query->row();
	}

	protected function store_page($data) {
		$this->db->insert('pages', $data);
		return $this->db->insert_id();
	}

	public function add_page($form_data)
	{
		$response = new stdClass();
		$page_name = (is_array($form_data) && array_key_exists('page_name', $form_data)) ? trim($form_data['page_name']) : '';
		$page_url_path = (is_array($form_data) && array_key_exists('page_url_path', $form_data)) ? trim($form_data['page_url_path']) : '';
		$module = (is_array($form_data) && array_key_exists('module', $form_data)) ? trim($form_data['module']) : '0';
		$parentPageId = (is_array($form_data) && array_key_exists('parentPageId', $form_data)) ? trim($form_data['parentPageId']) : '0';
		$menuStatus = (is_array($form_data) && array_key_exists('menuStatus', $form_data)) ? trim($form_data['menuStatus']) : '';
		$data = [
			'page_name' => $page_name,
			'page_url_path' => $page_url_path,
			'module' => $module,
			'parentPageId' => $parentPageId,
			'menuStatus' => $menuStatus,
			'status' => '1'
		];			
		try {
			$this->store_page($data);
			$response->error = 1;
			$response->message = 'Page data added successfully.';
		} catch(Exception $error){
			$response->error = 0;
			$response->message =  $error->getMessage();
		}		
		return $response;
	}	


	function update_page($id, $form_data, $previous_data){
		$response = new stdClass();				
		$id = (is_array($previous_data) && array_key_exists('page_id', $previous_data)) ? $previous_data['page_id']  : '';
		if(!empty($id)) {
			$page_name = (is_array($form_data) && array_key_exists('page_name', $form_data)) ? trim($form_data['page_name']) : '';
			$page_url_path = (is_array($form_data) && array_key_exists('page_url_path', $form_data)) ? trim($form_data['page_url_path']) : '';
			$parentPageId = (is_array($form_data) && array_key_exists('parentPageId', $form_data)) ? ip2long($form_data['parentPageId']) : '0';
			$menuStatus = (is_array($form_data) && array_key_exists('menuStatus', $form_data)) ? ip2long($form_data['menuStatus']) : '0';					
			try {
				$this->db->where('page_id', $id);
				$data = array();
				if(!empty($page_name))
					$data['page_name'] = $page_name;
				if(!empty($page_url_path))
					$data['page_url_path'] = $page_url_path;
				if(!empty($parentPageId))
					$data['parentPageId'] = $parentPageId;
				if(!empty($menuStatus))
					$data['menuStatus'] = $menuStatus;			
				if(count($data)>0)
					$this->db->update('pages', $data);
				$response->error = 1;
				$response->message = 'Page updated successfully.';
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
	
	public function count_pages($search_string=null, $order=null) {
		$this->db->select('count(*) as row_count ');
		$this->db->from('pages');
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
		$this->db->select("page_id, page_name, page_url_path,module, parentPageId, menuStatus, (IF(menuStatus = '1','YES','NO')) as mstatus, status, (IF(status = '1','Enable','Disable')) as vstatus");
		$this->db->from('pages');	

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
			$this->db->order_by('page_id', $order_type);
		}

		$this->db->limit($limit_start, $limit_end);
		
		$query = $this->db->get();
		return $query->result();
	}

	function update_status($id, $page) {
		$response = new stdClass();
		try {
			$status = ($page['status'] == '1') ? '0' : '1';
			$this->db->where('page_id', $id);
			$data = array(
				'status' => $status
			);
			$this->db->update('pages', $data);
			$response->error = 1;
			$response->message = 'Page status updated successfully.';
		} catch(Exception $error){
			$response->error = 0;
			$response->message =  $error->getMessage();
		}
		return $response;
	}


	public function get_page_options() {
		$this->db->select("page_id, page_name, page_url_path, module, parentPageId, menuStatus ");
		$this->db->from('pages');	 
		$this->db->where('status', '1');
		$query = $this->db->get();
		return $query->result_array();				
	}

	protected function get_menu_option($parentId) {
		$this->db->select("page_id, page_name, page_url_path, module, parentPageId, menuStatus ");
		$this->db->from('pages');
		$this->db->where('parentPageId', $parentId);
		$this->db->where('status', '1');
		$query = $this->db->get();
		return $query->result_array();				
	}

	public function get_main_list() {
		$result = $this->get_menu_option(0); // FIRST LAVEL
		$menu = array();
		foreach($result as $firstKey => $row) {
			$pageId = $row['page_id'];
			$secondOption = $this->get_menu_option($pageId); //SENCOND LEVEL
			if(count($secondOption)>0) {
				foreach($secondOption as $secondKey => $temprow) {
					$pageId = $temprow['page_id'];
					$thirdOption = $this->get_menu_option($pageId); //THIRD LAVEL					
					if(count($thirdOption)> 0){
						$temprow['submenu'] = $thirdOption;
						$secondOption[$secondKey] = $temprow;
					}					
				}
				$row['submenu'] = $secondOption;
			} 
			$menu[] = $row;
		}
		return $menu;
	}


	public function get_page_uri(){
		$this->db->select("page_id, page_name, page_url_path");
		$this->db->from('pages');		
		$this->db->where('status', '1');
		$query = $this->db->get();
		$result = $query->result();
		$uri = array();
		foreach($result as $row) {
			$uri[$row->page_id] = $row->page_url_path;
		}
		return $uri;
	}	


	public function get_active_menus($module = 0) {
		$this->db->select('pg.page_id, pg.page_name, pg.page_url_path');
		$this->db->from('pages as pg');				
		if(!empty($module)) {
			$this->db->where('pg.module', $module);	
		}
		$this->db->where('pg.status', '1');		
		$this->db->order_by('pg.sequence_order', 'ASC');
		$query = $this->db->get();
		return $query->result();
	}
}