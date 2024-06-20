var array = new Array();
	
function PopulateTable(emp_id, login_id, emp_name, overtime, emp_start, emp_end, modified){
			
	var table = document.getElementById("table");
	var count = table.rows.length;
	var row = table.insertRow(count);
			
	row.insertCell(0).innerHTML = "<button class='btn btn-success' onclick='editEmployee(this,"+emp_id+" , login_id_"+emp_id+", emp_name_"+emp_id+", overtime_"+emp_id+", emp_start_"+emp_id+", emp_end_"+emp_id+")' value=false>Edit</button>";

	row.insertCell(1).innerHTML = emp_id;
	row.insertCell(2).innerHTML = "<input class='employeeValues' type='text' value='"+login_id+"' id='login_id_"+emp_id+"' disabled>";
	row.insertCell(3).innerHTML = "<input class='employeeValues' type='text' value='"+emp_name+"' id='emp_name_"+emp_id+"' disabled>";
	row.insertCell(4).innerHTML =" <select class='employeeValues' value='"+overtime+"' id='overtime_"+emp_id+"' disabled><option>Y</option><option>N</option></select><br>";
	row.insertCell(5).innerHTML = "<input type='date' value='"+emp_start+"' class='employeeValues' id='emp_start_"+emp_id+"' disabled>";
	row.insertCell(6).innerHTML = "<input type='date' value='"+emp_end+"' class='employeeValues' id='emp_end_"+emp_id+"' disabled>";
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

function editEmployee(buttonObj, emp_id_value, login_id, emp_name, overtime, emp_start, emp_end){
	
	let isEnabled = buttonObj.value==="false"
	buttonObj.value = isEnabled;
	
	login_id.disabled=!isEnabled;
	emp_name.disabled=!isEnabled;
	overtime.disabled=!isEnabled;
	emp_start.disabled=!isEnabled;
	emp_end.disabled=!isEnabled;

	if(isEnabled){
		buttonObj.innerHTML = "Submit";
	}else{
		buttonObj.innerHTML = "Edit";
		sendUpdateEmployeeRequest(emp_id_value, login_id, emp_name, overtime, emp_start, emp_end);
	}
	
}

function getData(emp_id_value, login_id, emp_name, overtime, emp_start, emp_end){
	var data = [];
			
	data[0] = emp_id_value;
	data[1] = login_id.value;
	data[2] = emp_name.value;
	data[3] = overtime.value;
	data[4] = emp_start.value;
	data[5] = emp_end.value;
		
	return(data);
}
	
function sendUpdateEmployeeRequest(emp_id_value, login_id, emp_name, overtime, emp_start, emp_end){
	$.ajax({
		url: 'php/updateEmployee.php',
		type: "POST",
		timeout: 500,
		dataType: "html",
		data: {
			data: getData(emp_id_value, login_id, emp_name, overtime, emp_start, emp_end),
			login_id: localStorage.getItem("user"),
			password: CryptoJS.MD5(localStorage.getItem("pass")).toString()
		},
		success:function(data){

			try {
				data = JSON.parse(data);
			}catch(e) {}
									
			if(data['data']){
				alert("Employee Updated Successfully");
			}else{
				alert("Employee Updated Failed");
			}
		},
		error:function(){
			alert("Updating Employee Error");
		}
	});
}		
		