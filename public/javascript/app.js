$(document).ready(function () {

    // Logic for pulling up article's associated note, or form for posting one.
    $(document).on("click", ".note-btn", function () {
        // Empty the notes from the note section
        $("#note-body").empty();
        $("#note-title").empty();
        $(".modal-title").empty();
        $("#savenote").remove()
        // Save the id from the p tag
        var thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);
                // The title of the article
                $(".modal-title").append("<h5>" + data.title + "</h5>");
                // An input to enter a new title
                $("#note-title").append("<label for='titleinput' class='col-form-label'>Title:</label>")
                    .append("<input id='titleinput' class='form-control' name='title'>");
                // A textarea to add a new note body
                $("#note-body").append("<label for='bodyinput' class='col-form-label'>Note:</label>")
                    .append("<textarea id='bodyinput' class='form-control' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $(".modal-footer").append("<button data-id='" + data._id + "' id='savenote' data-dismiss='modal' class='btn btn-secondary'>Save</button>");

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                    console.log(data.note._id)
                    $("#savenote").attr('data-note', data.note._id)
                }
            });
    });

    // When you click the savenote button
    $(document).on("click", "#savenote", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        var noteId = $(this).attr("data-note");

        //If no associated note, then post a new one.
        if (noteId === undefined) {
            console.log('new note')
            // Run a POST request to change the note, using what's entered in the inputs
            $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    // Value taken from title input
                    title: $("#titleinput").val(),
                    // Value taken from note textarea
                    body: $("#bodyinput").val()
                }
            })
                .then(function (data) {
                    // Log the response
                    console.log(data);
                });
        }
        //If there's already a note on that article, then update it. 
        else {
            console.log('update note')
            console.log('note id: ' + noteId)
            $.ajax({
                method: "PUT",
                url: "/articles/db/" + noteId,
                data: {
                    // Value taken from title input
                    title: $("#titleinput").val(),
                    // Value taken from note textarea
                    body: $("#bodyinput").val()
                }
            })
                .then(function (data) {
                    // Log the response
                    console.log(data);
                });
        }
    });

    $(document).on("click", "#save-article", function () {
        // Grab the id associated with the article from the submit button
        console.log('saving article')
        var thisId = $(this).attr("data-id");
        $.ajax({
            method: "PUT",
            url: "/articles/saved/" + thisId,
            data: {
                saved: true,
            }
        })
            .then(function (data) {
                // Log the response
                console.log(data);
                console.log('saved!')
            });
    });

    $(document).on("click", "#delete-article", function () {
        // Grab the id associated with the article from the submit button
        console.log('saving article')
        var thisId = $(this).attr("data-id");
        $.ajax({
            method: "PUT",
            url: "/articles/saved/" + thisId,
            data: {
                saved: false,
            }
        })
            .then(function (data) {
                // Log the response
                console.log(data);
                console.log('saved!')
                location.reload();
            });
    });
})