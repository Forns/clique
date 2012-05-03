/**
 * downloads-display.js
 *
 * Contains basic display elements for the
 * downloads page.
 */

$(function () {
  
  // Clicking the download button will send the library for download
  $("#clique-src")
    .button()
    .click(function () {
      window.location = "./js/dist/clique.js";
    });
    
});
