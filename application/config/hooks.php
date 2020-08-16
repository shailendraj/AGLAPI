<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/
$hook['post_controller_constructor'][] = [
    'class'    => 'Apiauth',
    'function' => 'check_status',
    'filename' => 'Apiauth.php',
    'filepath' => 'hooks'        
];

$hook['post_controller_constructor'][] = array(
	'class'    => 'Auth_Hook',
	'function' => 'loggedIn',
	'filename' => 'Auth_Hook.php',
	'filepath' => 'hooks'
);

/*
$hook['post_controller_constructor'][] = array(
	'class'    => 'Role_Hook',
	'function' => 'getRoles',
	'filename' => 'roleHook.php',
	'filepath' => 'hooks'
);

$hook['post_controller_constructor'][] = array(
	'class'    => 'Permission_Hook',
	'function' => 'chkUriPermission',
	'filename' => 'permissionHook.php',
	'filepath' => 'hooks'
);
*/




