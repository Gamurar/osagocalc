var isTractor = false;

// Расчитать
function calculateOsago() {
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
	console.log(driversCoef);
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


function getSelected(id) {
	var selectNode = document.getElementById(id);
	var selected = selectNode.options[selectNode.selectedIndex];

	return selected;
}
