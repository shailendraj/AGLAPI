<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Config_Model extends CI_Model{

	private static $db;
	function __construct() {
	    parent::__construct();
	    self::$db = &get_instance()->db;
	}

	public static function get_config_val($systemName) {
		self::$db->select('system_value');
		self::$db->from('config');
		self::$db->where('status', '1');
		self::$db->where('system_name', $systemName);
		$query = self::$db->get();
		$row = $query->row();
		return (!empty($row->system_value)) ? $row->system_value : ''; 
	}
}
