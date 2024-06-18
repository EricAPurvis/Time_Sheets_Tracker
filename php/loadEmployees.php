<?php 

	/*
	Created 2024-06-17
	Created by Eric Purvis
	*/

	/*
	Modified
	Modifed by
	*/

	class Employees {
		
		public $emp_id;
		public $login_id;
		public $emp_name;
		public $overtime;
		public $emp_start;
		public $emp_end;
		public $modified;
			
		function __construct($emp_id, $login_id, $emp_name, $overtime, $emp_start, $emp_end, $modified) {
			$this->emp_id=$emp_id;
			$this->login_id=$login_id;
			$this->emp_name=$emp_name;
			$this->overtime=$overtime;
			$this->emp_start=$emp_start;
			$this->emp_end=$emp_end;
			$this->modified=$modified;
		}
			
	}
	
	function loadFromSQL(){
		
		// database connection code
		$array = array();

        $con = new mysqli('localhost', 'root', '', 'practicum_timetable_database');
        if ($con->connect_error) {
			$array[] = new Employees(0, 0, 'Name Error', "N", "Error", "Error", "Error");
            return($array);
        }
		
		$sql="Select * from employees";
		$result = $con->query($sql);

		if ($result->num_rows > 0) {
				
			//output data of each row
			while($row = $result->fetch_assoc()) {
				
				$emp_id=$row["emp_id"];
				$login_id=$row["login_id"];
				$emp_name=$row["emp_name"];
				$overtime=$row["overtime"];
				$emp_start=$row["emp_start"];
				$emp_end=$row["emp_end"];
				$modified=$row["modified"];
				
				$array[] = new Employees($emp_id, $login_id, $emp_name, $overtime, $emp_start, $emp_end, $modified);
			}

		}
			
		return($array);
	}
		
	function encodeDataStream(){
		echo json_encode(array("data" => loadFromSQL()));
	}
	
	encodeDataStream();
	
?>