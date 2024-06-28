function getData(login_id, emp_name, overtime, emp_start, emp_end){
	var data = [];
			
	data[0] = login_id.value;
	data[1] = emp_name.value;
	data[2] = overtime.value;
	data[3] = emp_start.value;
	data[4] = emp_end.value;
			
	return(data);
}
	
function sendAddEmployeeRequest(login_id, emp_name, overtime, emp_start, emp_end){
	$.ajax({
		url: 'php/createEmployee.php',
		type: "POST",
		timeout: 500,
		dataType: "html",
		data: {
			data: getData(login_id, emp_name, overtime, emp_start, emp_end),
			login_id: localStorage.getItem("user"),
			password: CryptoJS.MD5(localStorage.getItem("pass")).toString()
		},
		success:function(data){

			try {
				data = JSON.parse(data);
			}catch(e) {}
									
			if(data['data']){
				login_id.value="";
				emp_name.value="";
				overtime.value="";
				emp_start.value="";
				emp_end.value="";
				addingEmployeeSuccess();
			}else{
				addingEmployeeFailed();
			}
		},
		error:function(){
			addingEmployeeFailed();
		}
	});
}		

function addingEmployeeSuccess(){
	let obj = document.getElementById("employeeSuccessAlert");
	obj.style.display = "block";
	hideAddingEmployeeFailed();
}

function addingEmployeeFailed(){
	let obj = document.getElementById("employeeFailedAlert");
	obj.style.display = "block";
	hideAddingEmployeeSuccess();
}

function hideAddingEmployeeSuccess(){
	let obj = document.getElementById("employeeSuccessAlert");
	obj.style.display = "none";
}

function hideAddingEmployeeFailed(){
	let obj = document.getElementById("employeeFailedAlert");
	obj.style.display = "none";
}