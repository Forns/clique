/**
 * Clique Linear Algebra Library
 *
 * Copyright 2012, Andrew Forney
 * https://github.com/Forns/clique
 *
 * Includes complex.js
 * Adapted / Customized Complex Number library from:
 * https://github.com/arian/Complex
 * Arian Stolwijk
 *
 * Includes Sylvester.js
 * http://sylvester.jcoglan.com/
 * Copyright 2007, James Coglan
 */

/**
 * complex.js
 *
 * Complex number library for handling non-real results
 * for linear algebra functionality
 */

// Complex numbers of the form x + iy where x, y are
// real numbers and i = sqrt(-1)
var Complex = $C = function () {};

(function() {
  
  Complex.prototype = {
    
    // Sets the given complex number's real and imaginary
    // components to those provided
    fromRect: function (x, y) {
      this.real = x;
      this.im = y;
      return this;
    },
    
    // Distance of Complex vector from origin
    modulus: function () {
      var a = this.real,
          b = this.im;
      return Math.sqrt(a * a + b * b);
    },
    
    // Returns the complex conjugate (negation of im):
    // The conjugate of 2 + 3i would be 2 - 3i
    conjugate: function () {
      return this.fromRect(this.real, -this.im);
    },
    
    // Negates both real and im components
    negate: function () {
      return Complex.negate(this);
    },
    
    // Adds this to another number
    add: function (z) {
      return Complex.add(this, z);
    },
    
    // Subtracts a number from this
    sub: function (z) {
      return Complex.sub(this, Complex.negate(z));
    },
    
    // Multiplies a number by this
    mult: function (z) {
      return Complex.mult(this, z);
    },
    
    // Returns true if the two complex numbers are equal
    equals: function (z) {
      return Complex.equal(this, z);
    },
    
    // Returns a string representation of the Complex number
    toString: function () {
      var ret = '', a = this.real, b = this.im;
      if (a) ret += a;
      if (a && b || b < 0) ret += (b < 0) ? '-' : '+';
      if (b){
        var absIm = Math.abs(b);
        if (absIm != 1) ret += absIm;
        ret += 'i';
      }
      return ret || '0';
    }
    
  };
  
  // Constructor function
  $C = Complex.create = function (real, imaginary) {
    var newComplex = new Complex();
    return newComplex.fromRect((real || 0), (imaginary || 0));
  };
  
  // Checks if all input arguments are complex numbers
  Complex.areComplex = function (nums) {
    if (!arguments.length) {
      return false;
    }
    for (n in arguments) {
      if (!(arguments[n] instanceof Complex)) {
        return false;
      }
    }
    return true;
  };
  
  // Returns true if the argument is a complex number
  Complex.equal = function (a, b) {
    if (Complex.areComplex(a)) {
      if (Complex.areComplex(b)) {
        return a.real === b.real && a.im === b.im;
      }
      return a.real === b && !a.im;
    } else {
      if (Complex.areComplex(b)) {
        return b.real === a && !b.im; 
      }
      return a === b;
    }
  };
  
  // Negates real and im components if Complex, or just returns negative
  // if a real number
  Complex.negate = function (n) {
    return (n instanceof Complex) ? $C(-n.real, -n.im) : -n;
  };
  
  // Returns the distance from the origin of either a complex number
  // or a real
  Complex.magnitude = function (n) {
    return (Complex.areComplex(n)) ? n.modulus() : Math.abs(n);
  };
  
  // Rounds the imaginary and real parts of the given number to the
  // nearest integer value
  Complex.round = function (n) {
    if (!Complex.areComplex(n)) {
      return Math.round(n);
    }
    return $C(Math.round(n.real), Math.round(n.im));
  };
  
  // Adds two numbers a and b, returning a Complex if either
  // a or b are complex
  Complex.add = function (a, b) {
    if (!Complex.areComplex(a) && !Complex.areComplex(b)) {
      return a + b;
    }
    var aReal = (Complex.areComplex(a)) ? a.real : a,
        bReal = (Complex.areComplex(b)) ? b.real : b,
        aIm = (a.im || 0),
        bIm = (b.im || 0);
    return $C(aReal + bReal, aIm + bIm);
  };
  
  // Subtracts two numbers b from a, returning a Complex if either
  // a or b are complex
  Complex.sub = function (a, b) {
    return Complex.add(a, Complex.negate(b));
  };
  
  // Multiplies two numbers a and b, returning a Complex if either
  // a or b are complex
  Complex.mult = function (a, b) {
    if (!Complex.areComplex(a) && !Complex.areComplex(b)) {
      return a * b;
    }
    var aReal = (Complex.areComplex(a)) ? a.real : a,
        bReal = (Complex.areComplex(b)) ? b.real : b,
        aIm = (a.im || 0),
        bIm = (b.im || 0);
    return $C(aReal * bReal - aIm * bIm, aReal * bIm + bReal * aIm);
  };
  
  // Divides two numbers a by b, returning a Complex if either
  // a or b are complex
  Complex.divide = function (n, m) {
    if (!Complex.areComplex(n) && !Complex.areComplex(m)) {
      return n / m;
    }
    var a = $C(Complex.areComplex(n) ? n.real : n),
        b = n.im || 0,
        c = $C(Complex.areComplex(m) ? m.real : m),
        d = m.im || 0;
    // Division by zero? Not on my watch...
    if (!(c || d)) {
      return NaN;
    }
    return $C(
      (a * c + b * d) / (c * c + d * d),
      (b * c - a * d) / (c * c + d * d)
    );
  };
  
  // Returns the square root of a number, returning a Complex if
  // it is non-real
  Complex.sqrt = function (n) {
    if (!Complex.areComplex(n)) {
      return (n < 0) ? $C(0, Math.sqrt(Math.abs(n))) : Math.sqrt(n);
    }
    var mod = n.modulus(),
        sign = (!n.im || n.im >= 0) ? 1 : -1,
        x = Math.sqrt((n.real + mod) / 2),
        y = sign * Math.sqrt((-1 * n.real + mod) / 2);
        
    return $C(x, y);
  };
  
})();

