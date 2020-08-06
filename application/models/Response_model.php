<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Response_model extends CI_Model{
	
	function __construct() {
		// Set table name
		//$this->table = 'response';
	}

	public function read() {   
	   $query = $this->db->query("select * from `response`");
	   return $query->result_array();
	}

	public function insert_data($data){	   
	   	$this->correlation_id = $data['correlation_id']; // please read the below note
	   	$this->vendor_lead_id = $data['vendor_lead_id'];
	   	$this->transaction_type = $data['transaction_type'];
	   	$this->code = $data['code'];
	   	$this->message = $data['message'];
	   	$this->errors = $data['errors'];
	   	$this->create_datetime = $data['create_datetime'];
	   	if($this->db->insert('response', $this)) {    
		   return true;
	   	} else {
		   return false;
	   	}
   }
}