function sendLoginRequest(login_id, password){
			
	let user = login_id.value;
	let pass1 = password.value;
			
	let pass2 = CryptoJS.MD5(pass1).toString();
			
	//console.log(pass2);
			
	$.ajax({
		url: 'php/validateLogin.php',
		type: "POST",
		timeout: 500,
		dataType: "html",
		data: {
			login_id: user,
			password: pass2
		},
		success:function(data){
					
			try {
				data = JSON.parse(data);
			}catch(e) {}

			if(data['data']){
				localStorage.setItem("user", user);
				localStorage.setItem("pass", pass1);
				localStorage.setItem("loggedIn", true);
				alert("Successfully logged in");
			}else{
				alert("Username or Password Not Correct");
			}

		},
		error:function(){
			alert("Login Error");
		}
	});
}

function logout(){
	localStorage.setItem("user", null);
	localStorage.setItem("pass", null);
	localStorage.setItem("loggedIn", false);
	alert("Successfully logged out");
}