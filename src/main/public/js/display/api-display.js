/**
 * api-display.js
 * 
 * Provides api-specific display elements
 */

$(function () {
  
  // Display technique for denoting class vs instance methods
  var classIcon = "[ <span class='class-icon'>C</span> ]",
      instanceIcon = "[ <span class='instance-icon'>I</span> ]";
      
  // Append these item explanations to the top of the page
  $("#center-zone").append(
    "<p>" + classIcon + "\t= Signature indicates an instance method<br/>" +
    instanceIcon + "\t= Signature indicates an instance method"
  );
  
  // Begin populating the API categories using api-items.js
  for (category in apiItems) {
    // Go through each category in turn
    var categoryDiv = $("#" + category),
        categoryItems = apiItems[category];
    for (element in categoryItems) {
      // Each element will be a new API item
      var item = categoryItems[element],
          navName = category + element,
          itemType = (item.title.indexOf(".") === -1) ? instanceIcon : classIcon;
          
      categoryDiv
        .append("<div class='api-title rounded-corners'><a name='" + navName + "'></a><h3>" + itemType + " " + item.title + "</h3></div>")
        .append("<p class='api-item'>" + item.use + "</p>")
        .append("<p class='api-item api-example'>" + item.example + "</p>");
        
      // Update the navigation
      $("#" + category + "-navigation")
        .append("<a class='nav-link' href='#" + navName + "'>" + itemType + " " + element + "</a>");
    }
  }
  
  // Set up the navigation button
  $("#api-nav-button")
    .button()
    .click(function () {
      $("#api-list").dialog({
        title: "Navigation Menu",
        modal: false,
        resizable: false,
        collapsible: true,
        closeOnEscape: false,
        show: "fade",
        hide: "fade",
        position: [30, 200],
        width: 250
      });
    });
  
  // Trigger the button once so that the dialog is displayed on launch  
  $("#api-nav-button").trigger("click");
  
  // Set up the accordion options
  $("#accordion").accordion({
    autoHeight: false,
    collapsible: true
  });
  
  // Keeps the navigator in the display
  // Credit to William Duffy for this tip
  $(window).scroll(function(){      
    $("#api-list")
      .parent()
      .stop()
      .animate({"marginTop": ($(window).scrollTop() + 30) + "px"}, "slow" );      
  });
  
});
