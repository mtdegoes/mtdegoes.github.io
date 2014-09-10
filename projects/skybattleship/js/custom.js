$(document).ready(function(){

	//SYSTEM POINTS
	var missileCount = 3;
		lightPlasmaOffset = 2;
		heavyPlasmaOffset = 5,
		lightMissileOffset = 1,
		heavyMissileOffset = 3,
		interceptorOffset = 1,
		shieldOffset = 0.5,
		hullValue = 0;

	//PLAYSOUND
	function playSound(soundLocation){
		var soundElem = document.createElement('audio');
			soundElem.setAttribute('src', soundLocation);
			soundElem.setAttribute('autoplay', 'autoplay');
	}

	//ENGINE EQUATION
	function engineEquation(engines){
		return (engines / hullValue) * 10;
	}


	//DISPLAY C&C MESSAGE
	function displayInfo(message){
		$(".message-display").html("<h5>CNC MESSAGE INCOMMING</h5><p>" + message + "</p>");
		setTimeout(function(){
			$(".message-display p, .message-display h5").fadeOut(500, function(){
				$(this).remove();
			});
		}, 3000);
	}

	//UPDATE DISPLAYS	
	function updateCC(console, value){
		$(console).html(value);
	}

	//GATHER DATA ON X SYSTEM
	function assessSystem(system){
		totalCount = 0;

		if (system.indexOf(".system-hull") <= 0) {
			$(system).each(function(){
				var systemCount = parseInt($(this).html());
				totalCount = totalCount + systemCount;
			});
		} else {
			$(system).each(function(){
				var systemCount = parseInt($(this).html());

				if (systemCount >= 1){
					totalCount = totalCount + systemCount;
				} else {
					$(this).parents(".vessel-section").removeClass("active");
				}
			});
		}
		return totalCount;
	}

	//CREATE SHIP SECTIONS
	function createTactical(){
		for (i = 0; i < $(".vessel-section").length; i++) { 
			var inputElement = '<div style="width: ' + parseInt((100 / $(".vessel-section").length)) + '%"class="section sec-' + (i + 1) + '"><input value="0" type="number"></div></div>';

			$(".interceptor-assignment").append(inputElement);
			$(".incoming-barrage").append(inputElement);
		}
	}
	createTactical();

	//UPDATE OVERALL SHIP STATUS
	function shipStatus(){
		var batteriesStatus = $(".control-missile-batteries").attr("class").indexOf("active");

		//SHIP SYSTEMS
		var activeSgenerators = assessSystem(".active .system-sgenerators"),
			activeEngines = assessSystem(".active .system-engines"),
			activeLightPlasmas = assessSystem(".active .system-lps"),
			activeHeavyPlasmas = assessSystem(".active .system-hps"),
			activeInterceptors = assessSystem(".active .system-aas"),
			activeArmor = assessSystem(".active .system-armor"),
			activeHull = assessSystem(".active .system-hull");

		//UDPATE CC/MISSILES
		if (batteriesStatus >= 0){
			var	activeLightMissiles = assessSystem(".active .system-lms"),
				activeHeavyMissiles = assessSystem(".active .system-hms");

			updateCC(".status-ms", (activeLightMissiles * lightMissileOffset) + (activeHeavyMissiles * heavyMissileOffset));
		} else {
			updateCC(".status-ms", 0);
		}

		//UPDATE CC/OTHER
		updateCC(".status-sgenerators", activeSgenerators);
		updateCC(".status-engines", activeEngines);
		updateCC(".status-ps", ((activeLightPlasmas * lightPlasmaOffset) + (activeHeavyPlasmas * heavyPlasmaOffset)));
		updateCC(".status-aas", (activeInterceptors * interceptorOffset));
		updateCC(".status-armor", activeArmor);
		updateCC(".status-hull", activeHull);

		if (activeHull <= 0){
			displayInfo("Hull breaches on all deck. Abandon ship. Repeat, abandon ship.")
			playSound("sounds/alert.mp3");
			setTimeout(function(){
				playSound("sounds/vessel.mp3");
					setTimeout(function(){
						playSound("sounds/destroyed.mp3");
					}, 800);
			}, 800);
		}
	}
	shipStatus();
	hullValue = parseInt($(".ship-overview .status-hull").html());

	//ACTIVATE BATTERIES
	$(".control-missile-batteries").click(function(){
		$(this).find("i").toggleClass("fa-toggle-off");
		$(this).find("i").toggleClass("fa-toggle-on");
		$(this).toggleClass("active");
		shipStatus();

		if ($(this).attr("class").indexOf("active") >= 0) {
			displayInfo("All missile batteries armed.");
		} else {
			displayInfo("Taking missile batteries offline.");
		}
	});

	//ACTIVATE SHIELDS
	$(".vessel-section").click(function(){
		var availableShields = $(".status-sgenerators").html(),
			assignedShields = $(".status-sgenerators-assigned").html();

		if ($(this).attr("class").indexOf("shields-active") >= 1){
			$(this).removeClass("shields-active");
			$(".status-sgenerators-assigned").html(--assignedShields);
		} else if ((availableShields - assignedShields) >= 1) {
			$(this).addClass("shields-active");
			$(".status-sgenerators-assigned").html(++assignedShields);
		} else if ((availableShields - assignedShields) == 0) {
			displayInfo("Sorry Captain, no more shields to allocate, all generators are already in use.");
		}
	})

	//TACTICAL
	//INTERCEPTORS
	$(".interceptor-assignment input").keyup(function(){

		var totalInterceptors = parseInt($(".status-aas").html()),
			assignedInterceptors = $(this).val(),
			totalAssigned = 0;

			$(this).parents(".interceptor-assignment").find("input").each(function(){
				var allValues = $(this).val();

				totalAssigned = totalAssigned + parseInt(allValues);
			});
		if ((totalInterceptors - totalAssigned) >= 0 && assignedInterceptors <= totalInterceptors){
			$(".status-aas-assigned").html(totalAssigned);
			$(".end-turn").css('visibility', 'visible');
		} else {
			displayInfo("Sorry Captain, too many interceptor batteries assigned.");
			$(".end-turn").css('visibility', 'hidden');
		}
	});

	//RANDOM GENERATOR
	function randomFactor75(){
		return Math.floor(Math.random() * 25) + 75;
	}

	function randomFactor50(){
		return Math.floor(Math.random() * 50) + 25;
	}

	var destroyedSections = "";
	var sectionsDestroyed = 0,
		sectionsTotal = $(".incoming-barrage .section").length;

	//CALCULATE TURN RESULTS
	function calculateDamage(){
		for (i = 0; i < $(".incoming-barrage .section").length; i++) {
				var valDamage = parseInt($(".incoming-barrage .sec-" + (i + 1) + " input").val()),
					sectionInt = parseInt($(".interceptor-assignment .sec-" + (i + 1) + " input").val()),
					sectionArmor = parseInt($(".vessel-stats .vessel-section:nth-child(" + (i + 1) + ")").find(".system-armor").html()),
					sectionHull = parseInt($(".vessel-stats .vessel-section:nth-child(" + (i + 1) + ")").find(".system-hull").html()),
					sectionEngine = parseInt($(".ship-overview .status-engines").html()),
					sectionShield = $(".vessel-stats .vessel-section:nth-child(" + (i + 1) + ")").attr("class").split(" ").pop();
					if (sectionShield.indexOf("shields-active") >= 0){
						sectionShield = shieldOffset;
					} else {
						sectionShield = 0;
					}

				var rF75 = parseFloat("0." + randomFactor75());
				var rF50 = parseFloat("0." + randomFactor50());
				var battleResults = (((valDamage - (sectionInt * rF50)/*INTERCEPTORS*/) - (sectionShield * rF75))/*SHIELDS*/ - sectionArmor)/*ARMOR*/ - (engineEquation(3) * rF75)/*ENGINES*/;
				var audioFile = (i + 1);

				if (sectionHull >= 0 && battleResults >= 0){
					$(".vessel-stats .vessel-section:nth-child(" + (i + 1) + ")").find(".system-hull").html(sectionHull - Math.round(battleResults));
					$(".vessel-stats .vessel-section:nth-child(" + (i + 1) + ")").addClass("damaged");

					sectionHull = parseInt($(".vessel-stats .vessel-section:nth-child(" + (i + 1) + ")").find(".system-hull").html());

					if (destroyedSections.indexOf(audioFile) <= -1){
						if (sectionHull <= 0){
							++sectionsDestroyed;

							//PLAY AUDIO FILE
							if (sectionsDestroyed < sectionsTotal){
								altAudio = "" + audioFile;
								playSound("sounds/section.mp3");
								setTimeout(function(){
									playSound("sounds/" + altAudio + ".mp3");
										setTimeout(function(){
											playSound("sounds/destroyed.mp3");
											setTimeout(function(){
												playSound("sounds/reassign.mp3");
												setTimeout(function(){
													playSound("sounds/defensive.mp3");
													setTimeout(function(){
														playSound("sounds/systems.mp3");
													}, 800);
												}, 800);
											}, 1500);
										}, 800);
								}, 800);
							}

							destroyedSections = destroyedSections + audioFile;

							//DISABLE SECTIONS
							$(".vessel-stats .vessel-section:nth-child(" + (i + 1) + ")").find(".system-hull").html(0);
							$(".vessel-stats .vessel-section:nth-child(" + (i + 1) + ")").removeClass("active");
							$(".vessel-stats .vessel-section:nth-child(" + (i + 1) + ")").addClass("inoperable");

							//RESET SHIELDS
							var assignedShields = $(".status-sgenerators-assigned").html(0);
							$(".shields-active").removeClass("shields-active");

							//RESET INTERCEPTORS
							$(".interceptor-assignment input").val(0);
							$(".status-aas-assigned").html(0);
						}
					}
				}
		}
		var missileStatus = $(".control-missile-batteries").attr("class");
		if (missileStatus.indexOf("active") >= 0 && (missileCount >= 1)){
			--missileCount;
			if (missileCount == 0){
				$(".status-ms").html("0");
				$(".control-missile-batteries").fadeOut();
				$(".control-missile-batteries").removeClass("active");
				displayInfo("All missiles expended.")
			}
		}
		shipStatus();
	}

	//END TURN
	$(".end-turn").click(function(){
		calculateDamage();
	});

});
