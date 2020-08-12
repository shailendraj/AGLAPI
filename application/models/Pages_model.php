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
		$this->db->where('username', $id);
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

	protected function store_page($data) {
		$this->db->insert('pages', $data);
		return $this->db->insert_id();
	}
	function add_page($form_data)
	{
		$response = new stdClass();
		$page_name = (is_array($form_data) && array_key_exists('page_name', $form_data)) ? trim($form_data['page_name']) : '';
		$page_url_path = (is_array($page_url_path) && array_key_exists('page_url_path', $form_data)) ? trim($form_data['page_url_path']) : '';
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
			$response->message = 'User data added successfully.';
		} catch(Exception $error){
			$response->error = 0;
			$response->message =  $error->getMessage();
		}		
		return $response;
	}	
}