

/**
 * Sparse Matrix custom class
 */
function Sparse () {};
Sparse.prototype = {
  rows: function () {
    return this.rows;
  },
  
  cols: function () {
    return this.cols;
  },
  
  // Returns the element at the given index if it exists,
  // 0 if it doesn't, and null if out of the sparse's bounds
  e: function (row, col) {
    if (row > this.rows() || col > this.cols()) {
      
    }
  }
};

// Sparse matrix creation with the given number of rows
// and columns; represents an all-0 matrix with those dimensions
Sparse.create = function (rows, cols) {
  var s = new Sparse();
  s.rows = rows || 0;
  s.cols = cols || 0;
  s.elements = {};
  return s;
};

