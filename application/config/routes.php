<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'dashboard';

$route['dashboard'] = "/dashboard/index";
$route['dashboard/index'] = "/dashboard/index";

$route['agl'] = "/agl/index";
$route['agl/index'] = "/agl/index";
$route['import'] = "/agl/import";
$route['validatetoken'] = "/agl/validatetoken";
$route['getAllData'] = "/agl/getAllData";
$route['exportall'] = "/agl/exportall";
$route['exportcafres'] = "/agl/exportcafres";
$route['exportcafcallres'] = "/agl/exportcafcallres";
$route['importaddressvalidation'] = "/agl/importaddressvalidation";


//USER loign
$route['login']['get'] = 'authentication/index';
$route['login']['post'] = 'authentication/loginSubmit';
$route['logout']['get'] = 'authentication/logout';

$route['user']['get'] = 'user/index';
$route['user/(:num)'] = 'user/index';
$route['user/form'] = 'user/form';
$route['user/submitted'] = 'user/submitted';

$route['pages']['get'] = 'admin/pages';
$route['page/form'] = 'admin/page_form';
$route['page/submitted'] = 'admin/page_submitted';
$route['page/update_status'] = 'admin/page_update_status';

$route['ipaccess'] = 'admin/ipaccess';
$route['ipaccess/form'] = 'admin/ipaccess_form';
$route['ipaccess/submitted'] = 'admin/ipaccess_submitted';
$route['ipaccess/update_status'] = 'admin/ipaccess_update_status';

$route['roles']['get'] = 'admin/roles';
$route['roles/form'] = 'admin/roles_form';
$route['roles/submitted'] = 'admin/roles_submitted';
$route['roles/update_status'] = 'admin/roles_update_status';


$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
//print_r($route);
