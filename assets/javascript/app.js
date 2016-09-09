heroes = ["Batman", "Harry Potter", "Superman", "Thor", "Captain America"];
villains = ["Green Goblin", "Dr. Doom", "Voldermort", "Darth Vader"];

function makeButtons() {

	for(var i = 0; i < heroes.length; i++) {
		var button = $("<button>");
		button.addClass("btn btn-default");
		button.data("character", heroes[i]);
		button.html(button.data("character"));
		$(".buttons").append(button);

	}

	for(var i = 0; i < villains.length; i++) {
		var button = $("<button>");
		button.addClass("btn btn-default");
		button.data("character", villains[i]);
		button.html(button.data("character"));
		$(".buttons").append(button);

	}
}

$(document).ready(function() {

	//Sort the current list of buttons displayed on screen
	$("#sort").on("click", function() {

	});

	//Ask for data from giphy API and retrieve response
	//Create button labeled with text given by user
	//Added the end of current list of buttons
	$("#submit").on("click", function() {
		var query = $("#entry").val();
		console.log(query);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query +"&api_key=dc6zaTOxFJmzC"; 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);
		});

		var newEntry = $("<button>");
		newEntry.attr("id", query);
		newEntry.text(query);

		return false;
	});

});

makeButtons();