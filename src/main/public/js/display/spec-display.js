/**
 * spec-display.js
 * 
 * Contains special page elements and functions
 * for the spectral analysis page
 *
 * Credit for file handling techniques goes to:
 * Eric Bidelman, Copyright 2010
 * http://www.html5rocks.com/en/tutorials/file/dndfiles/
 */

// Global variables for the analyzer
var inputSelected = 0, // 1 = text input, 2 = file
    file = null,
    data = null;

$(function () {
  
  // Reads through the given input and saves it to a data structure
  var readFile = function (event) {
    if (file) {
      // Create a new FileReader
      var reader = new FileReader();
      
      // Set the reader to parse the given file onload
      reader.onload = (function(f) {
        return function (e) {
          data = reader.result;
        }
      })(file);
      
      // Read the given file
      reader.readAsText(file);
      $("#file-out").html(data);
    }
  },
  
  // The resultant message for browser compatibility check    
  compatibilityMessage = "Success! Your browser supports this application and file handling";
  
  // Begin by checking the browser compatibility
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    compatibilityMessage = "Note: Your browser may not support this application's file handling";
  }
  
  $("#browser-compat")
    .html(compatibilityMessage)
    .fadeIn(1000);
    
  // Set up input handlers
  $("#text-input")
    .change(function (event) {
      // Begin by updating the active input
      inputSelected = 1;      
    });
  
  $("#file-input")
    .button()
    .change(function (event) {
      // Begin by updating the active input
      inputSelected = 2;
      
      // Next, check the file
      file = event.target.files[0];
      $("#file-info").html(
        "<strong>" + file.name + "</strong> (" 
        + (file.type || "n/a") + "), " 
        + file.size + " bytes, last modified: " 
        + file.lastModifiedDate.toLocaleDateString()
      );
    });
  
  $("#purify-button")
    .button()
    .click(readFile);
});
