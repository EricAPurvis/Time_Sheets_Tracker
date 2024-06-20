<?php 

	/*
	Created 2024-06-17
	Created by Eric Purvis
	*/

	/*
	Modified
	Modifed by
	*/

	class TimeSheet {
		
		public $ts_id;
		public $emp_id;
		public $ts_date;
		public $ts_approved;
		public $start_time;
		public $end_time;
		public $hours;
		public $minutes;
		public $overtime;
		public $modified;
			
		function __construct($ts_id, $emp_id, $ts_date, $ts_approved, $start_time, $end_time, $hours, $minutes, $overtime, $modified) {
			$this->ts_id=$ts_id;
			$this->emp_id=$emp_id;
			$this->ts_date=$ts_date;
			$this->ts_approved=$ts_approved;
			$this->start_time=$start_time;
			$this->end_time=$end_time;
			$this->hours=$hours;
			$this->minutes=$minutes;
			$this->overtime=$overtime;
			$this->modified=$modified;
		}
			
	}
	
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
	
	function loadFromSQL(){
		
		$array = array();
		
		if(validateLogin()){
			
			// database connection code

			$con = new mysqli('localhost', 'root', '', 'practicum_timetable_database');
			if ($con->connect_error) {
				$array[] = new TimeSheet(0, 0, 'N', "Error", "Error", 0, 0, "N", "Error");
				return($array);
			}
			
			$sql="Select * from timesheets";
			$result = $con->query($sql);

			if ($result->num_rows > 0) {
					
				//output data of each row
				while($row = $result->fetch_assoc()) {
					
					$ts_id=$row["ts_id"];
					$emp_id=$row["emp_id"];
					$ts_date=$row["ts_date"];
					$ts_approved=$row["ts_approved"];
					$start_time=$row["start_time"];
					$end_time=$row["end_time"];
					$hours=$row["hours"];
					$minutes=$row["minutes"];
					$overtime=$row["overtime"];
					$modified=$row["modified"];
					
					$array[] = new TimeSheet($ts_id, $emp_id, $ts_date, $ts_approved, $start_time, $end_time, $hours, $minutes, $overtime, $modified);
				}

			}
			
		}
						
		return($array);
		
	}
		
	function encodeDataStream(){
		echo json_encode(array("data" => loadFromSQL()));
	}
	
	encodeDataStream();
	
?>