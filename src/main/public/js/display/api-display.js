/**
 * api-display.js
 * 
 * Provides api-specific display elements
 */

$(function () {
  
  $("#api-nav-button")
    .button()
    .click(function () {
      $("#api-list").dialog({
        title: "Navigation Menu",
        modal: false,
        resizable: false
      });
    });
    
  $("#api-nav-button").trigger("click");
    
});
