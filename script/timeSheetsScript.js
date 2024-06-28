function PopulateTable(ts_id_value, emp_id, ts_date, ts_approved, start_time, end_time, hours, minutes, overtime, modified){
			
	let table = document.getElementById("table");
	let count = table.rows.length;
	let row = table.insertRow(count);
	
	row.insertCell(0).innerHTML = "<button class='btn btn-success' onclick='View("+ts_id_value+", tr_id, ts_id, time_from, time_out, description, modified)'>View</button>";

	row.insertCell(1).innerHTML = ts_id_value;
	row.insertCell(2).innerHTML = emp_id;
	row.insertCell(3).innerHTML = ts_date;
	row.insertCell(4).innerHTML = ts_approved;
	row.insertCell(5).innerHTML = start_time;
	row.insertCell(6).innerHTML = end_time;
	row.insertCell(7).innerHTML = hours;
	row.insertCell(8).innerHTML = minutes;
	row.insertCell(9).innerHTML = overtime;
	row.insertCell(10).innerHTML = modified;
			
}
	
function Load(){
	$.ajax({
					
		type: 'POST',
		dataType: "json",
		url:'php/loadTimeSheets.php',
		data:{					
			login_id: localStorage.getItem("user"),
			password: CryptoJS.MD5(localStorage.getItem("pass")).toString()
		},
					
		success: function(data)
		{ 
			var array=data['data'];
			Implement(array);
		},
					
		error: function(xhr, status, error) {
			//Php failed
			loadFailedAlert();
		}
					
	});
}
		
function Implement(array){
	for(let x=0; x<array.length; x++){
		PopulateTable(array[x]['ts_id'], array[x]['emp_id'], array[x]['ts_date'], array[x]['ts_approved'], array[x]['start_time'], array[x]['end_time'], array[x]['hours'], array[x]['minutes'], array[x]['overtime'], array[x]['modified']);
	}
}

function View(ts_id_value, tr_id, ts_id, time_from, time_out, description, modified){
		$.ajax({
					
		type: 'POST',
		dataType: "json",
		url:'php/loadTimeSheetsItems.php',
		data:{
			ts_id: ts_id_value,
			login_id: localStorage.getItem("user"),
			password: CryptoJS.MD5(localStorage.getItem("pass")).toString()
		},
					
		success: function(data)
		{ 
			try {
				data = JSON.parse(data);
			}catch(e) {}
			
			data = data['data'];
			
			tr_id.value = data["tr_id"];
			ts_id.value = data["ts_id"];
			time_from.value = data["time_from"];
			time_out.value = data["time_out"];
			description.value = data["description"];
			modified.value = data["modified"];
			
		},
					
		error: function(xhr, status, error) {
			//Php failed
			viewFailedAlert();
		}
					
	});
}

function loadFailedAlert(){
	let obj = document.getElementById("loadFailedAlert");
	obj.style.display = "block";
}

function viewFailedAlert(){
	let obj = document.getElementById("viewFailedAlert");
	obj.style.display = "block";
}
