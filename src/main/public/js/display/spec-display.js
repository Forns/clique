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

// Loading dialog
popup(
  "dialog",
  "Loading...", 
  "<p>Loading Spectral Analyzer, please wait...</p>" +
  "<p class='centering-container'><img src='../assets/loading.gif' /></p>",
  null,
  {
    modal: true,
  }
);

// Post-purification data
var pureData = [];

$(function () {
  
  var inputSelected = 0, // 1 = text input, 2 = file
      file = null,
      fileData = null,
      textData = null,
      configErr = "",
      
      // Configuration settings
      config = {
        // Delimiter configurations
        "delimiter-space": false,
        "delimiter-comma": false,
        "delimiter-tab": false,
        "delimiter-custom": "",
        
        // Omission configurations
        "first-row-vars": false,
        "omit-rows": "",
        "omil-cols": "",
        
        // Trash data settings
        "trash-data": 0, // 0 = zero out, 1 = discard row
        
        // Base values and ranges
        "no-value": 0,
        "yes-max": 1
      },
  
  // Check that all fields have been satisfied to submit for analysis
  submissionCheck = function () {
    var disableParsing = true,
        customDelim = $("#delimiter-custom").val(),
        omitRows = $("#omit-rows").val(),
        omitCols = $("#omit-cols").val(),
        noValue = $("#no-value").val(),
        yesMin = $("#yes-min").val(),
        yesMax = $("#yes-max").val();
        
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
        disableParsing = !Boolean(fileData && $("#file-loading").progressbar("value") === 100);
        break;
    }
    
    // Parse the user customizations
    config["omit-rows"] = omitRows.split(",");
    if (config["omit-rows"][0] === "") {config["omit-rows"] = [];}
    config["omit-cols"] = omitCols.split(",");
    if (config["omit-cols"][0] === "") {config["omit-cols"] = [];}
    config["no-value"] = noValue;
    config["yes-min"] = yesMin;
    config["yes-max"] = yesMax;
    
    // Finish by either enabling or disabling the submission button
    $("#purify-button").button({disabled: disableParsing});
    return !disableParsing;
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
        return function (e) {
          fileData = reader.result;
          autoConfig();
          $("#file-loading").progressbar({value: 100});
          $("#loading-status").html("Loading Complete!");
          submissionCheck();
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
        config[delim] = true;
      }
    }
  },
  
  // The titles of the help button dialogs
  helpTitles = [
    "Data Input: File",
    "Data Input: Text",
    "Trash Data Settings",
    "Delimiters",
    "Omission Settings"
  ],
  
  // The messages of the help buttons
  helpMessages = [
    "Test message for data input file",
    "Test message for data input text",
    "Test message for trash settings",
    "Test message for delimiters",
    "Test message for omissions"
  ];
  
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
      // Set up the loading modal
      popup(
        "dialog",
        "Purifying...", 
        "<p>Data is being purified, please wait...</p>" +
        "<p class='centering-container'><img src='../assets/loading.gif' /></p>",
        null,
        {
          modal: true,
        }
      );
      
      textData = $("#text-input").val();
      var data = textData;
      if (inputSelected === 2) {
        data = fileData;
      }
      // Make sure there's at least one delimiter chosen
      if (!(config["delimiter-space"] || config["delimiter-comma"] || config["delimiter-tab"] || config["delimiter-custom"])) {
        autoConfig();
      }
      
      $("#purifier-contents").fadeOut(1500);
      setTimeout(function () {
        // Last check for data validity before running purifier
        if (submissionCheck()) {
          // Performs the actual purification, setting the global pureData
          pureData = purifyData(data, config, "file-out", "log-zone");
          $("#dialog")
            .delay(3500)
            .queue(function () {
              $(this).dialog("close");
            });
          // Display the data nicely
          for (var i = 0; i < pureData.length; i++) {
            $("#file-out").append(i + ": " + JSON.stringify(pureData[i]) + "</br>");
          }
          $("#file-out")
            .delay(2000)
            .slideDown(1000);
        } else {
          // Otherwise, there were errors, so check them
          $("#purifier-contents").fadeIn(1500);
          
          // Report errors
          
          // Clear errors
        }
      }, 500);
      
    });
  
  // Set up the file loading bar
  $("#file-loading").progressbar({value: 0});
  
  // Set up options design
  $("#delimiter-choice").buttonset();
  $("#trash-choice").buttonset();
  $("#first-row-vars")
    .button()
    .click(function () {
      config["first-row-vars"] = !Boolean(config["first-row-vars"]);
    });
  $("#reset-button")
    .button()
    .click(function () {
      window.location = window.location;
    });
  $("#trash-zero").click(function () {
    config[trash-data] = 0;
  });
  $("#trash-row").click(function () {
    config[trash-data] = 1;
  });
  
  // Configure checkboxes to update the config
  $(":checkbox")
    .each(function () {
      $(this).click(function () {
        config[$(this).attr("id")] = !config[$(this).attr("id")];
      });
    });
  
  // Add a help button to each option section
  $(".parse-option").each(function () {
    $(this).prepend(
      "<div class='help-button'><span class='status-icon'></span><span class='status-text'></span></div></br>"
    );
  });
  
  // Configure the help buttons
  $(".status-icon")
    .button({
      icons: {
        primary: "ui-icon-info"
      }
    })
    .each(function (index) {
      $(this).click(function () {
        popup(
          "dialog",
          helpTitles[index],
          helpMessages[index],
          null,
          {
            modal: false,
            width: 500
          }
        );
      });
    });
    
  // Close the loading dialog
  $("#dialog").dialog("close");
    
});