// === Sylvester ===
// Vector and Matrix mathematics modules for JavaScript
// Copyright (c) 2007 James Coglan
// 
// Edited and trimmed by Andrew Forney, 2012
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

var Sylvester = {
  version: '0.1.3',
  precision: 1e-6
};

function Vector() {}
Vector.prototype = {

  // Returns element i of the vector
  e: function(i) {
    return (i < 1 || i > this.elements.length) ? null : this.elements[i-1];
  },

  // Returns the number of elements the vector has
  dimensions: function() {
    return this.elements.length;
  },

  // Returns the modulus ('length') of the vector
  modulus: function() {
    return Complex.sqrt(this.dot(this));
  },

  // Returns true iff the vector is equal to the argument
  eql: function(vector) {
    var n = this.elements.length;
    var V = vector.elements || vector;
    if (n != V.length) { return false; }
    do {
      if (Complex.magnitude(Complex.sub(this.elements[n-1], V[n-1])) > Sylvester.precision) { return false; }
    } while (--n);
    return true;
  },

  // Returns a copy of the vector
  dup: function() {
    return Vector.create(this.elements);
  },

  // Maps the vector to another vector according to the given function
  map: function(fn) {
    var elements = [];
    this.each(function(x, i) {
      elements.push(fn(x, i));
    });
    return Vector.create(elements);
  },
  
  // Calls the iterator for each element of the vector in turn
  each: function(fn) {
    var n = this.elements.length, k = n, i;
    do { i = k - n;
      fn(this.elements[i], i+1);
    } while (--n);
  },
  
  // Returns a boolean denoting whether vector is the zero vector
  isZeroVector: function () {
    this.each(function (x, i) {
      if (x) {
        return false;
      }
    });
    return true;
  },
  
  // Returns a new vector created by normalizing the receiver
  toUnitVector: function() {
    var r = this.modulus();
    if (r === 0) { return this.dup(); }
    return this.map(function(x) { return Complex.divide(x, r); });
  },

  // Returns the angle between the vector and the argument (also a vector)
  angleFrom: function(vector) {
    var V = vector.elements || vector;
    var n = this.elements.length, k = n, i;
    if (n != V.length) { return null; }
    var dot = 0, mod1 = 0, mod2 = 0;
    // Work things out in parallel to save time
    this.each(function(x, i) {
      dot = Complex.add(dot, Complex.mult(x, V[i-1]));
      mod1 = Complex.add(dot, Complex.mult(x, x));
      mod2 = Complex.add(dot, Complex.mult(V[i-1], V[i-1]));
    });
    mod1 = Complex.sqrt(mod1); mod2 = Complex.sqrt(mod2);
    if (Complex.equal(Complex.mult(mod1, mod2), 0)) { return null; }
    var theta = Complex.divide(dot, Complex.mult(mod1, mod2));
    if (theta < -1) { theta = -1; }
    if (theta > 1) { theta = 1; }
    return Math.acos(theta);
  },

  // Returns true iff the vector is parallel to the argument
  isParallelTo: function(vector) {
    var angle = this.angleFrom(vector);
    return (angle === null) ? null : (angle <= Sylvester.precision);
  },

  // Returns true iff the vector is antiparallel to the argument
  isAntiparallelTo: function(vector) {
    var angle = this.angleFrom(vector);
    return (angle === null) ? null : (Complex.magnitude(angle - Math.PI) <= Sylvester.precision);
  },

  // Returns true iff the vector is perpendicular to the argument
  isPerpendicularTo: function(vector) {
    var dot = this.dot(vector);
    return (dot === null) ? null : (Complex.magnitude(dot) <= Sylvester.precision);
  },

  // Returns the result of adding the argument to the vector
  add: function(vector) {
    var V = vector.elements || vector;
    if (this.elements.length != V.length) { return null; }
    return this.map(function(x, i) { return Complex.add(x, V[i-1]); });
  },

  // Returns the result of subtracting the argument from the vector
  subtract: function(vector) {
    var V = vector.elements || vector;
    if (this.elements.length != V.length) { return null; }
    return this.map(function(x, i) { return Complex.sub(x, V[i-1]); });
  },

  // Returns the result of multiplying the elements of the vector by the argument
  multiply: function(k) {
    return this.map(function(x) { return Complex.mult(x, k); });
  },

  x: function(k) { return this.multiply(k); },

  // Returns the scalar product of the vector with the argument
  // Both vectors must have equal dimensionality
  dot: function(vector) {
    var V = vector.elements || vector;
    var i, product = 0, n = this.elements.length;
    if (n != V.length) { return null; }
    do { product = Complex.add(product, Complex.mult(this.elements[n-1], V[n-1])); } while (--n);
    return product;
  },

  // Returns the vector product of the vector with the argument
  // Both vectors must have dimensionality 3
  cross: function(vector) {
    var B = vector.elements || vector;
    if (this.elements.length != 3 || B.length != 3) { return null; }
    var A = this.elements;
    return Vector.create([
      Complex.sub(Complex.mult((A[1], B[2])), Complex.mult((A[2], B[1]))),
      Complex.sub(Complex.mult((A[2], B[0])), Complex.mult((A[0], B[2]))),
      Complex.sub(Complex.mult((A[0], B[1])), Complex.mult((A[1], B[0])))
    ]);
  },

  // Returns the (absolute) largest element of the vector
  max: function() {
    var m = 0, n = this.elements.length, k = n, i;
    do { i = k - n;
      if (Complex.magnitude(this.elements[i]) > Complex.magnitude(m)) { m = this.elements[i]; }
    } while (--n);
    return m;
  },

  // Returns the index of the first match found
  indexOf: function(x) {
    var index = null, n = this.elements.length, k = n, i;
    do { i = k - n;
      if (index === null && this.elements[i] == x) {
        index = i + 1;
      }
    } while (--n);
    return index;
  },

  // Returns a diagonal matrix with the vector's elements as its diagonal elements
  toDiagonalMatrix: function() {
    return Matrix.Diagonal(this.elements);
  },

  // Returns the result of rounding the elements of the vector
  round: function() {
    return this.map(function(x) { return Complex.round(x); });
  },

  // Returns a copy of the vector with elements set to the given value if they
  // differ from it by less than Sylvester.precision
  snapTo: function(x) {
    return this.map(function(y) {
      return (Complex.magnitude(Complex.subtract(y, x)) <= Sylvester.precision) ? x : y;
    });
  },

  // Returns the vector's distance from the argument, when considered as a point in space
  distanceFrom: function(obj) {
    if (obj.anchor) { return obj.distanceFrom(this); }
    var V = obj.elements || obj;
    if (V.length != this.elements.length) { return null; }
    var sum = 0, part;
    this.each(function(x, i) {
      part = Complex.sub(x, V[i-1]);
      sum = Complex.add(sum, Complex.mult(part, part));
    });
    return Complex.sqrt(sum);
  },

  // liesOn function deleted
  // liesIn function deleted
  // rotate function deleted
  // reflectionIn function deleted

  // Utility to make sure vectors are 3D. If they are 2D, a zero z-component is added
  to3D: function() {
    var V = this.dup();
    switch (V.elements.length) {
      case 3: break;
      case 2: V.elements.push(0); break;
      default: return null;
    }
    return V;
  },

  // Returns a string representation of the vector
  inspect: function() {
    return '[' + this.elements.join(', ') + ']';
  },

  // Set vector's elements from an array
  setElements: function(els) {
    this.elements = (els.elements || els).slice();
    return this;
  }
};
  
