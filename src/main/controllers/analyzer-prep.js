/**
 * analyzer-prep.js
 *
 * Adds server-only elements to the Clique library for use in the
 * spectral analysis portion of the web app
 */

// Number of Johnson Graphs to generate
var nJG = 5;

// Johnson Graph generation for the final decomposition
// [!] For server-side consumption only
Matrix.johnsonGraphs = [];
var generateJohnson = function (n) {
  var dim = Math.floor(n / 2),    // Number of cells
      k,
      S,
      result = [];
  
  for (size = 1; size <= dim; size++) {
    k = Math.choose(n, n - size);
    result[size] = $S(k, k);
    S = $V([size, n - size]);
    
    for (i = 1; i <= k; i++) {
      for (j = 1; j <= k; j++) {
        if (Vector.sum((Vector.indexToSet(i, S).subtract(Vector.indexToSet(j, S)).map(function (x) {
          return Complex.magnitude(x);
        }))) === 2) {
          result[size].setElement(i, j, 1);
        }
      }
    }
  }
  
  return result;
};

console.log("[~] SERVER: Starting up...")
console.log("[" + nJG + "] Johnson graph generation in progress...");
// Construct the actual Johnson Graphs
for (var jn = 2; jn <= nJG; jn++) {
  Matrix.johnsonGraphs[jn] = generateJohnson(jn);
}
console.log("[!] Johnson graph generation complete!");

// Takes in the raw data D and returns the corresponding isotypic projections.
// It then returns the following:
// q = raw projections
// Q = projections filtered using the radonTransform
// R = sorted values with the particular tabloid appended for each
// JJ << a cell of precomputed Johnson Graphs for eigenspaceProjections
// [!] Server-side ONLY
Matrix.finalDecomposition = function (D, JJ) {
  var N = D[1].rows(),
      cells = D.length,
      Q = [],
      R = [],
      q = [],
      lengths,
      projections,
      U,
      Y,
      I,
      T,
      size,
      resultHolder = [];
      
  for (var k = 1; k < cells; k++) {
    // Eigenspace calculations of the Johnson graphs at the appropriate splits
    resultHolder = Matrix.eigenspaceProjections(JJ[k], D[k]);
    lengths = resultHolder[0];
    projections = resultHolder[1];
    
    if (k >= 1) {
      projections = Matrix.fliplr(projections);
    }
    
    // k, k case
    if (!q[k]) {q[k] = [];}
    if (!Q[k]) {Q[k] = [];}
    q[k][k] = projections.col(k + 1);
    Q[k][k] = projections.col(k + 1);
    
    // k, next cell case
    q[k][cells + 1] = projections.col(1);
    Q[k][cells + 1] = projections.col(1);
    
    // k, j (j = 2:k -1)
    for (var j = 2; j <= k; j++) {
      U = Matrix.I(Math.choose(N, k));
      for (var m = 0; m <= j - 2; m++) {
        U = Matrix.full(Matrix.radonTransform($V([N - k + m, k - m]))).multiply(U);
      }
      q[k][k + 1 - j] = projections.col(k + 2 - j);
      Q[k][k + 1 - j] = U.multiply(projections.col(k + 2 - j).multiply(1 / Math.factorial(j)));
    }
  }
  
  for (var i = 1; i < cells; i++) {
    for (var j = 1; j <= i; j++) {
      resultHolder = Vector.sortWithIndex(Q[i][j]);
      Y = resultHolder[0];
      I = resultHolder[1];
      size = Y.dimensions();
      T = Matrix.zero(size, N);
      for (var m = 1; m <= size; m++) {
        T.setRow(m, Vector.indexToSet(I.e(m), $V([N - j, j])));
      }
      resultHolder = Y;
      resultHolder.append(T);
      if (!R[i]) {R[i] = [];}
      R[i][j] = resultHolder;
    }
  }
  
  return [Q, q, R];
};

