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


});
