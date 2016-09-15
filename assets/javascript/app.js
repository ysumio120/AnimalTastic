// Default set of items to be created into buttons
heroes = ["Batman", "Harry Potter", "Superman", "Thor", "Captain America"];
villains = ["Green Goblin", "Dr. Doom", "Voldermort", "Darth Vader"];
others = [];

// Will create and display buttons for default arrays above
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

// Ckecks if 'button' of some input already exists
function checkDuplicate(query) {
	for(var i = 0; i < heroes.length; i++) {
		if(heroes[i].toLowerCase() == query) {
			return false;
		}
	}

	for(var i = 0; i < villains.length; i++) {
		if(villains[i].toLowerCase() == query) {
			return false;
		}	
	}

	for(var i = 0; i < others.length; i++) {
		if(others[i].toLowerCase() == query) {
			return false;
		}
	}

	return true;
}

$(document).ready(function() {

	$("#hero").prop("checked", true);
	$("#villain").prop("checked", false);
	$("#other").prop("checked", false);

	/*
	 * Request data from giphy API and retrieve response
	 * Create button labeled with text given by user
	 * Added to the end of current list of buttons
	 */
	$("#submit").on("click", function() {
		var query = $("#entry").val();
		
		// Checks if user submitted without an input
		if(query == "") {
			$("#invalid").remove();
			var error = $("<p></p>");
			error.attr("id", "invalid");
			error.text("Please provide an input");
			error.css("color", "red");
			error.appendTo("form");
			$("#entry").val("");
	
			return false;
		}

		// Checks if duplicate input
		if(checkDuplicate(query.toLowerCase()) == false) {
			$("#invalid").remove();
			var error = $("<p></p>");
			error.attr("id", "invalid");
			error.text("Already created entry for given input");
			error.css("color", "red");
			error.appendTo("form");
			$("#entry").val("");

			return false;
		}

		var newEntry = $("<button>");
		newEntry.attr("id", query);
		newEntry.text(query);

		// Depending on selected radio, add query to corresponding
		// array and make distinct button
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

	/* 
	 * Load gif correspnding to the label of button clicked
	 * Initially load still image of gif
	 * Displays rating of each gif (g, pg, pg-13, ...)
	 */
	$(".buttons").on("click", "button", function() {
		var query = $(this).attr("id");
		console.log(this);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC"; 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);
			$(".gifs").empty();

			for(var i = 0; i < response.data.length; i++) {
			
				var still_gif_URL = response.data[i].images.fixed_height_still.url;
				var anim_gif_URL = response.data[i].images.fixed_height.url;

				var gif = $("<img>");
				gif.data("character", query);
				gif.data("still", still_gif_URL);
				gif.data("anim", anim_gif_URL);
				gif.data("state", "still");
				gif.attr("src", still_gif_URL);
	
				var rating = response.data[i].rating;
				if(rating == "")
					rating = "N/A";

				var div = $("<div></div>");
				div.html("<br>Rating: " + rating);
				gif.prependTo(div);

				div.appendTo(".gifs");
			}
		});

	});

	/* 
	 * When clicked: 
	 *	Will display the still image or animated version of a gif
	 * 	depending on its current state
	 */
	$(".gifs").on("click", "img", function() {
		
		if($(this).data("state") == "still") {
			$(this).attr("src", $(this).data("anim"));
			$(this).data("state", "animated");
		}
		else {
			$(this).attr("src", $(this).data("still"));
			$(this).data("state", "still");
		}

	});

});

makeButtons();