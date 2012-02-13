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
      delims = "[";
      
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
  }
  
  pureData = result;
};
