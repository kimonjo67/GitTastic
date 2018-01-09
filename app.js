 // Array with the gif selection
    var funnyArray = ["shaq", "fail","soccer", "ostrich","funny","nfl","goat","hart"];
    
    //Function for displaying the gifs selections as buttons
    function renderButtons() {
      //delete the gifs prio to adding them...
      $("#buttons-view").empty();

      //looping through the array of gifs
      for (var i = 0; i < funnyArray.length; i++) {
        //Generate buttons
        var a = $("<button>");
        //Add a class to the button
        a.addClass("gifClass");
        //adding a data attribute
        a.attr("data-name", funnyArray[i]);
        //provide initial button some text
        a.text(funnyArray[i]);
        a.click(gifclick);
        //add button to html
        $("#buttons-view").append(a);
      };
    };

    //This function handles events where one button is clicked
    $("#add-gif").on("click", function (event) {
      //Prevent form from submiting itself
      event.preventDefault();

      //Grab the text from the input box
      var funny = $("#funny-input").val().trim();
      // Funny gif input is then added to the array
      funnyArray.push(funny);
      //Call renderButtons
      renderButtons();
    });

    
    //Pause and play gif function
     function playGif() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
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
      console.log("gif paused");
    };
    renderButtons();


    function gifclick() {
      //Grabbing ans storing the data-animal value
      var funny = $(this).attr("data-name");

    // API Key
    var api_key = "824o5KFOktF8K14ZKGWyXFpylTXADkli";
    // QueryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        funny + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";
    // Performing the AJax request
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
    //After data comes back from the request
    .done(function(response) {
      console.log(response);

    // Store the response from the Ajax request in a variable
      var results = response.data;
      console.log(results);
    // Loop through every result item
    for (var i = 0; i < results.length; i++) {

    // Create and store a div tag
    var funnyDiv = $("<div>");

    //Create a paragraph tag with the results item rating
    var p = $("<p>").text("Rating: " + results[i].rating);
    // Creating and storing an image tag
    var funnyImage = $("<img>");
    // Set the source attrtibute of the image to the property pulled off the results item image
    funnyImage.attr('src', results[i].images.fixed_height_still.url);
    funnyImage.attr("data-state", "still");
    funnyImage.attr("data-still", results[i].images.fixed_height_still.url);
    funnyImage.attr("data-animate", results[i].images.fixed_height.url);
    funnyImage.click(playGif);
    //Append the divs and p tags and image tags
    funnyDiv.append(p);
    funnyDiv.append(funnyImage);

    //prepend the data to the HTML page
    $("#gifs-appear-here").prepend(funnyDiv);
    };
    });

    };