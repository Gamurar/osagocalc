var osagoModalWindowClose = document.getElementById("osago-modal-window-close");
var osagoModalWindow = document.getElementById("osago-modal-window");
var osagoButtonDriverId1 = document.getElementById("osago-button-driver-id1");
osagoModalWindowClose.onclick = function(){
	osagoModalWindow.style.display = "none";
	osagoModalWindow.style.opacity = "0";
};
osagoButtonDriverId1.onclick = function(){
	osagoModalWindow.style.display = "flex";
	osagoModalWindow.style.opacity = "1";
};

///////////////////////////////////////////////////////////////////////////////////////

var box = null;
var listed = [];
var osagoInputList = null;
var attrList = null;
var isPerson = true;
var limitedDrivers = false;
var driversAmount = 0;
var watchingArr = [];
var isRusReg = true;
var isRegistered = true;

document.addEventListener("DOMContentLoaded", function() {
	setRegions();
	box = document.querySelector("#osago");
	
	osagoInputList = box.getElementsByTagName("input");
	attrList = document.querySelectorAll("[data-expr]");

	var osagoContentList = box.getElementsByClassName("osago-content");
	for(var i = 0; i < osagoContentList.length; i++) {
		if (osagoContentList[i].hasAttribute("data-watching"))
			watchingArr.push(osagoContentList[i]);		
	}

	for(var i = 0; i < watchingArr.length; i++) {
		var inputs = watchingArr[i].getElementsByTagName("input");
		for (var j = 0; j < inputs.length; j++) {
			inputs[j].addEventListener("change", function(event) {
				if (!event)
      				event = window.event;

				radioOnChange(event);
			});
		}
	}

	radioOnChange();

	var region = document.getElementById("osago-region");
	region.addEventListener("change", regionOnChange);

	console.log(dict);
});

window.addEventListener("load", function(event) {
	var calcBut = document.getElementById("osago-button");
	calcBut.addEventListener("click", calculateOsago);
});

function radioOnChange(event) {
	if (event) {
		var targetName = event.target.getAttribute("name");
		if (targetName == "radio1") {
			isPerson = event.target.value == 1;
			if (!isPerson) {
				driversAmount = 0;
			}
		}
		else if (targetName == "radio2") {
			isRusReg = event.target.value == 1;
		}
		else if (targetName == "radio3") {
			isRegistered = event.target.value == 1;
		}
		else if (targetName == "radio4") {
			limitedDrivers = event.target.value == 1;
			if (!limitedDrivers) {
				driversAmount = 0;
			} else {
				driversAmount = 1;
			}
		} 
		else if (targetName == "radio5") {
			driversAmount = event.target.value;
		}
	}

	for(var i = 0; i < attrList.length; i++) {
		var elem = attrList[i];
		if (eval(elem.getAttribute("data-expr"))) {
			elem.classList.remove("hide");
		} else {
			elem.classList.add("hide");
		}
	}
}

function setRegions() {
	var regionsNode = document.getElementById("osago-region");
	var citiesNode = document.getElementById("osago-city");
	var regionsContent = "";
	var citiesContent = "";
	var value = 1;
	for (var region in dict) {
		regionsContent += `<option value="${value}">${region}</option> `;
		value++;
	}
	regionsNode.innerHTML = regionsContent;

	value = 1;
	for(var city in dict["Алтайский край"]) {
		citiesContent += `<option value="${value}">${city}</option> `;
		value++;
	}
	citiesNode.innerHTML = citiesContent;
}

function regionOnChange() {
	var region = getSelected("osago-region").text;
	var citiesNode = document.getElementById("osago-city");
	var citiesContent = "";
	var value = "";
	for(var city in dict[region]) {
		value = JSON.stringify(dict[region][city]);
		citiesContent += "<option value='" + value + "'>"
									+ city + "</option>";
	}
	citiesNode.innerHTML = citiesContent;
}
