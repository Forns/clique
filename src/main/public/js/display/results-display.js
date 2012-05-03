/**
 * results-display.js
 *
 * Handles the results page related display elements
 * and interaction
 */

$(function() {
  
  // User requests to view the purified results
  var displayPurifiedResults = function (data) {
    var logZone = $("#log-zone");
    logZone.append("<h3>Purified Results:</h3>");
    
    for (var i = 0; i < data.length; i++) {
      logZone.append(JSON.stringify(data[i]) + "<br/>");
    }
  },
  
  // Contains a map of the request to its specific data display function
  requestDisplayMap = {
    "see-pure": displayPurifiedResults
  },

  // Renders the data retrieved from a request to the viewport
  displayViewRequest = function (request, data) {
    var logZone = $("#log-zone");
    
    // Wait for the log zone to fade out before updating it
    setTimeout(function () {
      logZone.html("");
      requestDisplayMap[request](data);
    }, 500);
    
    // Fade the log zone back in!
    $("#log-zone")
      .fadeIn(500);
  };
  
  // Set up the results deletion button
  $("#results-delete")
    .button()
    .click(function () {
      if (confirm("Are you sure you want to nuke your data? This cannot be undone!")) {
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
      }
    });
    
  // Set up the navigation button
  $("#nav-button")
    .button()
    .click(function () {
      $("#command-list").dialog({
        title: "Results Analysis",
        modal: false,
        resizable: false,
        collapsible: true,
        closeOnEscape: false,
        show: "fade",
        hide: "fade",
        position: [30, 200],
        width: 275
      });
    });
  
  // Trigger the button once so that the dialog is displayed on launch  
  $("#nav-button").trigger("click");
  
  // Set up the commands window
  $(":radio")
    .each(function () {
      var reqName = $(this).attr("id");
      $(this)
        .button()
        .click(function () {
          $("#log-zone").fadeOut(500);
          $.ajax({
            type: "GET",
            url: reqName,
            success: function (result) {
              displayViewRequest(reqName, result);
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
    });
    
  // Trigger the button once so that the log zone is updated
  $("#see-pure").trigger("click");
  
  // Display elements for the command buttons
  $("#command-list").children()
    .addClass("command-button");
  
  // Keeps the navigator in the display
  // Credit to William Duffy for this tip
  $(window).scroll(function(){      
    $("#command-list")
      .parent()
      .stop()
      .animate({"marginTop": ($(window).scrollTop() + 30) + "px"}, "slow" );      
  });
  
});
