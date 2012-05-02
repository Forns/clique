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
    if (this.elements.length && vector.dimensions() !== this.elements[i - 1].length) {
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
    if (this.elements.length && vector.dimensions() !== this.rows()) {
      return null;
    }
    var vectorElements = [];
    vector.each(function (x, k) {
      vectorElements[k - 1] = x;
    });
    for (var j = 0; j < vectorElements.length; j++) {
      if (!this.elements[j]) {
        this.elements[j] = [];
      }
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
    endRow2 = (typeof(endRow2) === "undefined") ? ((otherMatrix.rows) ? otherMatrix.rows() : 1) : endRow2;
    endColumn2 = (typeof(endColumn2) === "undefined") ? ((otherMatrix.cols) ? otherMatrix.cols() : otherMatrix.dimensions()) : endColumn2;
        
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
    if (!this.elements.length) {
      return this;
    }
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
  Matrix.prototype.removeCol = function (col) {
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
    // In case we were actually handed a full matrix...
    if (sparse instanceof Matrix) {
      return sparse;
    }
    if (sparse instanceof Vector) {
      sparse = $M(sparse);
    }
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
  
  // Returns the subdiagonal elements (of the calling square matrix) as a vector
  Matrix.prototype.subDiagonal = function () {
    var size = this.rows(),
        result = [];
    // Begin by ensuring this is a square matrix and large enough to have a sub-diag
    if (!this.isSquare() || size <= 1) {
      return null;
    }
    for (var i = 2; i <= size; i++) {
      result[i - 2] = this.e(i, i - 1);
    }
    return $V(result);
  };
  
  // Appends the given segment, either a matrix or vector, to the caller's bottom-most
  // row and down
  //
  // [!] Returns null if the caller and segment differ in number of columns
  Matrix.prototype.append = function (segment) {
    var segCols = (segment.cols) ? segment.cols() : segment.dimensions();
    if ((this.cols() && segCols) && this.cols() !== segCols) {
      return null;
    }
    this.setRange(this.rows() + 1, 1, this.rows() + ((segment.rows) ? segment.rows() : 1), segCols, segment);
    return this;
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
        a = $M(), // Vector used in iteration
        b = $M(), // Vector used in iteration
        ep = 0,
        check = 1,
        n = 1,
        size = A.cols(),
        v = Matrix.zero(size, 1); // "Main character" vector
    epsilon = epsilon || Math.pow(10, -8); // Default case for epsilon
    // Cast the orthogonal matrix and argument if necessary
    if (!orthogonalResult.col) {
      orthogonalResult = $M(orthogonalResult);
    }
    if (A instanceof Sparse) {
      A = Matrix.full(A);
    }
    
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
      for (var j = 1; j <= n; j++) {
        ep = $M(orthogonalResult.col(j)).transpose().multiply(v).e(1, 1);
        v = v.subtract(orthogonalResult.col(j).multiply(ep));
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
    var holderP = Matrix.full(P) || P,
        holderL = Matrix.full(L) || L,
        resultP = $M(),
        resultL = $M(),
        projectionLengths = $V(),
        check = 0,                    // Tracks when we've finished comparing
        count = 1,                    // Tracks the beginning of our comparing
        coord = $V(),                 // Gathering point for our collected info
        currentShape,                 // The comparing shape per iteration
        currentMatrix,
        summedProj,
        columnsToAdd,
        resultBound,
        result = [];
    
    // Remove the lengths of the projections
    holderL.removeRow(1);
    // Then ensure we're dealing with integers
    holderL = holderL.round();
    // Sort the columns of L
    if (holderL.rows() > 1) {
      holderL = Matrix.sort(holderL);
    }

    while (check === 0) {
      coord = $V();
      
      if (count > holderL.cols()) {
        check = 1;
      } else if (count === holderL.cols()) {
        projectionLengths.append(holderP.col(count).modulus());
        check = 1;
      } else {
        currentShape = holderL.col(count);                    // Current comparing shape
        for (var i = count + 1; i <= holderL.cols(); i++) {
          if (currentShape.equal(holderL.col(i))) {           // Find coordinates of those...
            coord.append(i);                                  // Tracks projections with same shape
          }
        }
        
        // currentMatrix holds the columns of holderP defined by index in columnsToAdd
        columnsToAdd = $V([count]).append(coord);             // Vector with the column numbers to be added to
        currentMatrix = $M();                                 // currentMatrix for calculation
        for (var j = 1; j <= columnsToAdd.dimensions(); j++) {
          currentMatrix.setCol(j, holderP.col(columnsToAdd.e(j)));
        }

        summedProj = Vector.zero(currentMatrix.rows());
        
        for (k = 1; k <= currentMatrix.cols(); k++) {
          summedProj = summedProj.add(currentMatrix.col(k));
        }
        
        // We gather the info calculated on this iteration back into the holders
        holderP.setCol(count, summedProj);
        holderL.setCol(count, currentShape);
        
        projectionLengths.append(summedProj.modulus());
        
        // Purge the superfluous data gathered on this iteration
        for (var m = 1; m <= coord.dimensions(); m++) {
          holderP.removeCol(coord.e(m));
          holderL.removeCol(coord.e(m));
        }
        count++;
      }
    }
    result[0] = $M()
      .append(projectionLengths)
      .append(holderL);
    result[1] = holderP;
    return result;
  };
  
  // Helper method for eig to extend signNumber's sign onto n
  var copySign = function (n, signNumber) {
    return (signNumber < 0) ? Complex.mult(Complex.magnitude(n), -1) : Complex.magnitude(n);
  },
      
  // Helper method for eig to sort the values in ascending order and modify the vector matrix to match
  // [!] eigenvector transposition done here so the columns are the actual vectors
  eigSort = function (eigenvalues, eigenvectors) {
    var sortedValues = Vector.sort(eigenvalues),
        size = eigenvalues.dimensions(),
        sortedVectors = Matrix.zero(size, size),
        currentValue;
     
    for (var i = 1; i <= size; i++) {
      currentValue = sortedValues.e(i);
      for (var j = 1; j <= size; j++) {
        if (Complex.equal(eigenvalues.e(j), currentValue, true)) {
          sortedVectors.setCol(i, eigenvectors.col(j));
          break;
        }
      }
    }
    return [sortedValues, sortedVectors];
  };
  
  // QL algorithm with implicit shifts to determine the eigenvalues and eigenvectors of a real,
  // symmetric, tridiagonal matrix.
  //
  // [!] Returns a 2 element array, [eigenvalues, eigenvectors], the latter of which has columns
  // representing the result's eigenvectors
  //
  // Algorithm credit (although modified substantively) to Saul Teukolsky, William Vetterling, and Brian Flannery
  Matrix.eig = function (tridiagonalMatrix) {
    // Return null if the matrix is not square
    if (!tridiagonalMatrix.isSquare()) {
      return [null, null];
    }
    // If the matrix is a single element, just return that
    if (tridiagonalMatrix.rows() === 1) {
      return [tridiagonalMatrix.row(1), $M([1])];
    }
    // Begin by extracting the necessary components from the input
    var diagonal = tridiagonalMatrix.diagonal(),          // Vector containing the argument's diagonal
        subDiagonal = tridiagonalMatrix.subDiagonal(),    // Vector containing the argument's subdiagonal
        n = diagonal.dimensions(),
        
        // Ugly iterators
        m = 1,
        i = 1,
        j = 1,
        k = 1,
        
        // Ugly intermediary variables used for math stuffs
        g = 0,
        r = 0,
        s = 0,
        c = 0,
        p = 0,
        f = 0,
        b = 0,
        subDiagElement = 0,
        count = 0,
        eigenvectors = Matrix.I(n);
    
    // Renumber the last element of the subdiagonal for correct dimensions
    subDiagonal.setElement(n, 0);
    
    for (j = 1; j <= n; j++) {
      count = 0;
      do {
        // Look for a single small subdiagonal element to split the matrix
        for (m = j; m <= n - 1; m++) {
          subDiagElement = Complex.magnitude(diagonal.e(m)) + Complex.magnitude(diagonal.e(m + 1));
          if (
            // |subDiagonal[m] + subDiagElement| - subDiagElement === 0
            Complex.equal(Complex.sub(Complex.magnitude(Complex.add(subDiagonal.e(m), subDiagElement)), subDiagElement), 0, true)
          ) {
            break;
          }
        }
        
        if (m !== j) {
          // Inform the user if the iteration count is getting out of control
          if (count++ >= 30) {
            console.warn("[!] Matrix.eig: too many iterations... " + count);
          }
          // g = (diagonal[j + 1] - diagonal[j]) / (2 * subDiagonal[j]); // for ease of reading
          g = Complex.divide(Complex.sub(diagonal.e(j + 1), diagonal.e(j)), Complex.mult(subDiagonal.e(j), 2)); // Form shift
          r = Complex.pythag(g, 1);
          // g = diagonal[m] - diagonal[j] + subDiagonal[j] / (g + copySign(r, g)); // for ease of reading
          g = Complex.add(Complex.sub(diagonal.e(m), diagonal.e(j)), Complex.divide(subDiagonal.e(j), Complex.add(g, copySign(r, g))));
          s = c = 1;
          p = 0;
          
          for (i = m - 1; i >= j; i--) {
            f = Complex.mult(s, subDiagonal.e(i));
            b = Complex.mult(c, subDiagonal.e(i));
            r = Complex.pythag(f, g);
            subDiagonal.setElement(i + 1, r);
            if (Complex.equal(r, 0, true)) { // Recover from underflow
              diagonal.setElement(i + 1, Complex.sub(diagonal.e(i + 1), p));
              subDiagonal.setElement(m, 0);
              break;
            }
          
            s = Complex.divide(f, r);
            c = Complex.divide(g, r);
            g = Complex.sub(diagonal.e(i + 1), p);
            // r = (diagonal[i]-g) * s + 2 * c * b // for ease of reading
            r = Complex.add(Complex.mult(Complex.sub(diagonal.e(i), g), s), Complex.mult(Complex.mult(c, 2), b));
            p = Complex.mult(s, r);
            diagonal.setElement(i + 1, Complex.add(g, p));
            g = Complex.sub(Complex.mult(c, r), b);
            
            // This loop is superfluous if eigenvectors not wanted... just sayin'
            for (k = 1; k <= n; k++) { // Form eigenvectors
              f = eigenvectors.e(k, i + 1);
              eigenvectors.setElement(k, i + 1, Complex.add(Complex.mult(s, eigenvectors.e(k, i)), Complex.mult(c, f)));
              eigenvectors.setElement(k, i, Complex.sub(Complex.mult(c, eigenvectors.e(k, i)), Complex.mult(s, f)));
            }
          }
        
          if (Complex.equal(r, 0, true) && i >= j) {
            continue;
          }
          diagonal.setElement(j, Complex.sub(diagonal.e(j), p));
          subDiagonal.setElement(j, g);
          subDiagonal.setElement(m, 0);
        }
      } while (m !== j);
    }
    
    // Sort the values in ascending order and match with their vector column before returning    
    return eigSort(diagonal, eigenvectors);
  };
  
  // [L, P] = eigenspaceProjections(A, X);
  //
  // Uses the "Lanczos Iteration with re-orthogonalization" to compute 
  // the projections P of the column vectors of X onto the eigenspaces 
  // of the symmetric matrix A.  It also computes the lengths of each of 
  // these projections and returns a two-rowed matrix L with the length 
  // and the corresponding eigenvalue making up one column.
  //
  // [L, P] = eigenspaceProjections(A, X, Y);
  //
  // Also does the above, but keeps track of previous computations of
  // eigenvalues (in Y) for iteration
  //
  // [!] Returns result as array with [L, P] as elements
  Matrix.eigenspaceProjections = function (A, X, Y) {
    var Q = $M(),                 // Represent the QR decomposition for use with lanczos
        R = $M(),
        projections = $M(),       // Holds the projections
        lengths = $M(),
        matrixConstructor,        // Used as an intermediary holder to construct matrices
        U = $M(),                 // Represent the eigenvalues / -vectors of R
        D = $M(),
        nrm = 0,                  // Reminds us of the size of X
        lanczosResult = [],
        eigResult = [],
        
        // Private helper method to prepare the values of the various intermediary matrices
        // in order to facilitate the projections per condition
        projPrep = function (iter) {
          lanczosResult = Matrix.lanczos(A, X.col(iter));
          Q = lanczosResult[0];
          R = lanczosResult[1];
          R = Matrix.full(R);
          
          eigResult = Matrix.eig(R);
          // TODO: eig returning eigenvalues first--WRONG!
          U = eigResult[1];
          D = eigResult[0].toDiagonalMatrix();
          nrm = X.col(iter).modulus();
          
          matrixConstructor = Q.multiply(U.multiply((U.row(1).multiply(nrm)).toDiagonalMatrix()));
          projections.augment(matrixConstructor);
          matrixConstructor = $M(U.row(1).map(function (x) {
            return Complex.mult(Complex.magnitude(x), nrm);
          })).transpose();
        };

    // TEMPORARY:
    A = Matrix.full(A);
    X = Matrix.full(X);
    
    if (typeof(Y) === "undefined") {
      for (var i = 1; i <= X.cols(); i++) {
        projPrep(i); // See above for the prepwork this function performs
        lengths.augment(matrixConstructor.append(Matrix.ones(1, D.rows()).multiply(D)));
      }
      
    // Recall that the first row of U contains the lengths of the projections X / ||X||
    // onto the eigenvectors of R in the basis Q. We also take advantage of the face that
    // the eigenvectors in U have length 1 to compute the lengths in L by using absolute
    // value
    } else {
      Y.removeRow(1);
      for (var i = 1; i <= X.cols(); i++) {
        projPrep(i); // See above for the prepwork this function performs
        matrixConstructor.append($M(Y.col(i)).multiply(Matrix.ones(1, D.rows())));
        matrixConstructor.append(Matrix.ones(1, D.rows()).multiply(D));
        
        lengths.augment(matrixConstructor);
      }
    }
    return [lengths, projections];
  };
  
  // TODO: Comment here; renaming also required
  Matrix.emmyrk = function (lambda, v, Rs) {
    if (typeof(Rs) === "undefined") {
      Rs = Matrix.jucysMurphyAll(Matrix.tabloids(lambda));
    }
    // TEMPORARY cast to full
    Rs = Matrix.full(Rs);
    var d = Rs.rows(),
        n = Rs.cols() / d + 1,
        A = Rs.minor(1, 1, d, d),
        lengths,
        projections,
        resultHolder,
        
        // Ugly data placeholders
        r,
        c,
        U;
    
    // Computes the projections of v onto the eigenspaces of R_2
    resultHolder = Matrix.eigenspaceProjections(A, v);
    lengths = resultHolder[0];
    projections = resultHolder[1];
    
    resultHolder = Matrix.gatherProjections(lengths, projections);
    lengths = resultHolder[0];
    projections = resultHolder[1];
    
    // Computes the projections onto the eigenspaces of R_i
    for (var i = 3; i <= n; i++) {
      // Rs(1:d, 1 + (i - 2) * d:(i - 1) * d)
      A = Rs.minor(1, 1 + (i - 2) * d, d, d);
      
      resultHolder = Matrix.eigenspaceProjections(A, projections, lengths);
      lengths = resultHolder[0];
      projections = resultHolder[1];

      resultHolder = Matrix.gatherProjections(lengths, projections);
      lengths = resultHolder[0];
      projections = resultHolder[1];
    }
    
    r = lengths.rows();
    c = lengths.cols();
    U = $M();
    
    for (var j = 1; j <= c; j++) {
      for (var k = 1; k <= c; k++) {
        if (Complex.equal(lengths.e(r, k), n - j)) {
          U.setCol(j, projections.col(k));
        }
      }
    }
    return [lengths, U];
  };
  
})();


