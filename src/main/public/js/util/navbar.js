/**
 * navbar.js
 * 
 * Utility class for setting up navigation buttons
 */

var navBarSetup = function (urlList, buttonList, newWindow) {
  var urls = urlList || 
      // Default URLs
      [
        "/"
      ],
      
      buttons = buttonList ||
      // Default buttons
      [
        "#home-nav"
      ];
  
  // Map the click functions to the redirects
  for (var i = 0; i < buttons.length; i++) {
    var clickFunc;
    if (i < urls.length) {
      (function (url) {
        if (!newWindow) {
          clickFunc = function () {
            window.location = url;
          };
        } else {
          clickFunc = function () {
            window.open(url);
          };
        }
      })(urls[i]);
    } else {
      clickFunc = function () {
        alert("Under Construction! Check back soon...");
      };
    }
    
    $(buttons[i]).click(clickFunc);
  }
};
