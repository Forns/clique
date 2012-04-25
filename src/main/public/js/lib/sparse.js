

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
  
  // Returns the row accessed by index as a Vector
  row: function (index) {
    if (index > this.rows() || index < 1) {
      return null;
    }
    var result = [];
    for (var i = 1; i <= this.cols(); i++) {
      result.push(this.e(index, i));
    }
    return $V(result);
  },
  
  // Returns the column accessed by index as a Vector
  col: function (index) {
    if (index > this.cols() || index < 1) {
      return null;
    }
    var result = [];
    for (var i = 1; i <= this.rows(); i++) {
      result.push(this.e(i, index));
    }
    return $V(result);
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
    return null;
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
  },
  
  // Sets the given elements (accessed through the arguments map) in the sparse
  // e.g. s.setElements([1, 1, 3], [2, 3, -5]); will set element (1,1) = 3 and (2,3) = -5
  setElements: function () {
    for (var entry in arguments) {
      var argEntry = arguments[entry];
      this.setElement(argEntry[0], argEntry[1], argEntry[2]);
    }
    return this;
  },
  
  // Sets the given dimensions of the calling Sparse to the given dimensions
  // of the provided Sparse "otherMatrix"
  setRange: function (startRow1, startColumn1, endRow1, endColumn1, otherMatrix, startRow2, startColumn2, endRow2, endColumn2) {
    return Matrix.setRange(this, startRow1, startColumn1, endRow1, endColumn1, otherMatrix, startRow2, startColumn2, endRow2, endColumn2);
  }
};

// Sparse matrix creation with the given number of rows
// and columns; represents an all-0 matrix with those dimensions
Sparse.create = function (rows, cols) {
  var s = new Sparse();
  s.sRows = (rows && rows >= 0) ? rows : 0;
  s.sCols = (cols && cols >= 0) ? cols : 0;
  s.elements = {};
  
  // You can instantiate the sparse with any post-dimension setters
  // SOOO GHETTOOOOO
  delete arguments["0"];
  delete arguments["1"];
  for (var arg in arguments) {
    s.setElements(arguments[arg]);
  }
  return s;
};

// Takes the given matrix and turns it into a sparse matrix
Sparse.sparse = function (matrix) {
  if (!(matrix instanceof Matrix)) {
    return null;
  };
  // Iterate through the given matrix, adding elements to the sparse only
  // when they do not equal 0
  var mRows = matrix.rows(),
      mCols = matrix.cols(),
      result = $S(mRows, mCols);
  for (var i = 1; i <= mRows; i++) {
    for (var j = 1; j <= mCols; j++) {
      var currentElement = matrix.e(i, j);
      if (!Complex.equal(currentElement, 0)) {
        result.setElement(i, j, currentElement);
      }
    }
  }
  return result;
}

var $S = Sparse.create;

