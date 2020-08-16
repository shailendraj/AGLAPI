<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require(APPPATH.'/libraries/REST_Controller.php');

class Api extends REST_Controller {
	
	public function __construct() {
		   parent::__construct();
		   $this->load->model('response_model');
	}
	   
	public function callback_get(){           
	   $this->response([
				'status' => true,
				'message' => 'API check'
			], 200 ); 
	}

	public function callback_post(){  
		$data = $this->input->raw_input_stream;
		$post = json_decode($data);
		$postData = array();
		$postData['correlation_id'] = (!empty($post->correlationId)) ? $post->correlationId :  '';
		$postData['vendor_lead_id'] = (!empty($post->vendorLeadId)) ? $post->vendorLeadId :  '';
		$postData['transaction_type'] = (!empty($post->transactionType)) ? $post->transactionType :  '';
		$postData['code'] = (!empty($post->code)) ? $post->code :  '';
		$postData['message'] = (!empty($post->message)) ? $post->message :  '';
		$postData['errors'] = (!empty($post->errors)) ? json_encode($post->errors) :  '';
		$postData['create_datetime'] = date("Y-m-d H:i:s");
		//$log = print_r($postData, true);
		//file_put_contents('./log_'.date("j.n.Y").'.log', $log, FILE_APPEND);          
		if($this->response_model->insert_data($postData)) {
			$this->response([
				'status' => true,
				'message' => 'Post data successfully!!'
			], 200 ); 	
		} else {
			$this->response([
				'status' => false,
				'message' => 'Post data format not valid!'
			], 406 ); 
		};		   
	}
}