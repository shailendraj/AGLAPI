<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Agl extends CI_Controller {
   
	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	function __construct()
	{
		parent::__construct();
		$this->load->helper('common');
		$this->load->helper('db');
        
        $this->load->model('aglupload');
        
        // Load form validation library
        $this->load->library('form_validation');
        
        // Load file helper
        $this->load->helper('file');	
        $this->load->helper('url');		
	} 
	protected function common_view($page,  $data)
	{
		$this->load->view('templates/header', $data);
		$this->load->view($page, $data);
		$this->load->view('templates/footer', $data);
	}
	public function index()
	{
	    $data = array();
		// Get messages from the session
        if($this->session->userdata('success_msg')){
            $data['success_msg'] = $this->session->userdata('success_msg');
            $this->session->unset_userdata('success_msg');
        }
        if($this->session->userdata('error_msg')){
            $data['error_msg'] = $this->session->userdata('error_msg');
            $this->session->unset_userdata('error_msg');
        }
		
		if($this->session->userdata('api_token_result')){
            $data['token_msg'] = $this->session->userdata('api_token_result');
            $this->session->unset_userdata('token_msg');
        }
		
		if($this->session->userdata('set_token')){
            $data['token_msg'] = $this->session->userdata('set_token');            
        }
		// Get rows
        $data['agldata'] = $this->aglupload->getRows();
	    $this->common_view('agl', $data);		
	}
	
	// import starts here //
	
	public function import(){	    
        $data = array();
        $memData = array();
        
        // If import request is submitted
        if($this->input->post('importSubmit')){		    
            // Form field validation rules
            $this->form_validation->set_rules('file', 'CSV file', 'callback_file_check');              	
            // Validate submitted form data	
            if($this->form_validation->run() == true) {                			
                $insertCount = 0;
				$updateCount = 0;
				$rowCount = 0;
				$notAddCount = 0;
                
                // If file uploaded
                if(is_uploaded_file($_FILES['file']['tmp_name'])){
                    // Load CSV reader library
                    $this->load->library('CSVReader');
                    
                    // Parse data from CSV file
                    $csvData = $this->csvreader->parse_csv($_FILES['file']['tmp_name']);
					
                    
                    // Insert/update CSV data into database
                    if(!empty($csvData)){
                        foreach($csvData as $row){ 
						   $rowCount++;
                            
                            // Prepare data for DB insertion
                            $memData = array(
							    'VENDOR' => $row['VENDOR'],
								'VENDOR_BP' => $row['VENDOR_BP'],
								'CHANNEL' => $row['CHANNEL'],
								'BATCH_NUMBER' => $row['BATCH_NUMBER'],
								'TRANSACTION_TYPE' => $row['TRANSACTION_TYPE'],
								'LEAD_ID' => $row['LEAD_ID'],
								'PROGRAM' => $row['PROGRAM'],
								'TITLE' => $row['TITLE'],
								'NAME_FIRST' => $row['NAME_FIRST'],
								'NAME_MIDDLE' => $row['NAME_MIDDLE'],
								'NAME_LAST' => $row['NAME_LAST'],
								'DOB' => $row['DOB'],
								'BUILDING_NAME' => $row['BUILDING_NAME'],
								'FLOOR' => $row['FLOOR'],
								'LOT_NUMBER' => $row['LOT_NUMBER'],
								'UNIT_NUMBER' => $row['UNIT_NUMBER'],
								'STREET_NUMBER' => $row['STREET_NUMBER'],
								'STREET_NAME' => $row['STREET_NAME'],
								'SUBURB' => $row['SUBURB'],
								'STATE' => $row['STATE'],
								'POSTCODE' => $row['POSTCODE'],
								'PHONE_HOME' => $row['PHONE_HOME'],
								'PHONE_WORK' => $row['PHONE_WORK'],
								'PHONE_MOBILE' => $row['PHONE_MOBILE'],
								'EMAIL' => $row['EMAIL'],
								'MARKETING' => $row['MARKETING'],
								'ECONF_PACK_CONSENT' => $row['ECONF_PACK_CONSENT'],
								'ECOMM_CONSENT' => $row['ECOMM_CONSENT'],
								'PRIMARY_SMS_CONSENT' => $row['PRIMARY_SMS_CONSENT'],
								'CREDIT_CONSENT' => $row['CREDIT_CONSENT'],
								'AP_TITLE' => $row['AP_TITLE'],
								'AP_FIRST_NAME' => $row['AP_FIRST_NAME'],
								'AP_MIDDLE_NAME' => $row['AP_MIDDLE_NAME'],
								'AP_LAST_NAME' => $row['AP_LAST_NAME'],
								'AP_PHONE_HOME' => $row['AP_PHONE_HOME'],
								'AP_PHONE_WORK' => $row['AP_PHONE_WORK'],
								'AP_PHONE_MOBILE' => $row['AP_PHONE_MOBILE'],
								'AP_DOB' => $row['AP_DOB'],
								'AP_DRIVERS_LICENSE' => $row['AP_DRIVERS_LICENSE'],
								'BUSINESS_NAME' => $row['BUSINESS_NAME'],
								'LEGAL_NAME' => $row['LEGAL_NAME'],
								'ABN' => $row['ABN'],
								'ACN' => $row['ACN'],
								'BUSINESS_TYPE' => $row['BUSINESS_TYPE'],
								'MAILING_BUILDING_NAME' => $row['MAILING_BUILDING_NAME'],
								'MAILING_FLOOR' => $row['MAILING_FLOOR'],
								'MAILING_LOT_NUMBER' => $row['MAILING_LOT_NUMBER'],
								'MAILING_UNIT_NUMBER' => $row['MAILING_UNIT_NUMBER'],
								'MAILING_STREET_NUMBER' => $row['MAILING_STREET_NUMBER'],
								'MAILING_STREET_NAME' => $row['MAILING_STREET_NAME'],
								'MAILING_SUBURB' => $row['MAILING_SUBURB'],
								'MAILING_STATE' => $row['MAILING_STATE'],
								'MAILING_POSTCODE' => $row['MAILING_POSTCODE'],
								'CONCESSION_TYPE' => $row['CONCESSION_TYPE'],
								'CONCESSION_NUMBER' => $row['CONCESSION_NUMBER'],
								'VALID_TO' => $row['VALID_TO'],
								'DRIVERS_LICENSE' => $row['DRIVERS_LICENSE'],
								'PASSPORT' => $row['PASSPORT'],
								'MEDICARE_NUMBER' => $row['MEDICARE_NUMBER'],
								'LIFE_SUPPORT' => $row['LIFE_SUPPORT'],
								'DD_REQ' => $row['DD_REQ'],
								'NMI' => $row['NMI'],
								'DPI_MIRN' => $row['DPI_MIRN'],
								'METER_NUMBER_E' => $row['METER_NUMBER_E'],
								'METER_NUMBER_G' => $row['METER_NUMBER_G'],
								'METER_TYPE' => $row['METER_TYPE'],
								'METER_HAZARD_E' => $row['METER_HAZARD_E'],
								'DOG_CODE_G' => $row['DOG_CODE_G'],
								'SITE_ACCESS_E' => $row['SITE_ACCESS_E'],
								'SITE_ACCESS_G' => $row['SITE_ACCESS_G'],
								'RE_EN_REMOTE_SAFETY_CONFIRMATION' => $row['RE_EN_REMOTE_SAFETY_CONFIRMATION'],
								'DE_EN_REMOTE_SAFETY_CONFIRMATION' => $row['DE_EN_REMOTE_SAFETY_CONFIRMATION'],
								'SO_REQ' => $row['SO_REQ'],
								'RETAILER' => $row['RETAILER'],
								'CAMPAIGN' => $row['CAMPAIGN'],
								'SALES_DATE' => $row['SALES_DATE'],
								'CONTRACT_NUMBER' => $row['CONTRACT_NUMBER'],
								'OFFER_TYPE' => $row['OFFER_TYPE'],
								'PRODUCT_CODE_E' => $row['PRODUCT_CODE_E'],
								'PRODUCT_CODE_G' => $row['PRODUCT_CODE_G'],
								'CAMPAIGN_CODE_RES_ELEC' => $row['CAMPAIGN_CODE_RES_ELEC'],
								'CAMPAIGN_CODE_RES_GAS' => $row['CAMPAIGN_CODE_RES_GAS'],
								'CAMPAIGN_CODE_SME_ELEC' => $row['CAMPAIGN_CODE_SME_ELEC'],
								'CAMPAIGN_CODE_SME_GAS' => $row['CAMPAIGN_CODE_SME_GAS'],
								'MATRIX_CODE' => $row['MATRIX_CODE'],
								'TARIFF_TYPE' => $row['TARIFF_TYPE'],
								'FLEX_PRICE' => $row['FLEX_PRICE'],
								'REFERRER_NUMBER' => $row['REFERRER_NUMBER'],
								'FLYBUYS_CONSENT' => $row['FLYBUYS_CONSENT'],
								'FLYBUYS_NUMBER' => $row['FLYBUYS_NUMBER'],
								'FLYBUYS_POINTS' => $row['FLYBUYS_POINTS'],
								'AEO_REG' => $row['AEO_REG'],
								'OWN_RENT' => $row['OWN_RENT'],
								'PROMOTION_CODE' => $row['PROMOTION_CODE'],
								'MERCH_REQ' => $row['MERCH_REQ'],
								'AGL_ASSIST' => $row['AGL_ASSIST'],
								'GAS_OFFER' => $row['GAS_OFFER'],
								'ELEC_OFFER' => $row['ELEC_OFFER'],
								'MOVEIN_DATE_E' => $row['MOVEIN_DATE_E'],
								'MOVEIN_DATE_G' => $row['MOVEIN_DATE_G'],
								'MOVEIN_INSTRUCT_E' => $row['MOVEIN_INSTRUCT_E'],
								'MOVEIN_INSTRUCT_G' => $row['MOVEIN_INSTRUCT_G'],
								'MOVEOUT_DATE_E' => $row['MOVEOUT_DATE_E'],
								'MOVEOUT_DATE_G' => $row['MOVEOUT_DATE_G'],
								'MOVEOUT_INSTRUCT_E' => $row['MOVEOUT_INSTRUCT_E'],
								'MOVEOUT_INSTRUCT_G' => $row['MOVEOUT_INSTRUCT_G'],
								'GREENSALE' => $row['GREENSALE'],
								'AARH_DONATION' => $row['AARH_DONATION'],
								'EPFS_REQ' => $row['EPFS_REQ'],
								'SALES_AGENT' => $row['SALES_AGENT'],
								'EXISTING_GAS_BP_NUMBER' => $row['EXISTING_GAS_BP_NUMBER'],
								'EXISTING_ELEC_BP_NUMBER' => $row['EXISTING_ELEC_BP_NUMBER'],
								'EXISTING_CRN_NUMBER' => $row['EXISTING_CRN_NUMBER'],
								'CANCELLATION_DATE' => $row['CANCELLATION_DATE'],
								'CANCELLATION_TYPE' => $row['CANCELLATION_TYPE'],
								'CANCELLATION_REASON' => $row['CANCELLATION_REASON'],
								'CANCELLATION_REASON_OTHER' => $row['CANCELLATION_REASON_OTHER'],
								'CHANGE_REQUEST' => $row['CHANGE_REQUEST'],
								'CHANGE_REQUEST_DATE' => $row['CHANGE_REQUEST_DATE'],
								'COMMENTS' => $row['COMMENTS']
                            );                           
                            // Check whether leadid already exists in the database
                            $con = array(
                                'where' => array(
                                    'LEAD_ID' => $row['LEAD_ID']
                                ),
                                'returnType' => 'count'
                            );
                            $prevCount = $this->aglupload->getRows($con);
                            
                            if($prevCount > 0){
                                // Update agl data
                                $condition = array('LEAD_ID' => $row['LEAD_ID']);
                                $update = $this->aglupload->update($memData, $condition);
                                
                                if($update){
                                    $updateCount++;
                                }
                            } else {
                                // Insert agl data
                                $insert = $this->aglupload->insert($memData);
                                
                                if($insert){
                                    $insertCount++;
                                }
                            }
                        }
                        
                        // Status message with imported data count
                        $notAddCount = ($rowCount - ($insertCount + $updateCount));
                        $successMsg = 'CAF Data imported successfully. Total Rows ('.$rowCount.') | Inserted ('.$insertCount.') | Updated ('.$updateCount.') | Not Inserted ('.$notAddCount.')';
                        $this->session->set_userdata('success_msg', $successMsg);
                    }
                } else {
                    $this->session->set_userdata('error_msg', 'Error on file upload, please try again.');
                }
            } else {
                $this->session->set_userdata('error_msg', 'Invalid file, please select only CSV file.');
            }
        }		
        redirect('/');
    }
	
	// AGL API to get access token //
	public function validatetoken() {	    
        $data = array();
        
        // If validate request is submitted
        if($this->input->post('validateSubmit')){
            $msg = array();		
			$this->load->library('EXTApi');
			// Parse data from CSV file
			$customconfig = get_instance();  
			$url = $customconfig->config->item('token_url');
			$cid = $customconfig->config->item('client_id_dev');
			$secret = $customconfig->config->item('client_secret_dev');
			$data['client_id'] = $cid;
			$data['client_secret'] = $secret;
			$data['audience'] = "https://api.platform.agl.com.au/partners";
			$data['grant_type'] = "client_credentials";
			$data['content_type'] = "application/json";
			$result = $this->extapi->api_token('POST', $url, $data);			
			$result = json_decode($result, true);		
			if($result['access_token']) { // this function may change 			
			    $this->session->set_userdata('api_token_result', $result['access_token']);
				$this->validateSalesData($result['access_token']);
			} else {			
				$this->session->set_userdata('error_msg', 'Error on token assignment.');
			}			
        }		
        redirect('/');
    }
	
	public function validateSalesData($token) {		
		$this->load->library('EXTApi');
		// Parse data from CSV file
		$customconfig = get_instance();  
		$url = $customconfig->config->item('sales_url');		
		$configOCP = $customconfig->config->item('ocp_primary_key');		
		$agldata = $this->aglupload->getRows();
		foreach($agldata as $iKey=>$aData) {
			$agldata[$iKey] = $aData;
		}
		for($i=0;$i<=count($agldata)-1;$i++) { // prepare payload //
			$header = array(
				"offerType"=>$agldata[$i]['OFFER_TYPE'], 
				"dateOfSale"=> $agldata[$i]['SALES_DATE'],
				"vendorBusinessPartnerNumber"=> $agldata[$i]['VENDOR_BP'],
				"vendorName"=> $agldata[$i]['VENDOR'],
				"channel"=> $agldata[$i]['CHANNEL'],
				"retailer"=> $agldata[$i]['RETAILER'],
				"transactionType"=> $agldata[$i]['TRANSACTION_TYPE'],
				"vendorLeadId"=> $agldata[$i]['LEAD_ID']
			);
			$personDetail = array(
				"title"=> $agldata[$i]['TITLE'],
				"firstName"=> $agldata[$i]['NAME_FIRST'],
				"middleName"=> $agldata[$i]['NAME_MIDDLE'],
				"lastName"=> $agldata[$i]['NAME_LAST'],
				"dateOfBirth"=> $agldata[$i]['DOB']
			);
			$contactDetail = array(
				"emailAddress"=> $agldata[$i]['EMAIL'],
				"mobilePhone"=> $agldata[$i]['PHONE_MOBILE'],
				"homePhone"=> $agldata[$i]['PHONE_HOME'],
				"WorkPhone"=> $agldata[$i]['PHONE_WORK']
			);
			
			$mediCare = array(
				"medicareNumber"=> $agldata[$i]['MEDICARE_NUMBER'],
				"individualReferenceNumber"=> null // its not there in knack caf
			);
			$passport = array(
				"passportNumber"=> $agldata[$i]['PASSPORT']
			);
			$driversLicense = array(
				"licenseNumber"=> $agldata[$i]['DRIVERS_LICENSE']
			);
			$concessionCardDetail = array(
				"cardType"=> $agldata[$i]['CONCESSION_TYPE'],
				"cardNumber"=> $agldata[$i]['CONCESSION_NUMBER'],
				"dateOfExpiry"=> $agldata[$i]['VALID_TO']
			);
			$siteAddress = array(
				"ignoreAddressValidation"=> false,
				"buildingName"=> $agldata[$i]['BUILDING_NAME'],
				"floorNumber"=> $agldata[$i]['FLOOR'],
				"lotNumber"=> $agldata[$i]['LOT_NUMBER'],
				"unitNumber"=> $agldata[$i]['UNIT_NUMBER'],
				"streetNumber"=> $agldata[$i]['STREET_NUMBER'],
				"streetName"=> $agldata[$i]['STREET_NAME'],
				"suburb"=> $agldata[$i]['SUBURB'],
				"state"=> $agldata[$i]['STATE'],
				"postcode"=> $agldata[$i]['POSTCODE']
			);
			$siteMailingAddress = array(
				"ignoreAddressValidation"=> false,
				"postOfficeBoxNumber"=> null,
				"buildingName"=> $agldata[$i]['MAILING_BUILDING_NAME'],
				"floorNumber"=> $agldata[$i]['MAILING_FLOOR'],
				"lotNumber"=> $agldata[$i]['MAILING_LOT_NUMBER'],
				"unitNumber"=> $agldata[$i]['MAILING_UNIT_NUMBER'],
				"streetNumber"=> $agldata[$i]['MAILING_STREET_NUMBER'],
				"streetName"=> $agldata[$i]['MAILING_STREET_NAME'],
				"suburb"=> $agldata[$i]['MAILING_SUBURB'],
				"state"=> $agldata[$i]['MAILING_STATE'],
				"postcode"=> $agldata[$i]['MAILING_POSTCODE']
			);			
									
			$strHeader = "{\"header\":" . json_encode($header) . ",
						\"payload\": { 
							\"personDetail\": ". json_encode($personDetail) .",
							\"contactDetail\": ". json_encode($contactDetail) .",
							\"identification\":{
								\"medicare\": ". json_encode($mediCare) .",
								\"passport\": ". json_encode($passport) .",
								\"driversLicense\": ". json_encode($driversLicense) ."
							},
							\"concessionCardDetail\": ". json_encode($concessionCardDetail) .",
							\"siteAddress\": ". json_encode($siteAddress) .",
							\"mailingAddress\":{
								\"streetAddress\": ". json_encode($siteMailingAddress) ."
							},
							\"siteMeterDetail\":{
								\"electricity\": {
										\"nmi\":". $agldata[$i]['NMI'] ."
									},
									\"gas\": {
										\"mirn\":". $agldata[$i]['DPI_MIRN'] ."
									}
							},
							\"moveDetail\":{
								\"moveIn\": {
									\"electricity\": {
										\"date\":". $agldata[$i]['MOVEIN_DATE_E'] ."
									},
									\"gas\": {
										\"date\":". $agldata[$i]['MOVEIN_DATE_G'] ."
									}
								}
							},
							\"customerConsent\": {
								\"hasGivenCreditCheckConsent\": ".$agldata[$i]['CREDIT_CONSENT'].",
								\"hasGivenEBillingConsent\": ".$agldata[$i]['ECOMM_CONSENT']."
							},
							\"businessDetail\": null,
							\"businessIdentification\": null,
							\"authorisedContactPersonDetail\": null,
							\"authorisedPersonContact\": null,
							\"authorisedPersonIdentification\": null,
							\"cancellationDetail\": null,
							\"siteAdditionalDetail\": null
						}
					}";
		}					
		$result = $this->extapi->validate_sales($url, $strHeader, $token, $configOCP);
		print_r($result);
		exit;
	}
    
    /*
     * Callback function to check file value and type during validation
     */
    public function file_check($str){         
        $allowed_mime_types = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
        if(isset($_FILES['file']['name']) && $_FILES['file']['name'] != "") {
            $mime = get_mime_by_extension($_FILES['file']['name']);
            $fileAr = explode('.', $_FILES['file']['name']);
            $ext = end($fileAr);
            if(($ext == 'csv') && in_array($mime, $allowed_mime_types)) {
                return true;
            } else {
                $this->form_validation->set_message('file_check', 'Please select only CSV file to upload.');
                return false;
            }
        } else {		    
            $this->form_validation->set_message('file_check', 'Please select a CSV file to upload.');
            return false;
        }
    }
}
