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

$(function () {
  
  var inputSelected = 0, // 1 = text input, 2 = file
    file = null,
    fileData = null,
    textData = null,
    
    // Configuration settings
    config = {
      delimiters: {
        // Delimiter configurations
        "delimiter-space": false,
        "delimiter-comma": false,
        "delimiter-tab": false,
        "delimiter-custom": ""
      },
      
      // Omission configurations
      "first-row-vars": false
    },
    
    // Post-purification data
    pureData = [],
  
  // Check that all fields have been satisfied to submit for analysis
  submissionCheck = function () {
    var disableParsing = true;
    
    // Begin by checking input selection
    switch(inputSelected) {
      case 1: // text-field input
        if ($("#text-input").val()) {
          disableParsing = false;
        } else {
          inputSelected = 0;
        }
        break;
      case 2: // file input
        disableParsing = (fileData && $("#file-loading").progressbar("value") === 100);
        break;
    }
    
    // Finish by either enabling or disabling the submission button
    $("#purify-button").button({disabled: disableParsing});
  },
  
  // Updates the progress of the reader parsing the file
  readerProgress = function (evt) {
    if (evt.lengthComputable) {
      var percentComplete = Math.round((evt.loaded / evt.total) * 100);
      $("#file-loading").progressbar({value: percentComplete});
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
        submissionCheck();
        return function (e) {
          fileData = reader.result;
          autoConfig();
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
  },
  
  // Chooses some purifier options based on the given data
  autoConfig = function () {
    var data = textData,
        delimiters = {
          "comma": ",",
          "space": " ",
          "tab": "\t"
        };
    if (inputSelected === 2) {
      data = fileData;
    }
    // Check for any delimiters in the output
    for (var d in delimiters) {
      var delim = "delimiter-" + d;
      if (data && data.indexOf(delimiters[d]) !== -1 && !config[delim]) {
        $("#" + delim).trigger("click");
        config.delimiters[delim] = true;
      }
    }
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
    .change(function () {
      // Begin by updating the active input
      inputSelected = 1;
      textData = $("#text-input").val();
      toggleInputUI();
      autoConfig();
      submissionCheck();
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
        file = null;
      }
      toggleInputUI();
    });
  
  // Set up the purify button
  $("#purify-button")
    .button()
    .click(function () {
      textData = $("#text-input").val();
      var data = textData,
          delims = config.delimiters;
      if (inputSelected === 2) {
        data = fileData;
      }
      // Make sure there's at least one delimiter chosen
      if (!(delims["delimiter-space"] || delims["delimiter-comma"] || delims["delimiter-tab"] || delims["delimiter-custom"])) {
        autoConfig();
      }
      
      purifyData(data, config, "file-out", "log-zone");
      $("#file-out")
        .fadeIn(1000)
        .html(data);
    });
  
  // Set up the file loading bar
  $("#file-loading").progressbar({value: 0});
  
  // Set up options design
  $("#delimiter-choice").buttonset();
  $("#trash-choice").buttonset();
  $("#first-row-vars").button();
  
  // Configure checkboxes to update the config
  $(":checkbox")
    .each(function () {
      $(this).click(function () {
        config[$(this).attr("id")] = !config[$(this).attr("id")];
      });
    });
    
});
