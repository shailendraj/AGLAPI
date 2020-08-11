<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Aglupload extends CI_Model{
    
    function __construct() {
        // Set table name
        $this->table = 'aglupload';
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
			if(array_key_exists("FILE_IMPORT_ID", $params)) {
				$this->db->where('FILE_IMPORT_ID', $params['FILE_IMPORT_ID']);
                $query = $this->db->get();
                $result = $query->result_array();
			} else if(array_key_exists("id", $params)){
                $this->db->where('id', $params['id']);
                $query = $this->db->get();
                $result = $query->row_array();
            } else {
                $this->db->order_by('id', 'desc');
                if(array_key_exists("start",$params) && array_key_exists("limit",$params)) {
                    $this->db->limit($params['limit'],$params['start']);
                } elseif(!array_key_exists("start",$params) && array_key_exists("limit",$params)) {
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
            if(!array_key_exists("DATE_ADDED", $data)){
                $data['DATE_ADDED'] = date("Y-m-d H:i:s");
            }
            if(!array_key_exists("MODIFIED_DATE", $data)){
                $data['MODIFIED_DATE'] = date("Y-m-d H:i:s");
            }
            
            // Insert member data			
            $insert = $this->db->insert($this->table, $data);
			//echo $this->db->last_query()."<br/>";
            
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
	
	public function getFileDataWithDataCount($iFileId) {
		$this->db->select('count(*) as reccount');
		$this->db->from('aglupload');
		$this->db->where('FILE_IMPORT_ID', $iFileId);		
		$query = $this->db->get();
		return $query->row();
	}
	
	public function fetch_agl_data($iFileId) {
	  $this->db->select("VENDOR,VENDOR_BP,CHANNEL,BATCH_NUMBER,TRANSACTION_TYPE,LEAD_ID,PROGRAM,TITLE,NAME_FIRST,NAME_MIDDLE,NAME_LAST,DOB,BUILDING_NAME,FLOOR,LOT_NUMBER,UNIT_NUMBER,STREET_NUMBER,STREET_NAME,SUBURB,STATE,POSTCODE,PHONE_HOME,PHONE_WORK,PHONE_MOBILE,EMAIL,MARKETING,ECONF_PACK_CONSENT,ECOMM_CONSENT,PRIMARY_SMS_CONSENT,CREDIT_CONSENT,AP_TITLE,AP_FIRST_NAME,AP_MIDDLE_NAME,AP_LAST_NAME,AP_PHONE_HOME,AP_PHONE_WORK,AP_PHONE_MOBILE,AP_DOB,AP_DRIVERS_LICENSE,BUSINESS_NAME,LEGAL_NAME,ABN,ACN,BUSINESS_TYPE,MAILING_BUILDING_NAME,MAILING_FLOOR,MAILING_LOT_NUMBER,MAILING_UNIT_NUMBER,MAILING_STREET_NUMBER,MAILING_STREET_NAME,MAILING_SUBURB,MAILING_STATE,MAILING_POSTCODE,CONCESSION_TYPE,CONCESSION_NUMBER,VALID_TO,DRIVERS_LICENSE,PASSPORT,MEDICARE_NUMBER,LIFE_SUPPORT,DD_REQ,NMI,DPI_MIRN,METER_NUMBER_E,METER_NUMBER_G,METER_TYPE,METER_HAZARD_E,DOG_CODE_G,SITE_ACCESS_E,SITE_ACCESS_G,RE_EN_REMOTE_SAFETY_CONFIRMATION,DE_EN_REMOTE_SAFETY_CONFIRMATION,SO_REQ,RETAILER,CAMPAIGN,SALES_DATE,CONTRACT_NUMBER,OFFER_TYPE,PRODUCT_CODE_E,PRODUCT_CODE_G,CAMPAIGN_CODE_RES_ELEC,CAMPAIGN_CODE_RES_GAS,CAMPAIGN_CODE_SME_ELEC,CAMPAIGN_CODE_SME_GAS,MATRIX_CODE,TARIFF_TYPE,FLEX_PRICE,REFERRER_NUMBER,FLYBUYS_CONSENT,FLYBUYS_NUMBER,FLYBUYS_POINTS,AEO_REG,OWN_RENT,PROMOTION_CODE,MERCH_REQ,AGL_ASSIST,GAS_OFFER,ELEC_OFFER,MOVEIN_DATE_E,MOVEIN_DATE_G,MOVEIN_INSTRUCT_E,MOVEIN_INSTRUCT_G,MOVEOUT_DATE_E,MOVEOUT_DATE_G,MOVEOUT_INSTRUCT_E,MOVEOUT_INSTRUCT_G,GREENSALE,AARH_DONATION,EPFS_REQ,SALES_AGENT,EXISTING_GAS_BP_NUMBER,EXISTING_ELEC_BP_NUMBER,EXISTING_CRN_NUMBER,CANCELLATION_DATE,CANCELLATION_TYPE,CANCELLATION_REASON,CANCELLATION_REASON_OTHER,CHANGE_REQUEST,CHANGE_REQUEST_DATE,COMMENTS");
	  $this->db->from('aglupload');
	  $this->db->where('FILE_IMPORT_ID', $iFileId);
	  return $this->db->get();
	}
	public function fetch_aglcaf_response($iId) {	  
	  $this->db->select("CORRELATION_ID, LEAD_ID, MODIFIED_DATE, AGL_STATUS");
	  $this->db->from('aglupload');
	  $this->db->where('FILE_IMPORT_ID', $iId);	  	  	 
	  return $this->db->get()->result_array();	 
	}
}