$(document).ready(function(){
  var portfolioLength = 35,
      randomCSS = [];

  //FILL PORTFOLIO
  for(var i = 0; i < portfolioLength; i++) {
    var templateFrame = '<div class="image" style="background-image: url(images/portfolio/' + (i+1) + '.jpg)"></div>';

    $('#portfolio .gallery').append(templateFrame);

    $('#portfolio .gallery .image').click(function(){
      var imageURL = $(this).css('background-image'),
          currentIndex = $(this).index();
      $("#portfolio .foreground").addClass('active');
      $("#portfolio .foreground").css('background', 'rgba(255,255,255,0.9) url(images/portfolio/' + currentIndex + '.jpg) no-repeat center');
      $("#portfolio .foreground").css('background-size', 'contain');
    });

    $("#portfolio .foreground").click(function(){
      $(this).removeClass('active');
    });
  }

  $('.switcher.photo').click(function(){
    $('#photo .visual').toggleClass('active');
  });

  $('.switcher.skills').click(function(){
    $('#skills .info').toggleClass('active');
  });

  $.ajax({
    url: "css/absolute.css",
    dataType: "text",
    success: function(cssText) {
      var cssSplit = cssText.split('}');

      randomCSS.push(cssSplit);

      $("#skills .card" ).each(function(){
        var randomNumber = Math.floor(Math.random() * randomCSS[0].length) + 1,
            stringMe = String(randomCSS[0][randomNumber]),
            jsElement = '<h6>' + stringMe.replace(/\s\s+/g, ' ') + '</h6>';

        $(this).prepend(jsElement);
      });
    }
  });
});

