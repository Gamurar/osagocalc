var isTractor = false;
var table = document.getElementById("osago-result");

// Расчитать
function calculateOsago() {
	if (checkError()) {		
		if (!table.classList.contains("hide")) {
			table.classList.add("hide");
		}
	} else {
		result.init();
		var finalPrice = result.calcFinalPrice();
		var minPrice = Math.round(finalPrice[0]);
		var maxPrice = Math.round(finalPrice[1]);
		document.getElementById("base-coef-min")	   .innerHTML = result.baseCoef[0];
		document.getElementById("base-coef-max")	   .innerHTML = result.baseCoef[1];
		document.getElementById("territor-coef-min")   .innerHTML = result.territorСoef;
		document.getElementById("territor-coef-max")   .innerHTML = result.territorСoef;
		document.getElementById("bonus-malus-coef-min").innerHTML = result.bonusMalusCoef;
		document.getElementById("bonus-malus-coef-max").innerHTML = result.bonusMalusCoef;
		document.getElementById("power-coef-min")	   .innerHTML = result.powerCoef;
		document.getElementById("power-coef-max")	   .innerHTML = result.powerCoef;
		document.getElementById("age-exp-coef-min")	   .innerHTML = result.ageExpCoef;
		document.getElementById("age-exp-coef-max")	   .innerHTML = result.ageExpCoef;
		document.getElementById("limit-сoef-min")	   .innerHTML = result.limitCoef;
		document.getElementById("limit-сoef-max")	   .innerHTML = result.limitCoef;
		document.getElementById("use-period-coef-min") .innerHTML = result.usePeriodCoef;
		document.getElementById("use-period-coef-max") .innerHTML = result.usePeriodCoef;
		document.getElementById("time-coef-min")	   .innerHTML = result.timeCoef;
		document.getElementById("time-coef-max")	   .innerHTML = result.timeCoef;
		document.getElementById("final-price-min")	   .innerHTML = minPrice;
		document.getElementById("final-price-max")	   .innerHTML = maxPrice;

		if (table.classList.contains("hide")) {
			table.classList.remove("hide");
		}
	}
}

// Базовый тариф
function calcBaseCoef() {
	var vehicle = getSelected("osago-vehicle").text;	
	var owner = isPerson ? "person" : "company";
	var baseCoef = null;
	if (vehicle == "Легковые автомобили") {
		baseCoef = vehiclesInfo[vehicle][owner];
	} else {
		baseCoef = vehiclesInfo[vehicle];
	}
	
	return baseCoef;
}

// Территориальный коэффициент
function calcTerritorСoef() {
	var territorСoef = 0;
	var region = getSelected("osago-region").text;
	var city = getSelected("osago-city").text;
	territorСoef = dict[region][city][Number(isTractor)];

	return territorСoef;
}

// Коэффициент бонус-малус
function calcBonusMalusCoef() {
	if (limitedDrivers &&
		isPerson &&) {
		return 1;
	}

	var drivers = [];
	for (var i = 1; i <= driversAmount; i++) {
		var kbm = Number(getSelected("osago-kbm-driver" + i).text);
		drivers.push(kbm);
	}

	return Math.max.apply(null, drivers);
}

// Коэффициент возраст-стаж
function calcAgeExpCoef() {
	var ageExpCoef = 0;
	if (driversAmount == 0) { 
		return 1; 
	}
	var driversCoef = [];
	var age = "empty";
	var exp = "empty";
	var driversContentList = document.getElementsByClassName("osago-driver-content");
	for (var i = 0; i < driversContentList.length; i++) {
		var driverAgeChoice = driversContentList[i].getElementsByClassName("osago-driver-choice-content")[0];
		var inputs = driverAgeChoice.getElementsByTagName("input");
		if (inputs[0].checked) {
			age = "18-23";
		} else if (inputs[1].checked) {
			age = "24 и более";
		}
		
		driverAgeChoice = driversContentList[i].getElementsByClassName("osago-driver-choice-content")[1];
		inputs = driverAgeChoice.getElementsByTagName("input");
		if (inputs[0].checked) {
			exp = "0-2";
		} else if (inputs[1].checked) {
			exp = "3 и более";
		}

		pushCoef();
	}
	
	function pushCoef() {
		if (age == "18-23" && exp == "0-2") {
			driversCoef.push(1.8);
		} 
		else if (age == "24 и более" && exp == "0-2") {
			driversCoef.push(1.7);
		}
		else if (age == "18-23" && exp == "3 и более") {
			driversCoef.push(1.6);
		}
		else if (age == "24 и более" && exp == "3 и более") {
			driversCoef.push(1);
		}
		else if (age == "empty" || exp == "empty") {
			// say user to fill all the forms
		}
		age = "empty";
		exp = "empty";
	}
	
	return Math.max.apply(null, driversCoef);
}

// Коэффициент мощности двигателя
function calcPowerCoef() {
	return getSelected("osago-power-car").value;
}

// Ограничивающий коэффициент
function calcLimitCoef() {
	if (!isPerson) {
		return 1.8;
	} else {
		return limitedDrivers ? 1 : 1.8;
	}
}

// Коэффициент периода использования 
function calcUsePeriodCoef() {
	return getSelected("osago-period-of-use").value;
}

// Коэффициент срока страхования
function calcTimeCoef() {
	return getSelected("osago-term-of-insurance").value;	
}

// helper functions
function getSelected(id) {
	var selectNode = document.getElementById(id);
	var selected = selectNode.options[selectNode.selectedIndex];

	return selected;
}

function checkError() {
	var driversLimitForm = document.getElementById("drivers-limit");
	if (driversLimitForm.classList.contains("hide")) {
		return false;
	}
	var error = document.getElementById("error");
	var errorText = document.getElementById("error-text");
	var limitInputs = driversLimitForm.getElementsByTagName("input");
	if (!limitInputs[0].checked && !limitInputs[1].checked) {
		errorText.innerHTML = "Не выбран тип водителей";
		error.classList.remove("hide");
		return true;
	}

	var drivers = document.getElementsByClassName("osago-driver");
	for(var i = 0; i < driversAmount; i++) {
		var driverContent = drivers[i].getElementsByClassName("osago-driver-first-content");
		for (var j = 0; j < 2; j++) {
			var contentInputs = driverContent[j].getElementsByTagName("input");
			if (!contentInputs[0].checked && !contentInputs[1].checked) {
				var contentH = driverContent[j].getElementsByClassName("osago-driver-content-h")[0].innerHTML;
				var option = "";
				if (contentH == "Возраст (лет)") {
					errorText.innerHTML = "Не выбран возраст " +
										  (i + 1) +
										  "-го водителя";
					error.classList.remove("hide");
					return true;
				} else if (contentH == "Стаж (лет)") {
					errorText.innerHTML = "Не выбран стаж " +
										  (i + 1) +
										  "-го водителя";
					error.classList.remove("hide");
					return true;
				}
			}
		}
	}
	if (!error.classList.contains("hide")) {
		error.classList.add("hide");
	}
	return false;
}
