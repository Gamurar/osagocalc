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

	httpGetAsync("http://calc.kasko10.ru/check_kbm.php?callback=jQuery112404085855243923566_1502541837793&kmb_date=12-08-2017&KBM_FIO=" + 
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
		console.log(data);
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
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}