/**
 * spec-controller.js
 * 
 * Controller for the spectral analyzer.
 */

module.exports = function (app) {
  
  /*
   * POST /specpure
   *   Takes in data with configurations for purification
   *   and analysis
   */
  app.post("/specpure", function (req, res) {
    var pureData;
    try {
      req.session.results = {};
      req.session.results.pure = pureData = Matrix.purifyData(req, res);
      req.session.results.analysis = Matrix.finalDecomposition(
        Matrix.rawDataSorting(pureData),
        Matrix.johnsonGraphs[pureData[0].length]
      );
      res.send(true);
    } catch (err) {
      console.log(err);
      delete req.session.results;
      res.send({error: err});
    }
  });
  
  /*
   * GET /analysis
   *   Returns the purified results for the viewer to observe
   */
  app.get("/analysis", function (req, res) {
    res.contentType('application/json');
    res.send(JSON.stringify(req.session.results));
  });
  
  /*
   * POST /resultsDelete
   *   Deletes the currently stored results in the user's session
   *   and redirects back to he spectral analyzer
   */
  app.post("/resultsDelete", function (req, res) {
    delete req.session.results;
    res.send(true);
  });
  
}
