/**
 * popup.js
 *
 * Provides a utility method for creating dialog popups
 */

var popup = function (container, title, message, error, customs) {
  container = $("#" + container);
  
  // Options begin with defaults and then are customized
  // via the customs parameter
  var options = {
        width: 400,
        title: title,
        resizable: false,
        show: "fade",
        hide: "fade"
      };
      
  // Set user-defined options
  for (var op in customs) {
    options[op] = customs[op];
  }
  
  // Add the message
  container
    .html(message);
    
  // Any errors to report?
  if (error) {
    for (var i = 0; i < error.length; i++) {
      container.append("<p class='error-text'>" + error[i] + "</p>")
    }
  }
  
  // Display the popup
  container.dialog(options);
};
