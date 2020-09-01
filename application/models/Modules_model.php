<?php 
class Modules_Model extends CI_Model {

	public function get_dashboard_modules($allowedIds) {
		/*
		$this->db->select('md.name,md.redirect_url_page, pg.page_url_path');
		$this->db->from('modules as md');
		$this->db->join('pages as pg', 'md.redirect_url_page = pg.page_id');
		$this->db->where('md.status', '1');
		$this->db->where('md.redirect_url_page !=', null);
		$this->db->where_in('pg.redirect_url_page', $allowedIds);
		*/
		$allows = implode(",", $allowedIds);
		$this->db->select('md.name,md.redirect_url_page, pg.page_url_path');
		$this->db->from('modules as md');
		$this->db->join('(SELECT module, page_url_path FROM pages WHERE page_id IN ('.$allows.') GROUP BY module ORDER BY sequence_order ASC) as pg', 'md.id = pg.module');
		$this->db->where('md.status', '1');
		$this->db->where('md.redirect_url_page !=', null);		
		$query = $this->db->get();
		return $query->result();
	}


	

	public function get_active_module($sepcfic_module = 0) {
		$this->db->select('id, name');
		$this->db->from('modules as md');
		if(!empty($sepcfic_module)) {
			$this->db->where('id', $sepcfic_module);	
		}
		$this->db->where('status', '1');
		$query = $this->db->get();
		return $query->result();
	} 

}	