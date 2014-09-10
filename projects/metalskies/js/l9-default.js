//ADD L9 CSS
$('head').append('<link rel="stylesheet" type="text/css" href="css/l9.css">');

var currentLocation = window.location.href;

$(document).ready(function(){

    //DETECT CURRENT WINDOW AND TAKE ACTIONS
    if (currentLocation == "") {
        
    }

    //ANIMATIONS PAST INITIAL SCROLL POINT ACTIONS
    $(window).scroll(function(){
        var scrollPosition = $('body').scrollTop();

        if (scrollPosition <= "40") {
            //DO SOMETHING AWESOME
        } else if (scrollPosition >= "40") {
            //UNDO SOMETHING AWESOME
        }
    });

    //DYNAMIC DIV INSERTION FOR FLOAT CLEARING
    $(".l9-js-clear").after("<div class='l9-clear'></div>")

    //DYNAMIC MENU GENERATION ON CLASS "ADD-MENU" ADDITION
    //SETTINGS FOR FEATURE ----EDIT REQUIRED----
    var headerMenu = //"ADD VALUE HERE FOR MENU***";

    $(".l9-js-gen-link").each(function(){
        var thisLink = $(this).html();
        var hashLink = thisLink.replace(/ /g,"_")

        $(this).attr('id', hashLink);

        var newLink = "<li><a href='#" + hashLink + "'>" + thisLink + "</a></li>"
        $(headerMenu).prepend(newLink);
    });

    //SMOOTH SCROLLING FOR ABOVE DYNAMIC MENU
    $(headerMenu).on("click", "a", function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 40
        }, 500);
    });

    //DYNAMIC WIDTH FOR HOLDERS
    //CALCULATED BY FINAL 2 CHAR FOR PERCENT
    $('*[class^="l9-js-hp-"]').each(function(){
        var holderWidth = (this.className).slice(9,11);

        $(this).css({"width": holderWidth + "%"});
    });

    //HEIGHT ADJUSTMENT FOR IMAGE BLOCKS WITH ABSOLUTE - IDEAL FOR GALLERIES ETC
    function l9AbsoluteFix(){
        $(".l9-js-absolute-src").each(function(){
            var sourceHeight = $(this).height();

            $(this).closest(".l9-js-absolute-trgt").css({"height": sourceHeight + "px"});
        });
    }

    //FUNCTIONS ON LOAD
    l9AbsoluteFix();

    //RESIZE DETECTION AND FUCTION ACTIVATION
    $(window).resize(function(){

        //RUN THESE FUNCTIONS ON RESIZE
        l9AbsoluteFix();
    });

    //DYNAMIC IMAGE ENLARGEMENT
    $(".l9_js_enlarge").click(function(){
        $(this).toggleClass("full_size");
    });










    //CREATE DIV TO BE EVALUATED FOR FUTURE USE
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

});
