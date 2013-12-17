var currentLocation = window.location.href;

$(document).ready(function(){

    //CURRENT LOCATION
    if (currentLocation == "file://localhost/Users/matthewdegoes/Desktop/mtdegoes/index.html") {
        console.log("Correct Page Reached");
    }

    //DYNAMIC FLOAT CLEARING
    $(".js-clear-float").after("<div class='clear'></div>")

    $(".add-menu").each(function(){
        var thisLink = $(this).html();
        var hashLink = thisLink.replace(/ /g,"_")

        $(this).attr('id', hashLink);

        var newLink = "<li><a href='#" + hashLink + "'>" + thisLink + "</a></li>"
        $("#header-menu").prepend(newLink);
    });

    //SCROLL ANIMATIONS
    $(window).scroll(function(){
        var scrollPosition = $('body').scrollTop();

        if (scrollPosition <= "40") {
            //$("header").stop().animate({opacity: 1.0},1000)
            $("header").removeClass("mini");

        } else if (scrollPosition >= "40") {
            //$("header").stop().animate({opacity: 0.0},1000)
            $("header").addClass("mini");

        }
    });

    //SMOOTH SCROLL
    $("#header-menu").on("click", "a", function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 40
        }, 500);
    });

    //CREATE DIV
    function createIntDiv(){
        $("body").prepend("<div id='interactive-div'></div>");
    }

    function createOverlay(imageHeight, imageWidth) {
        $("body").prepend("<div id='overlay'></div>");

        $("#overlay").on("click", function(){
            $(this).remove();

            $("#interactive-div").animate({
                opacity: 0.0,
                zIndex: 0
            }, 200);

        });

        $("#interactive-div").css({
            width: imageWidth + "px",
            height: imageHeight + "px",
            zIndex: 1100
        });

        function positionDiv(imageHeight, imageWidth) {
            var hDivPosition = (($(window).width()) -imageWidth) / 2;
            var vDivPosition = (($(window).height()) -imageHeight) / 2;

            $("#interactive-div").css({
            left: hDivPosition,
            top: vDivPosition,
            zIndex: 1100
            });
        }

        $(window).resize(function(){
            positionDiv();
        });
        positionDiv(imageHeight, imageWidth);

        $("#interactive-div").animate({
            opacity: 1.0
        }, 500);
    }
    
    //IMAGE CREATOR
    var ImageCount = 32;

    for (var i=0; i<ImageCount; i++) { 
        var imageElement = "<li><img src='images/portfolio/" + i + ".png' alt='portfolio-image'></li>";

        $(".image-slider .slider ul").append(imageElement).load();
    }

    //LOADED FUNCTIONS
    $(window).load(function(){
        var totalSliderWidth = 0;
        
        $(".image-slider .slider ul li img").each(function(){
            totalSliderWidth = totalSliderWidth + $(this).outerWidth() + 10;
            
            $(".image-slider .slider").width(totalSliderWidth + 10);
        });
        
        //ENLARGE IMAGE
        createIntDiv();
        
        $(".image-slider img").click(function(){
            var imgSrc = $(this).attr('src');
            var enlargedImg = "<img src='" + imgSrc + "' alt='portfolio-image-lrg'>"

            $("#interactive-div").html(enlargedImg);
            $("#interactive-div img").load(function(){
                var imageHeight = $(this).height();
                var imageWidth = $(this).width();

                createOverlay(imageHeight, imageWidth);
            });

        });

    });

    //SLIDER FUNCTIONALITY
    $(".fa-angle-right").click(function(e){
        e.preventDefault();

        var frameWidth = $(".image-slider .slider-frame").outerWidth();
        var framePosition = Math.abs(parseInt($(".image-slider .slider").css("left")));
        var sliderWidth = $(".image-slider .slider").outerWidth();
        var sliderEndPoint = (sliderWidth - frameWidth);

        if (framePosition <= sliderEndPoint){
            $(".image-slider .slider").animate({
                left: "-=" + frameWidth
            }, 500);

        } else {
            $(".image-slider .slider").animate({
                left: "0px"
            }, 500);
        }
    });

    $(".fa-angle-left").click(function(e){
        e.preventDefault();

        var frameWidth = $(".image-slider .slider-frame").outerWidth();
        var framePosition = Math.abs(parseInt($(".image-slider .slider").css("left")));
        var sliderWidth = $(".image-slider .slider").outerWidth();
        var sliderEndPoint = (sliderWidth - frameWidth);

        if (framePosition <= 0){
        
        } else {
            $(".image-slider .slider").animate({
                left: "+=" + frameWidth
            }, 500);
        }
    });

    /*FACE CARD*/
    $("#slide-face").click(function(e){
        e.preventDefault();

        var windowWidth = window.outerWidth;
        var bodyWidth = $(".first-holder").outerWidth();
        var pictureWidth = (((windowWidth - bodyWidth) / 2) -40)

        $("#face-card").css("max-width", pictureWidth + "px");

        $("#face-card").animate({
            opacity: 1.0,
            right: "20px"
        }, 500, function(){
            $("#face-card").delay(4000).animate({
                opacity: 0.0,
                right: "-300px"
            }, 500);
        });

    });

});
