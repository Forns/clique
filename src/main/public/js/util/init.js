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
if (loc === "") {
  includes.push("./js/display/index-display.js");
}

if (loc === "test") {
  includes.push("./js/dist/clique.js");
}

if (loc === "spectral") {
  includes.push("./js/util/popup.js");
  includes.push("./js/modules/spec-purifier.js");
  includes.push("./js/display/spec-display.js");
}

// Perform necessary inclusions
include.includeInit(includes);
