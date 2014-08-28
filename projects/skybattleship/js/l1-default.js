//ADD L1 CSS
$('head').append('<link rel="stylesheet" type="text/css" href="css/l1.css">');

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

    //DYNAMIC MENU GENERATION ON CLASS "ADD-MENU" ADDITION
    //SETTINGS FOR FEATURE ----EDIT REQUIRED----
    var headerMenu = //"ADD VALUE HERE FOR MENU***";

    $(".l1-js-gen-link").each(function(){
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

    //RESIZE DETECTION AND FUCTION ACTIVATION
    $(window).resize(function(){

        //RUN THESE FUNCTIONS ON RESIZE

    });

});
