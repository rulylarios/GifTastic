 
 var giphys = ["football", "soccer", "kim kardashian"]

    function loadGiphy() {

        $("#giphy-view").empty();

        var giphy = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=88d9c5c58a554fbea1ebb10e2506ba90&limit=10&rating=g"

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

           

                for (var i = 0; i < response.data.length; i++) {

                    var imageUrlStill = response.data[i].images.fixed_height_still.url;
                    console.log(imageUrl);

                    var imageUrl = response.data[i].images.fixed_height.url;

                    var rating = response.data[i].rating
                    console.log(rating)

                    var img = $("<img class='giphyImage'> <p class='text'> Rating: " + rating + "</p>")
                    img.attr("src", imageUrlStill);
                    img.attr("data-animate", imageUrl)
                    img.attr("data-still", imageUrlStill)
                    img.attr("data-state", "still")
                    img.appendTo("#giphy-view")

            }

                   $(".giphyImage").on("click", function() {
                     var state = $(this).attr("data-state");
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }




                });

        })
    }

    function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var f = 0; f < giphys.length; f++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie to our button
            a.addClass("giphy");
            // Adding a data-attribute
            a.attr("data-name", giphys[f]);
            // Providing the initial button text
            a.text(giphys[f]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    $("#add-giphy").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var giphy = $("#giphy-input").val().trim();

        // Adding movie from the textbox to our array
        giphys.push(giphy);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    $(document).on("click", ".giphy", loadGiphy);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();