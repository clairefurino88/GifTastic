//  Initial array of animals
var animals = ["Cats", "Dogs", "Skunks", "Squirrels", "Birds", "Bears", "Cows", "Chipmunks", "Zebras"];

// display displayanimalGif fucntion re-renders the HTML to display the appropriate content
function displayanimalGif() {
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=dc6zaTOxFJmzC";
	console.log("animal: " + animal);
	console.log("queryURL: " + queryURL);

	//  AJAX Call for the specific button being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		
		//div to hold all the gifs
		dAll = $("<div>");

		for (var i = 0; i < 10; i++) {

			//div to hold the gif
			dTag = $("<div class='gifs'>");

			//Create div to hold and display the rating
			dRating = $("<div>");
			dRating.append("Rating: " + response.data[i].rating);

			//Create div to hold and display the gif
			dGif = $("<div>");

			var image = $("<img class='gif' data-state='still'>");
			image.attr("src", response.data[i].images.fixed_height_still.url);
			image.attr("data-still", response.data[i].images.fixed_height_still.url);
			image.attr("data-animate", response.data[i].images.fixed_height.url)



			dGif.append(image)


			
			//put the div dTag together
			dTag.append(dRating);
			dTag.append(dGif);
			dAll.append(dTag);

		}


		$("#gifDiv").html(dAll);


	}); // ends AJAX call


} // ends displayanimalGif function


//Function to render buttons
function renderButtons() {
	//Empties the div
	$("#buttons-view").empty();

	//Loops through the array of animals
	for (var i = 0; i < animals.length; i++) {
		var a = $("<button class='animal'>");
		a.attr("data-name", animals[i]);
		a.text(animals[i]);
		$("#buttons-view").append(a);
	}


} //end of renderButtons function


//Function for add gif button
$("#add-gif").on("click", function(event) {

	event.preventDefault();
	var animal = $("#gif-input").val().trim();
	animals.push(animal);
    renderButtons();
    
    
}); // ends add animal button

//  click event listener 
$(document).on("click", ".animal", displayanimalGif);



//animate on click
$(document).on("click", ".gif", function() {

	var state = $(this).attr("data-state");
	var animateUrl = $(this).attr("data-animate");
	var stillUrl = $(this).attr("data-still");

	if (state === "still") {
		$(this).attr("src", animateUrl);
		$(this).attr("data-state", "animate");
	}

	if (state === "animate") {
		$(this).attr("src", stillUrl);
		$(this).attr("data-state", "still")
	}

}); // ends animate on click



//renders buttons on load
renderButtons();
