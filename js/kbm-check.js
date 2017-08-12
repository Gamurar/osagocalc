var infoBox = document.getElementById("kbm-check-info-box");
var FIO = "";
var birthDate = 0;
var seria = 0;
var number = 0;

function checkKbm() {
	FIO 	  = document.getElementById("kbm-check-bio").value.replace(" ", "+");
	birthDate = document.getElementById("kbm-check-birth-date").value;
	seria 	  = document.getElementById("kbm-check-seria").value;
	number 	  = document.getElementById("kbm-check-number").value;
	var waitOverlay = document.getElementById("osago-wait-overlay");
	var today = getTodayDate();

	httpGetAsync("http://calc.kasko10.ru/check_kbm.php?callback=jQuery112404085855243923566_1502541837793" + 
	"&kmb_date=" +
	today +
	"&KBM_FIO=" + 
	FIO + 
	"&KBM_BD=" +
	birthDate +
	"&KBM_SERIA=" + 
	seria +
	"&KBM_NOMER=" +
	number +
	"&domain=osago-calc.ru&_=1502541837795",
	function(response){
		var data = response.match(/{.+}/g)[0];
		data = JSON.parse(data);
		waitOverlay.style.display = "none";
		infoBox.innerHTML = data.body;
		infoBox.classList.remove("hide");

		var kbmSelect = document.getElementById(kbmDriver.dataset.kbmSelectId);
		kbmSelect.value = data.kbm;
	});
	waitOverlay.style.display = "block";
}





function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function getTodayDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = dd + '-' + mm + '-' + yyyy;

	return today;
}