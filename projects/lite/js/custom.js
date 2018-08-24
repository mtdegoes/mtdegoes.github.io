$(document).ready(function(){

	var listURL = "https://docs.google.com/spreadsheets/d/1qiQUBafQFHPzG26ZBFoDAqudiONEFqL_dIISyKPUhdY/export?format=csv";

	function returnRandom(arraylength){
		return randomNumber = Math.floor(Math.random() * arraylength);
	}

	function assignTiming(){
		var timingList = ['short', 'medium', 'long'],
			selectedSpeed = returnRandom(timingList.length);

		return timingList[selectedSpeed];
	}

	function nameComposite(name){
		var nameLength = name.length,
			composite = '',
			nameSegmentation = name.split('');

		$.each(nameSegmentation, function (i, el) {
			composite = composite + ("<span>" + el + "</span>");
		});

		return composite;
	}

	function renderResults(value){
		var resultsContainer = '#results',
			compositeDiv = '<div><p class="medium">' + nameComposite(value) + '</p></div>';

		$(resultsContainer).append(compositeDiv);
	}

	function sortResults(data){
		var results = data,
			listLength = results.length,
			countDown = listLength;

		/*CLEAR RESULTS*/
		$('#results').empty();

		/*RENDER RESULTS*/
		for (i = 0; i < listLength; i++) { 
			var randomItem = returnRandom(countDown);

			renderResults(results[randomItem]);
			results.splice($.inArray(results[randomItem], results),1);

			countDown --;
		}
	}

	function getData(url){
		$.get(url, function( data ) {
			var completeList = data.split('\n');

			sortResults(completeList);
		});	
	}

	function renderActive(){
		$("#results span").each(function(){
			console.log('test');
		});
	}

	function animateLetters(){
		$('#results span').each(function(){
			var classTiming = assignTiming();

			$(this).addClass('active-' + classTiming);
		});
	}

	$("#showlist").click(function(){
		getData(listURL);

		setTimeout(animateLetters, 500);
	});

});