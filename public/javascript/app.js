$(document).ready(function () {

    // Logic for pulling up article's associated note, or form for posting one.
    $(document).on("click", ".note-btn", function () {
        // Empty the notes from the note section
        $("#note-body").empty();
        $("#note-title").empty();
        $(".modal-title").empty();
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
                $(".modal-footer").append("<button data-id='" + data._id + "' id='savenote'class='btn btn-secondary' >Save Note</button>");

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                }
            });
    });
})