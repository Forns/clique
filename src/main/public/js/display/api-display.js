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
        resizable: false,
        closeOnEscape: false,
        position: [30, 200],
        width: 200
      });
    });
    
  $("#api-nav-button").trigger("click");
  
  $("#accordion").accordion();
    
});
