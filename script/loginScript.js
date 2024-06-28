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
				loginSuccess();
			}else{
				loginFailed();
			}

		},
		error:function(){
			loginFailed();
		}
	});
}

function logout(){
	localStorage.setItem("user", null);
	localStorage.setItem("pass", null);
	localStorage.setItem("loggedIn", false);
	logoutSuccess();
}

function loginFailed(){
	let obj = document.getElementById("failedAlert");
	obj.style.display = "block";
	hideLoginSuccess();
	hideLogoutSuccess()
}

function loginSuccess(){
	let obj = document.getElementById("successAlert");
	obj.style.display = "block";
	hideLoginFailed();
	hideLogoutSuccess()
}

function logoutSuccess(){
	let obj = document.getElementById("logoutSuccessAlert");
	obj.style.display = "block";
	hideLoginFailed();
	hideLoginSuccess();
}

function hideLoginFailed(){
	let obj = document.getElementById("failedAlert");
	obj.style.display = "none";
}

function hideLoginSuccess(){
	let obj = document.getElementById("successAlert");
	obj.style.display = "none";
}

function hideLogoutSuccess(){
	let obj = document.getElementById("logoutSuccessAlert");
	obj.style.display = "none";
}
