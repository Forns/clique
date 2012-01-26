/**
 * complex.js
 *
 * Complex number library for handling non-real results
 * for linear algebra functionality
 */

// Complex numbers of the form x + iy where x, y are
// real numbers and i = Sqrt(-1)
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
    return newComplex.fromRect((real | 0), (imaginary | 0));
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
    return (a instanceof Complex && b instanceof Complex && a.real === b.real && a.im === b.im);
  };
  
  // Negates real and im components if Complex, or just returns negative
  // if a real number
  Complex.negate = function (n) {
    return (n instanceof Complex) ? $C(-n.real, -n.im) : -n;
  };
  
  // Adds two numbers a and b, returning a Complex if the result
  // is a Complex number z with z.im !== 0
  Complex.add = function (a, b) {
    if (!Complex.areComplex(a) && !Complex.areComplex(b)) {
      return a + b;
    }
    return $C((a.real | a) + (b.real | b), (a.im | 0) + (b.im | 0));
  };
  
  // Subtracts two numbers b from a, returning a Complex if the result
  // is a Complex number z with z.im !== 0
  Complex.sub = function (a, b) {
    return Complex.add(a, Complex.negate(b));
  };
  
})();

