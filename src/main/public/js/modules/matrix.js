/**
 * Modifications to the Sylvester Matrix objects
 */
(function () {
  
  // Helper method for the matrix sorting that determines
  // ascending sorting method
  var sortNumber = function (a, b) {
    return Complex.sub(a, b);
  };
  
  // Sets the given row of matrix to the given vector
  Matrix.prototype.setRow = function (i, vector) {
    if (vector.dimensions() !== this.elements[i - 1].length) {
      return null;
    }
    var vectorElements = [];
    vector.each(function (x, k) {
      vectorElements[k - 1] = x;
    });
    this.elements[i - 1] = vectorElements;
    return this;
  };
  
  // Sets the given column of matrix to the given vector
  Matrix.prototype.setCol = function (i, vector) {
    if (vector.dimensions() !== this.rows()) {
      return null;
    }
    var vectorElements = [];
    vector.each(function (x, k) {
      vectorElements[k - 1] = x;
    });
    for (var j = 0; j < vectorElements.length; j++) {
      this.elements[j][i - 1] = vectorElements[j];
    }
    return this;
  };
  
  // Sets a single matrix element to the given value
  Matrix.prototype.setElement = function (i, j, element) {
    this.elements[i - 1][j - 1] = element;
    return this;
  };
  
  // Swaps rows in the given matrix
  Matrix.prototype.swapRows = function (i, j) {
    var swapped = this.elements[i - 1];
    this.elements[i - 1] = this.elements[j - 1];
    this.elements[j - 1] = swapped;
    return this;
  };
  
  // Provides the sum of all matrix elements raised to a power
  Matrix.prototype.sum = function (power) {
    var result = 0;
    // Default to a power of 1 if none specified
    if (typeof(power) === "undefined") {
      power = 1;
    }
    for (var i = 1; i <= this.rows(); i++) {
      for (var j = 1; j <= this.cols(); j++) {
        result = Complex.add(result, Complex.pow(this.e(i, j), power));
      }
    }
    return result;
  };
  
  // The norm of a matrix is a scalar that gives some
  // measure of the magnitude of the elements of the matrix
  Matrix.prototype.norm = function () {
    return Complex.sqrt(this.sum(2));
  };
  
  // Creates a matrix of all ones with specified dimensions
  Matrix.ones = function (rows, columns) {
    var result = [],
        addedRow = [];
    // Construct the row full of ones...
    for (var i = 0; i < columns; i++) {
      addedRow.push(1);
    }
    // ...then push each into the matrix
    for (var j = 0; j < rows; j++) {
      result.push(addedRow);
    }
    return $M(result);
  };
  
  // Finds the position of the first non-zero element
  // in an array; [0, 0, 0] if otherwise no position
  Matrix.firstNonZero = function (matrix) {
    for (var i = 1; i <= matrix.rows(); i++) {
      for (var j = 1; j <= matrix.cols(); j++) {
        var currentElement = matrix.e(i, j);
        if (!Complex.equal(currentElement, 0)) {
          return [i, j, currentElement];
        }
      }
    }
    return [0, 0, 0];
  };
  
  // Sorts a given matrix by column and returns the new matrix
  Matrix.sort = function (matrix) {
    var result = [];
    for (var i = 1; i <= matrix.cols(); i++) {
      var currentCol = [];
      // Have to get the column's elements as the return is a vector
      matrix.col(i).each(function (x, i) {
        currentCol.push(x);
      });
      currentCol = currentCol.sort(sortNumber);
      for (var j = 0; j < currentCol.length; j++) {
        if (typeof(result[j]) === "undefined") {
          result[j] = [];
        }
        result[j].push(currentCol[j]);
      }
    }
    return $M(result);
  };

  // Returns a matrix whose rows are the k-element subsets
  // of an n-element set
  Matrix.kSet = function (n, k) {
    var nChooseK = Math.choose(n, k),
        result = Matrix.Zero(nChooseK, k);
    
    // Recursion has terminated, so return null    
    if (n < k || k <= 0) {
      return null;
    
    // Otherwise, we just have a single row
    } else if (k === 1) {
      for (var i = 1; i <= n; i++) {
        result.setElement(1, i, i);
      }
      return result.transpose();
    
    // Otherwise, we recurse and construct the rows
    } else {
      var subMatrix = Matrix.kSet(n - 1, k - 1),
          count = 1;
      // We may have a null return, so just break out
      if (!subMatrix) {return;}
      for (var i = 1; i <= subMatrix.rows(); i++) {
        for (var j = subMatrix.e(i, k - 1) + 1; j < n; j++) {
          for (var m = 1; m < result.cols(); m++) {
            result.setElement(count, m, subMatrix.e(i, m));
            count++;
          }
        }
      }
      return result;
    }
  };
  
  /* TODO
  // Takes vector mu of positive integers and returns a matrix whose
  // rows correspond to the tabloids of shape mu
  Matrix.tabloids = function (mu) {
    
  };
  */
  
})();


