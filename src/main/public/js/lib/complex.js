/**
 * complex.js
 *
 * Complex number library for handling non-real results
 * for linear algebra functionality
 */

(function() {
  
  // Complex numbers of the form x + iy where x, y are
  // real numbers and i = Sqrt(-1)
  var Complex = $C = function () {};
  
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
      return this.fromRect(-this.real, -this.im);
    }
    
  };
  
  // Constructor function
  $C = Complex.create = function (real, imaginary) {
    var newComplex = new Complex();
    return newComplex.fromRect((real | 0), (imaginary | 0));
  };
  
})();

