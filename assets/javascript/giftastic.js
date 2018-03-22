
//giffy titles to be turned into buttons
var gifs = ["Cats", "Dogs", "Skunks", "Squirrels", "Monkeys", "Birds", "Bears", "Cows", "Chipmunk", "Lion"
];

//Main function
var buttonMaker = function(){

    //Create buttons from gifs array
    for (var i = 0; i < gifs.length; i++) {

        //Adds "+" between words
        var plusTopics = gifs[i].split(' ').join('+');

        //Button attributes
        var button = $('<button data-giffy=' + plusTopics + '>').append(gifs[i]);

        //Add button class
        button.addClass('button');
        
        //Appened to div
        $('#gifButtons').append(button);
        
    }

    //User adds giffy title
    $('#addGif').on('click', function() {

        //Clear the buttons so they won't duplicate on the page
        $('#gifButtons').empty();
         
        //newGif gets the giffy title user entered
        var newGif = $('#gif-input').val();

        //Only add one instance of giffy
        for (i = 0; i < gifs.length; i++) {
        
            //If newGif can be found in the array
            if (newGif == gifs[i]) {

               //Remove newGif from the array
                gifs.pop(newGif);
            }
        }

        //Adds newGif to the titles array
        gifs.push(newGif);

        //Calls the loop again with the new title
        buttonMaker();

     });
  
    //User clicks on giffy button
    $('.button').on('click', function() {

        //ID's which button selected
        var giffy = $(this).data('giffy');

        console.log($(this).data('giffy'));
        
        //Adds giffy to the queryURL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giffy + "&api_key=dc6zaTOxFJmzC&limit=10";

        //Ajax call
         $.ajax({
            url: queryURL,
            method: 'GET'
            })

        //Ajax response
        .done(function(response) {

            //Console log object returned
            console.log(response);

            //Set the response to results variable
            var results = response.data;

            //Empty out previous gifs
            $('#gifs').empty();

                //Loop to display all 10 gifs
                for (var i = 0; i < results.length; i++) {

                    //Create giffyDiv
                    var giffyDiv = $('<div>');

                    //Create rating p tag
                    var ratingPtag = $('<p>');

                    //Set rating to variable
                    var rating = results[i].rating.toUpperCase();

                        //Tests if rating is given
                        if (rating == ''){

                            ratingPtag.text("Not rated");
                        }
                        else {
                            ratingPtag.text("Rated " + rating);
                        }

                    //Create img tag    
                    var giffyImage = $('<img>');

                    //Attribute source
                    giffyImage.attr("src", results[i].images.fixed_height_small_still.url);

                    //Attribute still image
                    giffyImage.attr("data-still", results[i].images.fixed_height_small_still.url);

                    //Attribute active image
                    giffyImage.attr("data-active", results[i].images.fixed_height_small.url);

                    //Append the rating
                    giffyDiv.append(ratingPtag);

                    //Append giffyImage to the div
                    giffyDiv.append(giffyImage);

                    //Prepend to #giffys
                    $('#gifs').prepend(giffyDiv);
                        
                }

            //On click to animate gifs  

            $('img').on('click', function(e){

                console.log(e);

                //Set current to the current URL
                var current = e.currentTarget.dataset.still;

                //Set active to the active URL
                var active = e.currentTarget.dataset.active;

                //Set still to the still URL
                var still = e.currentTarget.dataset.still;

                  if (current == still) { 
                   
                   //Switch to active URL
                   $(this).attr('src', active);

                   //Set current
                   current = active;

                }
                
                else {

                    //Switch to still URL
                    $(this).attr('src', still);

                    //Set current
                    current = still;
                }
                
            })

            })

        });
};

//Start the app
buttonMaker();