$(function () {
  $.ajax("/burgers", {
    type: "GET",
  }).then(function (data) {
    console.log(data);

    var eatenBurgersElem = $("#eatenBurgers");
    var notEatenBurgersElem = $("#notEatenBurgers");

    var burgers = data.burgers;

    for (var i = 0; i < burgers.length; i++) {
      var new_elem =
        "<li>" +
        burgers[i].burger_name +
        "</t> <button class='change-eaten btn btn-success' data-id='" +
        burgers[i].id +
        "' data-neweaten='" +
        !burgers[i].eaten +
        "'>";

      if (burgers[i].eaten) {
        new_elem += "Time to eat!";
      } else {
        new_elem += "eaten!";
      }

      new_elem += "</button> </t>";

      new_elem +=
        "<button class='delete-burger btn btn-danger' data-id='" +
        burgers[i].id +
        "'>delete</button></li>";

      if (burgers[i].eaten) {
        eatenBurgersElem.append(new_elem);
      } else {
        notEatenBurgersElem.append(new_elem);
      }
    }
  });

  // new burger on click
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger_name").val().trim(),
      eaten: $("[name=eaten]:checked").val().trim(),
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType: "json",
      contentType: "application/json",
    }).then(function () {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // eaten onclick to update value in db
  $(document).on("click", ".change-eaten", function (event) {
    var id = $(this).data("id");
    var newEaten = $(this).data("neweaten") === true;

    var newEatenState = {
      eaten: newEaten,
    };

    // Send the PUT request.
    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(newEatenState),
      dataType: "json",
      contentType: "application/json",
    }).then(function () {
      console.log("changed eaten to", newEaten);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // delete burger on click
  $(document).on("click", ".delete-burger", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});