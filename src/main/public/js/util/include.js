/**
 * include.js
 *
 * Utility script to include js files within other js files,
 * so you can js file while you js file.
 */

var include = {

  // Array containing all necessary imports
  directories: [],
  
  // Number of imports needed to be handled, plus a counter, n
  numberOfImports: 0,
  n: 0,
  
  // Helper function to append the scripts (call once at start)
  run: function () {
    // Only import when there are more to go
    if (n < numberOfImports) {
      var script = document.createElement("script");
      script.setAttribute("src", directories[n]);
      script.onload = include.run;
      document.getElementsByTagName("head")[0].appendChild(script);
      n++;
    }
  },
  
  includeInit: function (d) {
    directories = d;
    numberOfImports = directories.length;
    n = 0;
    include.run();
  }
};