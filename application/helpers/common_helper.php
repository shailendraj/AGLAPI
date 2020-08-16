<?php   
if ( ! function_exists('country'))
{
	/**
	 * Country
	 * @param	null
	 * @return	array	depends on what the array contains
	 */
	function country()
	{
		return array(
			'Australia',
			'India',
			'Philippines',
		);
	}
}

if ( ! function_exists('centercategory'))
{
	/**
	 * Center Category
	 * @param	null
	 * @return	array	depends on what the array contains
	 */
	function centercategory()
	{
		return array(
			'Captive',
			'Self'
		);
	}
}

if ( ! function_exists('captiveSaleRoles')) {
	function captiveSaleRoles(){
		return array(
			'Sales Agent',
			'Sales Team Leader'
		);
	}
}



if ( ! function_exists('selfSaleRoles')) {
	function selfSaleRoles()
	{
		return array(
			'Sales Agent Self',
			'Sales Team Leader Self'
		);
	}
}


if ( ! function_exists('get_inbound_status'))
{
	/**
	 * Country
	 * @param	null
	 * @return	array	depends on what the array contains
	 */
	function get_inbound_status()
	{
		return array(
			'NEW',
			'ASSIGNED',
			'ATTEMPTING CONTACT',
			'PROSPECT',
			'WAITING PAYMENT',
			'CALLBACK',
			'WON',
			'LOST'
		);
	}
}


if(! function_exists('array_jquery')){
	function array_jquery(){
		$data = array();
		$data['css'] = array(
			base_url('assets/css/jquery.validation.css'),
		);
		$data['javascript'] = array(
			base_url('assets/js/jquery-1.11.1.min.js'),
			base_url('assets/js/jquery.validation.js')
		);
		return $data;
	}
}

if(! function_exists('array_jquery_ui')){
	function array_jquery_ui(){
		$data = array();
		$data['css'] = array(
			base_url('/assets/css/jquery-ui.css')
		);
		$data['javascript'] = array(
			base_url('/assets/js/jquery-1.11.1.min.js'),
			base_url('/assets/js/jquery-ui.min.js')
		);
		return $data;
	}
}

if(! function_exists('array_jquery_datetimepicker')){
	function array_jquery_datetimepicker(){
		$data = array();
		$data['css'] = array(
			base_url('/assets/css/jquery.simple-dtpicker.css')
		);
		$data['javascript'] = array(
			base_url('/assets/js/jquery-1.11.1.min.js'),
			base_url('/assets/js/jquery.simple-dtpicker.js')
		);
		return $data;
	}
}

if(! function_exists('array_jkendo_ui')){
	function array_jkendo_ui() {
		$data = array();
		$data['css'] = array(
			base_url('/assets/css/jquery-ui.css'),
			base_url('/assets/css/kendo/kendo.common.min.css'),
			base_url('/assets/css/kendo/kendo.rtl.min.css'),
			base_url('/assets/css/kendo/kendo.default.min.css'),
			base_url('/assets/css/kendo/kendo.dataviz.min.css'),
			base_url('/assets/css/kendo/kendo.dataviz.default.min.css')
		);
		$data['javascript'] = array(
			base_url('/assets/js/jquery-1.11.1.min.js'),
			base_url('/assets/js/jquery-ui.min.js'),
			base_url('/assets/js/kendo/jszip.min.js'),
			base_url('/assets/js/kendo/kendo.all.min.js')
		);
		return $data;
	}
}

if(! function_exists('array_kendo_ui')){
	function array_kendo_ui() {
		$data = array();
		$data['css'] = array(
			base_url('assets/css/kendo/kendo.common.min.css'),
			base_url('assets/css/kendo/kendo.rtl.min.css'),
			base_url('assets/css/kendo/kendo.default.min.css'),
			base_url('assets/css/kendo/kendo.dataviz.min.css'),
			base_url('assets/css/kendo/kendo.dataviz.default.min.css')
		);
		$data['javascript'] = array(
			base_url('assets/js/jquery-1.11.1.min.js'),
			base_url('assets/js/kendo/jszip.min.js'),
			base_url('assets/js/kendo/kendo.all.min.js')
		);
		return $data;
	}
}

