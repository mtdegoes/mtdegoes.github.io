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

    //DYNAMIC LINK GENERATION
    /*$(".first-holder h1, .first-holder h2, .first-holder h3").each(function(){

        var linkName = $(this).html().replace(/[^a-z0-9\s]/gi, '').replace(/(\r\n|\n|\r)/gm,"");
        var linkValue = $(this).html().replace(/ /g,'').replace(/[^a-z0-9\s]/gi, '').replace(/(\r\n|\n|\r)/gm,"");
        var dynamicLink = "<a href='#dynamic-link-" + linkValue + "'>" + linkName + "</a>";

        $(this).attr('id', 'dyanmic-link-' + linkValue);
        $("#index-section").append(dynamicLink);

    });*/

    //MENU BAR ZOOM FUNCTION
    function centerMenu() {
        var itemWidth = $("#item-menu li").outerWidth(true);
        var itemCount = $("#item-menu li").size();
        
        console.log(itemWidth);
        console.log(itemCount);
        
        $("#item-menu").width(itemWidth * itemCount);
    }
    
    centerMenu();
    
    $("#item-menu li").hover(function(){

        var previousItem = ($(this).index());

        var previousItemAlt = ("#item-menu li:nth-child(" + previousItem + ")");
        var nextItemAlt = ("#item-menu li:nth-child(" + (previousItem + 2) + ")");

        $(previousItemAlt).toggleClass("increase");
        $(nextItemAlt).toggleClass("increase");
        
        centerMenu();
    });
    
});