<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Caf_submission_report extends CI_Model{
    
    function __construct() {
        // Set table name
        $this->table = 'caf_submission_report';
    }
    
    /*
     * Fetch members data from the database
     * @param array filter data based on the passed parameters
     */
    function getRows($params = array()){
        $this->db->select('*');
        $this->db->from($this->table);
        
        if(array_key_exists("where", $params)){
            foreach($params['where'] as $key => $val){
                $this->db->where($key, $val);
            }
        }
        
        if(array_key_exists("returnType",$params) && $params['returnType'] == 'count'){
            $result = $this->db->count_all_results();
        } else {
            if(array_key_exists("date_added", $params)){
                $this->db->where('date_added', $params['date_added']);
                $query = $this->db->get();
                $result = $query->row_array();
            } else {
                $this->db->order_by('date_added', 'desc');
                if(array_key_exists("start",$params) && array_key_exists("limit",$params)){
                    $this->db->limit($params['limit'],$params['start']);
                }elseif(!array_key_exists("start",$params) && array_key_exists("limit",$params)){
                    $this->db->limit($params['limit']);
                }
                
                $query = $this->db->get();
                $result = ($query->num_rows() > 0)?$query->result_array():FALSE;
            }
        }
        
        // Return fetched data
        return $result;
    }
    
    /*
     * Insert members data into the database
     * @param $data data to be insert based on the passed parameters
     */
    public function insert($data = array()) {
        if(!empty($data)){
            // Add created and modified date if not included
            if(!array_key_exists("date_added", $data)){
                $data['date_added'] = date("Y-m-d H:i:s");
            }
            // update previous status from 1(active) to 0(inactive) //  
		    $count = $this->getPreviousLeadStatus($data['id'], $data['fileimport_ID']);
			if($count[0]['statuscount'] > 0) {
				$this->updateLeadPreviousStatus($data['id'], $data['fileimport_ID']);
			}
            // Insert member data
			$insert = $this->db->insert($this->table, $data);
            
            // Return the status
            return $insert?$this->db->insert_id():false;
        }
        return false;
    }
    
    /*
     * Update member data into the database
     * @param $data array to be update based on the passed parameters
     * @param $condition array filter data
     */
    public function update($data, $condition = array()) {
        if(!empty($data)){
            // Add modified date if not included
            if(!array_key_exists("MODIFIED_DATE", $data)){
                $data['MODIFIED_DATE'] = date("Y-m-d H:i:s");
            }
            
            // Update member data
            $update = $this->db->update($this->table, $data, $condition);
            
            // Return the status
            return $update?true:false;
        }
        return false;
    }
	
	public function getPreviousLeadStatus($iId, $iFile)
	{
		$this->db->select('count(*) as statuscount');
		$this->db->from('caf_submission_report');
		$this->db->where('id', $iId);
		$this->db->where('status', 1);
		$this->db->where('fileimport_ID', $iFile);
		$query = $this->db->get();
		return $query->result_array();		
	}
	public function updateLeadPreviousStatus($iId, $iFile) {
		$this->db->where('id', $iId);
		$this->db->where('fileimport_ID', $iFile);
		$data = array(
			'status' => 0
		);
		$this->db->update('caf_submission_report', $data);
	}
}