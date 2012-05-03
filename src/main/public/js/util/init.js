/**
 * init.js
 * 
 * Provides the necessary boot-strapping for pages
 */

// Setup include
var loc = window.location.toString().split("/"),
    includes = [
      "./js/util/navbar.js",
      "./js/display/general-display.js"
    ];
    
loc = loc[loc.length - 1];

// Page specific inclusions
switch (loc) {
  case "":
    includes.push("./js/display/index-display.js");
    break;
  case "test":
    includes.push("./js/dist/clique.js");
    break;
  case "spectral":
    includes.push("./js/util/popup.js");
    includes.push("./js/display/spec-display.js");
    break;
  case "results":
    includes.push("./js/lib/jquery.flot.min.js");
    includes.push("./js/util/popup.js");
    includes.push("./js/display/results-display.js");
    break;
  case "api":
    includes.push("./js/display/api-items.js");
    includes.push("./js/display/api-display.js");
    break;
  case "download":
    includes.push("./js/display/downloads-display.js");
}

// Perform necessary inclusions
include.includeInit(includes);
