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

var Clique = function () {};
Clique.precision = 1e-4;

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
  
  // Helper functions
  var ln = function (n) {
    // Returns the natural log of n
    return Math.log(n) / Math.log(Math.E);
  };
  
  // Sets the sensitivity for equivalence checks
  // Default is the Sylvester setting
  Complex.sensitivity = Clique.precision;
  
  Complex.prototype = {
    
    // Sets the given complex number's real and imaginary
    // components to those provided
    fromRect: function (x, y) {
      this.real = x;
      this.im = y;
      return this;
    },
    
    // Sets the given complex number's real and imaginary
    // components from the polar arguments given
    fromPolar: function (r, theta) {
      return this.fromRect(
        r * Math.cos(theta),
        r * Math.sin(theta)
      );
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
    
    // Returns the angle of the complex number
    angle: function () {
      return Complex.angleOf(this);
    },
    
    // Returns the log of this complex to base k
    log: function (k) {
      return Complex.log(this, k);
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
    equal: function (z, strict) {
      return Complex.equal(this, z, strict);
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
  Complex.equal = function (a, b, strict) {
    var precision = (typeof(strict) === "undefined") ? Complex.sensitivity : 0;
    if (Complex.areComplex(a)) {
      if (Complex.areComplex(b)) {
        return (Math.abs(a.real - b.real) <= precision) && (Math.abs(a.im - b.im) <= precision);
      }
      return Math.abs(a.real - b) <= precision && !a.im;
    } else {
      if (Complex.areComplex(b)) {
        return Math.abs(b.real - a) <= precision && !b.im;
      }
      return Math.abs(a - b) <= precision;
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
  
  // Returns the angle from the positive real axis of the given number n
  Complex.angleOf = function (n) {
    if (!Complex.areComplex(n)) {
      return (n === 0) ? NaN : ((n > 0) ? 0 : 180);
    }
    if (n.real === 0 && n.im === 0) {
      return NaN;
    }
    var arctan = Math.atan(n.im / n.real);
    if (n.real > 0) {
      return arctan;
    }
    if (n.real < 0) {
      return (n.im >= 0) ? arctan + Math.PI : arctan - Math.PI;
    }
    // Otherwise, n.real === 0
    return (n.im > 0) ? Math.PI / 2 : -1 * Math.PI / 2;
  };
  
  // Returns the log base k of the given number n
  Complex.log = function (n, k) {
    if (typeof(k) === "undefined") {k = Math.E;}
    var isComplex = Complex.areComplex(n);
    if (k === 0) {return (isComplex) ? $C(0) : 0;}
    if (k === 1) {return NaN;}
    if (!isComplex) {
      return Math.log(n) / Math.log(k);
    }
    return $C(
      Complex.log((n.modulus()), Math.E),
      Complex.angleOf(n)
    );
  };
  
  // Returns e^(n)
  Complex.exp = function (n) {
    if (!Complex.areComplex(n)) {
      return Math.exp(n);
    }
    return n.fromPolar(
      Math.exp(n.real),
      n.im
    );
  };
  
  // Returns n^k
  Complex.pow = function (n, k) {
    if (!Complex.areComplex(n)) {
      return Math.pow(n, k);
    }
    if (!k) {
      if (k === 0) {
        return $C(1);
      }
      return NaN;
    }
    var result = n;
    while (k > 1) {
      result = Complex.mult(result, result);
      k--;
    }
    return result;
  }
  
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
  
  // Returns the pythagorean calculation for an arbitrary number of arguments
  Complex.pythag = function () {
    var result = 0;
    for (var n in arguments) {
      result = Complex.add(result, Complex.pow(arguments[n], 2));
    }
    return Complex.sqrt(result);
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
  precision: Clique.precision
};

function Vector() {}
Vector.prototype = {

  // Returns element i of the vector
  e: function(i, c) {
    // In case the vector is being treated as a matrix
    if (typeof(c) !== "undefined" && Complex.equal(i, 1, true)) {
      i = c;
    }
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
  equal: function(vector) {
    var n = this.elements.length;
    var V = vector.elements || vector;
    if (n != V.length) { return false; }
    else if (n === 0) {return true;}
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
    if (!this.elements.length) {
      return "[]";
    }
    return '[' + this.elements.join(', ') + ']';
  },

  // Set vector's elements from an array
  setElements: function(els) {
    this.elements = (typeof(els) === "undefined") ? [] : (els.elements || els).slice();
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
Vector.zero = function(n) {
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
    return (this.elements[0]) ? this.elements[0].length : 0;
  },

  // Returns true iff the matrix is equal to the argument. You can supply
  // a vector as the argument, in which case the receiver must be a
  // one-column matrix equal to the vector.
  equal: function(matrix) {
    // Handle the sparse comparison case
    if (matrix instanceof Sparse) {
      return matrix.equal(this);
    } else {
      var M = matrix.elements || matrix;
      if (!this.elements.length) {return matrix.elements.length === 0;}
      if (typeof(M[0][0]) === 'undefined') { M = Matrix.create(M).elements; }
      if (this.elements.length != M.length ||
          this.elements[0].length != M[0].length) { return false; }
      var ni = this.elements.length, ki = ni, i, nj, kj = this.elements[0].length, j;
      do { i = ki - ni;
        nj = kj;
        do { j = kj - nj;
          if (Complex.magnitude(Complex.sub(this.elements[i][j], M[i][j])) > Sylvester.precision) { return false; }
        } while (--nj);
      } while (--ni);
    }
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
    if (typeof(M[0][0]) === 'undefined') { M = Matrix.create(M).elements; }
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
    return (this.rows() === this.cols());
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
    var n = this.elements.length, k = n;
    if (!this.elements.length) {
      return "[]";
    }
    for (var i = 0; i < n; i++) {
      matrix_rows.push(Vector.create(this.elements[i]).inspect());
    }
    return matrix_rows.join('\n');
  },
  
  // Set the matrix's elements from an array. If the argument passed
  // is a vector, the resulting matrix will be a single column.
  setElements: function(els) {
    // Handle the case for an empty matrix
    if (typeof(els) === "undefined" || els.length === 0) {
      this.elements = [];
      return this;
    }
    var i, elements = els.elements || els;
    if (typeof(elements[0][0]) !== 'undefined') {
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
  return Matrix.zero(n, m).map(
    function() { return Math.random(); }
  );
};

// Matrix filled with zeros
Matrix.zero = function(n, m) {
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
var $V = Vector.create,
    $M = Matrix.create;


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


/**
 * ****************
 * CLIQUE Functions
 * ****************
 */

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
    if ((n === 0 && k === 0) || k > n) {
      return 0;
    }
    return Math.factorial(n) / (Math.factorial(k) * Math.factorial(n - k));
  };
  
})();


/**
 * Modifications to the Sylvester Vector objects
 */
(function () {
  
  /** Helper Methods **/
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
  
  
  /** Instance Methods **/
  
  // Used to append a new element to the end of a vector
  Vector.prototype.append = function (n) {
    if (n instanceof Vector) {
      this.elements = this.elements.concat(n.elements);
    } else if (!(typeof(n) === "undefined")) {
      this.elements.push(n);
    }
    return this;
  };
  
  // Removes x elements from position i of the calling vector
  Vector.prototype.remove = function (i, x) {
    this.elements.splice(i - 1, x);
    return this;
  };
  
  // Mutator that sets the vector's element at i to x
  Vector.prototype.setElement = function (i, x) {
    if (!this.elements.length) {
      this.elements[i - 1] = x;
    } else {
      this.elements.splice(i - 1, 1, x);
    }
    return this;
  };
  
  
  /** Class Methods **/
 
  // Returns the sum of all elements of v
  Vector.sum = function (v) {
    var result = 0;
    for (var i = 1; i <= v.dimensions(); i++) {
      result = Complex.add(result, v.e(i));
    }
    return result;
  };

  // Returns a new vector of the elements of v with the given sorting function, or ascending
  // value by default
  Vector.sort = function (v, sortFunc) {
    var copy = v.dup();
    if (!sortFunc) {
      sortFunc = sortAscending;
    }
    return $V(copy.elements.sort(sortFunc));
  };
  
  // Inserts a new vector representing the element e inserted into v at index i
  Vector.insert = function (v, i, e) {
    var elements = v.elements;
    if (elements.length){
      elements.splice(i - 1, 0, e);
    } else {
      elements[i] = e;
    }
    return $V(elements);
  };
  
  // Returns a new vector of n elements consisting solely of 1's
  Vector.ones = function (n) {
    result = [];
    for (var i = 0; i < n; i++) {
      result[i] = 1;
    }
    return $V(result);
  };
  
  // Takes a vector and a number and returns the number of occurrences of the
  // number in that set.
  Vector.histoCount = function (set, number) {
    var counter = 0,
        currentItem;
    for (var i = 1; i <= set.dimensions(); i++) {
      currentItem = set.e(i);
      if (!(typeof(currentItem) === "number" || Complex.areComplex(currentItem))) {
        counter += Vector.histoCount(currentItem, number);
      } else if (Complex.equal(set.e(i), number)) {
        counter++;
      }
    }
    return counter;
  };
  
  // Helper function that multiplies the factorials of all elements in countedSet that are
  // greater than the threshhold
  // [!] Not in API, but in unit tests
  Vector.factProduct = function (countedSet, threshhold, countsetFact) {
    var result = 1;
    for (var i = threshhold; i <= countedSet.dimensions(); i++) {
      result = Complex.mult(result, countsetFact.e(i));
    }
    return result;
  };
  
  /** EXPERIMENTAL FUNCTIONS **/
  
  // Maps from multiple-deep tabloid or set to an integer index of possible sets of that shape
  Vector.setToIndex = function (setArray) {
    var index = 1,
        setSize = setArray.dimensions(),
        highestLevel = setArray.e(1), // Seed with first element for comparing purposes
        countSet = $V(),
        countSetFact = $V(),
        workingSize,
        thisLevel,
        multiplier,
        index;
    
    // Increment each of the elements of the setArray by 1 and see which is the highest
    setArray = setArray.map(function (x) {
      var result = Complex.add(x, 1);
      if (result > highestLevel) {
        highestLevel = result;
      }
      return result;
    });
    for (var i = 1; i <= highestLevel; i++) {
      countSet.setElement(i, Vector.histoCount(setArray, i));
      countSetFact.setElement(i, Math.factorial(countSet.e(i)));
    }
    
    for (var levelCounter = 1; levelCounter < highestLevel; levelCounter++) {
      workingSize = setSize;
      thisLevel = countSet.e(levelCounter);
      multiplier = Complex.divide(Math.factorial(Complex.sub(workingSize, thisLevel)), Vector.factProduct(countSet, levelCounter + 1, countSetFact));
      
      for (k = 1; k <= setArray.dimensions(); k++) {
        var currentValue = setArray.e(k);
        if (currentValue > levelCounter) {
          workingSize--;
        } else if (currentValue === levelCounter) {
          index = Complex.add(index, Complex.mult(Math.choose(workingSize - 1, thisLevel), multiplier));
          workingSize--;
          thisLevel--;
        }
      }
      setSize = Complex.sub(setSize, countSet.e(levelCounter));
    }
    return index;
  };
  
  // Helper function that computes the base level in the tabloid above the one passed
  // to it as the threshhold. Size is the number of elements on the level of threshhold
  // or below
  // [!] Function is not in the API, but is within tests
  Vector.multiplier = function (countedSet, threshhold, size) {
    var result = Math.factorial(size);
    for (var i = threshhold; i <= countedSet.dimensions(); i++) {
      result /= Math.factorial(countedSet.e(i));
    }
    return result;
  };
  
  // Maps to tabloid given integer index and a vector containing the shape of
  // the tabloid. This vector is defined in accordance with the following:
  // 1 chosen from 4 chosen from 5 chosen from 9 yields rows of width:
  // 9-5, 5-4, 4-1, 1 respectively. So the vector would be passed as [4, 1, 3, 1]
  Vector.indexToSet = function (index, shapeVector) {
    var setSize = Vector.sum(shapeVector),
        result = Vector.zero(setSize),
        nextSize = setSize,
        internalSum,
        internalIndex,
        selectedSize,
        workingSize,
        base;
    index--;
    
    for (var i = 1; i <= shapeVector.dimensions(); i++) {
      internalSum = 0;                             // The working sum just for this line
      selectedSize = shapeVector.e(i);
      workingSize = nextSize;
      nextSize -= selectedSize;                    // Saved for next iteration
      base = Vector.multiplier(shapeVector, i+1, nextSize);
      internalIndex = Math.floor(Complex.divide(index, base));  // To serve as this step's index
      index -= Complex.mult(internalIndex, base);  // Saved for next iteration
      
      // The "workhorse" loop: loops through elements and sets appropriate ones to current line in tabloid
      for (var j = 1; j <= setSize; j++) {
        if (Complex.equal(result.e(j), 0)) {
          if (Complex.equal(selectedSize, 0)) {
            workingSize--;
          } else if (internalSum + Math.choose(workingSize - 1, selectedSize) > internalIndex) {
            workingSize--;
          } else {
            internalSum += Math.choose(workingSize - 1, selectedSize);
            result.setElement(j, i);
            workingSize--;
            selectedSize--;
          }
        }
      }
    }
    
    return result;
  };
  
})();


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
      holderL = holderL.sort();
    }
    
    while (check === 0) {
      coord = $V();
      
      if (count > holderL.cols()) {
        check = 1;
      } else if (count === holderL.cols()) {
        projectionLengths.append(holderP.col(count).modulus());
      } else {
        currentShape = holderL.col(count);                    // Current comparing shape
        for (var i = count + 1; i <= holderL.cols(); i++) {
          if (currentShape.equal(holderL.col(i))) {           // Find coordinates of those...
            coord.append(i);                                  // Tracks projections with same shape
          }
        }
        
        // currentMatrix holds the columns of holderP defined by index in columnsToAdd
        columnsToAdd = $V([count]).append(coord);               // Vector with the column numbers to be added to
        currentMatrix = $M();                                 // currentMatrix for calculation
        for (var j = 1; j < columnsToAdd.dimensions(); j++) {
          currentMatrix.setCol(j, holderP.col(columnsToAdd.e(j)));
        }
        
        summedProj = Vector.zero(currentMatrix.rows());
        for (k = 1; k < currentMatrix.cols(); k++) {
          summedProj = summedProj.add(currentMatrix.col(i));
        }
        
        // We gather the info calculated on this iteration back into the holders
        holderP.setCol(count, summedProj);
        holderL.setCol(count, currentShape);
        
        projectionLengths.append(summedProj.modulus());
        
        // Purge the superfluous data gathered on this iteration
        for (var m = 1; m < coord.dimensions(); m++) {
          holderP.removeCol(coord.e(m));
          holderL.removeCol(coord.e(m));
        }
        count++;
      }
    }
    result[0] = $M()
      .setRange(1, 1, projectionLengths.rows(), projectionLengths.cols(), projectionLengths)
      .setRange(projectionLengths.rows() + 1, 1, holderL.rows(), holderL.cols, holderL);
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
            if (Complex.equal(r, 0)) { // Recover from underflow
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
        
          if (Complex.equal(r, 0) && i >= j) {
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
        U = $M(),                 // Represent the eigenvalues / -vectors of R
        D = $M(),
        nrm = 0,                  // Reminds us of the size of X
        lanczosResult = [],
        eigResult = [],
        
        // Private helper method to prepare the values of the various intermediary matrices
        // in order to facilitate the projections per condition
        projPrep = function (iter) {
          // TODO: sparse col
          lanczosResult = Matrix.lanczos(A, X.col(iter));
          Q = lanczosResult[0];
          R = lanczosResult[1];
          R = Matrix.full(R);   // Possibly unnecessary
          
          eigResult = Matrix.eig(R);
          U = eigResult[0].toDiagonalMatrix();
          D = eigResult[1];
          nrm = X.col(iter).modulus();
          
          // No, I'm not going to simplify this line
          projections.append(Q.multiply(U.multiply(U.row(1).multiply(nrm).toDiagonalMatrix())));
          lengths
          .append($M([
            U.row(1).map(function (x) {
              return Complex.mult(x.magnitude(), nrm);
            })
          ]));
        };
    
    if (typeof(Y) === "undefined") {
      for (var i = 1; i <= X.cols(); i++) {
        projPrep(i); // See above for the prepwork this function performs
        lengths.append(Matrix.ones(1, D.rows()).mult(D));
      }
      
    // Recall that the first row of U contains the lengths of the projections X / ||X||
    // onto the eigenvectors of R in the basis Q. We also take advantage of the face that
    // the eigenvectors in U have length 1 to compute the lengths in L by using absolute
    // value
    } else {
      Y.deleteRow(1);
      for (var i = 1; i <= X.cols(); i++) {
        projPrep(i); // See above for the prepwork this function performs
        lengths
          .append(Matrix.ones(1, D.rows()).mult($M(Y.col(i))))
          .append(Matrix.ones(1, D.rows()).mult(D));
      }
    }
    
    return [lengths, projections];
  };
  
  // TODO: Comment here; renaming also required
  Matrix.emmyrk = function (lambda, v, Rs) {
    if (typeof(Rs) === "undeinfed") {
      Rs = Matrix.jucysMurphyAll(Matrix.tabloids(lambda));
    }
    var d = Rs.rows(),
        n = Rs.cols() / d + 1,
        A = Rs.minor(1, 1, d, d), // TODO: Check that this is operating as intended
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
      A = Rs.minor(1, 1 + (i - 2) * d, d, (i - 1) * d);
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
        if (Complex.equal(lengths.e(r, k), n - i)) {
          U.setCol(i, projections.col(f));
        }
      }
    }
    projections = U;
    return [lengths, projections];
  };
  
})();


})();
