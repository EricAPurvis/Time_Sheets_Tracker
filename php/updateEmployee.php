<?php 

	/*
	Created 2024-06-20
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

	function updateSQL(){
		
		if(validateLogin()){
			$con = new mysqli('localhost', 'root', '', 'practicum_timetable_database');
			if ($con->connect_error) {
				return(false);
			}
		
			$emp_id = $_POST["data"][0];
			$login_id = $_POST["data"][1];
			$emp_name = $_POST["data"][2];
			$overtime = $_POST["data"][3];
			$emp_start= $_POST["data"][4];
			$emp_end  = $_POST["data"][5];
			
			$sql = "UPDATE users
						SET login_id='$login_id', modified=CURRENT_DATE
						WHERE emp_id='$emp_id';";
			
			$con->query($sql);
				
			$sql = "UPDATE employees
						SET login_id='$login_id', emp_name='$emp_name', emp_start='$emp_start', emp_end='$emp_end', modified=CURRENT_DATE
						WHERE emp_id='$emp_id';";
			
			$result = $con->query($sql);
			
			return($result);
		}else{
			return(false);
		}
		
		return(false);
		
	}
	
	function encodeDataStream(){
		echo json_encode(array("data" => updateSQL()));
	}
	
	encodeDataStream();

?>