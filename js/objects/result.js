	var result = {
		baseCoef 	  : 1, 	// Базовый тариф [min, max]
	 	territorСoef  : 1,	// Территориальный коэффициент
	 	bonusMalusCoef: 1,	// Коэффициент бонус-малус
	 	ageExpCoef 	  : 1, 	// Коэффициент возраст-стаж
	 	limitCoef 	  : 1, 	// Ограничивающий коэффициент
	 	powerCoef 	  : 1, 	// Коэффициент мощности двигателя
	 	usePeriodCoef : 1, 	// Коэффициент периода использования 	 	
	 	timeCoef 	  : 1, 	// Коэффициент срока страхования
	 	nonobsCoef 	  : 1,	// Коэффициент нарушений
	 	calcFinalPrice: function() {
				var finalPrice = [];
				var minPrice = this.baseCoef[0] *
							   this.bonusMalusCoef *
							   this.powerCoef *
							   this.ageExpCoef *
							   this.limitCoef	*
							   this.nonobsCoef *
							   this.usePeriodCoef *
							   this.timeCoef;

				var maxPrice = this.baseCoef[1] *
							   this.bonusMalusCoef *
							   this.ageExpCoef *
							   this.limitCoef	*
							   this.powerCoef *
							   this.nonobsCoef *
							   this.usePeriodCoef *
							   this.timeCoef;

				return [minPrice, maxPrice];
			},
	 	init 		  : function() {
	 		this.baseCoef 	   = calcBaseCoef();
	 		this.bonusMalusCoef= calcBonusMalusCoef();
	 		this.ageExpCoef    = calcAgeExpCoef();
	 		this.limitCoef	   = calcLimitCoef();
	 		this.powerCoef 	   = getSelected("osago-power-car").value;
	 		this.usePeriodCoef = calcUsePeriodCoef();
	 		this.timeCoef 	   = calcTimeCoef();
	 	}				
	};
