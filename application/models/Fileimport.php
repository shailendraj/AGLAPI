<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Fileimport extends CI_Model{
    
    function __construct() {
        // Set table name
        $this->table = 'fileimport';
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
        }else{
            if(array_key_exists("id", $params)){
                $this->db->where('id', $params['id']);
                $query = $this->db->get();
                $result = $query->row_array();
            }else{
                $this->db->order_by('id', 'desc');
                if(array_key_exists("start",$params) && array_key_exists("limit",$params)){
                    $this->db->limit($params['limit'],$params['start']);
                }elseif(!array_key_exists("start",$params) && array_key_exists("limit",$params)){
                    $this->db->limit($params['limit']);
                }
                
                $query = $this->db->get();
                $result = ($query->num_rows() > 0)?$query->result_array():FALSE;
            }
        }
        //echo $this->db->last_query();
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
            if(!array_key_exists("imported_date", $data)){
                $data['imported_date'] = date("Y-m-d H:i:s");
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
	
	public function checkfileexists($filename)
	{
		$this->db->select('count(*) as filecount');
		$this->db->from('fileimport');
		$this->db->where('filename', $filename);		
		$query = $this->db->get();
		return $query->row();		
	}
	
	public function get_file_data_row($search_string=null, $order=null, $order_type='Desc', $limit_start, $limit_end) {
		$this->db->select('*');
        $this->db->from($this->table);
		$searchString = '';
		$searchString2 = '';
		
		if ($search_string){				
			$arrayOpt = explode('@', $search_string) ;	
			$searchOpt = array();
			foreach($arrayOpt as $opt) {
				$field =  explode(':', $opt);
				$fieldName = trim($field[0]);		
				$fieldVal = trim($field[1]);
				if(!empty($fieldVal)) {
					//$searchOpt[$fieldName] = trim($field[1]); 
					if($fieldName === 'filename') {
						$searchString =  explode(' ', $fieldVal);						
						$this->db->like('filename', $searchString[0]);						
					} elseif($fieldName === 'imported_date' || $fieldName === 'imported_date_to') {
						if($fieldName === 'imported_date') {
							$searchString =  explode(' ', $fieldVal);
						}
						if($fieldName === 'imported_date_to') {
							$searchString2 =  explode(' ', $fieldVal);
						}																
					} else if($searchString == '' && $searchString2 == '') {
						$this->db->like($fieldName, $fieldVal);
					}
				}
			}
			if($searchString != '' && $searchString2 != '') {				
				$this->db->where("date(imported_date) BETWEEN '" . $searchString[0] . "' AND '" . $searchString2[0] . "'");
			}
		}
		
		if($order) {
			$this->db->order_by($order, $order_type);
		} else {
			$this->db->order_by('id', $order_type);
		}
		//echo $limit_start."---".$limit_end
		$this->db->limit($limit_start, $limit_end);
        $query = $this->db->get();
		//echo $this->db->last_query();
        $result = ($query->num_rows() > 0)?$query->result_array():FALSE;       
        return $result;
	}
	
	public function count_files($search_string=null, $order=null)
	{	   
		$this->db->select('*');
		$this->db->from('fileimport');
		//echo $search_string;
		if ($search_string){				
			$arrayOpt = explode('@', $search_string);	
			$searchOpt = array();
			$searchString = '';
			$searchString2 = '';
			
			foreach($arrayOpt as $opt) {
				$field =  explode(':', $opt);				
				$fieldName = trim($field[0]);		
				$fieldVal = trim($field[1]);				
				if(!empty($fieldVal)) {
					//$searchOpt[$fieldName] = trim($field[1]); 
					if($fieldName === 'filename') {
						$searchString =  explode(' ', $fieldVal);						
						$this->db->like('filename', $searchString[0]);						
					} elseif($fieldName === 'imported_date' || $fieldName === 'imported_date_to') {
						if($fieldName === 'imported_date') {
							$searchString =  explode(' ', $fieldVal);
						}
						if($fieldName === 'imported_date_to') {
							$searchString2 =  explode(' ', $fieldVal);
						}																
					} else if($searchString == '' && $searchString2 == '') {
						$this->db->like($fieldName, $fieldVal);
					}
				}
			}
			if($searchString != '' && $searchString2 != '') {				
				$this->db->where("date(imported_date) BETWEEN '" . $searchString[0] . "' AND '" . $searchString2[0] . "'");
			}
		}				
		if($order){
			$this->db->order_by($order, 'Asc');
		} else {
			$this->db->order_by('id', 'Asc');
		}
		$query = $this->db->get();
 		
		return $query->num_rows();
	}
}