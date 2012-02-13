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
  
  // Display the popup
  container
    .html(message)
    .dialog(options);
};
