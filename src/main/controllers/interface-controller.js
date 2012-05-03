/**
 * interface-controller.js
 * 
 * Controller for UI-related routes.
 */

module.exports = function (app) {
  
  /*
   * GET /
   *   Render the index with information about Clique
   */
  app.get("/", function (req, res) {
    // Simply render the greeting page
    res.render("index", {
      layout: true
    });
  });
  
  /*
   * GET /about
   *   Render the about section with information about Clique
   */
  app.get("/about", function (req, res) {
    // Simply render the greeting page
    res.render("about", {
      layout: true
    });
  });
  
  /*
   * GET /api
   *   Render the api with information about using Clique
   */
  app.get("/api", function (req, res) {
    // Simply render the greeting page
    res.render("api", {
      layout: true
    });
  });
  
  /*
   * GET /download
   *   Render the download page with downloads
   *   for Clique
   */
  app.get("/download", function (req, res) {
    // Simply render the greeting page
    res.render("download", {
      layout: true
    });
  });
  
  /*
   * GET /spectral
   *   Render the spectral analyzer page
   */
  app.get("/spectral", function (req, res) {
    // Render the spectral analyzer front-end if there is no
    // session with the results, otherwise render results page
    if (req.session.pure) {
      res.redirect("/results");
    } else {
      res.render("spectral", {
        layout: true
      });
    }
  });
  
  /*
   * GET /results
   *   Render the spectral analyzer results page
   */
  app.get("/results", function (req, res) {
    if (req.session.pure) {
      res.render("results", {
        layout: true
      });
    } else {
      res.redirect("/spectral");
    }
  });
  
}