// Constructor function
Vector.create = function(elements) {
  var V = new Vector();
  return V.setElements(elements);
};

// i, j, k unit vectors
Vector.i = Vector.create([1,0,0]);
Vector.j = Vector.create([0,1,0]);
Vector.k = Vector.create([0,0,1]);

// Random vector of size n
Vector.Random = function(n) {
  var elements = [];
  do { elements.push(Math.random());
  } while (--n);
  return Vector.create(elements);
};

// Vector filled with zeros
Vector.Zero = function(n) {
  var elements = [];
  do { elements.push(0);
  } while (--n);
  return Vector.create(elements);
};



function Matrix() {}
Matrix.prototype = {

  // Returns element (i,j) of the matrix
  e: function(i,j) {
    if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length) { return null; }
    return this.elements[i-1][j-1];
  },

  // Returns row k of the matrix as a vector
  row: function(i) {
    if (i > this.elements.length) { return null; }
    return Vector.create(this.elements[i-1]);
  },
  
  // Returns column k of the matrix as a vector
  col: function(j) {
    if (j > this.elements[0].length) { return null; }
    var col = [], n = this.elements.length, k = n, i;
    do { i = k - n;
      col.push(this.elements[i][j-1]);
    } while (--n);
    return Vector.create(col);
  },
  
  // Returns the number of rows/columns the matrix has
  dimensions: function() {
    return {rows: this.elements.length, cols: this.elements[0].length};
  },

  // Returns the number of rows in the matrix
  rows: function() {
    return this.elements.length;
  },
  
  // Returns the number of columns in the matrix
  cols: function() {
    return this.elements[0].length;
  },

  // Returns true iff the matrix is equal to the argument. You can supply
  // a vector as the argument, in which case the receiver must be a
  // one-column matrix equal to the vector.
  eql: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    if (this.elements.length != M.length ||
        this.elements[0].length != M[0].length) { return false; }
    var ni = this.elements.length, ki = ni, i, nj, kj = this.elements[0].length, j;
    do { i = ki - ni;
      nj = kj;
      do { j = kj - nj;
        if (Complex.magnitude(Complex.sub(this.elements[i][j], M[i][j])) > Sylvester.precision) { return false; }
      } while (--nj);
    } while (--ni);
    return true;
  },

  // Returns a copy of the matrix
  dup: function() {
    return Matrix.create(this.elements);
  },

  // Maps the matrix to another matrix (of the same dimensions) according to the given function
  map: function(fn) {
    var els = [], ni = this.elements.length, ki = ni, i, nj, kj = this.elements[0].length, j;
    do { i = ki - ni;
      nj = kj;
      els[i] = [];
      do { j = kj - nj;
        els[i][j] = fn(this.elements[i][j], i + 1, j + 1);
      } while (--nj);
    } while (--ni);
    return Matrix.create(els);
  },

  // Returns true iff the argument has the same dimensions as the matrix
  isSameSizeAs: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    return (this.elements.length == M.length &&
        this.elements[0].length == M[0].length);
  },

  // Returns the result of adding the argument to the matrix
  add: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    if (!this.isSameSizeAs(M)) { return null; }
    return this.map(function(x, i, j) { return Complex.add(x, M[i-1][j-1]); });
  },

  // Returns the result of subtracting the argument from the matrix
  subtract: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    if (!this.isSameSizeAs(M)) { return null; }
    return this.map(function(x, i, j) { return Complex.sub(x, M[i-1][j-1]); });
  },

  // Returns true iff the matrix can multiply the argument from the left
  canMultiplyFromLeft: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    // this.columns should equal matrix.rows
    return (this.elements[0].length == M.length);
  },

  // Returns the result of multiplying the matrix from the right by the argument.
  // If the argument is a scalar then just multiply all the elements. If the argument is
  // a vector, a vector is returned, which saves you having to remember calling
  // col(1) on the result.
  multiply: function(matrix) {
    if (!matrix.elements) {
      return this.map(function(x) { return Complex.mult(x, matrix); });
    }
    var returnVector = matrix.modulus ? true : false;
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    if (!this.canMultiplyFromLeft(M)) { return null; }
    var ni = this.elements.length, ki = ni, i, nj, kj = M[0].length, j;
    var cols = this.elements[0].length, elements = [], sum, nc, c;
    do { i = ki - ni;
      elements[i] = [];
      nj = kj;
      do { j = kj - nj;
        sum = 0;
        nc = cols;
        do { c = cols - nc;
          sum = Complex.add(sum, Complex.mult(this.elements[i][c], M[c][j]));
        } while (--nc);
        elements[i][j] = sum;
      } while (--nj);
    } while (--ni);
    var M = Matrix.create(elements);
    return returnVector ? M.col(1) : M;
  },

  x: function(matrix) { return this.multiply(matrix); },

  // Returns a submatrix taken from the matrix
  // Argument order is: start row, start col, nrows, ncols
  // Element selection wraps if the required index is outside the matrix's bounds, so you could
  // use this to perform row/column cycling or copy-augmenting.
  minor: function(a, b, c, d) {
    var elements = [], ni = c, i, nj, j;
    var rows = this.elements.length, cols = this.elements[0].length;
    do { i = c - ni;
      elements[i] = [];
      nj = d;
      do { j = d - nj;
        elements[i][j] = this.elements[(a+i-1)%rows][(b+j-1)%cols];
      } while (--nj);
    } while (--ni);
    return Matrix.create(elements);
  },

  // Returns the transpose of the matrix
  transpose: function() {
    var rows = this.elements.length, cols = this.elements[0].length;
    var elements = [], ni = cols, i, nj, j;
    do { i = cols - ni;
      elements[i] = [];
      nj = rows;
      do { j = rows - nj;
        elements[i][j] = this.elements[j][i];
      } while (--nj);
    } while (--ni);
    return Matrix.create(elements);
  },

  // Returns true iff the matrix is square
  isSquare: function() {
    return (this.elements.length == this.elements[0].length);
  },

  // Returns the (absolute) largest element of the matrix
  max: function() {
    var m = 0, ni = this.elements.length, ki = ni, i, nj, kj = this.elements[0].length, j;
    do { i = ki - ni;
      nj = kj;
      do { j = kj - nj;
        if (Complex.magnitude(this.elements[i][j]) > Complex.magnitude(m)) { m = this.elements[i][j]; }
      } while (--nj);
    } while (--ni);
    return m;
  },

  // Returns the indeces of the first match found by reading row-by-row from left to right
  indexOf: function(x) {
    var index = null, ni = this.elements.length, ki = ni, i, nj, kj = this.elements[0].length, j;
    do { i = ki - ni;
      nj = kj;
      do { j = kj - nj;
        if (Complex.equal(this.elements[i][j], x)) { return {i: i+1, j: j+1}; }
      } while (--nj);
    } while (--ni);
    return null;
  },

  // If the matrix is square, returns the diagonal elements as a vector.
  // Otherwise, returns null.
  diagonal: function() {
    if (!this.isSquare) { return null; }
    var els = [], n = this.elements.length, k = n, i;
    do { i = k - n;
      els.push(this.elements[i][i]);
    } while (--n);
    return Vector.create(els);
  },

  // Make the matrix upper (right) triangular by Gaussian elimination.
  // This method only adds multiples of rows to other rows. No rows are
  // scaled up or switched, and the determinant is preserved.
  toRightTriangular: function() {
    var M = this.dup(), els;
    var n = this.elements.length, k = n, i, np, kp = this.elements[0].length, p;
    do { i = k - n;
      if (Complex.equal(M.elements[i][i], 0)) {
        for (j = i + 1; j < k; j++) {
          if (!Complex.equal(M.elements[j][i], 0)) {
            els = []; np = kp;
            do { p = kp - np;
              els.push(Complex.add(M.elements[i][p], M.elements[j][p]));
            } while (--np);
            M.elements[i] = els;
            break;
          }
        }
      }
      if (!Complex.equal(M.elements[i][i], 0)) {
        for (j = i + 1; j < k; j++) {
          var multiplier = Complex.divide(M.elements[j][i], M.elements[i][i]);
          els = []; np = kp;
          do { p = kp - np;
            // Elements with column numbers up to an including the number
            // of the row that we're subtracting can safely be set straight to
            // zero, since that's the point of this routine and it avoids having
            // to loop over and correct rounding errors later
            els.push(p <= i ? 0 : Complex.sub(M.elements[j][p], Complex.mult(M.elements[i][p], multiplier)));
          } while (--np);
          M.elements[j] = els;
        }
      }
    } while (--n);
    return M;
  },

  toUpperTriangular: function() { return this.toRightTriangular(); },

  // Returns the determinant for square matrices
  determinant: function() {
    if (!this.isSquare()) { return null; }
    var M = this.toRightTriangular();
    var det = M.elements[0][0], n = M.elements.length - 1, k = n, i;
    do { i = k - n + 1;
      det = Complex.mult(det, M.elements[i][i]);
    } while (--n);
    return det;
  },

  det: function() { return this.determinant(); },

  // Returns true iff the matrix is singular
  isSingular: function() {
    return (this.isSquare() && Complex.equal(this.determinant(), 0));
  },

  // Returns the trace for square matrices
  trace: function() {
    if (!this.isSquare()) { return null; }
    var tr = this.elements[0][0], n = this.elements.length - 1, k = n, i;
    do { i = k - n + 1;
      tr = Complex.add(tr, this.elements[i][i]);
    } while (--n);
    return tr;
  },

  tr: function() { return this.trace(); },

  // Returns the rank of the matrix
  rank: function() {
    var M = this.toRightTriangular(), rank = 0;
    var ni = this.elements.length, ki = ni, i, nj, kj = this.elements[0].length, j;
    do { i = ki - ni;
      nj = kj;
      do { j = kj - nj;
        if (Complex.magnitude(M.elements[i][j]) > Sylvester.precision) { rank++; break; }
      } while (--nj);
    } while (--ni);
    return rank;
  },
  
  rk: function() { return this.rank(); },

  // Returns the result of attaching the given argument to the right-hand side of the matrix
  augment: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    var T = this.dup(), cols = T.elements[0].length;
    var ni = T.elements.length, ki = ni, i, nj, kj = M[0].length, j;
    if (ni != M.length) { return null; }
    do { i = ki - ni;
      nj = kj;
      do { j = kj - nj;
        T.elements[i][cols + j] = M[i][j];
      } while (--nj);
    } while (--ni);
    return T;
  },

  // Returns the inverse (if one exists) using Gauss-Jordan
  inverse: function() {
    if (!this.isSquare() || this.isSingular()) { return null; }
    var ni = this.elements.length, ki = ni, i, j;
    var M = this.augment(Matrix.I(ni)).toRightTriangular();
    var np, kp = M.elements[0].length, p, els, divisor;
    var inverse_elements = [], new_element;
    // Matrix is non-singular so there will be no zeros on the diagonal
    // Cycle through rows from last to first
    do { i = ni - 1;
      // First, normalise diagonal elements to 1
      els = []; np = kp;
      inverse_elements[i] = [];
      divisor = M.elements[i][i];
      do { p = kp - np;
        new_element = Complex.divide(M.elements[i][p], divisor);
        els.push(new_element);
        // Shuffle of the current row of the right hand side into the results
        // array as it will not be modified by later runs through this loop
        if (p >= ki) { inverse_elements[i].push(new_element); }
      } while (--np);
      M.elements[i] = els;
      // Then, subtract this row from those above it to
      // give the identity matrix on the left hand side
      for (j = 0; j < i; j++) {
        els = []; np = kp;
        do { p = kp - np;
          els.push(Complex.sub(M.elements[j][p], Complex.mult(M.elements[i][p], M.elements[j][i])));
        } while (--np);
        M.elements[j] = els;
      }
    } while (--ni);
    return Matrix.create(inverse_elements);
  },

  inv: function() { return this.inverse(); },

  // Returns the result of rounding all the elements
  round: function() {
    return this.map(function(x) { return Complex.round(x); });
  },

  // Returns a copy of the matrix with elements set to the given value if they
  // differ from it by less than Sylvester.precision
  snapTo: function(x) {
    return this.map(function(p) {
      return (Complex.magnitude(Complex.sub(p, x)) <= Sylvester.precision) ? x : p;
    });
  },

  // Returns a string representation of the matrix
  inspect: function() {
    var matrix_rows = [];
    var n = this.elements.length, k = n, i;
    do { i = k - n;
      matrix_rows.push(Vector.create(this.elements[i]).inspect());
    } while (--n);
    return matrix_rows.join('\n');
  },
  
  // Set the matrix's elements from an array. If the argument passed
  // is a vector, the resulting matrix will be a single column.
  setElements: function(els) {
    var i, elements = els.elements || els;
    if (typeof(elements[0][0]) != 'undefined') {
      var ni = elements.length, ki = ni, nj, kj, j;
      this.elements = [];
      do { i = ki - ni;
        nj = elements[i].length; kj = nj;
        this.elements[i] = [];
        do { j = kj - nj;
          this.elements[i][j] = elements[i][j];
        } while (--nj);
      } while(--ni);
      return this;
    }
    var n = elements.length, k = n;
    this.elements = [];
    do { i = k - n;
      this.elements.push([elements[i]]);
    } while (--n);
    return this;
  }
};

