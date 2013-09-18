var currentLocation = window.location.href;

$(document).ready(function(){

    //CURRENT LOCATION
    if (currentLocation == "file://localhost/Users/matthewdegoes/Desktop/mtdegoes/index.html") {
        console.log("Correct Page Reached");
    }

    //DYNAMIC FLOAT CLEARING
    $(".js-clear-float").after("<div class='clear'></div>")

    //SCROLL ANIMATIONS
    $(window).scroll(function(){
        var scrollPosition = $('body').scrollTop();

        if (scrollPosition <= "40") {
            $("header").stop().animate({opacity: 1.0},1000)

        } else if (scrollPosition >= "40") {
            $("header").stop().animate({opacity: 0.0},1000)

        }
    });

    //MENU HOVER
    $("header").mouseenter(function(){
        $(this).animate({opacity: 1.0},1000)
    }).mouseleave(function(){
        var scrollPosition = $('body').scrollTop();

        if (scrollPosition >= "40") {
            $("header").stop().animate({opacity: 0.0},1000)

        }
    });

    //SMOOTH SCROLL
    $("#header-menu").on("click", "a", function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 66
        }, 500);
    });

    //OVERLAY FUNCTION
    $("#interactive-start").click(function(e){
        e.preventDefault();

        createOverlay();
    });

    function createOverlay() {
        $("body").prepend("<div id='overlay'></div>");

        $("#overlay").on("click", function(){
            $(this).remove();

            $("#interactive-div").animate({
                opacity: 0.0,
                zIndex: 0
            }, 200);

	});

	function positionDiv() {
	    var hDivPosition = (($(window).width()) -600) / 2;
	    var vDivPosition = (($(window).height()) -400) / 2;

	    $("#interactive-div").css({
		left: hDivPosition,
		top: vDivPosition,
		zIndex: 1100
	    });
	}

	$(window).resize(function(){
	    positionDiv();
	});

	positionDiv();

	$("#interactive-div").animate({
	    opacity: 1.0
	}, 500);
    }

    //CLOSEABLE
    $(".js-closeable").append("<i class='icon-collapse-top'></i>");
    $(".js-closeable i.icon-collapse-top").click(function(){
	$(this).closest(".js-closeable").css({
	    height: '20px',
	    padding: '0px'
	});
	
	$(this).closest(".js-closeable").find("h1, h2, h3, h4, h5, p").css({
	    color: '#fefefe'
	});
	
	$(this).removeClass("icon-collapse-top").addClass("icon-collapse");
	
	$(".js-closeable i.icon-collapse").click(function(){
	    $(this).closest(".js-closeable").css({
		height: 'auto',
		padding: '20px'
	    });
	    
	    $(this).closest(".js-closeable").find("h1, h2, h3, h4, h5, p").css({
		color: '#000'
	    });
	    
	    $(this).removeClass("icon-collapse").addClass("icon-collapse-top");
	});
    });

    /*DYNAMIC SHIP CONTAINER*/
    function replaceShipImage() {
	
	$("#js-ship-container img").load(function(){
	    var h = (this.height) + 20, w = this.width;
	    
	    $(this).closest("#js-ship-container").css({
		width: w,
		height: h
	    });
	    
	    var imgSrc = this.src;
	    $("#js-ship-container").css("background-image", "url(" + imgSrc + ")");
	    
	    var newTop = h + 60
	    
	    $("#js-ship-sections li form.od-allotment").css({
		top: newTop + 40
	    });
	    
	    $("#js-ship-sections li").css({
		height: h + 80
	    });
	    
	    this.remove();
	});
    }
    replaceShipImage();
    
    /*SHIP STATUS & MESSAGES*/
    function shipStatus() {
	var totalSum = 0;
	$("#js-ship-sections li .hull-points").each(function(){
	    var currentPoints = this.innerHTML;
	    var numSum = (totalSum += Number(currentPoints));
	    var hullValue = $('#hull-value span').html();
	    
	    var percentOTotal = parseInt((totalSum / hullValue) * 100);
	    if (percentOTotal >= 80) {
		$("#overall-ship-status").animate({
		    width: '0%'
		}, 10);
	    } else if (percentOTotal >= 60) {
		$("#overall-ship-status").animate({
		    width: '25%'
		}, 10);
	    } else if (percentOTotal >= 40) {
		$("#overall-ship-status").animate({
		    width: '50%'
		}, 10);
	    } else if (percentOTotal >= 20) {
		$("#overall-ship-status").animate({
		    width: '75%'
		}, 10);
	    } else if (percentOTotal >= 10) {
		$("#overall-ship-status").animate({
		    width: '90%'
		}, 10);
	    } else if (percentOTotal >= 5) {
		$("#overall-ship-status").animate({
		    width: '100%'
		}, 10);
	    }
	});	
    }
    
    function scrollMessage() {
		$("#system-messages #message").animate({
		    left: '100px'
		},500, function(){
		    $("#system-messages #message").delay(3000).animate({
			left: '-4000px'
		    },500);
		});
    }
    
    /*DYNAMIC SHIP SECTIONS*/
    function shipSections() {
		var thisElem = $("#js-ship-sections li");
		
		var sectionCount = thisElem.size();
		var percentDiv = 100 / sectionCount;
		
		var hullValue = $('#hull-value span').html();
		var hullPerSection = parseInt(hullValue / sectionCount);
		$("#js-ship-sections li form.od-allotment p:nth-child(3) span").html(hullPerSection);
		shipStatus();
		
		$(thisElem).css({width: percentDiv + "%"});
	
		/*SHIELD ALLOCATION*/
		$("a.section-shielded").click(function(e){
		    e.preventDefault();
		    
		    var currentElement = this;
		    var availableShields = $("#shield-value").html();
		    
		    if (availableShields >= 1) {
			$(this).closest("li").find(".section-shieldon").html(2);
			availableShields = (availableShields -= 1)
			$("#shield-value").html(availableShields);

			setTimeout( function(){
			    $(currentElement).closest("li").css({
				background: "rgba(39, 169, 225, 0.5)"
			    });
			},500);
		
		    } else {
			$("#system-messages #message").html("Negative Captain, all shields already assigned.");
			scrollMessage();
		    }
		});

		/*BATTLE CONTROLS*/
		$("#battle-controls div").click(function(){
		    var currentElement = $(this).attr('class');
		    
		    if (currentElement) {
				$(this).removeClass('initiate');
				var currentShields = $("#shield-value").html();
				updateShipSpecs();
				$("#shield-value").html(currentShields);
		    } else {
				$(this).addClass('initiate');
				var currentShields = $("#shield-value").html();
				updateShipSpecs();
				$("#shield-value").html(currentShields);
		    }
		});

		function updateShipSpecs() {
		    /*ARMOR*/
		    var sumArmor = 0;
		    $('#js-ship-sections li.active .section-armor').each(function() {
			var currentValue = parseInt(this.innerHTML);
			var numSum = (sumArmor += Number(currentValue));
		    });
		    
		    /*SHIELD GENERATORS*/
		    var sumShieldGen = 0;
		    $('#js-ship-sections li.active .section-shieldgen').each(function() {
			var currentValue = parseInt(this.innerHTML);
			var numSum = (sumShieldGen += Number(currentValue));
			
			$("#shield-value").html(numSum);
		    });
		    
		    /*INTERCEPTORS TEMP*/
		    var sumIntTemp = 0;
		    $('#js-ship-sections li.active .section-interceptors-temp').each(function() {
			var currentValue = parseInt(this.innerHTML);
			var numSum = (sumIntTemp += Number(currentValue));
		    });
		    
		    /*INTERCEPTORS PERM*/
		    var sumIntPerm = 0;
		    $('#js-ship-sections li.active .section-interceptors-perm').each(function() {
			var currentValue = parseInt(this.innerHTML);
			var numSum = (sumIntPerm += Number(currentValue));
			var intercepActive = $("#use-reserve-interceptors").attr('class');
			
			if (intercepActive) {
			    sumInterceptors = numSum += sumIntTemp;
			    $("#interceptors-value").html(sumInterceptors);
			} else {
			    sumInterceptors = numSum;
			    $("#interceptors-value").html(sumInterceptors);
			}
		    });
		    
		    /*BATTERIES TEMP*/
		    var sumBatTemp = 0;
		    $('#js-ship-sections li.active .section-batteries-temp').each(function() {
			var currentValue = parseInt(this.innerHTML);
			var numSum = (sumBatTemp += Number(currentValue));
		    });
		    
		    /*BATTERIES PERM*/
		    var sumBatPerm = 0;
		    $('#js-ship-sections li.active .section-batteries-perm').each(function() {
			var currentValue = parseInt(this.innerHTML);
			var numSum = (sumBatPerm += Number(currentValue));
			var batteriesActive = $("#use-reserve-batteries").attr('class');
			
			if (batteriesActive) {
			    sumBatteries = numSum += sumBatTemp;
			    $("#batteries-value").html(sumBatteries);
			} else {
			    sumBatteries = numSum;
			    $("#batteries-value").html(sumBatteries);
			}
		    });
		}
		updateShipSpecs();

		/*CALCULATOR FUNCTION*/
		function runCalculations() {
		    
		    /*INTERCEPTORS*/
		    usedInterceptors = 0
		    $("#js-ship-sections li form.od-allotment input.interceptors").blur(function(){
			
			var sumIntFired = 0;
			$('#js-ship-sections li form.od-allotment input.interceptors').each(function() {
			    var currentValue = parseInt(this.value);
			    var numSum = (sumIntFired += Number(currentValue));
			    
			    if (numSum <= sumInterceptors) {
				$("#interceptors-used").html(numSum);
				
			    } else {
				$("#interceptors-used").html(numSum);
				$("#system-messages #message").html("Captain, please update defense grid, you've assigned too many interceptors.");
				scrollMessage();
			    }
			});
		    });
		}
		runCalculations();
		
		/*RUN SECTION*/
		$(".run-section").click(function(){
			playSound("sounds/effect-engage.wav");
		    var calcShipSpeed = $("#speed-value span").html();
		    var batteriesActive = $("#use-reserve-batteries").attr('class');
		    var intercepActive = $("#use-reserve-interceptors").attr('class');
			
		    if (batteriesActive) {
			$("#use-reserve-batteries").fadeOut(1000).delay(100).remove();
			updateShipSpecs()
		    }
		    
		    if (intercepActive) {
			$("#use-reserve-interceptors").fadeOut(1000).delay(100).remove();
			updateShipSpecs()
		    }
		    
		    $(".run-section").each(function(){
			var calcArmor = $(this).closest("#js-ship-sections li.active").find("div.section-armor").html();
			var calcShields = $(this).closest("#js-ship-sections li.active").find("div.section-shieldon").html();
			var calcIntercept = $(this).closest("#js-ship-sections li.active").find("form.od-allotment input.interceptors").val();
			var calcBatteries = $(this).closest("#js-ship-sections li.active").find("form.od-allotment input.batteries").val();
			var calcHull = $(this).closest("#js-ship-sections li.active").find(".hull-points").html();
			
			var calcBatteriesPars = parseInt(calcBatteries);
			var calcArmorPars = parseInt(calcArmor);
			var calcShieldsPars = parseInt(calcShields);
			var calcInterceptPars = parseInt(calcIntercept);
			var calcHullPars = parseInt(calcHull);
			
			var a_calc = parseInt(calcBatteriesPars - (calcBatteriesPars * calcShipSpeed));
			var b_calc = (a_calc - calcArmorPars - calcShieldsPars - calcInterceptPars);
			
			if (b_calc >= 1) {
			    var calcHull = (calcHullPars - b_calc);
			    
			    if (calcHull <= 0) {
				var sectionIndex = ($(this).closest("#js-ship-sections li").index()) + 1
				
				$("#system-messages #message").html("Captain! Section -" + sectionIndex + "- has been lost, all systems are offline.");
				scrollMessage();
				
				$(this).closest("#js-ship-sections li.active").removeClass("active");
				$(this).closest("#js-ship-sections li").find(".hull-points").html("0");
				updateShipSpecs();
				
				var currentElement = this;
				setTimeout( function(){
				    $(currentElement).closest("#js-ship-sections li").css({
					background: "rgba(255, 0, 0, 0.5)"
				    });
				},500);
				shipStatus();
				
			    } else {
				$(this).closest("#js-ship-sections li.active").find(".hull-points").html(calcHull);
				shipStatus();
			    }
			}
		    });
		    $(".od-allotment input").val('0');
		});
    }
    shipSections();
    
	function randomizer(totalVar, randomArray){
		var results=[];

		for(var i = 0; i < totalVar; i++){
			var returnVal = randomArray[Math.floor(Math.random() * randomArray.length)];
			results.push(returnVal);
		}
		return results;
	}

	function playSound(soundLocation){
		var battle = document.createElement('audio');
	        battle.setAttribute('src', soundLocation);
	        battle.setAttribute('autoplay', 'autoplay');
	}

    //SYSTEM JUMP
    $("#system-jump").click(function(){
    	playSound("sounds/warp-speed.wav");
    	$("#system-map").html("<ul id='system-grid'></ul><div class='gravity-well'><p>Gravity Well</p><div class='star'><p>Star</p></div></div>");
    	
    	function GenerateSystem(){
    		var spacialBodySelector = Math.floor(Math.random() * (8-3+1)) + 3;

    		//System Objects
    		var spacialObjects=new Array(); 
	    		spacialObjects[0]=" planet-terrestrial'><p>Terrestrial Planet</p><div>";
	    		spacialObjects[1]=" planet-rouge'><p>Rogue Planet</p><div>";
	    		spacialObjects[2]=" planet-proto'><p>Proto Planet</p><div>";
	    		spacialObjects[3]=" planet-ocean'><p>Ocean Planet</p><div>";
	    		spacialObjects[4]=" planet-ice'><p>Ice Giant</p><div>";
	    		spacialObjects[5]=" planet-gas'><p>Gas Giant</p><div>";
	    		spacialObjects[6]=" planet-helium'><p>Helium Planet</p><div>";
	    		spacialObjects[7]=" planet-dwarf'><p>Dwarf Planet</p><div>";
	    		spacialObjects[8]=" planet-desert'><p>Desert Planet</p><div>";
	    		spacialObjects[9]=" planet-rock'><p>Rock Planet</p><div>";
	    		spacialObjects[10]=" sobject-nebula'><p>Nebula</p><div>";
	    		spacialObjects[11]=" sobject-astroid'><p>Astroid Belt</p><div>";
	    		spacialObjects[12]=" planet-iron'><p>Iron Planet</p><div>";
	    		spacialObjects[13]=" sobject-derelict'><p>Derelict Spaceship</p><div>";
	    		spacialObjects[14]=" sobject-mining'><p>Abandoned Mining Station</p><div>";
	    		spacialObjects[15]=" sobject-communications'><p>Abandoned Communications Post</p><div>";
	    		spacialObjects[16]=" sobject-commet'><p>Commet</p><div>";
	    		spacialObjects[17]=" planet-trojan'><p>Trojan Planet</p><div>";
	    		spacialObjects[18]=" planet-pulsar'><p>Pulsar Planet</p><div>";
	    		spacialObjects[19]=" planet-super-earth'><p>Super-Earth Planet</p><div>";
	    		spacialObjects[20]=" planet-earth'><p>Earth Planet</p><div>";
	    		spacialObjects[21]=" planet-binary'><p>Binary Planet</p><div>";
	    		spacialObjects[22]=" planet-chthonian'><p>Chthonian Planet</p><div>";
	    		spacialObjects[23]=" planet-carbon'><p>Carbon Planet</p><div>";
	    		spacialObjects[24]=" planet-coreless'><p>Coreless Planet</p><div>";
	    		spacialObjects[25]=" planet-eccentric'><p>Eccentric Planet</p><div>";
	    		spacialObjects[26]=" sobject-moon'><p>Moon</p><div>";
	    		spacialObjects[27]=" sobject-'><p>Trading Post</p><div>";
	    		spacialObjects[28]=" planet-exo'><p>Exo Planet</p><div>";
	    		spacialObjects[29]=" planet-meso'><p>Meso Planet</p><div>";

	    	//OBJECT SIZES
	    	var objectSizes=new Array(); 
	    		objectSizes[0]="<div class='ring-finder osize-small";
	    		objectSizes[1]="<div class='ring-finder osize-medium";
	    		objectSizes[2]="<div class='ring-finder osize-large";
	    		objectSizes[3]="<div class='ring-finder osize-huge";

	    	var test1 = randomizer(spacialBodySelector, spacialObjects);
	    	var test2 = randomizer(spacialBodySelector, objectSizes);
	    	var k = 0;

	    	for (var i = 0; i < spacialBodySelector; i++) {
	    		$(".gravity-well").after(test2[k] + test1[k]);
	    		k++;
	    	}

			function generateSystemGrid(){
				var numOfDivisions = 16;
				var systemWidth = $("#system-map").width();
				var boxSize = systemWidth / numOfDivisions;
				var numOfRows = parseInt($("#system-map").height() / boxSize);
				var grid = (numOfRows * numOfDivisions) - 5;

				for(var i = 0; i < grid; i++) {
				    $("#system-grid").append("<li style='width: " + boxSize + "px; height: " + boxSize + "px'><h5>G" + i + "</h5></li>");

				    $("system-grid li").width(boxSize).height(boxSize);
				}

				function assignEnemies(){
					var enemyQuantity=new Array(); 
		    			enemyQuantity[0]="7";
		    			enemyQuantity[1]="14";
		    			enemyQuantity[2]="28";

					var enemyStrength = Math.floor(Math.random() * 3);
					var enemyQuantities = enemyQuantity[enemyStrength];

					if (enemyStrength == 0) {
						$("#system-hostility").html("<i class='icon-rss'></i>Light Forces Detected");
					} else if (enemyStrength == 1) {
						$("#system-hostility").html("<i class='icon-rss'></i>Medium Forces Detected");
					} else if (enemyStrength == 2) {
						$("#system-hostility").html("<i class='icon-rss'></i>Heavy Forces Detected");
					}

					for(var i = 0; i < enemyQuantities; i++) {
					    var selectedCell = Math.floor(Math.random() * grid);
					    var flotillaNum = Math.floor(Math.random() * 7);

					    $("#system-grid li:nth-child(" + selectedCell + ")").addClass("ep");
					    $("#system-grid li:nth-child(" + selectedCell + ")").append("<h4><i class='icon-fighter-jet'></i>" + (flotillaNum + 1) + "</h4>");
					}

				}
				assignEnemies();

			}
			generateSystemGrid();

			function fleetPath(){
				$("#system-grid li").click(function(){
					var engagement = $(this).attr('class');
					
					if (engagement) {
						$(this).addClass("engagement").css({"background-color": "#820000", "border-color": "#820000"});
						playSound("sounds/alarm-sound.wav");

					} else {
						playSound("sounds/flotilla-move.wav");
					}

					$(this).toggleClass("active");
				});
			}
			fleetPath();

    	}
    	GenerateSystem();

    	$("#system-map .ring-finder").each(function(){
    		var itemWidth = $(this).width();
    		var itemPositions = $(this).position();
    		var ringCurcum = (itemPositions.left * 2) + itemWidth;
    		
    		$("#system-map").prepend("<div class='system-ring' style='position: absolute; width:" + ringCurcum + "px; height:"+ ringCurcum + "px; top: -" + ((ringCurcum / 2) -224) +"px; left: -" + (ringCurcum / 2) + "px; border-radius:" + ringCurcum + "px;'></div>");
    	});

    });

});

