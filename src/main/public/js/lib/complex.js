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
    return (a instanceof Complex && b instanceof Complex && a.real === b.real && a.im === b.im);
  };
  
  // Negates real and im components if Complex, or just returns negative
  // if a real number
  Complex.negate = function (n) {
    return (n instanceof Complex) ? $C(-n.real, -n.im) : -n;
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

