<?php 
class Modules_Model extends CI_Model {

	public function get_dashboard_modules($allowedIds) {
		$this->db->select('md.name,md.redirect_url_page, pg.page_url_path');
		$this->db->from('modules as md');
		$this->db->join('pages as pg', 'md.redirect_url_page = pg.page_id');
		$this->db->where('md.status', '1');
		$this->db->where('md.redirect_url_page !=', null);
		$this->db->where_in('md.redirect_url_page', $allowedIds);
		$query = $this->db->get();
		return $query->result();
	}

}	