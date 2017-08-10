	var result = {
		baseCoef 	  : 1, 	// Базовый тариф [min, max]
	 	territorСoef  : 1,	// Территориальный коэффициент
	 	bonusMalusCoef: 1,	// Коэффициент бонус-малус
	 	ageExpCoef 	  : 1, 	// Коэффициент возраст-стаж
	 	limitCoef 	  : 1, 	// Ограничивающий коэффициент
	 	powerCoef 	  : 1, 	// Коэффициент мощности двигателя
	 	seasonCoef 	  : 1, 	// Коэффициент сезонности
	 	nonobsCoef 	  : 1, 	// Коэффициент нарушений
	 	timeCoef 	  : 1, 	// Коэффициент срока страхования
	 	calcFinalPrice: function() {
				var finalPrice = [];
				var minPrice = this.baseCoef[0] *
							   this.bonusMalusCoef *
							   this.powerCoef *
							   this.ageExpCoef *
							   this.limitCoef	*
							   this.nonobsCoef *
							   this.timeCoef;

				var maxPrice = this.baseCoef[1] *
							   this.bonusMalusCoef *
							   this.ageExpCoef *
							   this.limitCoef	*
							   this.powerCoef *
							   this.nonobsCoef *
							   this.timeCoef;

				return [minPrice, maxPrice];
			},
	 	init 		  : function() {
	 		this.baseCoef 	  = calcBaseCoef();
	 		this.territorСoef = calcTerritorСoef();
	 		this.ageExpCoef   = calcAgeExpCoef();
	 		this.powerCoef 	  = calcPowerCoef();
	 		this.timeCoef 	  = calcTimeCoef();

	 	}				
	};

	console.log(result);