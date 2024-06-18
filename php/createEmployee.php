<?php 

	/*
	Created 2024-06-17
	Created by Eric Purvis
	*/

	/*
	Modified
	Modifed by
	*/

	function saveToSQL(){
		
        $con = new mysqli('localhost', 'root', '', 'practicum_timetable_database');
        if ($con->connect_error) {
            return(false);
        }
	
		$login_id = $_POST["data"][0];
		$emp_name = $_POST["data"][1];
		$overtime = $_POST["data"][2];
		$emp_start= $_POST["data"][3];
		$emp_end  = $_POST["data"][4];
			
		$sql = "INSERT INTO employees(login_id, emp_name, overtime, emp_start, emp_end, modified) values ('$login_id', '$emp_name', '$overtime', '$emp_start', '$emp_end', CURRENT_DATE)";
		$con->query($sql);
		
	}

	saveToSQL();

?>