// Takes in an array DATA whose rows consist of sequences of 0's and 1's, where
// each row has no more 0's than 1's. The idea is to view the rows of DATA as the
// partitions of a set, where 1 means "winner" and 0 means "loser." The output is the
// tabloid version of the incoming data in DATA.
Matrix.rawDataSorting = function (DATA) {
  DATA = $M(DATA);
  var V = DATA.rows(),
      N = DATA.cols(),
      cells = Math.floor(N / 2),
      currentRow,
      currentCell,
      tabloidNumber,
      result = [];
      
  for (var k = 1; k <= cells; k++) {
    currentCell = $S(Math.choose(N, k), 1);
    for (var i = 1; i <= V; i++) {
      currentRow = DATA.row(i);
      if (Vector.sum(currentRow) === N - k) {
        currentRow = currentRow.map(function (x) {
          return 2 - x;
        });
        tabloidNumber = Vector.setToIndex(currentRow);
        currentCell.setElement(tabloidNumber, 1, currentCell.e(tabloidNumber, 1) + 1);
      }
    }
    result[k] = currentCell;
  }
  
  return result;
};

Matrix.purifyData = function (req, res) {
  var config = req.body.config,
      data = req.body.raw
      result = [],
      currentRow = [],
      delims = "[",
      varCount = 0,
      noValue = Number(config["no-value"]),
      yesMin = Number(config["yes-min"]),
      yesMax = Number(config["yes-max"]),
      omitRows = config["omit-rows"],
      omitCols = config["omit-cols"],
      omitColsBlueprint = [],
      trashRow = false,
      purgedResult = [],
      
  // Helper method for the matrix sorting that determines
  // ascending sorting method
  sortNumber = function (a, b) {
    return a - b;
  };
  
  // Set up the delimiters
  delims += (config["delimiter-space"]) ? " " : "";
  delims += (config["delimiter-comma"]) ? "," : "";
  delims += (config["delimiter-tab"]) ? "\t" : "";
  delims += config["delimiter-custom"] + "]";
  delims = new RegExp(delims);
  
  // Split rows on new lines
  result = data.split("\n");
  // Split each row at the delimiters
  for (var i = 0; i < result.length; i++) {
    result[i] = result[i].split(delims);
    // See what the longest variable amount is (used later)
    if (result[i].length > varCount) {
      varCount = result[i].length;
    }
  }
  
  // Check on custom setting validity
  for (var n = 0; n < omitRows.length; n++) {
    omitRows[n] = Number(omitRows[n]);
  }
  omitRows.sort(sortNumber);
  for (var p = 0; p < omitCols.length; p++) {
    omitCols[p] = Number(omitCols[p]);
  }
  omitCols.sort(sortNumber);
  omitColsBlueprint = omitCols.slice(0);
  varCount -= omitCols.length;
  
  // Store the var names if present
  if (config["first-row-vars"]) {
    req.session.results.varNames = result[0];
  }
  
  // Parse the individual data points based on configs
  for (var j = (config["first-row-vars"]) ? 1 : 0; j < result.length; j++) {
    // Reset the row to push and the col omissions
    var currentRow = [];
    omitCols = omitColsBlueprint.slice(0);
    trashRow = false;
    
    // Make sure this isn't a skipped row
    if (j === omitRows[0]) {
      omitRows = omitRows.slice(1);
      continue;
    }
    
    // Make sure var count is uniform
    if (result[j].length !== varCount) {
      for (var m = varCount - result[j].length; m > 0; m--) {
        result[j].push(noValue);
      }
    }
    
    // Go through the row's elements
    for (var k = 0; k < result[j].length; k++) {
      // Make sure this isn't a skipped col
      if (k === omitCols[0]) {
        omitCols = omitCols.slice(1);
        continue;
      }
      // Cast to number
      result[j][k] = Number(result[j][k]);
      var currentCol = result[j][k];
      
      if (currentCol === noValue) {
        currentCol = 0;
      } else if (!(currentCol >= yesMin && currentCol <= yesMax)) {
        currentCol = NaN;
      }
      
      // Verify that it's not trash
      if (isNaN(currentCol)) {
        // Check config settings for what to do with trash
        if (config["trash-data"]) {
          // Means it was a skip row, so scratch it
          trashRow = true;
          break;
        } else {
          // Otherwise, was a "zero-out"
          currentRow.push(noValue);
        }
      } else {
        // Good data point, so push it onto the new row
        currentRow.push(currentCol);
      }
    }
    // Don't add a row if it was determined to be trashed
    if (!trashRow) {
      purgedResult.push(currentRow);
    }
  }
  
  // Make sure we don't return without var names (sounds Spartan)
  if (!req.session.results.varNames) {
    var names = [];
    for (var v = 1; v <= purgedResult[0].length; v++) {
      names.push("v" + v);
    }
    req.session.results.varNames = names;
  }
  
  return purgedResult;
};



