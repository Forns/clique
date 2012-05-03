/**
 * results-display.js
 *
 * Handles the results page related display elements
 * and interaction
 */

$(function() {
  
  // Logging area used in the reporting
  var logZone = $("#log-zone"),
      resPure,
      resAnalysis,
      varNames
  
  // User requests to view the purified results
  displayPurifiedResults = function () {
    var data = resPure;
    logZone.append("<h2>Purified Input:</h2>");
    
    for (var i = 0; i < data.length; i++) {
      logZone.append(JSON.stringify(data[i]) + "<br/>");
    }
  },
  
  // User requests to view the analyzed results
  displayAnalysis = function () {
    logZone.append("<h2>Analysis Output:</h2><br/>");
    var data = resAnalysis,
        Q = data[0],
        q = data[1],
        R = data[2],
        RArray = R,
        
        // Private method to print the cell's items
        printCell = function (c, i) {
          var currentObject;
          for (var j = 0; j < c.length; j++) {
            currentObject = c[j];
            if (currentObject !== null) {
              currentObject = currentObject.elements;
              logZone.append("[C] Cell (" + i + ", " + j +"):<br/>");
              for (var k = 0; k < currentObject.length; k++) {
                // Handle embedded results that pop up every once and awhile...
                if (currentObject[k].elements) {
                  logZone.append("<br/><br/>");
                  printCell([currentObject[k]], "Array");
                } else {
                  // Temporary, will specialize later with var combos
                  if (j === 1) {
                    logZone.append("<br/>> " + varNames[k] + ": " + currentObject[k]);
                  } else {
                    logZone.append("<br/>> combo" + k + ": " + currentObject[k]);
                  }
                }
              }
            }
            // A little spacing is nice!
            logZone.append("<br/><br/>");
          }
        },
        
        // Private method to parse the cell's items
        parseCell = function (c) {
          var currentCell;
          for (var i = 0; i < c.length; i++) {
            currentCell = c[i];
            if (currentCell !== null) {
              printCell(currentCell, i);
            }
          }
        };
    
    // The data here will consist of three elements: Q, q, and R
    // We begin by displaying Q
    logZone.append("<h3>[Q] Elements:</h3>");
    parseCell(Q);
    
    // Next, display q
    logZone.append("<h3>[q] Effects found:</h3>");
    parseCell(q);
    
    // Finally, display R
    logZone.append("<h3>[R] Elements:</h3>");
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
    logZone.html("");
    requestDisplayMap[request]();
  };
  
  // Grab the data and gather it locally
  $.ajax({
    type: "GET",
    url: "analysis",
    success: function (result) {
      resPure = result.pure;
      resAnalysis = result.analysis;
      varNames = result.varNames;
      
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
              displayViewRequest(reqName);
            });
        });
        
      // Trigger the button once so that the log zone is updated
      $("#see-pure").trigger("click");
      
      // Display elements for the command buttons
      $("#command-list").children()
        .addClass("command-button");
        
      // Finally, show all the UI elements
      $(".initially-hidden").fadeIn(500);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
    dataType: "json",
    contentType: "application/json"
  });
  
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
    
  
  // Keeps the navigator in the display
  // Credit to William Duffy for this tip
  $(window).scroll(function(){      
    $("#command-list")
      .parent()
      .stop()
      .animate({"marginTop": ($(window).scrollTop() + 30) + "px"}, "slow" );      
  });
  
});
