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
    
    $("#roll-dice").click(function(e){
        e.preventDefault();
	   var number = 1 + Math.floor(Math.random() * 6);
	
	   $("#results-field").html(number);
    });
    
});

