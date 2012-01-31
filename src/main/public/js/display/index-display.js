/**
 * index-display.js
 * 
 * Provides index-specific display elements
 */

$(function () {
  
  // Clicking the download button will send the library for download
  $("#clique-src")
    .button()
    .click(function () {
      window.location = "./js/dist/clique.js";
    });
    
});
