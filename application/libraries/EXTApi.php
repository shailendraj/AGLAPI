<?php
class EXTApi {
	function api_token($method, $url, $data){
	   $fields_string='';
	   $fields = array (
		'client_id' => urlencode($data['client_id']),
		'client_secret' => urlencode($data['client_secret']),
		'audience' => urlencode($data['audience']),
		'grant_type' => urlencode($data['grant_type']),
		'Content-Type' => urlencode($data['content_type']));
		foreach($fields as $key=>$value) { 
			$fields_string .= $key.'='.$value.'&'; 
		}
		rtrim($fields_string, '&');	  
	   $curl = curl_init();
	   
	   switch ($method){
		  case "POST":		     			 
			 curl_setopt($curl,CURLOPT_POST, count($fields));
			 if ($data)
				curl_setopt($curl, CURLOPT_POSTFIELDS, $fields_string);
			 break;
		  case "PUT":
			 curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
			 if ($data)
				curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
			 break;
		  default:
			 if ($data)
				$url = sprintf("%s?%s", $url, http_build_query($data));
	   }
	   // OPTIONS:
	   curl_setopt($curl, CURLOPT_URL, $url);
	   curl_setopt($curl, CURLOPT_HTTPHEADER, array(
	      'Content-Type: application/x-www-form-urlencoded'
	   ));
	   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	   curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
	   curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
	   // EXECUTE:
	   
	   $result = curl_exec($curl);
		
		if(!$result){
			echo 'Curl error: ' . curl_error($curl);
			die("Connection Failure");
		}
		curl_close($curl);
		return $result;
	}
	
	function validate_sales($url, $uniquenum, $dataE, $token, $ocp){
		$postData = json_encode($dataE);				
		$curl = curl_init();
		curl_setopt($curl,CURLOPT_POST, 1);
		if ($dataE)
		curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
		//curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
	   
	   // OPTIONS:
	   curl_setopt($curl, CURLOPT_URL, $url);
	   curl_setopt($curl, CURLOPT_HTTPHEADER, array(
		"Api-Version: v1",
		"Authorization:Bearer " . $token,
		"Ocp-Apim-Subscription-Key:" . $ocp,
		"Correlation-Id:" . $uniquenum,
		"Content-Type: application/json"
	   ));
	   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	   curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
	   curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
	   // EXECUTE:
	   
	   $result = curl_exec($curl);
		if(!$result){
			echo 'Curl error: ' . curl_error($curl);
			die("Connection Failure");
		}
		curl_close($curl);
		return $result;
	}
}
?>