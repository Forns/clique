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
      delims = [];
      
  // Set up the delimiters
  for (d in config.delimiters) {
    if (config.delimiters[d]) {
      delims.push(d);
    }
  }
  
  // Spit the data at new lines
  while (data.indexOf("\n")) {
    
  }
  
  // Report to the output
  $("#" + output).html(JSON.stringify(result));
};
