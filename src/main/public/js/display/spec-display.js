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
    fileData = null,
    textData;

$(function () {
  
  // Set up the file loading bar
  $("#file-loading")
    .progressbar({value: 0});
  
  // Updates the progress of the reader parsing the file
  var readerProgress = function (evt) {
    if (evt.lengthComputable) {
      var percentComplete = Math.round((evt.loaded / evt.total) * 100);
      console.log(percentComplete);
      $("#file-loading")
        .progressbar({value: percentComplete});
    }
  },
  
  // Reads through the given input and saves it to a data structure
  readFile = function (event) {
    if (file) {
      // Create a new FileReader
      var reader = new FileReader();
      
      // Set the update function
      reader.onprogress = readerProgress;
      
      // Set the reader to parse the given file onload
      reader.onload = (function (f) {
        $("#file-loading").progressbar({value: 100});
        $("#loading-status").html("Loading Complete!");
        $("#purify-button").button({disabled: false});
        return function (e) {
          fileData = reader.result;
        };
      })(file);
      
      // Read the given file
      reader.readAsText(file);
    }
  },
  
  // Provides UI indication as to which file input type is being used
  toggleInputUI = function () {
    var textInputOpac = 1.0,
        fileInputOpac = 1.0;
    if (inputSelected === 1) {
      fileInputOpac = 0.2;
    } else if (inputSelected === 2) {
      textInputOpac = 0.2;
    }
    $("#text-field-input").fadeTo(1000, textInputOpac);
    $("#file-select-input").fadeTo(1000, fileInputOpac);
  };
  
  // Begin by checking the browser compatibility
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    $("#browser-compat")
    .html("Note: Your browser may not support this application's file handling")
    .fadeIn(1000);
  }
  
  // Set up input handlers
  // Handler for text-input
  $("#text-input")
    .keypress(function (event) {
      // Begin by updating the active input
      inputSelected = 1;
      
      var enableParsing = true;
      
      if ($("#text-input").val()) {
        enableParsing = false;
        inputSelected = 1;
      } else {
        inputSelected = 0;
      }
      $("#purify-button").button({disabled: enableParsing});
      toggleInputUI();
    });
  
  // Handler for uploading a file
  $("#file-input")
    .button()
    .change(function (event) {
      
      // Next, check the file
      file = event.target.files[0];
      $("#file-info").html(
        "<strong>" + file.name + "</strong> (" 
        + (file.type || "n/a") + "), " 
        + file.size + " bytes, last modified: " 
        + file.lastModifiedDate.toLocaleDateString()
      );
      
      $("#file-loading")
        .progressbar({value: 0})
        .fadeIn(1000);
        
      $("#loading-status").html("Loading...");
      
      if (file.type === "text/plain" || file.type === "text/csv") {
        inputSelected = 2;
        readFile(event);
      } else {
        inputSelected = 0;
        $("#loading-status").html("File type not supported");
        $("#purify-button").button({disabled: true});
      }
      toggleInputUI();
    });
  
  // Set up the purify button
  $("#purify-button")
    .button()
    .click(function () {
      if (inputSelected === 2) {
        $("#file-out").html(fileData);
      } else {
        textData = $("#text-input").val();
        $("#file-out").html(textData);
      }
    });
  
  // Set up options design
  $("#delimiter-choice")
    .buttonset();
  
});
