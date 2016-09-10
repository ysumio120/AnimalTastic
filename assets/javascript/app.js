heroes = ["Batman", "Harry Potter", "Superman", "Thor", "Captain America"];
villains = ["Green Goblin", "Dr. Doom", "Voldermort", "Darth Vader"];
others = [];

function makeButtons() {

	for(var i = 0; i < heroes.length; i++) {
		var button = $("<button>");
		button.addClass("btn btn-default btn-primary");
		button.attr("id", heroes[i]);
		button.html(button.attr("id"));
		$(".heroes").append(button);

	}

	for(var i = 0; i < villains.length; i++) {
		var button = $("<button>");
		button.addClass("btn btn-default btn-danger");
		button.attr("id", villains[i]);
		button.html(button.attr("id"));
		$(".villains").append(button);

	}
}

function checkDuplicate(query) {
	for(var i = 0; i < heroes.length; i++) {
		if(heroes[i].toLowerCase() == query) {
			
		}
	}

	for(var i = 0; i < heroes.length; i++) {
		if(villains[i].toLowerCase() == query) {

		}	
	}

	for(var i = 0; i < heroes.length; i++) {
		if(others[i].toLowerCase() == query) {

		}
	}
}

$(document).ready(function() {

	$("#hero").prop("checked", true);
	$("#villain").prop("checked", false);
	$("#other").prop("checked", false);

	//Sort the current list of buttons displayed on screen
	// $("#sort").on("click", function() {

	// });

	//Ask for data from giphy API and retrieve response
	//Create button labeled with text given by user
	//Added the end of current list of buttons
	$("#submit").on("click", function() {
		var query = $("#entry").val();
		if(query == "") {
			var error = $("<p></p>");
			error.attr("id", "invalid");
			error.text("Please enter valid input");
			error.css("color", "red");
			error.appendTo("form");
			$("#entry").val("");
			console.log(error);
			return false;
		}

		console.log(query);
		
		//console.log(response);
		var newEntry = $("<button>");
		newEntry.attr("id", query);
		newEntry.text(query);

		console.log($("#hero").prop("checked"));
		if($("#hero").prop("checked") == true) {
			newEntry.addClass("btn btn-default btn-primary");
			newEntry.appendTo(".heroes");
			heroes.push(query);
		}
		else if($("#villain").prop("checked") == true) {
			newEntry.addClass("btn btn-default btn-danger");
			newEntry.appendTo(".villains");
			villains.push(query);
		}
		else {
			newEntry.addClass("btn btn-default");
			newEntry.appendTo(".others");
			others.push(query);
		}

		$("#invalid").remove();
		return false;
	});

	$(".buttons").on("click", "button", function() {
		var query = $(this).attr("id");
		console.log(this);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC"; 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);
			$(".gifs").empty();
			for(var i = 0; i < response.data.length; i++) {
				gifURL = response.data[i].images.original.url;
				console.log(gifURL);
				var gif = $("<img>");
				gif.data("character", query);
				gif.attr("src", gifURL);
				gif.appendTo(".gifs");
			}
		});

	});

});

makeButtons();