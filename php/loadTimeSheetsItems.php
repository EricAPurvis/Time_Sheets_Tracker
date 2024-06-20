<?php 

	/*
	Created 2024-06-17
	Created by Eric Purvis
	*/

	/*
	Modified
	Modifed by
	*/

	class TimeSheetItem {
		
		public $tr_id;
		public $ts_id;
		public $time_from;
		public $time_out;
		public $description;
		public $modified;
			
		function __construct($tr_id, $ts_id, $time_from, $time_out, $description, $modified) {
			$this->tr_id=$tr_id;
			$this->ts_id=$ts_id;
			$this->time_from=$time_from;
			$this->time_out=$time_out;
			$this->description=$description;
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
		
		$data = null;
		
		if( validateLogin() ){
		
			// database connection code

			$ts_id = $_POST["ts_id"];

			$con = new mysqli('localhost', 'root', '', 'practicum_timetable_database');
			if ($con->connect_error) {
				//$array[] = new TimeSheetItem(0, 0, "", "", "A connection error as occurred", "");
				return($array);
			}
			
			$sql="Select * from timesheets_items where ts_id='$ts_id'";
			$result = $con->query($sql);

			if ($result->num_rows > 0) {
					
				//output data of each row
				$row = $result->fetch_assoc();
					
				$tr_id=$row["tr_id"];
				$ts_id=$row["ts_id"];
				$time_from=$row["time_from"];
				$time_out=$row["time_out"];
				$description=$row["description"];
				$modified=$row["modified"];
					
				$data = new TimeSheetItem($tr_id, $ts_id, $time_from, $time_out, $description, $modified);

			}
			
		}
		
		return($data);
		
	}
		
	function encodeDataStream(){
		echo json_encode(array("data" => loadFromSQL()));
	}
	
	encodeDataStream();
	
?>