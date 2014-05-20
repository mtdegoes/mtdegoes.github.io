$(document).ready(function(){

	function getScroll(){
		var currentPosition = $(window).scrollTop();
		return currentPosition;
	}

	//HEADER ANIMATION
	function animateHeader(scrollPosition){
		if (scrollPosition <= "40") {
            $("header").removeClass("mini");

        } else if (scrollPosition >= "40") {
            $("header").addClass("mini");
        }
	}

	//SCROLL ANIMATIONS
    $(window).scroll(function(){
    	var scrollPosition = getScroll();

    	animateHeader(scrollPosition);
    });

    function heightElements(){
    	var windowHeight = $(window).outerHeight();
    	var activeHeight = $(".message-list .active").outerHeight();
    	var adjustAmount = (windowHeight - activeHeight)/ 2;

    	$(".message-list .active").animate({
    		'padding-top': adjustAmount + "px" 
    	}, 200);
    }
    heightElements();

    $("body").click(function(){
    	var currentActive = $(".message-list .active");

    	$(".message-list .active").next("li").addClass("active");
    	currentActive.removeClass("active");

    	heightElements();
    });
    

});
