$(document).ready(function(){
  var activityList = [];
  var timingList = ['timing-2', 'timing-3', 'timing-4', 'timing-5'];

  function cardComposite(value){
    var selectedSpeed = Math.floor(Math.random() * timingList.length),
        templateCard = '<section class="container"><div class="card ' + timingList[selectedSpeed] + ' inactive"><figure class="front">?</figure><figure class="back">' + value + '</figure></div></section>';

    return templateCard;
  }

  function beginAnimation(){
    setTimeout(function(){
      $('.card.inactive').each(function(){
        $(this).removeClass('inactive');
        $(this).addClass('flipped');
      });
    },0);
  }

  function refreshActivityList(){
    $('#activity-results').html('<div class="card-divider"></div>');
    $("#ras .activity input").each(function(index){
      var elementValue = $(this).val();
      
      if(elementValue != undefined && elementValue != ""){
        activityList.push(elementValue);
      }else{
        $(this).parents('.activity').remove();
      }
    });
  }

  //SUBMIT FORM
  $('#ras').submit(function(e){
    e.preventDefault();

    refreshActivityList();

    console.log(activityList);

    var selectedActivity = Math.floor(Math.random() * activityList.length),
        activityElement = activityList[selectedActivity];

    for (i = 0; i < activityElement.length; i++) {
      $('#activity-results').append(cardComposite(activityElement[i]));
    }

    $('html, body').animate({
      scrollTop: $("footer").offset().top
    }, 500);

    beginAnimation();
  });

  //SAVE LIST
  /*$('.savelist').click(function(){
    document.cookie = "activityList=" + activityList;
  });*/

  $('#activity-results').click(function(){
    $('.card').toggleClass('flipped');
  });

  //ADD ACTIVITY
  $('.addactivity').click(function(){
    var activityElement = '<div class="var1-col-sec activity"><div class="var1-col col-1"><input type="text" name="activity" placeholder="Activity"></div></div>';
    
    $('#ras .activity-list').append(activityElement)
  });
});