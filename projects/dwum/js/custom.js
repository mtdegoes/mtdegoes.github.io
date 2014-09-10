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

    var theBackground = [
			{backgroundImage: "images/dark_01.png"},
			{backgroundImage: "images/dark_02.png"},
			{backgroundImage: "images/dark_03.png"},
			{backgroundImage: "images/dark_04.png"},
			{backgroundImage: "images/dark_05.png"},
			{backgroundImage: "images/dark_06.png"}
    	]

    var theList = [
    	{type: "text", item: "What doesn't kill you, makes you stronger."},
    	{type: "text", item: "Almost all things of true worth, are hard to attain. But surely worth the effort."},
    	{type: "text", item: "Do or do not, there is no try."},
    	{type: "text", item: "I came, I saw, I conquer, I found my abs!"},
    	{type: "text", item: "Mercy on others is a gift, mercy on ones self is weakness."},
    	{type: "text", item: "There are those who try, and those who succeed. Be the later."},
    	{type: "text", item: "Aim to misbehave. But in a good way."},
    	{type: "text", item: "9 times out of 10, the limit of your ability is your mind."},
    	{type: "text", item: "Put the cookie down now!"},
    	{type: "text", item: "No muffin for you!"},
    	{type: "text", item: "Would you rather have immediate satisfaction, or a achieve the balance you've always wanted?"},
    	{type: "text", item: "Give in and dissapoint not only yourself, but everyone who's pushing for you."},
    	{type: "text", item: "One day...all that pain will make sense to you..."},
    	{type: "text", item: "Fitness is not about being better than someone else, it's about being better than you used to be."},
    	{type: "text", item: "Suffer the pain of discipline, or the pain of regret."},
    	{type: "text", item: "You will fail, but don't let today be that day."},
    	{type: "text", item: "Do it, for being 50 and still able to walk a mile, do a sit-up and fit into that dress."},
    	{type: "text", item: "Pain is weakness leaving the body."},
    	{type: "text", item: "Today's fight is old you VS new you. Make sure the new you wins."},
    	{type: "text", item: "Whatever the day throughs at you, put it on the bar and press it."},
    	{type: "text", item: "The best rest worth taking, is the one that's earned."},
    	{type: "text", item: "A year from now, would you rather be the same, or more fit?"},
    	{type: "text", item: "If you took the easy road, shame on you. If you just sweat drops of blood, nice work!"},
    	{type: "text", item: "The David (Sculpture), wouldn't be nearly as inspiring with a extra 30lbs of fat..."},
    	{type: "text", item: "It's true, given injuries, only 70% of the time is it right to work through the pain. BUT 100% of the time, you CAN eat right."},
    	{type: "text", item: "Friends come and go, but 20lbs is always 20lbs."},
    	{type: "text", item: "Looking at a 20lb weight doesn't make you stronger."},
    	{type: "text", item: "Body fat, say hello to your new friend...Treadmill."},
    	{type: "text", item: "It's that time of day, crush your lazyness and choose to be active."},
    	{type: "text", item: "Consistancy, Patience, Iron Will. Yes, it WILL take time, but you CAN do it."},
    	{type: "text", item: "Strong people are harder to kill than weak people and more useful in general."},
    	{type: "text", item: "Just remember, somewhere, a little Chinese girl is warming up with your max."},
    	{type: "text", item: "If you want something you’ve never had, you must be willing to do something you’ve never done."},
    	{type: "text", item: "If you're capable of sending a legible text message between sets, you probably aren't working hard enough."},
    	{type: "text", item: "The road to nowhere is paved with excuses."},
    	{type: "text", item: "You may not be there yet, but you are closer than yesterday. Now isn't the time to stop!"},
    	{type: "text", item: "Life is pain, and anyone who tell you different is selling something."},
    	{type: "text", item: "There will be pain, and sometimes you can't push through it, in those cases find a way around."},
    	{type: "text", item: "For the moment all discipline seems painful rather than pleasant, but later it yields the peaceful fruit of righteousness to those who have been trained by it."},
    	{type: "text", item: "Love not sleep, lest you come to poverty; open your eyes, and you will have plenty of bread."},
    	{type: "text", item: "A man without self-control is like a city broken into and left without walls."},
    	{type: "text", item: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control; against such things there is no law."},
    	{type: "text", item: "The soul of the sluggard craves and gets nothing, while the soul of the diligent is richly supplied."},
    	{type: "text", item: "Whatever you do, work heartily, as for the Lord and not for men,"},
    	{type: "text", item: "In all toil there is profit, but mere talk tends only to poverty."},
    	{type: "text", item: "Whatever your hand finds to do, do it with your might."},
    	]

    	function renderText(){
    		var randomItem = Math.floor(Math.random() * theList.length) + 1
    		var selectedItem = theList[randomItem - 1];

    		$("#DWUM").html(selectedItem.item);
    	}
    	renderText();

    	function renderBackground(){
    		var randomBackground = Math.floor(Math.random() * theBackground.length) + 1
    		var selectedBackground = theBackground[randomBackground - 1];

    		$("body").css("background-image", "url(" + selectedBackground.backgroundImage + ")");
    	}
    	renderBackground();

    	$("#GIVEMORE").click(function(){
    		renderText()
    		renderBackground()
    	});
});
