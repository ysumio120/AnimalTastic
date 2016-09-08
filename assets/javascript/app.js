Superhero_Villains =["Batman", "Superman", "Green Lantern", 
					"Thor", "Captain America", "Green Goblin",
					"Dr. Doom", "Voldermort"]

function makeButtons() {

	for(var i = 0; i < Superhero_Villains.length; i++) {
		var button = $("<button>");
		button.addClass("btn btn-default");
		button.data("character", Superhero_Villains[i]);
		button.html(button.data("character"));
		$(".buttons").append(button);

	}
}

$(document).ready(function() {

	//Sort the current list of buttons displayed on screen
	$("#sort").on("click", function() {

	});

	//Create button labeled with text given by user
	//Added the end of current list of buttons
	$("#submit").on("click", function() {

	});

});

makeButtons();