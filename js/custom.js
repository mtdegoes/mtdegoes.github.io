$(document).ready(function(){
  var portfolioLength = 35,
      questionLength = 11,
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

  //QUESTION AND ANSWER AREA
  $('#qa .questions p').each(function(){
    if(questionLength >= 1){
      console.log('test')
    } else {
      $(this).addClass('hidden');
    }
    questionLength--;
  });

  var answers = ["Coffee, coffee, and more coffee. I like mine with a little bit of Cream and no sweeteners.",
              "Definitely regular. What is this evil Decaf you speak of?",
              "Mac is the superior machine for work, but PC is the superior machine for play. So I'll take one of each please.",
              "I prefer to work with custom frameworks for Brand development purposes, but for internal facing properties or grid frameworks, almost anything will do.",
              "Both. I love beards, cause they look awesome. But, I hate beards because of the itch.",
              "I'd recommend learning both. They've both got their uses and their problem areas. Be sure you truly understand Flex before you use it the first time. In case you were wondering, both Flex and Float are css properties.",
              "There are so many, but one-time saver I've used repeatedly is <a href='http://www.colorzilla.com/gradient-editor/'>Color Zilla<*. It'll save you time and allow you to completely dump image gradients as a background loading element.",
              "Want some free (with accreditation) high-rez images, that are visually varied and stunning? Try <a href='https://unsplash.com/'>UnSplash<*.",
              "There is usually some eye candy to be found at <a target='_blank' href='https://dribbble.com/'>Dribble<*. Enjoy!",
              "I'd recommend a heavy dose of both. Humility to know that there is always more to learn. Confidence to know when you're right and to lead when appropriate.",
              "The launch of BB-8 App Controlled Robot with Sphero, in conjunction with Star Wars Episode 7. A once in a lifetime opportunity.",
              "Without a doubt my wife, son, and family.",
              "... ... ... We don't talk about that.",
              "Stateside, Ozo's Coffee in Boulder, Colorado is truly amazing. If you find yourself in Rome, get a Cappuccino. I've never had one which doesn't taste amazing!",
              "Yes, depending on my current workload and life events, I'm happy to do both. Please <a href='#contact'>Contact<* me.",
              "Frank Herbert Dune. Just the first book mind you."];

  $('#qa .questions p').click(function(){
    var currentElement = $(this),
        currentQuestion = currentElement.index(),
        currentWord = [''],
        startingLetter = 0,
        isHTML = false,
        htmlSnippet = "";

    $(currentElement).addClass('hidden-alt');
    $('#qa .questions p.hidden:first').removeClass('hidden');
    $('#qa .answers p').html('');

    for(var i = 0; i < answers[currentQuestion].length; i++){
      var nextLetter = i + 1,
          currentLetter = answers[currentQuestion].substring(i, nextLetter);

      if(currentLetter == "*") {
        currentWord.push('//');
      } else {
        currentWord.push(currentLetter);
      }
    }

    var runLetter = setInterval(function(){
      if(startingLetter < currentWord.length){
        $("#qa .questions").addClass('disabled');
        $("#qa .questions p").css("pointer-events", "none");

        console.log(currentWord[startingLetter]);
        if(currentWord[startingLetter] == "<" || isHTML == true){
          isHTML = true;
          if(currentWord[startingLetter] == "//" ){
            htmlSnippet = htmlSnippet + currentWord["/a>"];
            $("#qa .answers p").append(htmlSnippet);
            console.log(htmlSnippet);
            htmlSnippet = "";
            isHTML = false;
          } else {
            htmlSnippet = htmlSnippet + currentWord[startingLetter];
          }
        } else {
          $("#qa .answers p").append("<span>" + currentWord[startingLetter] + "</span>");
        }

        startingLetter++;
      } else {
        clearInterval(runLetter);
        $("#qa .questions p").css("pointer-events", "auto");
        $("#qa .questions").removeClass('disabled');
      }
    }, 50);
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