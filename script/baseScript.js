		
function LoadPage(page) {
	document.getElementById("loadingFrame").innerHTML='<object type="text/html" data="'+page+'" width=100% height=100%></object>';
}

function AutoDirect(){
	if(localStorage.getItem("loggedIn")){
		LoadPage('timeSheets.html');
	}else{
		LoadPage('login.html');
	}
}
