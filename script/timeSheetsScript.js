var array = new Array();
	
function PopulateTable(ts_id, emp_id, ts_date, ts_approved, start_time, end_time, hours, minutes, overtime, modified){
			
	var table = document.getElementById("table");
	var count = table.rows.length;
	var row = table.insertRow(count);
	row.insertCell(0).innerHtml = "<button>Edit</button>";

	row.insertCell(1).innerHtml = "123";
			
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
		PopulateTable(array[x]['ts_id'], array[x]['emp_id'], array[x]['ts_date'], array[x]['ts_approved'], array[x]['start_time'], array[x]['end_time'], array[x]['hours'], array[x]['minutes'], array[x]['overtime'], array[x]['modified']);
	}
}