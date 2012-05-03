/**
 * analyzer-prep.js
 *
 * Adds server-only elements to the Clique library for use in the
 * spectral analysis portion of the web app
 */

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

console.log("[...] Johnson graph generation in progress...");
// Construct the actual Johnson Graphs
for (var jn = 2; jn <= 3; jn++) {
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