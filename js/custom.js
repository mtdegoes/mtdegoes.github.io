$(document).ready(function(){

	function verticalAdjustHeader(){
		var windowHeight = $( window ).height(),
			headerHeight = $("header h1").height();
		$("header h1").css("padding-top", ((windowHeight / 2) - headerHeight) + "px");
		$("header").css("height", windowHeight + "px");
	}
	verticalAdjustHeader();

    $(window).resize(function(){

        verticalAdjustHeader();

    });

    //MINMIZE HEADER
    $(window).scroll(function(){
        var scrollPosition = $('body').scrollTop();

        if (scrollPosition >= "200") {
            $(".scroll-reminder").fadeOut(500);
        } else if (scrollPosition <= "200") {
            
        }
    });

    //RANDOM WORD ASSEMBLY
	function randomNumber(lowNumber, highNumber){
		return Math.floor((Math.random() * highNumber) + lowNumber);
	}

	function getRandomTitle(){
    	var sectionNumber = $("section section").length,
    		sectionWords  = "",
    		wordsArray = [];

    	$("section").find("section").each(function() {
			$(this).find("p").each(function() {
				sectionWords=sectionWords+(" " + $(this).text());
				
        	});
        });
        wordsArray.push(sectionWords.split(" "));
        return wordsArray;
    }
    var availableTitles = getRandomTitle();

    for (i = 0; i < randomNumber(2, 5); i++) { 

    	var titleNum = availableTitles[0].length,
    		randomNum = randomNumber(1, titleNum),
    		currentString = availableTitles[0][randomNum];

    	$(".fun-field ul").append("<li>" + currentString + "</li>");
	}

	$(".l1-auto-media").click(function(e){
		e.preventDefault();

		var imgSrc = $(this).attr("src"),
			imgOverlay = "<div class='l1-auto-overlay'><div class='l1-auto-holder'><div class='l1-auto-height'><img src=" + imgSrc + "></div></div></div>";

		$("body").prepend(imgOverlay);
		$(".l1-auto-overlay").click(function(){
			$(".l1-auto-overlay").remove();
		});
	});

});
