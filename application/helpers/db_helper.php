<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class dbConnection {
	// Open a connect to the database.
	// Make sure this is called on every page that needs to use the database.
	private $conn;
	public function connect($db_host, $db_user, $db_pass) {

		$this->conn = mysqli_connect($db_host, $db_user, $db_pass);
		//mysqli_select_db($this->conn, 'people_energy');

		if (!$this->conn)
			return -3;
		else
		return true;

	}

	public function createDBQuery($query, $dbName)
	{
		$execute = mysqli_query($query);
		if($execute) {
			$dbCreated = mysqli_select_db($this->conn, $dbName);
			return $dbCreated;
		}
	}

	public function createTableQuery($tableStructure)
	{
		$execute = mysqli_query($this->conn, $tableStructure);
		if($execute) {
			return $execute;
		}
	}
}
?>