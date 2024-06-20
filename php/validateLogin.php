<?php 

	/*
	Created 2024-06-18
	Created by Eric Purvis
	*/

	/*
	Modified
	Modifed by
	*/

	function validateLogin(){
		
        $con = new mysqli('localhost', 'root', '', 'practicum_timetable_database');
        if ($con->connect_error) {
            return(false);
        }
	
		$login_id = $_POST["login_id"];
		$password = $_POST["password"];
			
		$sql = "SELECT user_id FROM users where login_id='$login_id' and password='$password'";
	
		return($con->query($sql)->fetch_assoc()["user_id"]);
		
	}
	
	function encodeDataStream(){
		echo json_encode(array("data" => validateLogin()));
	}
	
	encodeDataStream();

?>