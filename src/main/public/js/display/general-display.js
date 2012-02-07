/**
 * general-display.js
 * 
 * Contains general javascript-mediated display
 * elements for a variety of pages
 */

$(function () {
  var navHTML = 
      "<button id='home-nav'>Home</button>"
    + "<button id='about-nav'>About</button>"
    + "<button id='api-nav'>API</button>"
    + "<button id='download-nav'>Downloads</button>"
    + "<button id='spec-nav'>Spectral Analysis</button>"
    + "<button id='git-nav'>Git Repo</button>";
  
  // Navbar setup
  $("#nav-bar")
    .html(navHTML)
    .buttonset()
    .css("visibility", "visible");
  
  // Links set to buttons
  navBarSetup();
  
  // Special case for git navigation
  $("#git-nav").click(function () {
    window.open("https://github.com/Forns/clique");
  });
});
