$(document).ready(function(){

	//PAGE SETTINGS
	var boxSize = 150,
		pageLink = [];

	//RANDOM FUNCTION
	function randomGortion(min, max){
		return Math.floor(Math.random() * max) + min
	}

	//PAGE LINKS
	$("h1").each(function() {

  		var elementHtml = $(this).html(),
  			elementLink = elementHtml.replace(/\s+/g, '-').toLowerCase();

  		$(this).attr("id", elementLink);
  		pageLink.push([elementHtml, elementLink]);
	});

	//GORT INITIATION
	var windowHeight = $(window).outerHeight(),
		windowWidth = $(window).outerWidth();
		
	if (windowWidth >= 460) {

		var headerHeight = $("header").outerHeight(),
			availableHeight = windowHeight - headerHeight;
			verticalBoxes = Math.floor(availableHeight / boxSize),
			horizontalBoxes = Math.floor(windowWidth / boxSize),
			totalBoxes = horizontalBoxes * verticalBoxes;

		$("#gort").width(horizontalBoxes * boxSize).height(verticalBoxes * boxSize);

		var gortBoxes = "<div class='gortion'></div>",
			assignedBoxes = pageLink.length,
			remainingBoxes = totalBoxes - assignedBoxes;

		//APPEND GORTIONS
		for (i = 0; i < totalBoxes; i++){
			$("#gort").append(gortBoxes);
		}

		//RANDOM COLOR
		var colors = ["green", "orange", "blue", "purple", "yellow", "red"];

		function fillRemaining(){
			$(".gortion").each(function() {
			  		var elementAssigned = $(this).hasClass("assigned");

			  		if (!elementAssigned){
			  			$(this).addClass("assigned");
						$(this).html("<a class='grey' href='#'></a>");
			  		}
			});
		};

		//ASSIGN RELEVANT LINKS
		for (i = 0; i < pageLink.length;){
			var selectedElement = randomGortion(1, totalBoxes),
				randomColor = randomGortion(0, 6),
				linkElement = "<a class='" + colors[randomColor] + "' href='#" + pageLink[i][1] + "'>" + pageLink[i][0] + "</a>";

			if (!$("#gort .gortion:nth-child(" + selectedElement + ")").hasClass("assigned")){

				$("#gort .gortion:nth-child(" + selectedElement + ")").addClass("assigned");
				$("#gort .gortion:nth-child(" + selectedElement + ")").html(linkElement);

				i++
				if (i == pageLink.length){
					fillRemaining();
				}
			}
		}
	}

	//MENU SCROLL
	$(document).on("click", '#gort a', function(e) {
        e.preventDefault();
        var elementLink = $(this).attr("href");

        $('html, body').animate({
            scrollTop: $(elementLink).offset().top - 60
        }, 500);
    });

});