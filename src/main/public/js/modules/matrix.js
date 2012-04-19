/**
 * Modifications to the Sylvester Matrix objects
 */
(function () {
  
  // Helper method for the matrix sorting that determines
  // ascending sorting method
  var sortAscending = function (a, b) {
    var result = Complex.sub(a, b);
    return result.real || result;
  },
  
  sortDescending = function (a, b) {
    var result = sortAscending(a, b) * -1;
    return result.real || result;
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
    if (!this.elements[i - 1]) {
      this.elements[i - 1] = [];
    }
    this.elements[i - 1][j - 1] = element;
    return this;
  };
  
  // Sets the given dimensions of the calling Matrix to the given dimensions
  // of the provided Matrix "otherMatrix"
  Matrix.setRange = function (originalMatrix, startRow1, startColumn1, endRow1, endColumn1, otherMatrix, startRow2, startColumn2, endRow2, endColumn2) {
    // [!] Users may optionally omit the otherMatrix bounds, which will default to the matrix's size
    startRow2 = (typeof(startRow2) === "undefined") ? 1 : startRow2;
    startColumn2 = (typeof(startColumn2) === "undefined") ? 1 : startColumn2;
    endRow2 = (typeof(endRow2) === "undefined") ? otherMatrix.rows() : endRow2;
    endColumn2 = (typeof(endColumn2) === "undefined") ? otherMatrix.cols() : endColumn2;
        
    // Normalize the ranges, making sure that they do not differ; if they do,
    // take the shortest and use that instead, trimming from right / bottom bounds as applicable
    var rowMax = Math.min(endRow1 - startRow1, endRow2 - startRow2),
        colMax = Math.min(endColumn1 - startColumn1, endColumn2 - startColumn2);
        
    // Iterate through the elements, stopping at the maxes for each iteration
    for (var i = 0; i <= rowMax; i++) {
      var currentOriginalRow = startRow1 + i,
          currentOtherRow = startRow2 + i;
      for (var j = 0; j <= colMax; j++) {
        originalMatrix.setElement(currentOriginalRow, startColumn1 + j, otherMatrix.e(currentOtherRow, startColumn2 + j));
      }
    }
    return originalMatrix;
  };
  
  // See above method, which is the workhorse for this function
  Matrix.prototype.setRange = function (startRow1, startColumn1, endRow1, endColumn1, otherMatrix, startRow2, startColumn2, endRow2, endColumn2) {
    return Matrix.setRange(this, startRow1, startColumn1, endRow1, endColumn1, otherMatrix, startRow2, startColumn2, endRow2, endColumn2);
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
  
  // Removes the given row from the matrix
  Matrix.prototype.removeRow = function (row) {
    row--;
    if (row < this.rows() && row >= 0) {
      this.elements.splice(row, 1);
    }
    return this;
  };
  
  // Removes the given column from the matrix
  Matrix.prototype.removeColumn = function (col) {
    col--;
    if (col < this.cols() && col >= 0) {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].splice(col, 1);
      }
    }
    return this;
  }
  
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
      currentCol = currentCol.sort(sortAscending);
      for (var j = 0; j < currentCol.length; j++) {
        if (typeof(result[j]) === "undefined") {
          result[j] = [];
        }
        result[j].push(currentCol[j]);
      }
    }
    return $M(result);
  };
  
  // Returns a full matrix (all 0-elements fleshed out) from the given sparse
  Matrix.full = function (sparse) {
    var result = Matrix.zero(sparse.rows(), sparse.cols()),
        sparseElements = sparse.elements,
        splitter = [],
        i = 1,
        j = 1;
    for (var key in sparseElements) {
      splitter = key.split(",");
      i = parseInt(splitter[0].substring(1, splitter[0].length));
      j = parseInt(splitter[1].substring(0, splitter[1].length - 1));
      result.setElement(i, j, sparseElements[key]);
    }
    return result;
  };
  
  // Returns matrix with columns flipped in the left-right direction, i.e. about a vertical axis
  Matrix.fliplr = function (matrix) {
    var cols = matrix.cols(),
        result = $M(matrix.col(cols));
    for (var i = 2; i <= cols; i++) {
      result.setCol(i, matrix.col(cols + 1 - i));
    }
    return result;
  };
  

  /** Experimental Section **/

  // Returns a matrix whose rows are the k-element subsets
  // of an n-element set
  // Algorithm by Michael Orrison
  Matrix.kSet = function (n, k) {
    var nChooseK = Math.choose(n, k),
        result = Matrix.zero(nChooseK, k);
    
    // Recursion has terminated, so return   
    if (n < k || k <= 0) {
      return;
    
    // Otherwise, we construct an ascending integer matrix
    } else if (k === 1) {
      var countingMatrix = [];
      for (var i = 0; i < n; i++) {
        countingMatrix[i] = [i + 1];
      }
      return $M(countingMatrix);
    
    // Otherwise, we recurse and construct the rows
    } else {
      var subMatrix = Matrix.kSet(n - 1, k - 1),
          count = 1;
      
      for (var i = 1; i <= subMatrix.rows(); i++) {
        for (var j = subMatrix.e(i, k - 1) + 1; j <= n; j++) {
          result = result.setRow(count, subMatrix.row(i).append(j));
          count++;
        }
      }
      return result;
    }
  };
  
  // Takes vector mu of positive integers and returns a matrix whose
  // rows correspond to the tabloids of shape mu
  // Algorithm by Michael Orrison
  Matrix.tabloids = function (mu) {
    var size = mu.dimensions(),
        sumMu = Vector.sum(mu),
        num = Math.factorial(sumMu),
        count = 1,
        result,
        lam,
        sumLam,
        sumKSet,
        jBloids,
        insertRow;
    
    // Sort the vector mu in ascending order
    mu = Vector.sort(mu);
    
    for (var i = 1; i <= size; i++) {
      num = num / Math.factorial(mu.e(i));
    }
    
    // Set dimensions of the result
    result = Matrix.ones(num, sumMu);
    
    // Don't bother going through the rigor if we only have 1 element in mu
    if (size !== 1) {
      lam = mu.dup();
      lam = lam.remove(lam.dimensions(), 1); // Slice the end off of lam
      sumLam = Vector.sum(lam);
      sumKSet = Matrix.kSet(sumMu, sumLam);
      // Add one to all elements of the recursive matrix
      jBloids = Matrix.tabloids(lam).map(function(x) {
        return x + 1;
      });
      for (var k = 1; k <= sumKSet.rows(); k++) {
        for (var j = 1; j <= jBloids.rows(); j++) {
          insertRow = Vector.ones(sumMu);
          for (var m = 1; m <= sumLam; m++) {
            insertRow.setElement(sumKSet.e(k, m), jBloids.e(j, m));
          }
          result.setRow(count, insertRow);
          count++;
        }
      }
    }
    return result;
  };
  
  // Uses the "Lanczos Iteration with re-orthogonalization" to compute the QR
  // factorization of the matrix [f fA fA^2...] where A is a symmetric matrix
  // [Q, R] = lanczos(A, f, epsilon)
  // Allows user to determine how small the residue vectors must be before terminating
  // Default value for epsilon set to 10^-8
  Matrix.lanczos = function (A, f, epsilon) {
    var orthogonalResult = f.multiply(1 / f.norm()),
        tridiagonalResult = $S(), // Sparse matrix for collecting parallel computed results
        a = $M([0]), // Vector used in iteration
        b = $M([0]), // Vector used in iteration
        ep = 0,
        check = 1,
        n = 1,
        size = A.cols(),
        v = Matrix.zero(size, 1); // "Main character" vector
    epsilon = epsilon || Math.pow(10, -8); // Default case for epsilon
    
    // FIRST PASS
    v = $M(A.multiply(orthogonalResult.col(1)));
    a.setElement(1, 1, $M(orthogonalResult.col(1)).transpose().multiply(v).e(1, 1));
    v = v.subtract(orthogonalResult.col(1).multiply(a.e(1, 1)));
    tridiagonalResult.setElement(1, 1, a.e(1, 1));
    b.setElement(1, 1, v.norm());
    if (b.e(1, 1) > epsilon) {
      orthogonalResult.setCol(2, $V(v.multiply(1 / b.e(1, 1)).col(1)));
      tridiagonalResult.setElement(1, 2, b.e(1, 1));
      tridiagonalResult.setElement(2, 1, b.e(1, 1));
      n = 2;
    } else {
      check = 0;
    }
    
    // THREE TERM RECURRENCE
    while(check > 0) {
      v = A.multiply(orthogonalResult.col(n)).subtract(orthogonalResult.col(n - 1).multiply(b.e(1, n - 1)));
      a.setElement(1, n, $M(orthogonalResult.col(n)).transpose().multiply(v).e(1, 1));
      v = v.subtract(orthogonalResult.col(n).multiply(a.e(1, n)));
      tridiagonalResult.setElement(n, n, a.e(1, n));
      
      // Re-orthogonalize here
      for (var j = 1; j < n; j++) {
        ep = $M(orthogonalResult.col(j)).transpose().multiply(v);
        v = v.subtract(orthogonalResult.col(j).multiply(ep.e(1)));
      }
      
      b.setElement(1, n, v.modulus());
      
      if (b.e(1, n) > epsilon && n < size) {
        orthogonalResult.setCol(n + 1, v.multiply(1 / b.e(1, n)));
        tridiagonalResult.setElement(n, n + 1, b.e(1, n));
        tridiagonalResult.setElement(n + 1, n, b.e(1, n));
        n++;
      } else {
        check = 0;
      }
    }
    
    return [orthogonalResult, tridiagonalResult];
  };
  
  // Returns the Radon transform R: M^lam --> M^lam+ where lam is a partition of an integer n
  Matrix.radonTransform = function (lam) {
    // Begin by ensuring that the numbers in lam are in descending order
    lam = Vector.sort(lam, sortDescending);
    
    var size = lam.dimensions(),
        lamSum = Vector.sum(lam),       // Number being partitioned
        newPartition = lam.dup(),
        tabs = Matrix.tabloids(lam),    // The starting tabloids
        tabSize = tabs.rows(),
        newTabs,                        // The "goal" tabloids
        newTabSize,
        count = 0,
        zeros,
        index;
        
    newPartition.setElement(1, Complex.add(newPartition.e(1), 1));
    newPartition.setElement(size, Complex.sub(newPartition.e(1), 1));
    newTabs = Matrix.tabloids(newPartition);
    newTabSize = newTabs.rows();
    
    // The final Radon transform
    result = $S();
        
    for (var i = 1; i <= tabSize; i++) {
      count = 0;
      zeros = Vector.zero(lamSum);
      for (var j = 1; count < lam.e(size); j++) {
        var currentElement = tabs.e(i, j);
        if (currentElement === null) {
          break;
        }
        if (Complex.equal(currentElement, size)) {
          zeros = tabs.row(i);
          zeros.setElement(j, 1);
          index = Vector.setToIndex(zeros);
          result.setElement(index, i, result.e(index, i) + 1);
          count = count + 1;
        }
      }
    }
    return result;
  };
  
  // Returns the Jucys-Murphy element R_i associated with the space of tabloids given
  // to us by the tabloid matrix M
  Matrix.jucysMurphyElement = function (M, i) {
    var dim = M.rows(),
        result = $S(dim, dim),
        compVector = Vector.zero(M.cols()),
        check = 0,
        currentIndex;
        
    for (var k = 1; k <= dim; k++) {
      for (var j = 1; j < i; j++) {
        if (Complex.equal(M.e(k, i), M.e(k, j))) {
          result.setElement(k, k, result.e(k, k) + 1);
        } else {
          compVector = M.row(k);
          compVector.setElement(j, M.e(k, i));
          compVector.setElement(i, M.e(k, j));
          currentIndex = Vector.setToIndex(compVector);
          result.setElement(currentIndex, k, result.e(currentIndex, k) + 1);
        }
      }
    }
    return result;
  };
  
  // Computes all of the Jucys-Murphy elements for the tabloid space given by M.
  // The result is the matrix [R_2, ..., R_n]
  Matrix.jucysMurphyAll = function (M) {
    var n = M.cols(),
        d = M.rows(),
        result = $S(d, (n - 2) * d);
        
    // Does the heavy lifting by computing the JM element for each value of i
    for (var i = 2; i <= n; i++) {
      result.setRange(1, 1 + (i - 2) * d, d, (i - 1) * d, Matrix.jucysMurphyElement(M, i));
    }
    return result;
  };
  
  // Uses the data in L to rearrange and gather those projections in P that are in
  // the same isotypic subspace under the restriction of the permutation representation
  // in question to the subgroup S_m where m < n
  // [!] Returns an array result consisting of the new representations of L and P
  Matrix.gatherProjections = function (L, P) {
    var holderP = P,
        holderL = L,
        resultP = $M([0]),
        resultL = $M([0]),
        projectionLengths = $M([0]);
        
  };
  
})();


