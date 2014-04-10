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

        $(".tutorial-section").each(function(){
            var elementID = $(this).attr("id");
            var elementPosition = $("#" + elementID).offset().top;

            if (scrollPosition >= elementPosition) {
                $(".tutorial-navmenu").find(".active").removeClass("active");
                $(".tutorial-navmenu ." + elementID).addClass("active");
            }
        });
    	//animateHeader(scrollPosition);
    });

    //DETECT IF ELEMENT IS ON PAGE
    function detectElement(elementIdent, scrollPosition){
    	var elementHeight = parseInt($(elementIdent).find("div, img").css("height"));

        if (isNaN(elementHeight)){
            return false;
        } else {
            var elementOffset = $(elementIdent).offset().top;

            if (scrollPosition >= (elementHeight + elementOffset)) {
                return false;
            } else {
                return true;
            }
        }
    }

    //RESIZE FUNCTIONS
    $(window).resize(function(){ 
    });

    //ID AUTO POPULATE
    $(".tutorial-section .section-header h1").each(function(){
        //GET PAGE ELEMENTS
        var parentElement = $(this).parents(".tutorial-section");
        var htmlValue = $(this).html();
        var htmlValueMIN = htmlValue.replace(/\W/g, '');

        //ADD ID TO ELEMENTS
        $(parentElement).attr("id", htmlValueMIN);

        //APPEND ELEMENTS TO MENU
        var menuElement = "<li><a class='" + htmlValueMIN + "' href='#'>" + htmlValue + "<img class='pointer' src='images/graphic-here-icon.png' alt='here'></a></li>";
        $(".tutorial-navmenu").append(menuElement);

        //CLICK FUNCTION
        $(".tutorial-navmenu a").click(function(e){
            e.preventDefault();

            var thisClass = $(this).attr("class");

            $('html, body').animate({
                scrollTop: ($("#" + thisClass).offset().top) + 6
            }, 250);
        });
    });

    //TITLE SPLICE FOR STYLING
    $(".tutorial-section .primary-title").each(function(){
        var originalHTML = $(this).html();
        var endHilight = originalHTML.split(" ").pop();
        var normalTextPosition = originalHTML.substring(0, originalHTML.indexOf(endHilight));

        $(this).html(normalTextPosition + "<span>" + endHilight + "</span>")
    });

    //ACTIVATE HIDDEN FRAMES
    $(".tutorial-headmenu a").click(function(){
        var activateElement = $(this).attr("class");

        $(".container-frame." + activateElement).css("right", "20px");
        $(".fa-times").click(function(){
            $(this).parent(".container-frame").css("right", "2500px");
        });
    });

});
