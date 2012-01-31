/**
 * general-display.js
 * 
 * Contains general javascript-mediated display
 * elements for a variety of pages
 */

$(function () {
  // Navbar setup
  $("#nav-bar")
    .buttonset()
    .css("visibility", "visible");
  
  // Links set to buttons
  navBarSetup();
});
