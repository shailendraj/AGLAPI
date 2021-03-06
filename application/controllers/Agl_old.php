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
		//$this->load->helper('common');
		//this->load->helper('db');
        
        $this->load->model('aglupload');
		$this->load->model('caf_submission_report');
		$this->load->model('fileimport');
        
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
		
		if($this->session->userdata('file_exists_msg')){
            $data['file_exists_msg'] = $this->session->userdata('file_exists_msg');
			$this->session->unset_userdata('file_exists_msg');
        }
		
		if($this->session->userdata('api_process_msg')){
            $data['api_process_msg'] = $this->session->userdata('api_process_msg'); 
            $this->session->unset_userdata('api_process_msg');			
        }
				
		// Get rows
        $data['filedata'] = $this->fileimport->getRows();
		if(!empty($data['filedata'])) {
			foreach($data['filedata'] as $iKey=>$aData) {			
				$data[$iKey]['filearr'] = array(
					'id'=>$aData['id'],
					'filename'=>$aData['filename'],
					'date_uploaded'=>$aData['imported_date'],
					'recordsCount'=>$this->aglupload->getFileDataWithDataCount($aData['id'])
				);
			array_push($data['filedata'], $data[$iKey]['filearr']);
			}
		}
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
				
				// check if the file already exists //
				$filealreadyexists = $this->fileimport->checkfileexists($_FILES['file']['name']);
				if($filealreadyexists->filecount == 0 ) {				    
				    $fileArr = array(
						'filename'=>$_FILES['file']['name'],
						'imported_by'=>'',
						'status'=>1						
					);
					$saveFile = $this->fileimport->insert($fileArr);
					$this->session->set_userdata('last_inserted_file_id', $saveFile);
				} else {
					$fileExistsMsg = 'File already exists ! please try another file name';
					$this->session->set_flashdata('file_exists_msg', $fileExistsMsg);
					redirect('/');
				}
                
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
							    'VENDOR' => "MLB",
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
								'DOB' => $row['DOB']!='' ? date("Y-m-d", strtotime($row['DOB'])) : '0000-00-00',
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
								'AP_DOB' => $row['AP_DOB']!='' ? date("Y-m-d", strtotime($row['AP_DOB'])) : '',
								'AP_DRIVERS_LICENSE' => $row['AP_DRIVERS_LICENSE'],
								'BUSINESS_NAME' => $row['BUSINESS_NAME'],
								'LEGAL_NAME' => $row['LEGAL_NAME'],
								'ABN' => $row['ABN'],
								'ACN' => $row['ACN'],
								'BUSINESS_TYPE' => $row['BUSINESS_TYPE'],
								'MAILING_POST_OFFICE_BOX_NUMBER' => $row['MAILING_POST_OFFICE_BOX_NUMBER'],
								'MAILING_BUILDING_NAME' => $row['MAILING_BUILDING_NAME'],
								'MAILING_FLOOR' => $row['MAILING_FLOOR'],
								'MAILING_LOT_NUMBER' => $row['MAILING_LOT_NUMBER'],
								'MAILING_UNIT_NUMBER' => $row['MAILING_UNIT_NUMBER'],
								'MAILING_STREET_NUMBER' => $row['MAILING_STREET_NUMBER'],
								'MAILING_STREET_NAME' => $row['MAILING_STREET_NAME'] != '' ? $row['MAILING_STREET_NAME'] : '',
								'MAILING_SUBURB' => $row['MAILING_SUBURB'],
								'MAILING_STATE' => $row['MAILING_STATE'],
								'MAILING_POSTCODE' => $row['MAILING_POSTCODE'],
								'CONCESSION_TYPE' => $row['CONCESSION_TYPE'],
								'CONCESSION_NUMBER' => $row['CONCESSION_NUMBER'],
								'VALID_TO' => $row['VALID_TO']!='' ? date("Y-m-d", strtotime($row['VALID_TO'])) : '',
								'DRIVERS_LICENSE' => $row['DRIVERS_LICENSE'],
								'PASSPORT' => $row['PASSPORT'],
								'MEDICARE_NUMBER' => $row['MEDICARE_NUMBER'],
								'INDIVIDUAL_REFERENCE_NUMBER' => $row['INDIVIDUAL_REFERENCE_NUMBER'],
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
								'SALES_DATE' => $row['SALES_DATE']!='' ? date("Y-m-d", strtotime($row['SALES_DATE'])) : '',
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
								'REFERRER_NUMBER' => $row['REFERRER_NUMBER'] != '' ? $row['REFERRER_NUMBER'] : '',
								'FLYBUYS_CONSENT' => $row['FLYBUYS_CONSENT'],
								'FLYBUYS_NUMBER' => $row['FLYBUYS_NUMBER'] != '' ? $row['FLYBUYS_NUMBER'] : '',
								'FLYBUYS_POINTS' => $row['FLYBUYS_POINTS'] != '' ? $row['FLYBUYS_POINTS'] : '',
								'AEO_REG' => $row['AEO_REG'],
								'OWN_RENT' => $row['OWN_RENT'],
								'PROMOTION_CODE' => $row['PROMOTION_CODE'],
								'MERCH_REQ' => $row['MERCH_REQ'],
								'AGL_ASSIST' => $row['AGL_ASSIST'],
								'GAS_OFFER' => $row['GAS_OFFER'],
								'ELEC_OFFER' => $row['ELEC_OFFER'],
								'MOVEIN_DATE_E' => $row['MOVEIN_DATE_E']!='' ? date("Y-m-d", strtotime($row['MOVEIN_DATE_E'])) : '',
								'MOVEIN_DATE_G' => $row['MOVEIN_DATE_G']!='' ? date("Y-m-d", strtotime($row['MOVEIN_DATE_G'])) : '',
								'MOVEIN_INSTRUCT_E' => $row['MOVEIN_INSTRUCT_E'],
								'MOVEIN_INSTRUCT_G' => $row['MOVEIN_INSTRUCT_G'],
								'MOVEOUT_DATE_E' => $row['MOVEOUT_DATE_E']!='' ? date("Y-m-d", strtotime($row['MOVEOUT_DATE_E'])) : '',
								'MOVEOUT_DATE_G' => $row['MOVEOUT_DATE_G']!='' ? date("Y-m-d", strtotime($row['MOVEOUT_DATE_G'])) : '',
								'MOVEOUT_INSTRUCT_E' => $row['MOVEOUT_INSTRUCT_E'],
								'MOVEOUT_INSTRUCT_G' => $row['MOVEOUT_INSTRUCT_G'],
								'GREENSALE' => $row['GREENSALE'],
								'AARH_DONATION' => $row['AARH_DONATION'],
								'EPFS_REQ' => $row['EPFS_REQ'],
								'SALES_AGENT' => $row['SALES_AGENT'],
								'EXISTING_GAS_BP_NUMBER' => $row['EXISTING_GAS_BP_NUMBER'],
								'EXISTING_ELEC_BP_NUMBER' => $row['EXISTING_ELEC_BP_NUMBER'],
								'EXISTING_CRN_NUMBER' => $row['EXISTING_CRN_NUMBER'],
								'CANCELLATION_DATE' => $row['CANCELLATION_DATE']!='' ? date("Y-m-d", strtotime($row['CANCELLATION_DATE'])) : '',
								'CANCELLATION_TYPE' => $row['CANCELLATION_TYPE'],
								'CANCELLATION_REASON' => $row['CANCELLATION_REASON'],
								'CANCELLATION_REASON_OTHER' => $row['CANCELLATION_REASON_OTHER'],
								'CHANGE_REQUEST' => $row['CHANGE_REQUEST'],
								'CHANGE_REQUEST_DATE' => $row['CHANGE_REQUEST_DATE']!='' ? date("Y-m-d", strtotime($row['CHANGE_REQUEST_DATE'])) : '',
								'COMMENTS' => $row['COMMENTS'],
								'AGL_API_RESPONSE_CODE'=>'',
								'AGL_STATUS'=>'Pending',
								'FILE_IMPORT_ID'=>$saveFile
                            );                            
							$insert = $this->aglupload->insert($memData);
                            if($insert){
								$insertCount++;
							}
                            // Check whether leadid already exists in the database
                            /*$con = array(
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
                            }*/
                        }						
                        // Status message with imported data count
                        $notAddCount = ($rowCount - ($insertCount + $updateCount));
                        $successMsg = 'CAF Data imported successfully. Total Rows ('.$rowCount.') | Inserted ('.$insertCount.') | Updated ('.$updateCount.') | Not Inserted ('.$notAddCount.')';
                        $this->session->set_userdata('success_msg', $successMsg);
						$this->validatetoken();
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
        //if($this->input->post('validateSubmit')){		   
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
				$resultSet = $this->validateSalesData($result['access_token']);				
			} else {			
				$this->session->set_userdata('error_msg', 'Error on token assignment.');
			}			
        //}		
        redirect('/');
    }
	
	public function validateSalesData($token) {	        
		$this->load->library('EXTApi');
		
		$customconfig = get_instance();  
		$url = $customconfig->config->item('sales_url');		
		$configOCP = $customconfig->config->item('ocp_primary_key');       
		
		$agldata = $this->aglupload->getRows(array('FILE_IMPORT_ID'=>$this->session->userdata('last_inserted_file_id')));		
		foreach($agldata as $iKey=>$aData) {
			$agldata[$iKey] = $aData;
		}
		for($i=0;$i<=count($agldata)-1;$i++) { // prepare payload //
			$header = array (
				"offerType" => $agldata[$i]['OFFER_TYPE'], 
				"dateOfSale" => $agldata[$i]['SALES_DATE'] !== '0000-00-00' ? $agldata[$i]['SALES_DATE'] : '',
				"vendorBusinessPartnerNumber" => $agldata[$i]['VENDOR_BP'],
				"vendorName" => $agldata[$i]['VENDOR'],
				"channel" => $agldata[$i]['CHANNEL'],
				"retailer" => $agldata[$i]['RETAILER'],
				"transactionType" => $agldata[$i]['TRANSACTION_TYPE'],
				"vendorLeadId" => $agldata[$i]['LEAD_ID']
			);
			$personDetail = array (
				"title" => $agldata[$i]['TITLE'],
				"firstName" => $agldata[$i]['NAME_FIRST'],
				"middleName" => $agldata[$i]['NAME_MIDDLE'],
				"lastName" => $agldata[$i]['NAME_LAST'],
				"dateOfBirth" => $agldata[$i]['DOB'] !== '0000-00-00' ? $agldata[$i]['DOB'] : ''
			);
			$contactDetail = array (
				"emailAddress" => $agldata[$i]['EMAIL'],
				"mobilePhone" => $agldata[$i]['PHONE_MOBILE'],
				"homePhone" => $agldata[$i]['PHONE_HOME'],
				"WorkPhone" => $agldata[$i]['PHONE_WORK']
			);
			
			$mediCare = array (
				"medicareNumber" => $agldata[$i]['MEDICARE_NUMBER'],
				"individualReferenceNumber" => $agldata[$i]['INDIVIDUAL_REFERENCE_NUMBER'] 
			);
			$passport = array (
				"passportNumber" => $agldata[$i]['PASSPORT']
			);
			$driversLicense = array (
				"licenseNumber" => $agldata[$i]['DRIVERS_LICENSE']
			);			
			
			$concessionCardDetail = array (
				"cardType" => $agldata[$i]['CONCESSION_TYPE'],
				"cardNumber" => $agldata[$i]['CONCESSION_NUMBER'],
				"dateOfExpiry" => $agldata[$i]['VALID_TO'] !== '0000-00-00' ? $agldata[$i]['VALID_TO'] : ''
			);
			$businessIdentification = array (
				"abn" => $agldata[$i]['ABN'],
				"acn" => $agldata[$i]['ACN']
			);			
			$siteAddress = array (
				"ignoreAddressValidation" => false,
				"buildingName" => $agldata[$i]['BUILDING_NAME'],
				"floorNumber" => $agldata[$i]['FLOOR'],
				"lotNumber" => $agldata[$i]['LOT_NUMBER'],
				"unitNumber" => $agldata[$i]['UNIT_NUMBER'],
				"streetNumber" => $agldata[$i]['STREET_NUMBER'],
				"streetName" => $agldata[$i]['STREET_NAME'],
				"suburb" => $agldata[$i]['SUBURB'],
				"state" => $agldata[$i]['STATE'],
				"postcode" => $agldata[$i]['POSTCODE']
			);
			$siteMailingAddress = array (
				"ignoreAddressValidation" => false,
				"postOfficeBoxNumber" => $agldata[$i]['MAILING_POST_OFFICE_BOX_NUMBER'],
				"buildingName" => $agldata[$i]['MAILING_BUILDING_NAME'],
				"floorNumber" => $agldata[$i]['MAILING_FLOOR'],
				"lotNumber" => $agldata[$i]['MAILING_LOT_NUMBER'],
				"unitNumber" => $agldata[$i]['MAILING_UNIT_NUMBER'],
				"streetNumber" => $agldata[$i]['MAILING_STREET_NUMBER'],
				"streetName" => $agldata[$i]['MAILING_STREET_NAME'],
				"suburb" => $agldata[$i]['MAILING_SUBURB'],
				"state" => $agldata[$i]['MAILING_STATE'],
				"postcode" => $agldata[$i]['MAILING_POSTCODE']
			);			
			$headerArray = array (
			'header' => $header,
				'payload' => array (
					'personDetail' => $personDetail,
					'contactDetail' => $contactDetail,
					'identification' => array (
						'medicare' => $mediCare,
						'passport' => $passport,
						'driversLicense' => $driversLicense
					),
					'concessionCardDetail' => $concessionCardDetail,
					'siteAddress' => $siteAddress,
					'mailingAddress' => array (
						'streetAddress' => $siteMailingAddress
					),
					'siteMeterDetail' => array (
						'electricity' => array (
							'nmi' => $agldata[$i]['NMI']
						),
						'gas' => array (
							'mirn' => $agldata[$i]['DPI_MIRN']
						)
					),
					'moveDetail' => array (
						'moveIn' => array (
							'electricity' => array (
								'date' => $agldata[$i]['MOVEIN_DATE_E'] !== '0000-00-00' ? $agldata[$i]['MOVEIN_DATE_E'] : ''
							),
							'gas' => array (
								'date' => $agldata[$i]['MOVEIN_DATE_G'] !== '0000-00-00' ? $agldata[$i]['MOVEIN_DATE_G'] : ''
							)
						),
						'moveOut' => ""
					),
					'customerConsent' => array (
						'hasGivenCreditCheckConsent' => $agldata[$i]['CREDIT_CONSENT'],
						'hasGivenEBillingConsent' => $agldata[$i]['ECOMM_CONSENT']
					),
					'businessIdentification'=> $businessIdentification,
					'name' => $agldata[$i]['BUSINESS_NAME'],
					'businessName' => $agldata[$i]['LEGAL_NAME'],
					'authorisedContactPersonDetail' => $agldata[$i]['AP_FIRST_NAME'],
					'authorisedPersonContact' => $agldata[$i]['AP_PHONE_MOBILE'],
					'authorisedPersonIdentification' => $agldata[$i]['AP_DRIVERS_LICENSE'],
					'cancellationDetail' => $agldata[$i]['CANCELLATION_REASON'],
					'siteAdditionalDetail' => ""
				),							
			);			
			
			$uniquenum = $this->random_strings(10);	
            $result = $this->extapi->validate_sales($url, $uniquenum, $headerArray, $token, $configOCP);			
			
			$resultSet = json_decode($result, true);			
			
			$cafSubResArr = array(
				'id'=> $agldata[$i]['LEAD_ID'],
				'code'=>$resultSet['code'],
				'message'=>$resultSet['message'],
				'caf_response'=>(!empty($resultSet['errors'])) ? json_encode($resultSet['errors']) :  '',
				'correlation_ID'=>$uniquenum,
				'status'=> 1,
				'fileimport_ID'=>$this->session->userdata('last_inserted_file_id')
			);
			
			if(!empty($cafSubResArr)) {
				$insertCafRes = $this->caf_submission_report->insert($cafSubResArr);
				$condition = array('LEAD_ID' => $agldata[$i]['LEAD_ID'], 'FILE_IMPORT_ID'=>$this->session->userdata('last_inserted_file_id'));
				$updateAglStatus = array('AGL_STATUS'=>json_encode($resultSet), 'CORRELATION_ID'=>$uniquenum);
				$update = $this->aglupload->update($updateAglStatus, $condition);
			}			
		}
		$this->session->unset_userdata('last_inserted_file_id'); // destroy last file id inserted once db gets updated
		$apiProcessMsg = 'API data processed successfully';
		$this->session->set_userdata('api_process_msg', $apiProcessMsg);		
        return true;		
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
	
	function random_strings($length_of_string) {
		// String of all alphanumeric character
		$str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		// Shufle the $str_result and returns substring
		// of specified length
		return substr("uni".str_shuffle($str_result), 0, $length_of_string);
	}
	
	public function exportall() {	    
	    $fileId = $this->input->post('fileid');		
		$file_name = 'agl_'.date('Ymd').'.csv'; 
		$agluploaded = $this->aglupload->fetch_agl_data($fileId);
		header('Pragma: public');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        header('Content-Disposition: attachment; filename="' . $file_name . '"');
        //header('Content-Length: ' . filesize($path));
        header('Content-Transfer-Encoding: binary');
		
		// get data 
			        
		// file creation 
		$file = fopen('php://output', 'w');

		$header = array('VENDOR','VENDOR_BP','CHANNEL','BATCH_NUMBER','TRANSACTION_TYPE','LEAD_ID','PROGRAM','TITLE','NAME_FIRST','NAME_MIDDLE','NAME_LAST','DOB','BUILDING_NAME','FLOOR','LOT_NUMBER','UNIT_NUMBER','STREET_NUMBER','STREET_NAME','SUBURB','STATE','POSTCODE','PHONE_HOME','PHONE_WORK','PHONE_MOBILE','EMAIL','MARKETING','ECONF_PACK_CONSENT','ECOMM_CONSENT','PRIMARY_SMS_CONSENT','CREDIT_CONSENT','AP_TITLE','AP_FIRST_NAME','AP_MIDDLE_NAME','AP_LAST_NAME','AP_PHONE_HOME','AP_PHONE_WORK','AP_PHONE_MOBILE','AP_DOB','AP_DRIVERS_LICENSE','BUSINESS_NAME','LEGAL_NAME','ABN','ACN','BUSINESS_TYPE','MAILING_BUILDING_NAME','MAILING_FLOOR','MAILING_LOT_NUMBER','MAILING_UNIT_NUMBER','MAILING_STREET_NUMBER','MAILING_STREET_NAME','MAILING_SUBURB','MAILING_STATE','MAILING_POSTCODE','CONCESSION_TYPE','CONCESSION_NUMBER','VALID_TO','DRIVERS_LICENSE','PASSPORT','MEDICARE_NUMBER','LIFE_SUPPORT','DD_REQ','NMI','DPI_MIRN','METER_NUMBER_E','METER_NUMBER_G','METER_TYPE','METER_HAZARD_E','DOG_CODE_G','SITE_ACCESS_E','SITE_ACCESS_G','RE_EN_REMOTE_SAFETY_CONFIRMATION','DE_EN_REMOTE_SAFETY_CONFIRMATION','SO_REQ','RETAILER','CAMPAIGN','SALES_DATE','CONTRACT_NUMBER','OFFER_TYPE','PRODUCT_CODE_E','PRODUCT_CODE_G','CAMPAIGN_CODE_RES_ELEC','CAMPAIGN_CODE_RES_GAS','CAMPAIGN_CODE_SME_ELEC','CAMPAIGN_CODE_SME_GAS','MATRIX_CODE','TARIFF_TYPE','FLEX_PRICE','REFERRER_NUMBER','FLYBUYS_CONSENT','FLYBUYS_NUMBER','FLYBUYS_POINTS','AEO_REG','OWN_RENT','PROMOTION_CODE','MERCH_REQ','AGL_ASSIST','GAS_OFFER','ELEC_OFFER','MOVEIN_DATE_E','MOVEIN_DATE_G','MOVEIN_INSTRUCT_E','MOVEIN_INSTRUCT_G','MOVEOUT_DATE_E','MOVEOUT_DATE_G','MOVEOUT_INSTRUCT_E','MOVEOUT_INSTRUCT_G','GREENSALE','AARH_DONATION','EPFS_REQ','SALES_AGENT','EXISTING_GAS_BP_NUMBER','EXISTING_ELEC_BP_NUMBER','EXISTING_CRN_NUMBER','CANCELLATION_DATE','CANCELLATION_TYPE','CANCELLATION_REASON','CANCELLATION_REASON_OTHER','CHANGE_REQUEST','CHANGE_REQUEST_DATE','COMMENTS'); 
		fputcsv($file, $header);
		foreach ($agluploaded->result_array() as $key => $value) { 
			fputcsv($file, $value); 
		}
		fclose($file); 
		exit;
	}
	
	public function exportcafres() {	    
	    $fileId = $this->input->post('fileidres');		
		$file_name = 'caf_response_'.date('Ymd').'.csv';	
		$aglCafResponse = $this->aglupload->fetch_aglcaf_response($fileId);	
        
		
		header('Pragma: public');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        header('Content-Disposition: attachment; filename="' . $file_name . '"');        
        header('Content-Transfer-Encoding: binary');
		
		// get data 
			        
		// file creation 
		$file = fopen('php://output', 'w');

		$header = array('CorrelationId','LeadId','Date','SubmissionCode','SubmissionMessage','Field','Code','Message'); 
		
		fputcsv($file, $header);
		
		for($i =0 ; $i<=count($aglCafResponse)- 1; $i++) {
		    $temp = array($aglCafResponse[$i]['CORRELATION_ID'],$aglCafResponse[$i]['LEAD_ID'],$aglCafResponse[$i]['MODIFIED_DATE']);
			$resultSet = array();			
			$resultSet2[$i] = json_decode($aglCafResponse[$i]['AGL_STATUS'], true);
			foreach($resultSet2[$i] as $key=>$val) {
				if(!is_array($val)) {
					array_push($temp, $val);
				} 
				if(is_array($val)) {
					for($k=0;$k<=count($val)-1;$k++) {
					    $temp2 = array($val[$k]['field'], $val[$k]['code'], $val[$k]['message']);
						$temp3 = array_merge($temp, $temp2);
						array_push($resultSet, $temp3);						
					}					
				}
			}
            if(!empty($resultSet)) {		
				foreach($resultSet as $key=>$row) {
					fputcsv($file, $row);
				}
			} else {
				$temp2 = array();
				$temp3 = array_merge($temp, $temp2);
				array_push($resultSet, $temp3);	
				foreach($resultSet as $key=>$row) {
					fputcsv($file, $row);
				}
			}
		}		
		fclose($file); 
		exit;
	}
}
