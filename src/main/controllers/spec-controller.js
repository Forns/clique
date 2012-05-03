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
      req.session.pure = pureData = Matrix.purifyData(req, res);
      req.session.analysis = Matrix.finalDecomposition(
        Matrix.rawDataSorting(pureData),
        Matrix.johnsonGraphs[pureData[0].length]
      );
      res.send(true);
    } catch (err) {
      console.log(err);
      delete req.session.pure;
      res.send({error: err});
    }
  });
  
  /*
   * GET /see-pure
   *   Returns the purified results for the viewer to observe
   */
  app.get("/see-pure", function (req, res) {
    res.contentType('application/json');
    res.send(JSON.stringify(req.session.pure));
  });
  
  /*
   * GET /see-analysis
   *   Returns the purified results for the viewer to observe
   */
  app.get("/see-analysis", function (req, res) {
    res.contentType('application/json');
    res.send(JSON.stringify(req.session.analysis));
  });
  
  /*
   * POST /resultsDelete
   *   Deletes the currently stored results in the user's session
   *   and redirects back to he spectral analyzer
   */
  app.post("/resultsDelete", function (req, res) {
    delete req.session.pure;
    delete req.session.analysis;
    res.send(true);
  });
  
}
