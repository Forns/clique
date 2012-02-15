/**
 * spec-purifier.js
 * 
 * Contains the data purification code for the
 * spectral analyzer
 */

// Takes in a data string with specific configurations
// and outputs the results to... output, logging certain
// data elements into the... well, the log...
var purifyData = function (data, config, output, log) {
  var result = [],
      currentChar = "",
      currentToken = "",
      currentRow = [],
      delims = "[",
      varCount = 0,
      noValue = Number(config["no-value"]),
      yesMin = Number(config["yes-min"]),
      yesMax = Number(config["yes-max"]),
      omitRows = config["omit-rows"],
      omitCols = config["omit-cols"],
      omitColsBlueprint,
      trashRow = false,
      purgedResult = [],
      
  // Helper method for the matrix sorting that determines
  // ascending sorting method
  sortNumber = function (a, b) {
    return a - b;
  };
  
  // Set up the delimiters
  delims += (config["delimiter-space"]) ? " " : "";
  delims += (config["delimiter-comma"]) ? "," : "";
  delims += (config["delimiter-tab"]) ? "\t" : "";
  delims += config["delimiter-custom"] + "]";
  delims = new RegExp(delims);
  
  // Split rows on new lines
  result = data.split("\n");
  // Split each row at the delimiters
  for (var i = 0; i < result.length; i++) {
    result[i] = result[i].split(delims);
    // See what the longest variable amount is (used later)
    if (result[i].length > varCount) {
      varCount = result[i].length;
    }
  }
  
  // Check on custom setting validity
  for (var n = 0; n < omitRows.length; n++) {
    omitRows[n] = Number(omitRows[n]);
  }
  omitRows.sort(sortNumber);
  for (var p = 0; p < omitCols.length; p++) {
    omitCols[p] = Number(omitCols[p]);
  }
  omitCols.sort(sortNumber);
  omitColsBlueprint = omitCols.slice(0);
  varCount -= omitCols.length;
  
  // Parse the individual data points based on configs
  for (var j = 0; j < result.length; j++) {
    // Reset the row to push and the col omissions
    var currentRow = [];
    omitCols = omitColsBlueprint.slice(0);
    trashRow = false;
    
    // Make sure this isn't a skipped row
    if (j === omitRows[0]) {
      omitRows = omitRows.slice(1);
      continue;
    }
    
    // Make sure var count is uniform
    if (result[j].length !== varCount) {
      for (var m = varCount - result[j].length; m > 0; m--) {
        result[j].push(noValue);
      }
    }
    
    // Go through the row's elements
    for (var k = 0; k < result[j].length; k++) {
      // Make sure this isn't a skipped col
      if (k === omitCols[0]) {
        omitCols = omitCols.slice(1);
        continue;
      }
      // Cast to number
      result[j][k] = Number(result[j][k]);
      // Verify that it's not trash
      if (isNaN(result[j][k])) {
        // Check config settings for what to do with trash
        if (config["trash-data"]) {
          // Means it was a skip row, so scratch it
          trashRow = true;
          break;
        } else {
          // Otherwise, was a "zero-out"
          currentRow.push(noValue);
        }
      } else {
        // Good data point, so push it onto the new row
        currentRow.push(result[j][k]);
      }
    }
    // Don't add a row if it was determined to be trashed
    if (!trashRow) {
      purgedResult.push(currentRow);
    }
  }
  
  return purgedResult;
};
