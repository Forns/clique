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
    position: "center"
  }
);

// Post-purification data
var pureData = [];

$(function () {
  
  var inputSelected = 0, // 1 = text input, 2 = file
      file = null,
      fileData = null,
      textData = null,
      configErr = [],
      
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
  
  // Add error to the queue
  validateOrError = function (configValue, errorMessage) {
    var value = config[configValue],
        valid = true;
    // Reset any previous errors
    $("#" + configValue).removeClass("error-bg");
    
    // These should all have number values
    if ($.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        if (isNaN(Number(value[i]))) {
          configErr.push(errorMessage);
          valid = false;
          break;
        }
      }
    } else {
      if (isNaN(Number(value))) {
        configErr.push(errorMessage);
        valid = false;
      }
    }
    if (!valid) {$("#" + configValue).addClass("error-bg");}
    return valid;
  },
  
  // Check that all fields have been satisfied to submit for analysis
  submissionCheck = function () {
    var disableParsing = true,
        customDelim = $("#delimiter-custom").val(),
        omitRows = $("#omit-rows").val(),
        omitCols = $("#omit-cols").val(),
        noValue = $("#no-value").val(),
        yesMin = $("#yes-min").val(),
        yesMax = $("#yes-max").val(),
        values = [
          ["omit-rows", "[P2.2.2] Error: Non-numeric value for omit-rows."],
          ["omit-cols", "[P2.2.2] Error: Non-numeric value for omit-cols."],
          ["no-value", "[P2.3.2] Error: Non-numeric value for base value."],
          ["yes-min", "[P2.3.2] Error: Non-numeric value for yes min."],
          ["yes-max", "[P2.3.2] Error: Non-numeric value for yes max."]
        ],
        errorShowing = false;
        
    // Reset error messages
    configErr = [];
        
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
    config["no-value"] = Boolean(noValue) ? noValue : 0;
    config["yes-min"] = Boolean(yesMin) ? yesMin : 1;
    config["yes-max"] = Boolean(yesMax) ? yesMax : 1;
    config["delimiter-custom"] = customDelim;
    
    // Check for valid entries
    for (var i = 0; i < values.length; i++) {
      if (!validateOrError(values[i][0], values[i][1])) {
        errorShowing = disableParsing = true;
        $("#error-button").fadeIn(500);
      }
    }
    
    if (!errorShowing) {
      $("#error-button").fadeOut(500);
    }
    
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
      reader.onloadend = (function (f) {
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
    "<p>The data input allows the user to upload data in one of the following formats:</p>" +
    "<ul><li>.txt</li><li>.csv</li></ul>" +
    "<p>Some browsers will allow drag-and-drop onto the file input. Others do not support file reading at all. Chrome is recommended.</p>",
    
    "<p>The text input allows the user to manually input data, or copy-paste from another data source.</p>" +
    "<p>This input data may be further customized, although automatic syntax detection will only occur after navigating out of the text field.</p>",
    
    "<p>Trash settings determine if and how a data element that is considered \"trash\" will be handled. " +
    "A data point that neither matches the \"No\" value nor falls within the \"Yes\" value range will be considered trash. " +
    "Additionally, data that cannot be parsed into a number or contains text elements will be considered trash.</p>" +
    "<ul><li>Zero Out: [DEFAULT] All single trash elements will receive the \"No\" indication and be zero'd out.</li></br>" +
    "<li>Discard Row: A row containing any found trash element will be discarded entirely.</li></br>" +
    "<li>\"No\" / Base Value: [DEFAULT: 0] The nil value in the given data that indicates the base level.</li></br>" + 
    "<li>\"Yes\" Min: [DEFAULT: 1] The minimum value for the acceptable response range. Data outside of the range will be considered trash.</li></br>" + 
    "<li>\"Yes\" Max: [DEFAULT: 1] The maximum value for the acceptable response range. Data outside of the range will be considered trash.</li></ul>",
    
    "<p>Delimiters determine the separators between individual elements in your data sets. New lines designate the ends of rows " + 
    "whereas the chosen delimiters will separate the columns within each row.</p> <p>Clique will attempt to automatically detect any of the " +
    "three standard delimiters (comma, space, tab) with the added option of defining a custom delimiter. Custom delimiter definition " +
    "will treat the input as a single delimiter, e.g. \";:\" will look for the semicolon and colon as a single delimiter, not each individually.</p>",
    
    "<p>Omission definitions determine what data can be chucked entirely from the purified data:</p>" +
    "<ul><li>First Row Variables: [DEFAULT: false] When enabled, the first row of the data is omitted from the purifier and analyzer, " +
    "but preserved for reporting the names of variables based on their respective columns.</li></br>" +
    "<li>Omit Rows: [DEFAULT: null] Omits all rows denoted by the given list of comma-separated integers (e.g. 0, 2, 5).</li></br>" +
    "<li>Omit Columns: [DEFAULT: null] Omits all columns denoted by the given list of comma-separated integers (e.g. 1, 2, 4).</li></br></ul>"
  ];
  
  // Begin by checking the browser compatibility
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    $("#browser-compat")
    .html("Note: Your browser may not support this application's file handling")
    .fadeIn(1000);
  }
  
  // Error checking on textboxes
  $(":text").change(function () {
    submissionCheck();
  });
  
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
      var raw = textData;
      if (inputSelected === 2) {
        raw = fileData;
      }
      // Make sure there's at least one delimiter chosen
      if (!(config["delimiter-space"] || config["delimiter-comma"] || config["delimiter-tab"] || config["delimiter-custom"])) {
        configErr.push("[!] No delimiter chosen; defaulting to auto-detect delimiters.");
        autoConfig();
      }
      
      // Set up the loading modal
      popup(
        "dialog",
        "Processing...",
        "<p>Data is being processed, please wait...</p>" +
        "<p class='centering-container'><img src='../assets/loading.gif' /></p>",
        configErr,
        {
          modal: true,
          position: "center"
        }
      );
      
      $("#purifier-contents").fadeOut(1500);
      setTimeout(function () {
        // Last check for data validity before running purifier
        if (submissionCheck()) {
          // Ajax call for the actual purification, setting the global pureData
          $.ajax({
            type: "POST",
            url: "/specpure",
            data: JSON.stringify({raw: raw, config: config}),
            success: function (result) {
              configErr.push("[X] Data does not match formatting requirements. Consult documentation. :(");
              if (result.error) {
                popup(
                  "dialog",
                  "Errors in Input",
                  "Your input appears to be malformed; check the data and try again. Error:",
                  configErr,
                  {
                    modal: false
                  }
                );
              configErr = [];
              } else {
                window.location = "../results";
              }
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
        // Otherwise, there were errors, so check them
        $("#purifier-contents").fadeIn(1500);
      }, 500);
      
    });
  
  // Set up the file loading bar
  $("#file-loading").progressbar({value: 0});
  
  // Set up options design
  $("#delimiter-choice").buttonset();
  $("#trash-choice").buttonset();
  $("#first-row-vars").button();
  $("#error-button")
    .button({icons: {primary: "ui-icon-alert"}})
    .click(function () {
      popup(
        "dialog",
        "Errors in Input",
        "The following errors were found in your input:",
        configErr,
        {
          modal: false
        }
      );
    });
  $("#reset-button")
    .button({icons: {primary: "ui-icon-refresh"}})
    .click(function () {
      window.location = window.location;
    });
  $("#trash-zero").click(function () {
    config["trash-data"] = 0;
  });
  $("#trash-row").click(function () {
    config["trash-data"] = 1;
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