if(! function_exists('array_bootstrap_ui')) {
	function array_bootstrap_ui()
	{
		$data = array();
		$data['css'] = array(
			('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
		);
		$data['javascript'] = array(
			('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
		);
		return $data;
	}
}


if(! function_exists('page_config')){
	function page_config($page_url){
		$config = array();
		//pagination settings
		$config['per_page'] = 10;
		$config['base_url'] = $page_url;
		$config['use_page_numbers'] = TRUE;
		$config['num_links'] = 20;
		$config['full_tag_open'] = '<ul>';
		$config['full_tag_close'] = '</ul>';
		$config['num_tag_open'] = '<li>';
		$config['num_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="active"><a>';
		$config['cur_tag_close'] = '</a></li>';
		$config['next_link'] = 'NEXT &gt;';
		$config['next_tag_open'] = '<li>';
		$config['next_tag_close'] = '</li>';
		$config['prev_link'] = '&lt; PREV';
		$config['prev_tag_open'] = '<li>';
		$config['prev_tag_close'] = '</li>';
		return $config;
	}
}


if(! function_exists('pdfVersion_cis')){
	function pdfVersion_cis($filename)
	{
		$fp = @fopen("../resources/cis/". $filename, 'r');
		if (!$fp) {
			return 0;
		}

		/* Reset file pointer to the start */
		fseek($fp, 0);

		/* Read 20 bytes from the start of the PDF */
		preg_match('/\d\.\d/',fread($fp,20),$match);

		fclose($fp);

		if (isset($match[0])) {
			return $match[0];
		} else {
			return 0;
		}
	}
}


if ( ! function_exists('getPdfType'))
{
	/**
	 * Center Category
	 * @param	null
	 * @return	array	depends on what the array contains
	 */
	function getPdfType()
	{
		return array(
			'WLN' => 'Welcome Letter-N',
			'WLU' => 'Welcome Letter-U',
			'WLW' => 'Welcome Letter-W',
			'NBN-WLN' => 'NBN Welcome Letter-N',
			'NBN-WLU' => 'NBN Welcome Letter-U',
			'NBN-WLW' => 'NBN Welcome Letter-W',
			'DD'=>'Direct Debit',
			'PR' => 'Pro Rata Explained',
			'NBN-PR' => 'NBN Pro Rata Explained',
			'SOFA'	=> 'Summary of Standard Form of Agreement',
			'SRV' => 'Services',
			'SC82'=>'Section 82',
			'NBN-TTK'=> 'NBN Things To Know',
			'NBN-CT'=> 'NBN Customer Terms'
		);
	}
}


if (!function_exists('get_cis_folder_path'))
{
	/**
	* Center Category
	* @param	null
	* @return	array	depends on what the array contains
	*/
	function get_cis_folder_path()
	{
		$basePath = BASEPATH;
		$basePath = str_replace('system/', '', $basePath);
		$sResourcesPath = $basePath.'resources';
		if (!file_exists($sResourcesPath)) {
			@mkdir($sResourcesPath, 0777, true);
		}
		$sCisPdfFolderPath = $sResourcesPath.'/cis';
		if (!file_exists($sCisPdfFolderPath)) {
			@mkdir($sCisPdfFolderPath, 0777, true);
		}
		return $sCisPdfFolderPath;
	}
}

if (!function_exists('get_base_folder_path'))
{
	/**
	* get base folder path
	* @param	null
	* @return	string  return string resource folder path
	*/
	function get_base_folder_path()
	{
		$sBasePath = BASEPATH;
		$sBasePath = str_replace('system/', '', $sBasePath);
		return $sBasePath;
	}
}

if (!function_exists('get_resource_folder_path'))
{
	/**
	* get resource folder path
	* @param	null
	* @return	string  return string resource folder path
	*/
	function get_resource_folder_path()
	{
		$sBasePath = BASEPATH;
		$sBasePath = str_replace('system/', '', $sBasePath);
		return $sBasePath.$_SERVER['RESOURCE_PATH'];
	}
}



if (!function_exists('get_recording_folder_path'))
{
	/**
	* Center Category
	* @param	null
	* @return	array	depends on what the array contains
	*/
	function get_recording_folder_path()
	{
		$basePath = BASEPATH;
		$basePath = str_replace('system/', '', $basePath);
		$sResourcesPath = $basePath.'resources';
		if (!file_exists($sResourcesPath)) {
			@mkdir($sResourcesPath, 0777, true);
		}
		$sRecordingPdfFolderPath = $sResourcesPath.'/recording';
		if (!file_exists($sRecordingPdfFolderPath)) {
			@mkdir($sRecordingPdfFolderPath, 0777, true);
		}

		$sFinalRecordingPdfFolderPath = $sRecordingPdfFolderPath.'/final';
		if (!file_exists($sFinalRecordingPdfFolderPath)) {
			@mkdir($sFinalRecordingPdfFolderPath, 0777, true);
		}
		return $sRecordingPdfFolderPath;
	}
}



if (!function_exists('get_dsr_folder_path'))
{
	/**
	* Center Category
	* @param	null
	* @return	array	depends on what the array contains
	*/
	function get_dsr_folder_path()
	{
		$basePath = BASEPATH;
		$basePath = str_replace('system/', '', $basePath);
		$sResourcesPath = $basePath.'resources';
		if (!file_exists($sResourcesPath)) {
			@mkdir($sResourcesPath, 0777, true);
		}
		$sDsrFolderPath = $sResourcesPath.'/dsr';
		if (!file_exists($sDsrFolderPath)) {
			@mkdir($sDsrFolderPath, 0777, true);
		}

		return $sDsrFolderPath;
	}
}


if (!function_exists('get_dsr_temp_folder_path'))
{
	/**
	* Center Category
	* @param	null
	* @return	array	depends on what the array contains
	*/
	function get_dsr_temp_folder_path()
	{
		$basePath = BASEPATH;
		$basePath = str_replace('system/', '', $basePath);
		$sResourcesPath = $basePath.'resources';

		if (!file_exists($sResourcesPath)) {
			@mkdir($sResourcesPath, 0777, true);
		}

		$sTempDsrFolderPath = $sResourcesPath.'/dsrtemp';
		if (!file_exists($sTempDsrFolderPath)) {
			@mkdir($sTempDsrFolderPath, 0777, true);
		}
		return $sTempDsrFolderPath;
	}
}

if (!function_exists('get_abn_response_data'))
{
	/**
	* Center Category
	* @param	null
	* @return	array	depends on what the array contains
	*/
	function get_abn_response_data($sABN)
	{
		if(!$sABN){die('{"error":"true"}');}
		$abr = new SoapClient('http://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx?WSDL');
		$data = $abr->ABRSearchByABN(array('searchString'=>$sABN,'includeHistoricalDetails'=>'N','authenticationGuid'=>'24183d05-6498-4d78-89d3-2bd791c6bc17'));

		$sTradingName = @$data->ABRPayloadSearchResults->response->businessEntity->mainTradingName->organisationName;
		$sFamilyName = @$data->ABRPayloadSearchResults->response->businessEntity->legalName->familyName;
		$sGivenName = @$data->ABRPayloadSearchResults->response->businessEntity->legalName->givenName;
		$sTradingName = (isset($sTradingName) && !empty($sTradingName))? $sTradingName : "";
		$sFamilyName = (isset($sFamilyName) && !empty($sFamilyName))? $sFamilyName : "";
		$sGivenName = (isset($sGivenName) && !empty($sGivenName)) ? $sGivenName : "";

		$toJSON = array(
			'organisationName'=>$data->ABRPayloadSearchResults->response->businessEntity->mainName->organisationName,
			'tradingName'=> $sTradingName,
			'entityName'=> $sFamilyName.", ".$sGivenName,
			'entityStatus'=>$data->ABRPayloadSearchResults->response->businessEntity->entityStatus->entityStatusCode,
			'entityDescription'=>$data->ABRPayloadSearchResults->response->businessEntity->entityType->entityDescription
		);
		return $toJSON;
	}
}


if ( ! function_exists('supplier_mode_type'))
{
	/**
	 * Country
	 * @param	null
	 * @return	array	depends on what the array contains
	 */
	function supplier_mode_type()
	{
		return array(
			'Email',
			'Expression of Interest in Website',
			'Online Signup in website',
			'Online Chat',
			'Vericon API push'
		);
	}
}


if ( ! function_exists('supplier_mode'))
{
	function supplier_mode()
	{
		return array(
			'INB'=> 'INBOUND',
			'OUTB'=> 'OUTBOUND',
		);
	}
}


if ( ! function_exists('plan_type'))
{
	function plan_type()
	{
		return array(
			'Landline'=> 'Landline',
			'ADSL'=> 'OUTBOUND',
			'NBN'=> 'NBN',
			'VOIP' => 'VOIP'
		);
	}
}







