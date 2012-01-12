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
  app.get('/', function (req, res) {
    // Simply render the greeting page
    res.render('index', {
      layout: true
    });
  });
}
