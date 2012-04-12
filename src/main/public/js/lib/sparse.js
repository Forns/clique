

/**
 * Sparse Matrix custom class
 */
function Sparse () {};
Sparse.prototype = {
  rows: function () {
    return this.sRows;
  },
  
  cols: function () {
    return this.sCols;
  },
  
  // Returns the element at the given index if it exists,
  // 0 if it doesn't, and null if out of the sparse's bounds
  e: function (row, col) {
    if (row > this.rows() || col > this.cols() || row <= 0 || col <= 0) {
      return null;
    }
    var element = this.elements["(" + row + "," + col + ")"];
    if (typeof(element) !== "undefined") {
      return element;
    } else {
      return 0;
    }
  },
  
  // Determines if the given sparse or matrix is equal to the calling sparse
  equal: function (matrix) {
    // Shortcut the comparison if they differ in dimensions
    if (matrix.rows() !== this.rows() || matrix.cols() !== this.cols()) {
      return false;
    }
    // Assuming it is a full Matrix...
    if (matrix instanceof Matrix) {
      for (var i = 0; i < matrix.elements.length; i++) {
        for (var j = 0; j < matrix.elements[0].length; j++) {
          if (!Complex.equal(matrix.elements[i][j], this.e(i+1, j+1))) {
            return false;
          }
        }
      }
    // Assuming it is a sparse Matrix...
    } else if (matrix instanceof Sparse) {
      var thisElements = this.elements,
          matrixElements = matrix.elements;
      for (var element in thisElements) {
        if (!Complex.equal(thisElements[element], matrixElements[element])) {
          return false;
        }
      }
    // Or neither, in which case, return null
    } else {
      return null;
    }
    return true;
  },
  
  // Returns a string representation of the given Sparse Matrix
  inspect: function () {
    var result = "",
        elements = this.elements;
    for (var key in elements) {
      result += key + " = " + elements[key] + "\n";
    }
    // Assuming there were no elements...
    if (!result) {
      result += this.rows() + " x " + this.cols() + " all-0 sparse matrix";
    } else {
      // Trim that last new line
      result = result.substring(0, result.length - 1);
    }
    return result;
  },
  
  // Sets the given element at i, j to the given value x
  setElement: function (i, j, x) {
    // Cannot set bounds with indexes <= 0
    if (i <= 0 || j <= 0) {
      return null;
    }
    // Dynamically expand the sparse if the set bounds are outside
    if (i > this.rows()) {
      this.sRows = i;
    }
    if (j > this.cols()) {
      this.sCols = j;
    }
    if (Complex.equal(x, 0)) {
      delete this.elements["(" + i + "," + j + ")"];
    } else {
      this.elements["(" + i + "," + j + ")"] = x;
    }
    return this;
  }
};

// Sparse matrix creation with the given number of rows
// and columns; represents an all-0 matrix with those dimensions
Sparse.create = function (rows, cols) {
  var s = new Sparse();
  s.sRows = (rows && rows >= 0) ? rows : 0;
  s.sCols = (cols && cols >= 0) ? cols : 0;
  s.elements = {};
  return s;
};

var $S = Sparse.create;

