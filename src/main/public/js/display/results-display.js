/**
 * results-display.js
 *
 * Handles the results page related display elements
 * and interaction
 */

$(function() {
  
  // Logging area used in the reporting
  var logZone = $("#log-zone"),
  
  // User requests to view the purified results
  displayPurifiedResults = function (data) {
    logZone.append("<h2>Purified Input:</h2>");
    
    for (var i = 0; i < data.length; i++) {
      logZone.append(JSON.stringify(data[i]) + "<br/>");
    }
  },
  
  // User requests to view the analyzed results
  displayAnalysis = function (data) {
    logZone.append("<h2>Analysis Output:</h2><br/>");
    var Q = data[0],
        q = data[1],
        R = data[2],
        RArray = R,
        
        // Private method to print the cell's items
        printCell = function (c) {
          var currentObject,
              possiblyEmbedded;
          for (var obj in c) {
            currentObject = c[obj];
            if (currentObject !== null) {
              logZone.append("> New Cell:<br/>" + JSON.stringify(currentObject.elements) + "<br/><br/>");
            }
          }
        },
        
        // Private method to parse the cell's items
        parseCell = function (c) {
          var currentCell;
          for (var cell in c) {
            currentCell = c[cell];
            if (currentCell !== null) {
              printCell(currentCell);
            }
          }
        };
    
    // The data here will consist of three elements: Q, q, and R
    // We begin by displaying Q
    logZone.append("<h3>Elements of Q:</h3>");
    parseCell(Q);
    
    // Next, display q
    logZone.append("<h3>Elements of q:</h3>");
    parseCell(q);
    
    // Finally, display R
    logZone.append("<h3>Elements of R:</h3>");
    parseCell(R);
  },
  
  // Contains a map of the request to its specific data display function
  requestDisplayMap = {
    "see-pure": displayPurifiedResults,
    "see-analysis": displayAnalysis
  },

  // Renders the data retrieved from a request to the viewport
  displayViewRequest = function (request, data) {
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
