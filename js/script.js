var osagoModalWindow = document.getElementById("osago-modal-window");
var kbmDriver = null;

function openModalWindow(target) {
	osagoModalWindow.style.display = "flex";
	osagoModalWindow.style.opacity = "1";
	kbmDriver = target;
}

function closeModalWindow() {
	osagoModalWindow.style.display = "none";
	osagoModalWindow.style.opacity = "0";
	infoBox.classList.add("hide");
}

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
	setCityCoef();
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
				if (!event) {
      				event = window.event;
				}
				radioOnChange(event);
			});
		}
	}

	radioOnChange();

	var region = document.getElementById("osago-region");
	region.addEventListener("change", regionOnChange);

	var vehicle = document.getElementById("osago-vehicle");
	vehicle.addEventListener("change", setCityCoef);

	var city = document.getElementById("osago-city");
	city.addEventListener("change", setCityCoef);

	// console.log(dict);
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
				limitedDrivers = false;
			}
		}
		else if (targetName == "radio2") {
			isRusReg = event.target.value == 1;
			if (!isRusReg) {
				limitedDrivers = false;
				result.territorСoef = 1.7;
			} else {
				setCityCoef();
			}
		}
		else if (targetName == "radio3") {
			isRegistered = event.target.value == 1;
		}
		else if (targetName == "radio4") {
			limitedDrivers = event.target.value == 1;
			driversAmount = limitedDrivers ? 1 : 0;
		} 
		else if (targetName == "radio5") {
			driversAmount = event.target.value;
		}
	}
	
	
	if (!limitedDrivers || !isDriversLimFormSelected()) {
		driversAmount = 0;
	}


	for(var i = 0; i < attrList.length; i++) {
		var elem = attrList[i];
		if (eval(elem.getAttribute("data-expr"))) {
			elem.classList.remove("hide");
		} else {
			elem.classList.add("hide");
			if (elem.id == "drivers-limit" || elem.id == "vehicle-owner") {
				var radio = elem.getElementsByTagName("input");
				radio[0].checked = false;
				radio[1].checked = false;
				limitedDrivers = false;
			}
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
	// isTractor = getSelected("osago-vehicle").text == "Тракторы и иные машины";
	var region = getSelected("osago-region").text;
	var citiesNode = document.getElementById("osago-city");
	var citiesContent = "";
	var value = "";
	for(var city in dict[region]) {
		value = JSON.stringify(dict[region][city]);
		if (parseInt(city)) {
			// result.territorСoef = dict[region][city][0];
			citiesContent += "<option value='" + 
							value + "' data-nocity='" + 
							city + "'>" + 
							region + "</option>";
		} else {
			// result.territorСoef = dict[region][city][Number(isTractor)];
			citiesContent += "<option value='" + 
								value + "'>" + 
								city + "</option>";
		}
	}
	citiesNode.innerHTML = citiesContent;
	setCityCoef();
}

