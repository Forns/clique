/**
 * results-display.js
 *
 * Handles the results page related display elements
 * and interaction
 */

$(function() {
  
  // Set up the results deletion button
  $("#results-delete")
    .button()
    .click(function () {
      // Ajax call for the actual purification, setting the global pureData
      $.ajax({
        type: "POST",
        url: "/resultsDelete",
        success: function (result) {
          window.location = "../spectral";
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
        },
        dataType: "json",
        contentType: "application/json"
      });
    });
  $("#nav-button").button();
  
});
