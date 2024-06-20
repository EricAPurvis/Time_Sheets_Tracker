var array = new Array();
	
function PopulateTable(emp_id, login_id, emp_name, overtime, emp_start, emp_end, modified){
			
	var table = document.getElementById("table");
	var count = table.rows.length;
	var row = table.insertRow(count);
			
	row.insertCell(0).innerHtml = "<button>Edit</button>";

	row.insertCell(1).innerHTML = emp_id;
	row.insertCell(2).innerHTML = login_id;
	row.insertCell(3).innerHTML = emp_name;
	row.insertCell(4).innerHTML = overtime;
	row.insertCell(5).innerHTML = emp_start;
	row.insertCell(6).innerHTML = emp_end;
	row.insertCell(7).innerHTML = modified;
			
}
	
function Load(){
	$.ajax({
					
		type: 'POST',
		dataType: "json",
		url:'php/loadEmployees.php',
		data:{					
			login_id: localStorage.getItem("user"),
			password: CryptoJS.MD5(localStorage.getItem("pass")).toString()
		},
					
		success: function(data)
		{ 
			array=data['data'];
			Implement();
		},
					
			error: function(xhr, status, error) {
			console.log("Load Request! NOT Successful!");
			var err = eval("ERROR: (" + xhr.responseText + ")");
			alert(err.Message);
		}
					
	});
}
		
function Implement(){
	for(var x=0; x<array.length; x++){
		PopulateTable(array[x]['emp_id'], array[x]['login_id'], array[x]['emp_name'], array[x]['overtime'], array[x]['emp_start'], array[x]['emp_end'], array[x]['modified']);
	}
}
		