// Constructor function
Matrix.create = function(elements) {
  var M = new Matrix();
  return M.setElements(elements);
};

// Identity matrix of size n
Matrix.I = function(n) {
  var els = [], k = n, i, nj, j;
  do { i = k - n;
    els[i] = []; nj = k;
    do { j = k - nj;
      els[i][j] = (i == j) ? 1 : 0;
    } while (--nj);
  } while (--n);
  return Matrix.create(els);
};

// Diagonal matrix - all off-diagonal elements are zero
Matrix.Diagonal = function(elements) {
  var n = elements.length, k = n, i;
  var M = Matrix.I(n);
  do { i = k - n;
    M.elements[i][i] = elements[i];
  } while (--n);
  return M;
};

// Rotation matrix about some axis. If no axis is
// supplied, assume we're after a 2D transform
Matrix.Rotation = function(theta, a) {
  if (!a) {
    return Matrix.create([
      [Math.cos(theta),  -Math.sin(theta)],
      [Math.sin(theta),   Math.cos(theta)]
    ]);
  }
  var axis = a.dup();
  if (axis.elements.length != 3) { return null; }
  var mod = axis.modulus();
  var x = axis.elements[0]/mod, y = axis.elements[1]/mod, z = axis.elements[2]/mod;
  var s = Math.sin(theta), c = Math.cos(theta), t = 1 - c;
  // Formula derived here: http://www.gamedev.net/reference/articles/article1199.asp
  // That proof rotates the co-ordinate system so theta
  // becomes -theta and sin becomes -sin here.
  return Matrix.create([
    [ t*x*x + c, t*x*y - s*z, t*x*z + s*y ],
    [ t*x*y + s*z, t*y*y + c, t*y*z - s*x ],
    [ t*x*z - s*y, t*y*z + s*x, t*z*z + c ]
  ]);
};

// Special case rotations
Matrix.RotationX = function(t) {
  var c = Math.cos(t), s = Math.sin(t);
  return Matrix.create([
    [  1,  0,  0 ],
    [  0,  c, -s ],
    [  0,  s,  c ]
  ]);
};
Matrix.RotationY = function(t) {
  var c = Math.cos(t), s = Math.sin(t);
  return Matrix.create([
    [  c,  0,  s ],
    [  0,  1,  0 ],
    [ -s,  0,  c ]
  ]);
};
Matrix.RotationZ = function(t) {
  var c = Math.cos(t), s = Math.sin(t);
  return Matrix.create([
    [  c, -s,  0 ],
    [  s,  c,  0 ],
    [  0,  0,  1 ]
  ]);
};

// Random matrix of n rows, m columns
Matrix.Random = function(n, m) {
  return Matrix.Zero(n, m).map(
    function() { return Math.random(); }
  );
};

// Matrix filled with zeros
Matrix.Zero = function(n, m) {
  var els = [], ni = n, i, nj, j;
  do { i = n - ni;
    els[i] = [];
    nj = m;
    do { j = m - nj;
      els[i][j] = 0;
    } while (--nj);
  } while (--ni);
  return Matrix.create(els);
};


// Utility functions
var $V = Vector.create;
var $M = Matrix.create;

/**
 * ****************
 * CLIQUE Functions
 * ****************
 */

// Global clique object
var Clique = $CQ = function () {};

(function() {

/**
 * Basic mathematic cobinatoric functions seeded into
 * the Math library
 */
(function () {
  
  // The standard factorial function
  Math.factorial = function (n) {
    var result = 1;
    for (var i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };
  
  // The standard choose function: n! / (k!*(n-k)!)
  Math.choose = function (n, k) {
    return Math.factorial(n) / (Math.factorial(k) * Math.factorial(n - k));
  };
  
})();


/**
 * Modifications to the Sylvester Matrix objects
 */
(function () {
  
  // Helper method for the matrix sorting that determines
  // ascending sorting method
  var sortNumber = function (a, b) {
    return a - b;
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
        result += Math.pow(this.e(i, j), power);
      }
    }
    return result;
  };
  
  // The norm of a matrix is a scalar that gives some
  // measure of the magnitude of the elements of the matrix
  Matrix.prototype.norm = function () {
    return Math.sqrt(this.sum(2));
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
        if (currentElement) {
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
  
})();


})();
